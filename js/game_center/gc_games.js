// Game Center Engines (Curated 7 High-Impact Games with Wordwall Classics)
window.GC_GAMES = {
  // Registry of 7 Curated Games
  list: [
    {
      id: 'cards',
      title: 'Cards Battle',
      
      icon: '🎴',
      desc: 'Team card battle with Tajweed questions, point steals, score swaps & mega bonuses!',
      
      accent: '#8b5cf6'
    },
    {
      id: 'wheel',
      title: 'Spin the Wheel',
      
      icon: '🎡',
      desc: 'Iconic Wordwall wheel! Spin with realistic physics to land on challenges & bonuses!',
      
      accent: '#f59e0b'
    },
    {
      id: 'box',
      title: 'Open the Box',
      
      icon: '📦',
      desc: 'Wordwall 3D mystery boxes! Click to unlock secret Tajweed questions & treasures!',
      
      accent: '#06b6d4'
    },
    {
      id: 'soccer',
      title: 'Penalty Shootout',
      
      icon: '⚽',
      desc: 'Aim with your mouse, pick your corner, and score thrilling penalty kicks!',
      
      accent: '#10b981'
    },
    {
      id: 'basketball',
      title: 'Hoops Shootout',
      
      icon: '🏀',
      desc: 'Take aim with your mouse and sink perfect swish shots into the hoop!',
      
      accent: '#f97316'
    },
    {
      id: 'balloon',
      title: 'Balloon Pop Party',
      
      icon: '🎈',
      desc: 'Pop floating balloons with your mouse to reveal stars, coins & confetti!',
      
      accent: '#ec4899'
    },
    {
      id: 'bowling',
      title: 'Strike Bowling',
      
      icon: '🎳',
      desc: 'Choose your lane angle and roll for an epic 10-pin STRIKE!',
      
      accent: '#3b82f6'
    }
  ],

  getGameInfo(id) {
    return this.list.find(g => g.id === id) || this.list[0];
  },

  // Active game instance
  currentEngine: null,

  // Launch a game
  start(gameId, containerEl) {
    this.cleanup();
    const game = this.getGameInfo(gameId);
    containerEl.innerHTML = '';

    switch (gameId) {
      case 'cards':
        this.currentEngine = new CardsEngine(containerEl);
        break;
      case 'wheel':
        this.currentEngine = new WheelEngine(containerEl);
        break;
      case 'box':
        this.currentEngine = new BoxesEngine(containerEl);
        break;
      case 'soccer':
        this.currentEngine = new SoccerEngine(containerEl);
        break;
      case 'basketball':
        this.currentEngine = new BasketballEngine(containerEl);
        break;
      case 'bowling':
        this.currentEngine = new BowlingEngine(containerEl);
        break;
      case 'balloon':
        this.currentEngine = new BalloonEngine(containerEl);
        break;
      default:
        this.currentEngine = new CardsEngine(containerEl);
    }

    this.currentEngine.init();
  },

  cleanup() {
    if (this.currentEngine && typeof this.currentEngine.destroy === 'function') {
      this.currentEngine.destroy();
    }
    this.currentEngine = null;
    const modal = document.getElementById('gc-question-modal');
    if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
    const eventModal = document.getElementById('gc-event-modal');
    if (eventModal && eventModal.parentNode) eventModal.parentNode.removeChild(eventModal);
  }
};

/* =========================================================================
   Base Game Engine (Wide Full-Stage Presentation Matching System 1)
========================================================================= */
class BaseGameEngine {
  constructor(container) {
    this.container = container;
    this.timerId = null;
    this.timeLeft = 15;
    this.isProcessing = false;
  }

  init() {
    this.renderStage();
  }

  destroy() {
    if (this.timerId) clearInterval(this.timerId);
  }

