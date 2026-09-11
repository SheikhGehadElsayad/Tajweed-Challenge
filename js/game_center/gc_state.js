// Game Center State Manager
window.GC_STATE = {
  // Mode: 'solo' | 'teams' | 'pvp'
  mode: 'solo',
  activeGameId: null,
  themeId: 'animals',
  
  // Question pool for the active game session
  questions: [],
  currentIndex: 0,
  
  // Teams / Players setup
  // Array of { id: 1, name: 'Team Falcons', avatar: '🦁', color: '#2563eb', score: 0, streak: 0, powerups: { hint: 1, '50_50': 1, freeze: 1 }, shield: 0 }
  teams: [],
  currentTeamIndex: 0,

  // Pause state
  isPaused: false,

  // Teacher / Host Settings
  settings: {
    timerEnabled: true,
    timerSeconds: 15,
    powerupsEnabled: true,
    soundSfx: true,
    soundRecitation: true,
    showExplanations: true,
    difficulty: 'normal' // 'easy' (20s), 'normal' (15s), 'hard' (10s)
  },

  // Persistent Mistake Bank in localStorage
  mistakeBankKey: 'gc_mistake_bank',

  init() {
    this.loadSettings();
  },

  loadSettings() {
    try {
      const saved = localStorage.getItem('gc_settings');
      if (saved) {
        this.settings = Object.assign(this.settings, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load GC settings:', e);
    }
  },

  saveSettings() {
    try {
      localStorage.setItem('gc_settings', JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Could not save GC settings:', e);
    }
  },

  // Mistake Bank Operations
  getMistakes() {
    try {
      if (typeof window !== 'undefined' && window.StudentEngine) {
        const active = window.StudentEngine.getActiveStudent();
        if (active && Array.isArray(active.mistakes) && active.mistakes.length > 0) {
          return active.mistakes.map(m => ({
            question: {
              id: m.qId || m.id || ('q_' + Math.random().toString(36).substring(2, 6)),
              text: m.text || m.prompt || '',
              src: m.src || m.image || '',
              image: m.image || m.src || '',
              ans: m.ans || m.correctAns || '',
              prompt: m.prompt || 'What is the Tajweed rule in this example?',
              categoryId: m.categoryId || 'qalqalah',
              categoryName: m.rule || m.categoryId || 'Tajweed',
              explanation: m.explanation || ''
            },
            userChoice: m.userAns || ''
          }));
        }
      }
      const data = localStorage.getItem(this.mistakeBankKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  recordMistake(question, userChoice) {
    try {
      const list = this.getMistakes();
      const existsIndex = list.findIndex(item => 
        (item.question.image && item.question.image === question.image) ||
        (item.question.text && item.question.text === question.text)
      );
      const entry = {
        question: question,
        userChoice: userChoice,
        timestamp: Date.now()
      };
      if (existsIndex >= 0) {
        list[existsIndex] = entry;
      } else {
        list.push(entry);
      }
      localStorage.setItem(this.mistakeBankKey, JSON.stringify(list));

      // Also record into StudentEngine
      if (typeof window.StudentEngine !== 'undefined') {
        window.StudentEngine.addMistake({
          qId: question.id,
          categoryId: question.categoryId,
          categoryTitle: question.categoryName,
          prompt: question.prompt || question.text,
          src: question.image,
          correctRule: question.ans || question.rule,
          studentRule: userChoice,
          rule: question.ans || question.rule,
          explanation: question.explanation
        });
      }
    } catch (e) {
      console.warn('Error recording mistake:', e);
    }
  },

  removeMistake(index) {
    try {
      const list = this.getMistakes();
      if (index >= 0 && index < list.length) {
        list.splice(index, 1);
        localStorage.setItem(this.mistakeBankKey, JSON.stringify(list));
      }
    } catch (e) {}
  },

  clearMistakes() {
    try {
      localStorage.removeItem(this.mistakeBankKey);
    } catch (e) {}
  },

  // Setup a new game session
  startSession(gameId, mode, config, teamsList) {
    this.activeGameId = gameId;
    this.mode = mode || 'solo';
    this.themeId = config.themeId || 'animals';
    this.isPaused = false;
    config.maxCount = Math.min(Math.max(config.maxCount || 24, 4), 60);

    // Build question pool
    if (config.isMistakePractice) {
      const mistakes = this.getMistakes();
      this.questions = mistakes.map(m => m.question);
      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
      }
    } else {
      this.questions = window.GC_DATA.buildQuestionPool(config);
    }

    // Safety fallback: if pool is empty, build default pool
    if (!this.questions || this.questions.length === 0) {
      console.warn('[GC_STATE] Question pool was empty, using default pool fallback.');
      this.questions = window.GC_DATA.buildQuestionPool({ maxCount: config.maxCount || 24 });
    }

    this.currentIndex = 0;

    // Default Team Colors: Team 1 (Blue/Cyan), Team 2 (Red/Rose), Team 3 (Amber), Team 4 (Emerald)
    const teamColors = ['#2563eb', '#dc2626', '#d97706', '#059669'];
    const defaultTeamNames = ['Team Falcons', 'Team Lions', 'Team Eagles', 'Team Tigers'];

    const activeStudent = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;
    const defaultStudentName = activeStudent ? activeStudent.name : 'Student Champion';
    const defaultStudentAvatar = activeStudent ? activeStudent.avatar : (window.GC_THEMES[this.themeId]?.elements[0] || '🦁');
    const defaultStudentColor = activeStudent ? activeStudent.color : '#2563eb';

    if (this.mode === 'solo') {
      this.teams = [
        {
          id: 1,
          name: defaultStudentName,
          avatar: defaultStudentAvatar,
          color: defaultStudentColor,
          score: 0,
          correctCount: 0,
          wrongCount: 0,
          streak: 0,
          bestStreak: 0,
          shield: 0,
          powerups: { hint: 1, '50_50': 1, freeze: 1 }
        }
      ];
    } else if (this.mode === 'teacher') {
      const studentName = (teamsList && teamsList[0]?.name) || defaultStudentName;
      const studentAvatar = (teamsList && teamsList[0]?.avatar) || defaultStudentAvatar;
      const teacherName = (teamsList && teamsList[1]?.name) || 'Sheikh Gehad (Teacher)';
      const teacherAvatar = (teamsList && teamsList[1]?.avatar) || '🎓';
      this.teams = [
        {
          id: 1,
          name: studentName,
          avatar: studentAvatar,
          color: '#2563eb',
          role: 'student',
          score: 0,
          correctCount: 0,
          wrongCount: 0,
          streak: 0,
          bestStreak: 0,
          shield: 0,
          powerups: { hint: 2, '50_50': 2, freeze: 1 }
        },
        {
          id: 2,
          name: teacherName,
          avatar: teacherAvatar,
          color: '#d97706',
          role: 'teacher',
          score: 0,
          correctCount: 0,
          wrongCount: 0,
          streak: 0,
          bestStreak: 0,
          shield: 0,
          powerups: { hint: 1, '50_50': 1, freeze: 1 }
        }
      ];
    } else {
      const sourceTeams = (teamsList && teamsList.length >= 2) ? teamsList : [
        { name: 'Team Falcons', avatar: '🦅' },
        { name: 'Team Lions', avatar: '🦁' }
      ];

      this.teams = sourceTeams.map((t, idx) => ({
        id: idx + 1,
        name: t.name || defaultTeamNames[idx % defaultTeamNames.length],
        avatar: t.avatar || window.GC_THEMES[this.themeId]?.elements[idx % 6] || (idx === 0 ? '🦅' : '🦁'),
        color: t.color || teamColors[idx % teamColors.length],
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        streak: 0,
        bestStreak: 0,
        shield: 0,
        powerups: { hint: 1, '50_50': 1, freeze: 1 }
      }));
    }

    this.currentTeamIndex = 0;
  },

  getCurrentTeam() {
    return this.teams[this.currentTeamIndex] || this.teams[0];
  },

  getOpponentTeam() {
    if (this.teams.length <= 1) return null;
    const oppIdx = (this.currentTeamIndex + 1) % this.teams.length;
    return this.teams[oppIdx];
  },

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  },

  // Record Answer Outcome
  recordAnswer(isCorrect, userChoice) {
    const currentTeam = this.getCurrentTeam();
    const currentQ = this.getCurrentQuestion();

    if (isCorrect) {
      let earned = (10 + (currentTeam.streak * 2));
      if (currentTeam.doubleBooster) {
        earned *= 2;
        currentTeam.doubleBooster = false;
      }
      currentTeam.score += earned;
      currentTeam.correctCount++;
      currentTeam.streak++;
      if (currentTeam.streak > currentTeam.bestStreak) {
        currentTeam.bestStreak = currentTeam.streak;
      }
      window.GC_AUDIO?.playCorrect();
    } else {
      currentTeam.wrongCount++;
      currentTeam.streak = 0;
      currentTeam.doubleBooster = false;
      if (currentQ) {
        this.recordMistake(currentQ, userChoice);
      }
      window.GC_AUDIO?.playWrong();
    }

    return {
      isCorrect,
      score: currentTeam.score,
      streak: currentTeam.streak,
      team: currentTeam
    };
  },

  // Advance team turn without consuming a question (for surprise cards / powerups)
  nextTeamTurn() {
    if (this.teams.length > 1) {
      this.currentTeamIndex = (this.currentTeamIndex + 1) % this.teams.length;
    }
  },

  // Advance question progress and switch team turn (called when a question is completed)
  nextQuestion() {
    this.currentIndex++;
    this.nextTeamTurn();
  },

  nextTurn() {
    this.nextQuestion();
  },

  isGameOver() {
    return this.currentIndex >= this.questions.length;
  },

  // Special Card: Steal Points from Opponent
  applyStealPoints(amount = 15) {
    const currentTeam = this.getCurrentTeam();
    if (this.teams.length <= 1) {
      currentTeam.score += amount;
      window.GC_AUDIO?.playCoins();
      return { success: true, stolen: amount, blockedByShield: false, solo: true };
    }
    const opponent = this.getOpponentTeam();

    if (opponent.shield > 0) {
      opponent.shield--;
      window.GC_AUDIO?.playWrong();
      return { success: false, stolen: 0, blockedByShield: true, opponentName: opponent.name };
    }

    const stolen = Math.min(opponent.score, amount) || amount;
    opponent.score = Math.max(0, opponent.score - (Math.min(opponent.score, amount)));
    currentTeam.score += stolen;
    window.GC_AUDIO?.playCoins();
    return { success: true, stolen: stolen, blockedByShield: false, opponentName: opponent.name };
  },

  // Special Card: Swap Scores between Teams
  applySwapPoints() {
    const currentTeam = this.getCurrentTeam();
    if (this.teams.length <= 1) {
      currentTeam.score += 20;
      window.GC_AUDIO?.playFanfare();
      return { success: true, solo: true, bonus: 20 };
    }
    const opponent = this.getOpponentTeam();

    const temp = currentTeam.score;
    currentTeam.score = opponent.score;
    opponent.score = temp;
    window.GC_AUDIO?.playFanfare();
    return { success: true, newScore: currentTeam.score, opponentName: opponent.name, opponentNewScore: opponent.score };
  },

  // Special Card: Direct Mega Bonus
  applyBonusPoints(amount = 25) {
    const currentTeam = this.getCurrentTeam();
    currentTeam.score += amount;
    window.GC_AUDIO?.playFanfare();
    window.GC_AUDIO?.playCoins();
    return { success: true, bonus: amount, newScore: currentTeam.score };
  },

  // Special Card: Defensive Shield
  applyShield() {
    const currentTeam = this.getCurrentTeam();
    currentTeam.shield = (currentTeam.shield || 0) + 1;
    window.GC_AUDIO?.playPowerup();
    return { success: true, currentShields: currentTeam.shield };
  },

  // Special Card: Lose Points (Trap Card)
  applyLosePoints(amount = 15) {
    const currentTeam = this.getCurrentTeam();
    if (currentTeam.shield > 0) {
      currentTeam.shield--;
      window.GC_AUDIO?.playPowerup();
      return { success: false, blockedByShield: true, lost: 0, newScore: currentTeam.score };
    }
    const lost = Math.min(currentTeam.score, amount);
    currentTeam.score = Math.max(0, currentTeam.score - amount);
    window.GC_AUDIO?.playWrong();
    return { success: true, blockedByShield: false, lost: lost, newScore: currentTeam.score };
  },

  // Special Card: 2x Double Points Booster
  applyDoubleBooster() {
    const currentTeam = this.getCurrentTeam();
    currentTeam.doubleBooster = true;
    window.GC_AUDIO?.playPowerup();
    return { success: true, active: true };
  },

  // Use a power-up
  usePowerUp(type) {
    const team = this.getCurrentTeam();
    if (!this.settings.powerupsEnabled) return false;
    if (team.powerups && team.powerups[type] > 0) {
      team.powerups[type]--;
      window.GC_AUDIO?.playPowerup();
      return true;
    }
    return false;
  }
};

window.GC_STATE.init();