  // Wide Full-Stage Question Presentation (Matching System 1 #screen-game)
  showQuestionModal(onAnswerResolved, specificQuestion = null) {
    const q = specificQuestion || window.GC_STATE.getCurrentQuestion();
    if (!q) {
      window.GC_UI.showVictoryScreen();
      return;
    }

    const currentTeam = window.GC_STATE.getCurrentTeam();
    const settings = window.GC_STATE.settings;

    // Prepare choices
    let choices = q.choicesList;
    if (!choices || choices.length === 0) {
      const bank = (typeof TAJWEED_BANK !== 'undefined' ? TAJWEED_BANK : (window.TAJWEED_BANK || {}));
      const catObj = bank[q.categoryId];
      let poolChoices = catObj?.choices ? [...catObj.choices] : [q.ans];
      if (q.categoryId === 'tafkheem_tarqeeq') {
        if (q.subcat === 'Light Ra' || q.subcat === 'Heavy Ra') poolChoices = ["Heavy Raa", "Light Raa"];
        else if (q.subcat === 'Always Heavy') poolChoices = ["Heavy Letter", "Light Letter"];
        else if (q.subcat === 'Lam of Allah') poolChoices = ["Heavy Laam", "Light Laam"];
        else if (q.subcat === 'Alif') poolChoices = ["Heavy Alif", "Light Alif"];
      }
      let wrong = poolChoices.filter(c => c !== q.ans);
      for (let i = wrong.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
      }
      choices = [q.ans, ...wrong.slice(0, 3)];
    }
    // Shuffle choices
    choices = [...new Set(choices)];
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    // Modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'gc-fullscreen-quiz-overlay animate-pop';
    overlay.id = 'gc-question-modal';

    const card = document.createElement('div');
    card.className = 'gc-fullscreen-quiz-stage';

    // Top Bar: Turn info, Question progress, Timer & Audio
    const topBar = document.createElement('div');
    topBar.className = 'gc-quiz-top-bar';
    topBar.innerHTML = `
      <div class="gc-q-team-badge" style="background: ${currentTeam.color}">
        <span>${currentTeam.avatar}</span>
        <span>${currentTeam.name}'s Turn</span>
      </div>
      <div class="gc-q-center-meta">
        <span class="gc-q-category-tag">${q.categoryName || 'Tajweed Rule'}</span>
        <span class="gc-q-progress">Question ${window.GC_STATE.currentIndex + 1} of ${window.GC_STATE.questions.length}</span>
      </div>
      <div class="gc-q-top-right">
        ${settings.timerEnabled ? `<div class="gc-q-timer" id="gc-modal-timer">⏱️ ${settings.timerSeconds}s</div>` : ''}
        <button type="button" class="gc-q-recitation-toggle ${settings.soundRecitation ? 'gc-rec-on' : 'gc-rec-off'}" id="gc-btn-recitation-toggle" title="Toggle Quran Recitation">
          ${settings.soundRecitation ? '🔊 Recitation: ON' : '🔇 Recitation: OFF'}
        </button>
        <button type="button" class="gc-q-ctrl-btn gc-q-pause-btn" id="gc-modal-pause-btn" title="Pause Game">⏸️ PAUSE</button>
        <button type="button" class="gc-q-ctrl-btn gc-q-exit-btn" id="gc-modal-exit-btn" title="End Game">🛑 END</button>
      </div>
    `;
    card.appendChild(topBar);

    // Recitation toggle button listener (mute / enable recitation anytime)
    const recToggleBtn = topBar.querySelector('#gc-btn-recitation-toggle');
    if (recToggleBtn) {
      recToggleBtn.onclick = () => {
        const currentEnabled = !!window.GC_STATE.settings.soundRecitation;
        const newEnabled = !currentEnabled;
        window.GC_STATE.settings.soundRecitation = newEnabled;
        window.GC_STATE.saveSettings();

        if (newEnabled) {
          recToggleBtn.className = 'gc-q-recitation-toggle gc-rec-on';
          recToggleBtn.textContent = '🔊 Recitation: ON';
          if (resolved && q.src) {
            window.GC_AUDIO?.playRecitation(q.src);
          }
        } else {
          recToggleBtn.className = 'gc-q-recitation-toggle gc-rec-off';
          recToggleBtn.textContent = '🔇 Recitation: OFF';
          window.GC_AUDIO?.stopRecitation();
        }
      };
    }

    topBar.querySelector('#gc-modal-pause-btn').onclick = () => {
      window.GC_AUDIO?.playClick();
      window.GC_UI.openPauseModal();
    };

    topBar.querySelector('#gc-modal-exit-btn').onclick = () => {
      window.GC_AUDIO?.playClick();
      window.GC_UI.openEndConfirmModal();
    };

    this.activeCallback = onAnswerResolved;

    // Main Quran Card Box (High Contrast White Card Container)
    const quranBox = document.createElement('div');
    quranBox.className = 'gc-quiz-quran-box';
    quranBox.innerHTML = `
      <div class="gc-quiz-card-container">
        <h2 class="gc-quiz-rule-prompt">${q.prompt || 'What is the Tajweed rule in this example?'}</h2>
        <div class="gc-quiz-ayah-display">
          ${q.src ? `<img src="${q.src}" alt="Quran Ayah" class="gc-quiz-ayah-img" onerror="this.onerror=null; this.src='https://placehold.co/800x200/f8fafc/334155?text=${encodeURIComponent(q.ans || 'Quran Ayah')}';" />` : `<div class="gc-quiz-arabic-text">${q.text || '📖'}</div>`}
        </div>
        <div class="gc-quiz-explanation" id="gc-q-exp" style="display:none;"></div>
      </div>
    `;
    card.appendChild(quranBox);

    // Wide Answers Row (matching .answers-row in System 1)
    const choicesBox = document.createElement('div');
    choicesBox.className = 'gc-quiz-answers-row';

    // Dedicated Next Action Button Container (Hidden initially)
    const nextContainer = document.createElement('div');
    nextContainer.className = 'gc-quiz-next-container';
    nextContainer.id = 'gc-next-container';
    nextContainer.style.display = 'none';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gc-quiz-next-btn pulse-glow';
    nextBtn.id = 'gc-btn-next-action';
    nextBtn.innerHTML = '⚡ CONTINUE TO ACTION ⚡';
    nextContainer.appendChild(nextBtn);

    let resolved = false;

    // Choice Buttons (matching System 1 .ans-card)
    choices.forEach(choiceTxt => {
      const btn = document.createElement('button');
      btn.className = 'gc-quiz-ans-btn';
      btn.dataset.ans = choiceTxt;

      const ruleData = (typeof ruleMeanings !== 'undefined' && ruleMeanings[choiceTxt])
        ? ruleMeanings[choiceTxt]
        : { en: choiceTxt, franco: choiceTxt };

      const franco = ruleData.franco || ruleData.en;
      btn.innerHTML = `
        <span class="gc-quiz-ans-en">${ruleData.en}</span>
        <span class="gc-quiz-ans-franco">${franco}</span>
      `;

      btn.onclick = () => {
        if (resolved) return;
        resolved = true;
        if (this.timerId) clearInterval(this.timerId);

        const isCorrect = (choiceTxt === q.ans);
        this.resolveAnswer(isCorrect, choiceTxt, q, choicesBox, quranBox, nextContainer, overlay, onAnswerResolved);
      };

      choicesBox.appendChild(btn);
    });

    card.appendChild(choicesBox);
    card.appendChild(nextContainer);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Ayah recitation is intentionally NOT auto-played when modal opens.
    // It will be recited only AFTER the student submits their answer.

    // Timer logic
    if (settings.timerEnabled) {
      this.timeLeft = settings.timerSeconds;
      const timerEl = document.getElementById('gc-modal-timer');
      if (this.timerId) clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        this.timeLeft--;
        if (timerEl) {
          timerEl.textContent = `⏱️ ${this.timeLeft}s`;
          if (this.timeLeft <= 5) {
            timerEl.classList.add('gc-timer-urgent');
            window.GC_AUDIO?.playTick();
          }
        }
        if (this.timeLeft <= 0) {
          clearInterval(this.timerId);
          if (!resolved) {
            resolved = true;
            this.resolveAnswer(false, null, q, choicesBox, quranBox, nextContainer, overlay, onAnswerResolved);
          }
        }
      }, 1000);
    }
  }

  resolveAnswer(isCorrect, choiceTxt, q, choicesBox, quranBox, nextContainer, overlay, onAnswerResolved) {
    const outcome = window.GC_STATE.recordAnswer(isCorrect, choiceTxt);

    if (isCorrect) {
      window.GC_AUDIO?.playCorrect();
    } else {
      window.GC_AUDIO?.playWrong();
    }

    // Play Quranic recitation ONLY AFTER answer is submitted (if recitation is enabled)
    if (window.GC_STATE.settings.soundRecitation && q && q.src) {
      setTimeout(() => {
        window.GC_AUDIO?.playRecitation(q.src);
      }, 350);
    }

    // Highlight choices
    choicesBox.querySelectorAll('.gc-quiz-ans-btn').forEach(b => {
      b.disabled = true;
      if (b.dataset.ans === q.ans) {
        b.classList.add('correct');
      } else if (b.dataset.ans === choiceTxt) {
        b.classList.add('wrong');
      } else {
        b.style.opacity = '0.35';
      }
    });

    // Show Explanation
    const expBox = quranBox.querySelector('#gc-q-exp');
    if (expBox && window.GC_STATE.settings.showExplanations) {
      const explText = q.explanation || `The correct answer is: ${q.ans}`;
      expBox.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.3rem;">${isCorrect ? '🌟' : '💡'}</span>
          <span><strong>${isCorrect ? '🌟 Excellent! Correct Tajweed Rule! ' : '💡 Incorrect. Correct Rule: '}${explText}</strong></span>
        </div>
      `;
      expBox.style.display = 'block';
    }

    // Reveal Next Action Button directly underneath
    nextContainer.style.display = 'block';
    nextContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const nextBtn = nextContainer.querySelector('#gc-btn-next-action');
    nextBtn.onclick = () => {
      window.GC_AUDIO?.stopRecitation();
      window.GC_AUDIO?.playClick();
      overlay.classList.add('animate-fade-out');
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (onAnswerResolved) {
          onAnswerResolved(isCorrect, outcome);
        }
      }, 200);
    };
  }

  // Common Surprise Card Handler (used by Cards, Wheel, and Boxes)
  handleSurpriseCard(type, onDone) {
    let title = '';
    let msg = '';
    let icon = '';

    let extraData = {};

    if (type === 'steal') {
      const res = window.GC_STATE.applyStealPoints(15);
      icon = '🦹';
      if (res.blockedByShield) {
        title = '🛡️ Blocked by Shield!'; msg = 'Team ' + res.opponentName + ' had an active shield! The steal was blocked!';
      } else if (res.solo) {
        title = '💰 Treasure Bonus!'; msg = 'You received +15 bonus points!';
        if (typeof confetti === 'function') confetti({ particleCount: 40 });
      } else {
        title = '🦹 Points Stolen!'; msg = 'Successfully stole ' + res.stolen + ' points from Team ' + res.opponentName + '!';
        if (typeof confetti === 'function') confetti({ particleCount: 60 });
      }
    } else if (type === 'swap') {
      const res = window.GC_STATE.applySwapPoints();
      icon = '🔄';
      if (res.solo) {
        title = '🎁 Lucky Bonus!'; msg = 'You received +20 bonus points!';
      } else {
        title = '🔄 Scores Swapped!'; msg = 'Turnaround! Total points swapped with Team ' + res.opponentName + '!';
        if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 90 });
      }
    } else if (type === 'bonus') {
      window.GC_STATE.applyBonusPoints(25);
      icon = '🎁';
      title = '🎁 Golden Mega Bonus!'; msg = 'Congratulations! Your team gained +25 bonus points!';
      if (typeof confetti === 'function') confetti({ particleCount: 70 });
    } else if (type === 'shield') {
      window.GC_STATE.applyShield();
      icon = '🛡️';
      title = '🛡️ Shield Activated!'; msg = 'Your team is protected against the next steal or trap penalty!';
    } else if (type === 'lose_points') {
      const res = window.GC_STATE.applyLosePoints(15);
      icon = '💥';
      if (res.blockedByShield) {
        title = '🛡️ Shield Absorbed Trap!';
        msg = 'Your team tripped a penalty trap, but your active shield absorbed the hit! No points lost!';
      } else {
        title = '💥 TRAP CARD! (-15 Points)';
        msg = `Unlucky trap! Your team lost ${res.lost} points! Stay sharp!`;
      }
    } else if (type === 'extra_turn') {
      icon = '⚡';
      title = '⚡ EXTRA TURN ADVANTAGE!';
      msg = 'Double momentum! Your team earned an immediate bonus turn! Pick and open another card right now!';
      extraData.keepTurn = true;
      if (typeof confetti === 'function') confetti({ particleCount: 50 });
    } else if (type === 'dud') {
      icon = '🃏';
      title = '🃏 UNLUCKY DUD CARD!';
      msg = 'Hard luck! This card gave 0 points and your turn ends! Better luck next round!';
      window.GC_AUDIO?.playWrong();
    } else if (type === 'double_points') {
      window.GC_STATE.applyDoubleBooster();
      icon = '🔥';
      title = '🔥 2X DOUBLE POINTS BOOSTER!';
      msg = 'Power Up! Your team activated 2X Double Points for your next correct Tajweed answer!';
      if (typeof confetti === 'function') confetti({ particleCount: 60 });
    } else if (type === 'teacher_dare') {
      icon = '👨‍🏫';
      title = '👨‍🏫 DARE THE TEACHER! (تحدي على الشيخ)';
      msg = 'Student Power! Challenge Sheikh Gehad to demonstrate the Tajweed rule or give you a 30-second applause!';
    } else if (type === 'recite_dare') {
      icon = '🎤';
      title = '🎤 RECITE FOR THE TEACHER! (تحدي التلاوة)';
      msg = 'Teacher Challenge! Sheikh Gehad challenges you to recite an Ayah with proper Tajweed!';
    }

    // Modal with Support for Interactive Teacher Dares
    const eventModal = document.createElement('div');
    eventModal.className = 'gc-pause-overlay animate-pop';
    eventModal.id = 'gc-event-modal';

    let actionButtonsHtml = '<button class="gc-event-btn pulse-glow" id="gc-event-ok-btn">⚡ CONTINUE PLAYING ⚡</button>';

    if (type === 'teacher_dare') {
      actionButtonsHtml = `
        <div class="gc-dare-btn-grid">
          <button class="gc-dare-btn gc-dare-btn-pass" id="btn-dare-done">🎉 Teacher Fulfilled Dare (+20 Pts)</button>
          <button class="gc-dare-btn gc-dare-btn-bonus" id="btn-dare-bonus">🤝 Teacher Gave Bonus (+15 Pts)</button>
        </div>
      `;
    } else if (type === 'recite_dare') {
      actionButtonsHtml = `
        <div class="gc-dare-btn-grid">
          <button class="gc-dare-btn gc-dare-btn-pass" id="btn-recite-pass">🌟 Recited Perfectly (+20 Pts)</button>
          <button class="gc-dare-btn gc-dare-btn-bonus" id="btn-recite-try">👍 Good Attempt (+10 Pts)</button>
        </div>
      `;
    }

    eventModal.innerHTML = `
      <div class="gc-event-card gc-teacher-dare-dialog animate-pop">
        <div class="gc-event-icon">${icon}</div>
        <h2 class="gc-event-title">${title}</h2>
        <p class="gc-event-msg">${msg}</p>
        ${actionButtonsHtml}
      </div>
    `;
    document.body.appendChild(eventModal);

    const closeModal = (ptsToAdd = 0) => {
      if (ptsToAdd > 0) {
        const student = window.GC_STATE.teams[0];
        if (student) student.score += ptsToAdd;
        window.GC_AUDIO?.playCoins();
        window.GC_UI?.updateScoreboard();
        if (typeof confetti === 'function') confetti({ particleCount: 50 });
      }
      eventModal.remove();
      onDone(extraData);
    };

    if (type === 'teacher_dare') {
      eventModal.querySelector('#btn-dare-done').onclick = () => closeModal(20);
      eventModal.querySelector('#btn-dare-bonus').onclick = () => closeModal(15);
    } else if (type === 'recite_dare') {
      eventModal.querySelector('#btn-recite-pass').onclick = () => closeModal(20);
      eventModal.querySelector('#btn-recite-try').onclick = () => closeModal(10);
    } else {
      eventModal.querySelector('#gc-event-ok-btn').onclick = () => closeModal(0);
    }
  }
}

/* =========================================================================
   1. Cards Battle Engine
========================================================================= */
class CardsEngine extends BaseGameEngine {
  constructor(container) {
    super(container);
    this.batchIndex = 0;
    this.batchSize = 24;
    this.deckData = [];
  }

  renderStage() {
    this.container.innerHTML = `
      <div class="gc-arena-cards">
        <div class="gc-cards-grid" id="gc-cards-deck"></div>
      </div>
    `;
    this.batchIndex = 0;
    this.prepareDeck();
    this.renderCurrentBatch();
  }

  prepareDeck() {
    const totalQ = window.GC_STATE.questions.length || 24;
    const isTeacherMode = window.GC_STATE.mode === 'teacher';
    const specialTypes = isTeacherMode 
      ? ['steal', 'bonus', 'swap', 'shield', 'lose_points', 'extra_turn', 'dud', 'double_points', 'teacher_dare', 'recite_dare']
      : ['steal', 'bonus', 'swap', 'shield', 'lose_points', 'extra_turn', 'dud', 'double_points'];

    this.deckData = [];
    const specialCount = Math.min(specialTypes.length, Math.max(4, Math.floor(totalQ * 0.35)));

    for (let s = 0; s < specialCount; s++) {
      this.deckData.push({ type: specialTypes[s % specialTypes.length], id: 'special_' + s });
    }
    while (this.deckData.length < totalQ) {
      this.deckData.push({ type: 'question', id: 'q_' + this.deckData.length });
    }
    for (let i = this.deckData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deckData[i], this.deckData[j]] = [this.deckData[j], this.deckData[i]];
    }
  }

  renderCurrentBatch() {
    const deckEl = this.container.querySelector('#gc-cards-deck');
    if (!deckEl) return;
    deckEl.innerHTML = '';

    const start = this.batchIndex * this.batchSize;
    const currentBatch = this.deckData.slice(start, start + this.batchSize);

    deckEl.dataset.count = currentBatch.length <= 12 ? '12' : '24';
    const colorClasses = ['bbz-color-blue', 'bbz-color-green', 'bbz-color-red', 'bbz-color-pink'];

    currentBatch.forEach((cardData, idx) => {
      const globalIdx = start + idx;
      const cardEl = document.createElement('div');
      const colorClass = colorClasses[idx % colorClasses.length];
      cardEl.className = 'gc-card-item gc-battle-card ' + colorClass;
      cardEl.dataset.index = globalIdx;

      cardEl.innerHTML = `
        <div class="gc-card-inner">
          <div class="gc-card-front">
            <div class="gc-bbz-num">#${idx + 1}</div>
          </div>
          <div class="gc-card-back">
            <div class="gc-card-revealed-icon">🌟</div>
            <div class="gc-card-score">...</div>
          </div>
        </div>
      `;

      cardEl.onclick = () => {
        if (cardEl.classList.contains('gc-card-flipped') || this.isProcessing) return;
        this.isProcessing = true;
        window.GC_AUDIO?.playCardFlip();
        cardEl.classList.add('gc-card-flipped');

        const revealedIcon = cardEl.querySelector('.gc-card-revealed-icon');
        const cardScore = cardEl.querySelector('.gc-card-score');

        if (cardData.type !== 'question') {
          setTimeout(() => {
            const sType = cardData.type;
            const icons = {
              steal: '🦹',
              swap: '🔄',
              bonus: '🎁',
              shield: '🛡️',
              lose_points: '💥',
              extra_turn: '⚡',
              dud: '🃏',
              double_points: '🔥',
              teacher_dare: '👨‍🏫',
              recite_dare: '🎤'
            };
            const shortLabels = {
              steal: 'STEAL',
              swap: 'SWAP',
              bonus: '+BONUS',
              shield: 'SHIELD',
              lose_points: '-15 PTS',
              extra_turn: '+1 TURN',
              dud: '0 PTS',
              double_points: '2X BOOST',
              teacher_dare: 'DARE',
              recite_dare: 'RECITE'
            };
            revealedIcon.textContent = icons[sType] || '🌟';
            cardScore.textContent = shortLabels[sType] || 'SPECIAL';
            cardEl.classList.add('gc-card-special');

            this.handleSurpriseCard(sType, (res) => {
              this.isProcessing = false;
              window.GC_UI.updateScoreboard();
              if (res && res.keepTurn) {
                // Same team keeps turn advantage!
                window.GC_AUDIO?.playFanfare();
              } else {
                window.GC_STATE.nextTeamTurn();
              }
              window.GC_UI.updateTurnBanner();
              this.checkBatchProgression();
            });
          }, 350);
        } else {
          setTimeout(() => {
            this.showQuestionModal((isCorrect, outcome) => {
              this.isProcessing = false;
              window.GC_UI.updateScoreboard();
              if (isCorrect) {
                revealedIcon.textContent = '🏆';
                cardScore.textContent = `+${10 + (outcome.streak * 2)} Pts`;
                cardEl.classList.add('gc-card-success');
                if (typeof confetti === 'function') confetti({ particleCount: 40, spread: 70, origin: { y: 0.7 } });
              } else {
                revealedIcon.textContent = '❌';
                cardScore.textContent = '0 Pts';
                cardEl.classList.add('gc-card-fail');
              }
              window.GC_STATE.nextQuestion();
              window.GC_UI.updateTurnBanner();
              this.checkBatchProgression();
            });
          }, 350);
        }
      };

      deckEl.appendChild(cardEl);
    });
  }

  checkBatchProgression() {
    const deckEl = this.container.querySelector('#gc-cards-deck');
    const remaining = deckEl ? deckEl.querySelectorAll('.gc-card-item:not(.gc-card-flipped)') : [];

    if (remaining.length === 0) {
      const nextBatchStart = (this.batchIndex + 1) * this.batchSize;
      if (nextBatchStart < this.deckData.length && !window.GC_STATE.isGameOver()) {
        window.GC_AUDIO?.playFanfare();
        if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 100 });
        
        const banner = document.createElement('div');
        banner.className = 'gc-balloon-praise-card animate-pop';
        banner.innerHTML = `
          <div class="gc-praise-title">🎉 ROUND COMPLETE!</div>
          <div class="gc-praise-en">Great job! Loading next set of challenges... ⚡</div>
        `;
        this.container.appendChild(banner);

        setTimeout(() => {
          banner.remove();
          this.batchIndex++;
          this.renderCurrentBatch();
        }, 1600);
      } else {
        setTimeout(() => window.GC_UI.showVictoryScreen(), 800);
      }
    }
  }
}

/* =========================================================================
   2. WORDWALL GAME: Spin the Wheel
========================================================================= */
class WheelEngine extends BaseGameEngine {
  constructor(container) {
    super(container);
    this.currentAngle = 0;
    this.isSpinning = false;
    this.segments = [];
  }

  renderStage() {
    this.container.innerHTML = `
      <div class="gc-arena-wheel">
        <div class="gc-wheel-stage">
          <div class="gc-wheel-pointer"></div>
          <canvas id="gc-wheel-canvas" class="gc-wheel-canvas" width="900" height="900"></canvas>
          <div class="gc-wheel-center-hub" id="gc-wheel-hub">
            <span>SPIN!</span>
          </div>
        </div>

        <button class="gc-wheel-spin-btn pulse-glow" id="gc-btn-spin-wheel">
          🎡 SPIN THE WHEEL!
        </button>
      </div>
    `;

    // Populate segments from all chosen questions
    const questions = window.GC_STATE.questions || [];
    const palette = ['#1d9bf0', '#10b981', '#f43f5e', '#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4', '#eab308', '#059669', '#3b82f6'];
    this.segments = questions.map((q, idx) => ({
      question: q,
      originalIdx: idx + 1,
      label: q.categoryName || q.ans || `Q #${idx + 1}`,
      color: palette[idx % palette.length]
    }));

    if (this.segments.length === 0) {
      window.GC_UI.showVictoryScreen();
      return;
    }

    this.drawWheel();

    const spinBtn = this.container.querySelector('#gc-btn-spin-wheel');
    const hub = this.container.querySelector('#gc-wheel-hub');
    const canvas = this.container.querySelector('#gc-wheel-canvas');

    const triggerSpin = () => {
      if (this.isSpinning || this.isProcessing) return;
      this.spinWheel();
    };

    spinBtn.onclick = triggerSpin;
    hub.onclick = triggerSpin;
    canvas.onclick = triggerSpin;
  }

  drawWheel() {
    const canvas = this.container.querySelector('#gc-wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = cx - 18;
    const numSegs = this.segments.length;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (numSegs === 0) return;

    const arc = (2 * Math.PI) / numSegs;
    const fontSize = Math.min(28, Math.max(13, Math.floor(360 / numSegs)));

    this.segments.forEach((seg, i) => {
      const angle = this.currentAngle + i * arc;

      // Draw segment wedge
      ctx.beginPath();
      ctx.fillStyle = seg.color;
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + arc);
      ctx.lineTo(cx, cy);
      ctx.fill();

      // Border line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = numSegs > 20 ? 3 : 5;
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${fontSize}px Nunito, 'Segoe UI', sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      
      const text = `#${seg.originalIdx}: ${seg.label}`;
      const maxLen = numSegs > 18 ? 14 : 22;
      const displayTxt = text.length > maxLen ? text.substring(0, maxLen) + '…' : text;
      ctx.fillText(displayTxt, radius - 26, fontSize / 3);
      ctx.restore();
    });
  }

  spinWheel() {
    if (this.segments.length === 0) {
      window.GC_UI.showVictoryScreen();
      return;
    }
    this.isSpinning = true;
    const spinBtn = this.container.querySelector('#gc-btn-spin-wheel');
    if (spinBtn) spinBtn.disabled = true;

    // Determine target segment
    const numSegs = this.segments.length;
    const arc = (2 * Math.PI) / numSegs;
    const targetSegIdx = Math.floor(Math.random() * numSegs);

    // Pointer is at TOP (12 o'clock = -PI/2).
    const targetAngle = -Math.PI / 2 - (targetSegIdx * arc + arc / 2);
    const spins = 5 + Math.floor(Math.random() * 3);
    const totalRotation = spins * 2 * Math.PI + (targetAngle - (this.currentAngle % (2 * Math.PI)));

    const startAngle = this.currentAngle;
    const duration = 3600; // 3.6s
    const startTime = performance.now();
    let lastTickAngle = startAngle;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      this.currentAngle = startAngle + totalRotation * ease;
      this.drawWheel();

      if (Math.abs(this.currentAngle - lastTickAngle) >= arc / 2) {
        window.GC_AUDIO?.playTick();
        lastTickAngle = this.currentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        if (spinBtn) spinBtn.disabled = false;
        const chosenSeg = this.segments[targetSegIdx];

        setTimeout(() => {
          this.showQuestionModal((isCorrect, outcome) => {
            // ELIMINATE the answered question from the wheel!
            this.segments.splice(targetSegIdx, 1);

            window.GC_UI.updateScoreboard();
            window.GC_STATE.nextTurn();
            window.GC_UI.updateTurnBanner();

            if (this.segments.length === 0 || window.GC_STATE.isGameOver()) {
              setTimeout(() => window.GC_UI.showVictoryScreen(), 600);
            } else {
              this.drawWheel();
            }
          }, chosenSeg.question);
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }
}

/* =========================================================================
   3. WORDWALL GAME: Open the Box
========================================================================= */
class BoxesEngine extends BaseGameEngine {
  constructor(container) {
    super(container);
    this.batchIndex = 0;
    this.batchSize = 24;
    this.boxesData = [];
  }

  renderStage() {
    this.container.innerHTML = `
      <div class="gc-arena-boxes">
        <div class="gc-boxes-grid" id="gc-boxes-grid"></div>
      </div>
    `;
    this.batchIndex = 0;
    this.prepareBoxes();
    this.renderCurrentBatch();
  }

  prepareBoxes() {
    const totalBoxes = window.GC_STATE.questions.length || 24;
    this.boxesData = [];
    for (let i = 0; i < totalBoxes; i++) {
      this.boxesData.push({ type: 'question', id: 'q_' + i });
    }
  }

  renderCurrentBatch() {
    const grid = this.container.querySelector('#gc-boxes-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const start = this.batchIndex * this.batchSize;
    const currentBatch = this.boxesData.slice(start, start + this.batchSize);

    grid.dataset.count = currentBatch.length <= 12 ? '12' : '24';
    const colorClasses = ['bbz-color-blue', 'bbz-color-green', 'bbz-color-red', 'bbz-color-pink'];

    currentBatch.forEach((boxItem, idx) => {
      const globalIdx = start + idx;
      const boxEl = document.createElement('div');
      const colorClass = colorClasses[idx % colorClasses.length];
      boxEl.className = 'gc-wordwall-box ' + colorClass;
      boxEl.dataset.index = globalIdx;

      boxEl.innerHTML = `
        <div class="gc-box-top-lid" style="display:none;">🔒</div>
        <div class="gc-box-number gc-bbz-num">#${idx + 1}</div>
        <div class="gc-box-inside-reveal" style="display:none;">
          <span style="font-size:2rem;">❓</span>
        </div>
      `;

      boxEl.onclick = () => {
        if (boxEl.classList.contains('opened') || this.isProcessing) return;
        this.isProcessing = true;
        window.GC_AUDIO?.playChestOpen();
        boxEl.classList.add('opened');

        const insideReveal = boxEl.querySelector('.gc-box-inside-reveal');
        const boxNum = boxEl.querySelector('.gc-box-number');
        if (boxNum) boxNum.style.display = 'none';
        if (insideReveal) {
          insideReveal.style.display = 'flex';
          insideReveal.innerHTML = '<span style="font-size:2rem;">📖</span>';
        }

        setTimeout(() => {
          this.showQuestionModal((isCorrect, outcome) => {
            this.isProcessing = false;
            window.GC_UI.updateScoreboard();
            if (isCorrect) {
              insideReveal.innerHTML = '<span style="font-size:2.2rem;">🏆</span><span style="font-size:0.85rem; color:#86efac; font-weight:800;">+10</span>';
              boxEl.classList.add('box-correct');
              if (typeof confetti === 'function') confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
            } else {
              insideReveal.innerHTML = '<span style="font-size:2.2rem;">❌</span><span style="font-size:0.85rem; color:#fca5a5; font-weight:800;">0 Pts</span>';
              boxEl.classList.add('box-wrong');
            }
            window.GC_STATE.nextQuestion();
            window.GC_UI.updateTurnBanner();
            this.checkBatchProgression();
          });
        }, 350);
      };

      grid.appendChild(boxEl);
    });
  }

  checkBatchProgression() {
    const grid = this.container.querySelector('#gc-boxes-grid');
    const remaining = grid ? grid.querySelectorAll('.gc-wordwall-box:not(.opened)') : [];

    if (remaining.length === 0) {
      const nextBatchStart = (this.batchIndex + 1) * this.batchSize;
      if (nextBatchStart < this.boxesData.length && !window.GC_STATE.isGameOver()) {
        window.GC_AUDIO?.playFanfare();
        if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 100 });

        const banner = document.createElement('div');
        banner.className = 'gc-balloon-praise-card animate-pop';
        banner.innerHTML = `
          <div class="gc-praise-title">🎉 ROUND COMPLETE!</div>
          <div class="gc-praise-en">Great job! Loading next set of boxes... ⚡</div>
        `;
        this.container.appendChild(banner);

        setTimeout(() => {
          banner.remove();
          this.batchIndex++;
          this.renderCurrentBatch();
        }, 1600);
      } else {
        setTimeout(() => window.GC_UI.showVictoryScreen(), 800);
      }
    }
  }
}

/* =========================================================================
   4. Interactive Penalty Shootout (SoccerEngine)
========================================================================= */
class SoccerEngine extends BaseGameEngine {
  renderStage() {
    this.container.innerHTML = `
      <div class="gc-arena-soccer">
        <div class="gc-goal-post" id="gc-soccer-goal">
          <div class="gc-goal-crossbar"></div>
          <div class="gc-goalie" id="gc-soccer-goalie">🧤</div>
          <div class="gc-goal-net"></div>

          <!-- 4 Interactive Shooting Targets -->
          <div class="gc-soccer-targets-overlay" id="gc-soccer-targets" style="display:none;">
            <div class="gc-shoot-target-spot spot-tl" data-spot="tl">🎯<br><span>Top Left</span></div>
            <div class="gc-shoot-target-spot spot-tr" data-spot="tr">🎯<br><span>Top Right</span></div>
            <div class="gc-shoot-target-spot spot-bl" data-spot="bl">🎯<br><span>Bottom Left</span></div>
            <div class="gc-shoot-target-spot spot-br" data-spot="br">🎯<br><span>Bottom Right</span></div>
          </div>
        </div>

        <div class="gc-penalty-spot">
          <div class="gc-soccer-ball" id="gc-soccer-ball">⚽</div>
        </div>
        <div class="gc-soccer-msg" id="gc-soccer-msg"></div>
      </div>
    `;

    setTimeout(() => {
      if (this.container && this.container.isConnected && !document.getElementById('gc-question-modal')) {
        this.triggerRound();
      }
    }, 450);
  }

  triggerRound() {
    this.showQuestionModal((isCorrect, outcome) => {
      const targetsBox = this.container.querySelector('#gc-soccer-targets');

      if (targetsBox) targetsBox.style.display = 'grid';

      this.container.querySelectorAll('.gc-shoot-target-spot').forEach(spot => {
        spot.onclick = (e) => {
          e.stopPropagation();
          targetsBox.style.display = 'none';
          const targetKey = spot.dataset.spot;
          this.executePenaltyShot(targetKey, isCorrect, () => {
            window.GC_UI.updateScoreboard();
            window.GC_STATE.nextTurn();
            window.GC_UI.updateTurnBanner();
            if (window.GC_STATE.isGameOver()) {
              setTimeout(() => window.GC_UI.showVictoryScreen(), 1000);
            } else {
              setTimeout(() => {
                if (this.container && this.container.isConnected && !document.getElementById('gc-question-modal') && !window.GC_STATE.isPaused) {
                  this.triggerRound();
                }
              }, 1800);
            }
          });
        };
      });
    });
  }

  executePenaltyShot(spotKey, isCorrect, onDone) {
    const ball = this.container.querySelector('#gc-soccer-ball');
    const goalie = this.container.querySelector('#gc-soccer-goalie');
    const msg = this.container.querySelector('#gc-soccer-msg');

    window.GC_AUDIO?.playKick();

    const trajectories = {
      tl: { left: '15%', top: '-220px' },
      tr: { left: '75%', top: '-220px' },
      bl: { left: '20%', top: '-110px' },
      br: { left: '70%', top: '-110px' }
    };
    const target = trajectories[spotKey] || trajectories.tr;

    ball.style.transition = 'all 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
    ball.style.transform = `translate(${target.left}, ${target.top}) scale(0.65)`;

    if (isCorrect) {
      const diveClass = (spotKey === 'tl' || spotKey === 'bl') ? 'gc-goalie-dive-right' : 'gc-goalie-dive-left';
      goalie.classList.add(diveClass);

      setTimeout(() => {
        window.GC_AUDIO?.playGoal();
        msg.innerHTML = '<span class="gc-goal-celebrate animate-pop">🎉 GOOOAAAL! Brilliant shot into the net! 🎉</span>';
        if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      }, 550);
    } else {
      const diveClass = (spotKey === 'tl' || spotKey === 'bl') ? 'gc-goalie-dive-left' : 'gc-goalie-dive-right';
      goalie.classList.add(diveClass);

      setTimeout(() => {
        window.GC_AUDIO?.playWrong();
        msg.innerHTML = '<span class="gc-save-badge animate-pop">🧤 Great save by the goalkeeper!</span>';
      }, 550);
    }

    setTimeout(() => {
      ball.style.transition = 'none';
      ball.style.transform = 'none';
      goalie.className = 'gc-goalie';
      msg.innerHTML = '';
      onDone();
    }, 2200);
  }
}

/* =========================================================================
   5. Interactive Basketball Shootout (BasketballEngine)
========================================================================= */
class BasketballEngine extends BaseGameEngine {
  renderStage() {
    this.container.innerHTML = `
      <div class="gc-arena-court">
        <div class="gc-bball-stage">
          <div class="gc-hoop-container" id="gc-hoop-box">
            <div class="gc-backboard"></div>
            <div class="gc-rim"></div>
            <div class="gc-net" id="gc-bball-net"></div>
            <div class="gc-hoop-click-target pulse-glow" id="gc-bball-target" style="display:none;">
              🎯 Click to Shoot!
            </div>
          </div>
          <div class="gc-ball-shooter" id="gc-ball-shooter">
            <div class="gc-basketball" id="gc-bball-ball">🏀</div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      if (this.container && this.container.isConnected && !document.getElementById('gc-question-modal')) {
        this.triggerRound();
      }
    }, 450);
  }

  triggerRound() {
    this.showQuestionModal((isCorrect, outcome) => {
      const target = this.container.querySelector('#gc-bball-target');

      if (target) target.style.display = 'flex';

      target.onclick = (e) => {
        e.stopPropagation();
        target.style.display = 'none';
        this.animateShot(isCorrect, () => {
          window.GC_UI.updateScoreboard();
          window.GC_STATE.nextTurn();
          window.GC_UI.updateTurnBanner();
          if (window.GC_STATE.isGameOver()) {
            setTimeout(() => window.GC_UI.showVictoryScreen(), 1000);
          } else {
            setTimeout(() => {
              if (this.container && this.container.isConnected && !document.getElementById('gc-question-modal') && !window.GC_STATE.isPaused) {
                this.triggerRound();
              }
            }, 1800);
          }
        });
      };
    });
  }

  animateShot(isCorrect, onComplete) {
    const ball = this.container.querySelector('#gc-bball-ball');
    const net = this.container.querySelector('#gc-bball-net');
    ball.className = 'gc-basketball';

    if (isCorrect) {
      window.GC_AUDIO?.playBounce();
      ball.classList.add('gc-bball-shoot-make');
      setTimeout(() => {
        window.GC_AUDIO?.playSwish();
        net.classList.add('gc-net-swish');
        if (typeof confetti === 'function') confetti({ particleCount: 45, spread: 70, origin: { y: 0.4 } });
      }, 700);
      setTimeout(() => {
        net.classList.remove('gc-net-swish');
        ball.classList.remove('gc-bball-shoot-make');
        onComplete();
      }, 1500);
    } else {
      window.GC_AUDIO?.playBounce();
      ball.classList.add('gc-bball-shoot-miss');
      setTimeout(() => {
        window.GC_AUDIO?.playBounce();
      }, 800);
      setTimeout(() => {
        ball.classList.remove('gc-bball-shoot-miss');
        onComplete();
      }, 1500);
    }
  }
}

/* =========================================================================
   6. Interactive Balloon Pop (BalloonEngine)
========================================================================= */
class BalloonEngine extends BaseGameEngine {
  constructor(container) {
    super(container);
    this.batchIndex = 0;
    this.batchSize = 24;
    this.balloonsTotal = 0;
  }

  renderStage() {
    this.container.innerHTML = `
      <div class="gc-arena-balloons">
        <div class="gc-balloon-sky" id="gc-balloon-sky"></div>
      </div>
    `;
    this.batchIndex = 0;
    this.balloonsTotal = window.GC_STATE.questions.length || 24;
    this.spawnBalloonsBatch();
  }

  spawnBalloonsBatch() {
    const sky = this.container.querySelector('#gc-balloon-sky');
    if (!sky) return;
    sky.innerHTML = '';
    const colors = ['#1d9bf0', '#10b981', '#f43f5e', '#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4', '#eab308'];
    
    const start = this.batchIndex * this.batchSize;
    const currentCount = Math.min(this.batchSize, this.balloonsTotal - start);

    for (let i = 0; i < currentCount; i++) {
      const b = document.createElement('div');
      b.className = 'gc-balloon-item gc-balloon-clickable';
      b.dataset.index = start + i;
      const color = colors[i % colors.length];
      b.style.background = color;
      b.style.animationDelay = `${(i * 0.22).toFixed(2)}s`;
      b.style.cursor = 'pointer';
      b.innerHTML = `
        <span class="gc-balloon-string"></span>
        <span class="gc-balloon-num">#${i + 1}</span>
      `;

      b.onclick = () => {
        if (b.classList.contains('gc-balloon-popped') || this.isProcessing) return;
        this.isProcessing = true;
        
        // Student pops balloon first with audio!
        window.GC_AUDIO?.playBalloonPop();
        b.classList.add('gc-balloon-popped');
        b.innerHTML = '<span class="gc-pop-reward animate-pop">💥</span>';

        // Immediately launch Tajweed question modal
        setTimeout(() => {
          this.showQuestionModal((isCorrect, outcome) => {
            this.isProcessing = false;
            window.GC_UI.updateScoreboard();

            if (isCorrect) {
              window.GC_AUDIO?.playCoins();
              b.innerHTML = '<span class="gc-pop-reward animate-pop">⭐ +15 Pts!</span>';
              if (typeof confetti === 'function') confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });

              const englishPraises = [
                { title: "🌟 Masha'Allah!", desc: "May Allah bless your recitation and knowledge!" },
                { title: "🤲 Du'aa for Knowledge:", desc: "My Lord, increase me in beneficial knowledge!" },
                { title: "✨ Outstanding Tajweed Champion!", desc: "Your recitation shines with excellence!" },
                { title: "💎 Beautiful Recitation!", desc: "May the Quran always illuminate your heart!" },
                { title: "⭐ Excellent Work!", desc: "May Allah make your Quran journey blessed and easy!" },
                { title: "🏆 Superb Achievement!", desc: "Keep striving forward with confidence and passion!" }
              ];
              const p = englishPraises[Math.floor(Math.random() * englishPraises.length)];

              const praiseBanner = document.createElement('div');
              praiseBanner.className = 'gc-balloon-praise-card animate-pop';
              praiseBanner.innerHTML = `
                <div class="gc-praise-title">${p.title}</div>
                <div class="gc-praise-en">${p.desc}</div>
              `;
              this.container.appendChild(praiseBanner);

              setTimeout(() => {
                praiseBanner.classList.add('animate-fade-out');
                setTimeout(() => praiseBanner.remove(), 400);
              }, 1500);
            } else {
              b.innerHTML = '<span class="gc-pop-reward animate-pop">💨 0 Pts</span>';
            }

            window.GC_STATE.nextQuestion();
            window.GC_UI.updateTurnBanner();
            this.checkBatchProgression();
          });
        }, 300);
      };

      sky.appendChild(b);
    }
  }

  checkBatchProgression() {
    const sky = this.container.querySelector('#gc-balloon-sky');
    const remaining = sky ? sky.querySelectorAll('.gc-balloon-item:not(.gc-balloon-popped)') : [];

    if (remaining.length === 0) {
      const nextBatchStart = (this.batchIndex + 1) * this.batchSize;
      if (nextBatchStart < this.balloonsTotal && !window.GC_STATE.isGameOver()) {
        window.GC_AUDIO?.playFanfare();
        if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 100 });

        const banner = document.createElement('div');
        banner.className = 'gc-balloon-praise-card animate-pop';
        banner.innerHTML = `
          <div class="gc-praise-title">🎉 ROUND COMPLETE!</div>
          <div class="gc-praise-en">All balloons popped! Loading next round... 🎈</div>
        `;
        this.container.appendChild(banner);

        setTimeout(() => {
          banner.remove();
          this.batchIndex++;
          this.spawnBalloonsBatch();
        }, 1600);
      } else {
        setTimeout(() => window.GC_UI.showVictoryScreen(), 800);
      }
    }
  }
}

/* =========================================================================
   7. Interactive Bowling Alley (BowlingEngine)
========================================================================= */
class BowlingEngine extends BaseGameEngine {
  renderStage() {
    this.container.innerHTML = `
      <div class="gc-arena-bowling">
        <div class="gc-bowling-lane">
          <div class="gc-pins-deck" id="gc-pins-deck">
            <div class="gc-pin-row r4">
              <span class="gc-pin" id="pin-7">🎳</span>
              <span class="gc-pin" id="pin-8">🎳</span>
              <span class="gc-pin" id="pin-9">🎳</span>
              <span class="gc-pin" id="pin-10">🎳</span>
            </div>
            <div class="gc-pin-row r3">
              <span class="gc-pin" id="pin-4">🎳</span>
              <span class="gc-pin" id="pin-5">🎳</span>
              <span class="gc-pin" id="pin-6">🎳</span>
            </div>
            <div class="gc-pin-row r2">
              <span class="gc-pin" id="pin-2">🎳</span>
              <span class="gc-pin" id="pin-3">🎳</span>
            </div>
            <div class="gc-pin-row r1">
              <span class="gc-pin" id="pin-1">🎳</span>
            </div>
          </div>

          <div class="gc-bowling-arrows" id="gc-bowl-arrows" style="display:none;">
            <button class="gc-bowl-aim-btn" data-angle="left">◀️ Left Angle</button>
            <button class="gc-bowl-aim-btn active-aim" data-angle="center">🎯 Straight Aim</button>
            <button class="gc-bowl-aim-btn" data-angle="right">▶️ Right Angle</button>
          </div>

          <div class="gc-bowling-ball-zone">
            <div class="gc-bowling-ball" id="gc-bowl-ball">⚫</div>
          </div>
          <div class="gc-bowling-status" id="gc-bowling-status"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      if (this.container && this.container.isConnected && !document.getElementById('gc-question-modal')) {
        this.triggerRound();
      }
    }, 450);
  }

  triggerRound() {
    this.showQuestionModal((isCorrect, outcome) => {
      const arrowsBox = this.container.querySelector('#gc-bowl-arrows');

      if (arrowsBox) arrowsBox.style.display = 'flex';

      this.container.querySelectorAll('.gc-bowl-aim-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          arrowsBox.style.display = 'none';
          const angle = btn.dataset.angle;
          this.animateRoll(angle, isCorrect, () => {
            window.GC_UI.updateScoreboard();
            window.GC_STATE.nextTurn();
            window.GC_UI.updateTurnBanner();
            if (window.GC_STATE.isGameOver()) {
              setTimeout(() => window.GC_UI.showVictoryScreen(), 1000);
            } else {
              this.resetPins();
              setTimeout(() => {
                if (this.container && this.container.isConnected && !document.getElementById('gc-question-modal') && !window.GC_STATE.isPaused) {
                  this.triggerRound();
                }
              }, 1800);
            }
          });
        };
      });
    });
  }

  resetPins() {
    this.container.querySelectorAll('.gc-pin').forEach(p => {
      p.className = 'gc-pin';
    });
    const status = this.container.querySelector('#gc-bowling-status');
    if (status) status.innerHTML = '';
  }

  animateRoll(angle, isCorrect, onDone) {
    const ball = this.container.querySelector('#gc-bowl-ball');
    const status = this.container.querySelector('#gc-bowling-status');
    const pins = Array.from(this.container.querySelectorAll('.gc-pin'));

    ball.className = 'gc-bowling-ball gc-bowl-roll-action';
    window.GC_AUDIO?.playBounce();

    setTimeout(() => {
      ball.className = 'gc-bowling-ball';
      if (isCorrect) {
        window.GC_AUDIO?.playPinsHit();
        window.GC_AUDIO?.playStrike();
        pins.forEach(p => p.classList.add('gc-pin-knocked'));
        status.innerHTML = '<span class="gc-strike-badge animate-pop">🎳 STRIKE! All pins knocked down! 🎳</span>';
        if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 80 });
      } else {
        window.GC_AUDIO?.playPinsHit();
        pins.slice(0, 4).forEach(p => p.classList.add('gc-pin-knocked'));
        status.innerHTML = '<span class="gc-spare-badge animate-pop">4 Pins Down!</span>';
      }
      setTimeout(onDone, 1200);
    }, 900);
  }
}
