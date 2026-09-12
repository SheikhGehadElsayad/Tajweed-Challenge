// Game Center UI Controller (Featuring Beat the Teacher Mode & Bulletproof Modal Controls)
window.GC_UI = {
  selectedGameId: 'cards',
  selectedMode: 'teacher', // Default to Beat the Teacher mode!
  selectedThemeId: 'animals',

  init() {
    try {
      const savedMode = localStorage.getItem('gc_selected_mode');
      if (savedMode && ['teacher', 'teams', 'solo'].includes(savedMode)) {
        this.selectedMode = savedMode;
      }
    } catch (e) {}
    this.bindPortalEvents();
  },

  // Switch to Game Center Portal
  openPortal() {
    document.body.classList.add('gc-scrollable');
    document.documentElement.classList.add('gc-scrollable');
    window.switchScreen('screen-gc-portal');
    this.renderPortal();
    window.GC_AUDIO?.playFanfare();
  },

  // Render Game Center Portal Screen
  renderPortal() {
    const portal = document.getElementById('screen-gc-portal');
    if (!portal) return;

    const mistakeCount = window.GC_STATE.getMistakes().length;

    portal.innerHTML = `
      <div class="gc-portal-container animate-fade-in">
        <!-- Top Navigation -->
        <header class="gc-portal-header">
          <button class="gc-back-btn" id="gc-btn-back-gateway">
            <span>🏠</span>
            <span>Back to Gateway</span>
          </button>
          <div class="gc-portal-title-block">
            <h1 class="gc-portal-title">🎲 GAME CENTER</h1>
            <p class="gc-portal-subtitle">🌟 Fun, Bright & Engaging Tajweed Challenges for Young Champions 🌟</p>
          </div>
          <div class="gc-portal-top-actions">
            <button class="gc-mistake-bank-btn" id="gc-btn-mistake-bank" title="Practice Missed Questions">
              <span>⚠️</span>
              <span>Mistakes (${mistakeCount})</span>
            </button>
            <button class="gc-teacher-settings-btn" id="gc-btn-teacher-settings" title="Teacher Controls">
              <span>⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </header>

        <!-- Mode Selector: Beat the Teacher, Team Battle, Solo -->
        <div class="gc-mode-selector-strip">
          <div class="gc-mode-tab ${this.selectedMode === 'teacher' ? 'active' : ''}" data-mode="teacher">
            <span class="gc-mode-badge-fire">🔥 ULTRA FUN</span>
            <span class="gc-mode-icon">🎓</span>
            <div class="gc-mode-text">
              <strong>BEAT THE TEACHER!</strong>
              <small>Student VS Sheikh Gehad • Dares & Steals!</small>
            </div>
          </div>
          <div class="gc-mode-tab ${this.selectedMode === 'teams' ? 'active' : ''}" data-mode="teams">
            <span class="gc-mode-icon">👥</span>
            <div class="gc-mode-text">
              <strong>TEAM BATTLE</strong>
              <small>2 to 4 Teams Contest</small>
            </div>
          </div>
          <div class="gc-mode-tab ${this.selectedMode === 'solo' ? 'active' : ''}" data-mode="solo">
            <span class="gc-mode-icon">👤</span>
            <div class="gc-mode-text">
              <strong>SOLO MODE</strong>
              <small>Single Player Practice</small>
            </div>
          </div>
        </div>

        <!-- 7 Interactive Games Grid with Bright, Joyful Cards -->
        <div class="gc-games-grid-title">
          <span>🌟 CHOOSE YOUR GAME 🌟</span>
        </div>
        <div class="gc-games-grid" id="gc-games-grid">
          ${window.GC_GAMES.list.map(g => `
            <div class="gc-game-card" data-game="${g.id}">
              <div class="gc-game-badge" style="background: ${g.accent}">${g.icon}</div>
              <h3 class="gc-game-title">${g.title}</h3>
              <p class="gc-game-desc">${g.desc}</p>
              <button class="gc-play-game-btn" style="background: ${g.accent}">
                🎮 Play Now
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Game Setup Modal Container -->
      <div class="gc-modal-overlay" id="gc-setup-modal" style="display:none;"></div>

      <!-- Teacher Settings Modal -->
      <div class="gc-modal-overlay" id="gc-settings-modal" style="display:none;"></div>

      <!-- Mistake Bank Modal -->
      <div class="gc-modal-overlay" id="gc-mistakes-modal" style="display:none;"></div>
    `;

    this.bindPortalEvents();
  },

  bindPortalEvents() {
    const portal = document.getElementById('screen-gc-portal');
    if (!portal) return;

    // Back to Gateway
    const backBtn = portal.querySelector('#gc-btn-back-gateway');
    if (backBtn) {
      backBtn.onclick = () => {
        document.body.classList.remove('gc-scrollable');
        document.documentElement.classList.remove('gc-scrollable');
        window.GC_AUDIO?.playClick();
        window.switchScreen('screen-mode-select');
      };
    }

    // Teacher Settings
    const settingsBtn = portal.querySelector('#gc-btn-teacher-settings');
    if (settingsBtn) {
      settingsBtn.onclick = () => {
        window.GC_AUDIO?.playClick();
        this.openSettingsModal();
      };
    }

    // Mistake Bank
    const mistakeBtn = portal.querySelector('#gc-btn-mistake-bank');
    if (mistakeBtn) {
      mistakeBtn.onclick = () => {
        window.GC_AUDIO?.playClick();
        this.openMistakeModal();
      };
    }

    // Mode Selector tabs
    portal.querySelectorAll('.gc-mode-tab').forEach(tab => {
      tab.onclick = () => {
        window.GC_AUDIO?.playClick();
        portal.querySelectorAll('.gc-mode-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.selectedMode = tab.dataset.mode;
        try {
          localStorage.setItem('gc_selected_mode', this.selectedMode);
        } catch (e) {}
      };
    });

    // Game Cards Click
    portal.querySelectorAll('.gc-game-card').forEach(card => {
      card.onclick = () => {
        window.GC_AUDIO?.playClick();
        const gameId = card.dataset.game;
        this.selectedGameId = gameId;
        this.openSetupModal(gameId);
      };
    });
  },

  // Open Game Setup Configuration Modal
  openSetupModal(gameId, isMistakeMode = false) {
    const modal = document.getElementById('gc-setup-modal');
    if (!modal) return;

    const game = window.GC_GAMES.getGameInfo(gameId);
    const activeStudent = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;

    modal.innerHTML = `
      <div class="gc-setup-dialog animate-pop" style="max-width: 820px; width: 96%; max-height: 90vh;">
        <div class="gc-dialog-header">
          <div class="gc-dialog-title">
            <span>${game.icon}</span>
            <span>Setup: ${game.title}</span>
          </div>
          <button class="gc-dialog-close" id="gc-setup-close">✕</button>
        </div>

        <div class="gc-dialog-body">
          <!-- Active Student Profile Bar -->
          <div class="gc-setup-section" style="background: white; border: 2px solid ${activeStudent?.color || '#2563eb'}; border-radius: 14px; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.8rem;">${activeStudent?.avatar || '🦁'}</span>
              <div>
                <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase;">Active Student</div>
                <div style="font-size: 1.15rem; font-weight: 900; color: #0f172a;">${activeStudent?.name || 'Student Champion'}</div>
              </div>
            </div>
            <button type="button" class="btn-secondary" id="gc-btn-switch-student" style="padding: 6px 14px; font-size: 0.85rem; font-weight: 800; border-radius: 8px;">
              👥 Switch Student
            </button>
          </div>

          ${isMistakeMode ? `
            <div class="gc-setup-section" style="background:#fef2f2; border:1px solid #fecaca; border-radius:12px; padding:12px;">
              <h4 style="color:#b91c1c; margin:0 0 6px 0;">⚠️ Mistake Practice Mode</h4>
              <p style="margin:0; font-size:0.9rem; color:#450a0a;">Practicing only the questions you previously missed!</p>
            </div>
          ` : `
            <!-- Universal Rule & Sub-rule Selection Mount -->
            <div id="gc-rule-selector-mount" style="margin-bottom: 15px;"></div>
          `}

          <!-- Mode-Specific Players Setup -->
          ${this.selectedMode === 'teacher' ? `
            <div class="gc-setup-section" style="background:linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.15) 100%); border:2px solid #f59e0b; border-radius:16px; padding:14px;">
              <h4 style="color:#f59e0b; margin:0 0 10px 0;">🎓 Beat the Teacher Match Setup</h4>
              <div class="gc-teams-config-grid" id="gc-teams-config-box">
                <div class="gc-team-config-row">
                  <span>Student Player:</span>
                  <input type="text" class="gc-team-name-input" id="gc-student-name-input" value="${activeStudent?.name || 'Student Champion'}" />
                  <span class="gc-team-avatar-preview">${activeStudent?.avatar || '🦁'}</span>
                </div>
                <div class="gc-team-config-row" style="background:rgba(245,158,11,0.15); padding:6px 12px; border-radius:10px;">
                  <span>Teacher / Host:</span>
                  <input type="text" class="gc-team-name-input" id="gc-teacher-name-input" value="Sheikh Gehad" placeholder="Enter Teacher Name" />
                  <span class="gc-team-avatar-preview">🎓</span>
                </div>
              </div>
            </div>
          ` : (this.selectedMode === 'teams' ? `
            <div class="gc-setup-section">
              <h4>👥 3. Teams Setup</h4>
              <div class="gc-teams-config-grid" id="gc-teams-config-box">
                <div class="gc-team-config-row">
                  <span>Team 1:</span>
                  <input type="text" class="gc-team-name-input" value="Team Falcons" />
                  <span class="gc-team-avatar-preview">🦅</span>
                </div>
                <div class="gc-team-config-row">
                  <span>Team 2:</span>
                  <input type="text" class="gc-team-name-input" value="Team Lions" />
                  <span class="gc-team-avatar-preview">🦁</span>
                </div>
              </div>
            </div>
          ` : '')}
        </div>

        <div class="gc-dialog-footer">
          <button class="gc-btn-primary pulse-glow" id="gc-setup-launch">
            ${this.selectedMode === 'teacher' ? '🔥 CHALLENGE THE TEACHER NOW!' : '🚀 START GAME NOW'}
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';

    // Switch Student button in GC modal
    modal.querySelector('#gc-btn-switch-student')?.addEventListener('click', () => {
      if (typeof window.StudentModal !== 'undefined') {
        window.StudentModal.open('roster');
      }
    });

    // Close button
    modal.querySelector('#gc-setup-close').onclick = () => {
      modal.style.display = 'none';
    };

    // Render RuleSelectorEngine if in standard mode
    let rseState = {
      selectedConfig: { 'image_bank': { 'Noon Mushaddad': { enabled: true, qty: 5 } }, 'qalqalah': { 'Minor': { enabled: true, qty: 5 } } },
      totalCount: 20
    };

    if (!isMistakeMode && typeof window.RuleSelectorEngine !== 'undefined') {
      const mount = modal.querySelector('#gc-rule-selector-mount');
      if (mount) {
        window.RuleSelectorEngine.render(mount, {
          initialSelection: rseState.selectedConfig,
          onChange: (data) => {
            rseState = data;
          }
        });
      }
    }

    // Launch Button
    modal.querySelector('#gc-setup-launch').onclick = () => {
      window.GC_AUDIO?.playFanfare();
      modal.style.display = 'none';

      let selectedCats = [];
      let selectedSubRules = {};
      let selectedMaxCount = 20;

      if (!isMistakeMode) {
        const activeConfig = rseState.selectedConfig || rseState.selectedMap || {};
        selectedCats = Object.keys(activeConfig);
        selectedSubRules = activeConfig;
        selectedMaxCount = rseState.totalCount || rseState.selectedCount || 20;
        if (selectedCats.length === 0) {
          selectedCats = window.GC_DATA.categories.map(c => c.id);
        }
      }

      // Teams list
      let teamsList = [];
      if (this.selectedMode === 'teacher') {
        const studentInput = modal.querySelector('#gc-student-name-input');
        const studentName = studentInput ? studentInput.value.trim() || 'Student Champion' : 'Student Champion';
        const teacherInput = modal.querySelector('#gc-teacher-name-input');
        const teacherName = teacherInput ? teacherInput.value.trim() || 'Teacher' : 'Sheikh Gehad';
        teamsList = [
          { name: studentName, avatar: activeStudent?.avatar || '🦁' },
          { name: teacherName, avatar: '🎓' }
        ];
      } else if (this.selectedMode === 'teams') {
        const rows = modal.querySelectorAll('.gc-team-config-row');
        rows.forEach((row, idx) => {
          const nameInput = row.querySelector('.gc-team-name-input');
          const val = nameInput ? nameInput.value.trim() : '';
          if (val) {
            teamsList.push({
              name: val,
              avatar: row.querySelector('.gc-team-avatar-preview')?.textContent || (idx === 0 ? '🦅' : '🦁')
            });
          }
        });
        if (teamsList.length === 0) {
          teamsList = [{ name: 'Team Falcons', avatar: '🦅' }, { name: 'Team Lions', avatar: '🦁' }];
        }
      }

      // Start Session
      window.GC_STATE.startSession(
        gameId,
        this.selectedMode,
        {
          selectedCats: selectedCats,
          selectedSubRules: selectedSubRules,
          maxCount: selectedMaxCount,
          themeId: this.selectedThemeId,
          isMistakePractice: isMistakeMode
        },
        teamsList
      );

      // Switch to Arena Screen
      this.launchArena();
    };
  },

  // Open Teacher / Host Controls Modal
  openSettingsModal() {
    const modal = document.getElementById('gc-settings-modal');
    if (!modal) return;

    const s = window.GC_STATE.settings;

    modal.innerHTML = `
      <div class="gc-setup-dialog animate-pop">
        <div class="gc-dialog-header">
          <div class="gc-dialog-title">⚙️ Teacher & Host Controls</div>
          <button class="gc-dialog-close" id="gc-settings-close">✕</button>
        </div>
        <div class="gc-dialog-body">
          <div class="gc-setting-row">
            <div>
              <strong>Question Timer</strong>
              <small>Enable or disable question countdown timer</small>
            </div>
            <input type="checkbox" id="set-timer-toggle" ${s.timerEnabled ? 'checked' : ''} />
          </div>
          <div class="gc-setting-row">
            <div>
              <strong>Timer Duration</strong>
              <small>Time allowed per question in seconds</small>
            </div>
            <select id="set-timer-seconds">
              <option value="10" ${s.timerSeconds === 10 ? 'selected' : ''}>10s (Fast)</option>
              <option value="15" ${s.timerSeconds === 15 ? 'selected' : ''}>15s (Normal)</option>
              <option value="20" ${s.timerSeconds === 20 ? 'selected' : ''}>20s (Relaxed)</option>
              <option value="30" ${s.timerSeconds === 30 ? 'selected' : ''}>30s (Extended)</option>
            </select>
          </div>
          <div class="gc-setting-row">
            <div>
              <strong>Power-Ups & Special Cards</strong>
              <small>Enable point steal, score swap, and defensive shields</small>
            </div>
            <input type="checkbox" id="set-powerups-toggle" ${s.powerupsEnabled ? 'checked' : ''} />
          </div>
          <div class="gc-setting-row">
            <div>
              <strong>Sound Effects</strong>
              <small>Game arcade sounds, buzzer, and fanfares</small>
            </div>
            <input type="checkbox" id="set-sfx-toggle" ${s.soundSfx ? 'checked' : ''} />
          </div>
          <div class="gc-setting-row">
            <div>
              <strong>Sheikh Recitation Audio</strong>
              <small>Play high-quality Quran recitation</small>
            </div>
            <input type="checkbox" id="set-recite-toggle" ${s.soundRecitation ? 'checked' : ''} />
          </div>
          <div class="gc-setting-row">
            <div>
              <strong>Show Explanations</strong>
              <small>Display rule rationale after answering</small>
            </div>
            <input type="checkbox" id="set-expl-toggle" ${s.showExplanations ? 'checked' : ''} />
          </div>
        </div>
        <div class="gc-dialog-footer">
          <button class="gc-btn-primary" id="gc-settings-save">Save Settings</button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    modal.querySelector('#gc-settings-close').onclick = () => modal.style.display = 'none';
    modal.querySelector('#gc-settings-save').onclick = () => {
      s.timerEnabled = modal.querySelector('#set-timer-toggle').checked;
      s.timerSeconds = parseInt(modal.querySelector('#set-timer-seconds').value);
      s.powerupsEnabled = modal.querySelector('#set-powerups-toggle').checked;
      s.soundSfx = modal.querySelector('#set-sfx-toggle').checked;
      s.soundRecitation = modal.querySelector('#set-recite-toggle').checked;
      s.showExplanations = modal.querySelector('#set-expl-toggle').checked;
      window.GC_STATE.saveSettings();
      modal.style.display = 'none';
    };
  },

  // Open Mistake Bank Modal
  openMistakeModal() {
    const modal = document.getElementById('gc-mistakes-modal');
    if (!modal) return;

    const mistakes = window.GC_STATE.getMistakes();

    modal.innerHTML = `
      <div class="gc-setup-dialog animate-pop" style="max-width:700px;">
        <div class="gc-dialog-header">
          <div class="gc-dialog-title">
            <span>⚠️ Mistake Practice Bank</span>
            <span class="gc-badge-count">(${mistakes.length})</span>
          </div>
          <button class="gc-dialog-close" id="gc-mistakes-close">✕</button>
        </div>

        <div class="gc-dialog-body" style="max-height:60vh; overflow-y:auto;">
          ${mistakes.length === 0 ? `
            <div style="text-align:center; padding:30px 10px; color:#64748b;">
              <span style="font-size:3rem;">🎉</span>
              <h3>No mistakes recorded!</h3>
              <p>Keep answering questions accurately to stay on top!</p>
            </div>
          ` : `
            <p style="color:#64748b; font-size:0.95rem; margin-top:0;">
              These are the questions you missed during recent matches. Practice them anytime to master the rules:
            </p>
            <div class="gc-mistakes-list">
              ${mistakes.map((m, idx) => `
                <div class="gc-mistake-card">
                  <div class="gc-mistake-meta">
                    <span class="gc-mistake-num">#${idx + 1}</span>
                    <span class="gc-mistake-cat">${m.question.categoryName || 'Rule'}</span>
                  </div>
                  <div class="gc-mistake-content">
                    ${m.question.image ? `<img src="${m.question.image}" class="gc-mistake-img" alt="Ayah" />` : `<div class="gc-mistake-text">${m.question.text || ''}</div>`}
                    <div class="gc-mistake-details">
                      <div class="gc-correct-ans">✅ Correct: <strong>${m.question.correctAnswer || m.question.ans}</strong></div>
                      ${m.userChoice ? `<div class="gc-your-ans">❌ Your Choice: <span>${m.userChoice}</span></div>` : ''}
                    </div>
                  </div>
                  <button class="gc-del-mistake-btn" data-idx="${idx}" title="Remove from Bank">🗑️</button>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <div class="gc-dialog-footer" style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            ${mistakes.length > 0 ? `
              <button class="gc-btn-danger" id="gc-clear-mistakes-btn">🗑️ Clear All</button>
            ` : ''}
          </div>
          <div style="display:flex; gap:10px;">
            ${mistakes.length > 0 ? `
              <button class="gc-btn-primary pulse-glow" id="gc-practice-mistakes-btn">⚡ Practice These (${mistakes.length})</button>
            ` : ''}
            <button class="gc-btn-secondary" id="gc-mistakes-done-btn">Close</button>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    modal.querySelector('#gc-mistakes-close').onclick = () => modal.style.display = 'none';

    const doneBtn = modal.querySelector('#gc-mistakes-done-btn');
    if (doneBtn) doneBtn.onclick = () => modal.style.display = 'none';

    const clearBtn = modal.querySelector('#gc-clear-mistakes-btn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        const doClear = () => {
          window.GC_STATE.clearMistakes();
          this.openMistakeModal();
          this.renderPortal();
          if (typeof showToast === 'function') showToast('Mistakes cleared.');
        };
        if (typeof showAppConfirm === 'function') {
          showAppConfirm('Are you sure you want to clear all recorded mistakes?', 'Clear Mistakes', doClear);
        } else if (confirm('Clear all recorded mistakes?')) {
          doClear();
        }
      };
    }

    modal.querySelectorAll('.gc-del-mistake-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx);
        window.GC_STATE.removeMistake(idx);
        this.openMistakeModal();
        this.renderPortal();
      };
    });

    const practiceBtn = modal.querySelector('#gc-practice-mistakes-btn');
    if (practiceBtn) {
      practiceBtn.onclick = () => {
        modal.style.display = 'none';
        this.openSetupModal('cards', true);
      };
    }
  },

  // 3. REAL PAUSE MODAL (BULLETPROOF DOM REMOVAL & TIMER RESUME)
  openPauseModal() {
    // Remove any lingering pause modal completely from DOM
    document.querySelectorAll('.gc-pause-overlay, #gc-pause-modal').forEach(el => el.remove());

    const pauseModal = document.createElement('div');
    pauseModal.id = 'gc-pause-modal';
    pauseModal.className = 'gc-pause-overlay animate-pop';
    document.body.appendChild(pauseModal);

    window.GC_STATE.isPaused = true;
    document.body.classList.add('gc-game-paused');

    // Pause active timer
    if (window.GC_GAMES && window.GC_GAMES.activeEngine && typeof window.GC_GAMES.activeEngine.pauseTimer === 'function') {
      window.GC_GAMES.activeEngine.pauseTimer();
    }

    pauseModal.innerHTML = `
      <div class="gc-pause-dialog animate-pop">
        <div style="font-size: 2.8rem; line-height: 1; margin-bottom: 8px;">⏸️</div>
        <h2 class="gc-pause-title">GAME PAUSED</h2>
        <p class="gc-pause-subtitle">The game is currently paused. Select an option to proceed:</p>
        <div class="gc-pause-options">
          <button class="gc-pause-btn gc-pause-resume-btn" id="gc-pause-continue">
            <span>▶️ CONTINUE</span>
          </button>
          <button class="gc-pause-btn gc-pause-end-btn" id="gc-pause-end">
            <span>🛑 END GAME</span>
          </button>
        </div>
      </div>
    `;

    // (CONTINUE) - Completely remove modal from DOM, unpause, and resume timer
    pauseModal.querySelector('#gc-pause-continue').onclick = () => {
      pauseModal.remove();
      window.GC_STATE.isPaused = false;
      document.body.classList.remove('gc-game-paused');
      window.GC_AUDIO?.playClick();

      // Resume timer from where it stopped
      if (window.GC_GAMES && window.GC_GAMES.activeEngine && typeof window.GC_GAMES.activeEngine.resumeTimer === 'function') {
        window.GC_GAMES.activeEngine.resumeTimer();
      }
    };

    // (END GAME) - Remove pause modal and open End Confirmation
    pauseModal.querySelector('#gc-pause-end').onclick = () => {
      pauseModal.remove();
      this.openEndConfirmModal();
    };
  },

  // 4. REAL END GAME MODAL (BULLETPROOF DOM REMOVAL & DIRECT RETURN TO MAIN MENU)
  openEndConfirmModal() {
    // Remove any lingering end or pause modal completely from DOM
    document.querySelectorAll('.gc-pause-overlay, #gc-end-confirm-modal').forEach(el => el.remove());

    const endModal = document.createElement('div');
    endModal.id = 'gc-end-confirm-modal';
    endModal.className = 'gc-pause-overlay animate-pop';
    document.body.appendChild(endModal);

    window.GC_STATE.isPaused = true;
    document.body.classList.add('gc-game-paused');
    if (window.GC_GAMES && window.GC_GAMES.activeEngine && typeof window.GC_GAMES.activeEngine.pauseTimer === 'function') {
      window.GC_GAMES.activeEngine.pauseTimer();
    }

    endModal.innerHTML = `
      <div class="gc-pause-dialog animate-pop">
        <div style="font-size: 2.8rem; line-height: 1; margin-bottom: 8px;">🛑</div>
        <h2 class="gc-pause-title">END GAME?</h2>
        <p class="gc-pause-subtitle">
          Are you sure you want to end the match now? What would you like to do?
        </p>
        <div class="gc-pause-options">
          <button class="gc-pause-btn gc-pause-resume-btn" id="gc-end-continue-playing">
            <span>▶️ CONTINUE PLAYING</span>
          </button>
          <button class="gc-pause-btn gc-pause-end-btn" id="gc-end-return-main">
            <span>🏠 RETURN TO MAIN MENU</span>
          </button>
          <button class="gc-pause-btn" id="gc-end-view-results" style="background:#3b82f6; color:#ffffff;">
            <span>🏆 VIEW FINAL RESULTS</span>
          </button>
        </div>
      </div>
    `;

    // (CONTINUE PLAYING) - Remove modal from DOM, unpause, and resume timer seamlessly
    endModal.querySelector('#gc-end-continue-playing').onclick = () => {
      endModal.remove();
      window.GC_STATE.isPaused = false;
      document.body.classList.remove('gc-game-paused');
      window.GC_AUDIO?.playClick();

      if (window.GC_GAMES && window.GC_GAMES.activeEngine && typeof window.GC_GAMES.activeEngine.resumeTimer === 'function') {
        window.GC_GAMES.activeEngine.resumeTimer();
      }
    };

    // (RETURN TO MAIN MENU) - Cleans up everything and returns immediately to Game Center Portal!
    endModal.querySelector('#gc-end-return-main').onclick = () => {
      document.querySelectorAll('.gc-pause-overlay, #gc-end-confirm-modal, #gc-pause-modal, #gc-question-modal, #gc-event-modal').forEach(el => el.remove());
      window.GC_STATE.isPaused = false;
      document.body.classList.remove('gc-game-paused');
      window.GC_AUDIO?.playClick();

      window.GC_GAMES.cleanup();
      this.openPortal();
    };

    // (VIEW FINAL RESULTS) - Conclude match and show final results screen
    endModal.querySelector('#gc-end-view-results').onclick = () => {
      document.querySelectorAll('.gc-pause-overlay, #gc-end-confirm-modal, #gc-pause-modal, #gc-question-modal, #gc-event-modal').forEach(el => el.remove());
      window.GC_STATE.isPaused = false;
      document.body.classList.remove('gc-game-paused');
      window.GC_AUDIO?.playClick();

      window.GC_GAMES.cleanup();
      this.showVictoryScreen();
    };
  },

  // 6. LAUNCH ACTIVE GAME ARENA (COMPACT HEADER WITH ALL ESSENTIALS)
  launchArena() {
    document.body.classList.remove('gc-scrollable');
    document.documentElement.classList.remove('gc-scrollable');
    window.switchScreen('screen-gc-arena');
    const arena = document.getElementById('screen-gc-arena');
    if (!arena) return;

    const game = window.GC_GAMES.getGameInfo(window.GC_STATE.activeGameId);
    const theme = window.GC_THEMES[window.GC_STATE.themeId] || window.GC_THEMES.animals;

    arena.innerHTML = `
      <div class="gc-arena-container" style="background: ${theme.bgGradient}">
        <!-- Clean Baamboozle Style Header: Left Team 1, Minimal Floating Actions, Right Team 2 -->
        <header class="gc-baamboozle-hud">
          <!-- Team 1 Side -->
          <div class="gc-bbz-team gc-bbz-team1" id="gc-hud-left"></div>

          <!-- Minimal Center/Floating Actions (Pause & Return Home, unobtrusive & light) -->
          <div class="gc-bbz-controls">
            <button class="gc-bbz-action-btn" id="gc-btn-pause" title="Pause Game">⏸️</button>
            <button class="gc-bbz-action-btn" id="gc-btn-end" title="Return to Menu">🏠</button>
          </div>

          <!-- Team 2 / Sheikh Gehad Side -->
          <div class="gc-bbz-team gc-bbz-team2" id="gc-hud-right"></div>
        </header>

        <!-- Stage Container (Active Game Engine mounts here) -->
        <div class="gc-stage-mount" id="gc-stage-mount"></div>
      </div>
    `;

    // Bind PAUSE button
    arena.querySelector('#gc-btn-pause').onclick = () => {
      window.GC_AUDIO?.playClick();
      this.openPauseModal();
    };

    // Bind END button
    arena.querySelector('#gc-btn-end').onclick = () => {
      window.GC_AUDIO?.playClick();
      this.openEndConfirmModal();
    };

    this.updateScoreboard();
    this.updateTurnBanner();

    // Mount Game Engine
    const stageMount = arena.querySelector('#gc-stage-mount');
    window.GC_GAMES.start(window.GC_STATE.activeGameId, stageMount);
  },

  // Update Baamboozle-Style Scoreboard (Student Left, Teacher Right)
  updateScoreboard() {
    const leftBox = document.getElementById('gc-hud-left');
    const rightBox = document.getElementById('gc-hud-right');

    if (!leftBox || !rightBox) return;

    const teams = window.GC_STATE.teams;
    const currentIdx = window.GC_STATE.currentTeamIndex;

    // Team 1 / Student (Left Flank)
    const t1 = teams[0] || { name: 'Team 1', avatar: '🦁', score: 0, streak: 0 };
    const t1Active = (currentIdx === 0 && teams.length > 1);

    leftBox.innerHTML = `
      <div class="gc-bbz-team-card ${t1Active ? 'bbz-active-turn' : ''}">
        <div class="gc-bbz-team-badge team-1-bg">
          <span>${t1.avatar} ${t1.name}</span>
          ${t1.streak > 1 ? `<span class="gc-bbz-streak">🔥${t1.streak}</span>` : ''}
        </div>
        <div class="gc-bbz-score-num">${t1.score}</div>
      </div>
    `;

    // Team 2 / Sheikh Gehad (Right Flank)
    if (teams.length > 1) {
      const t2 = teams[1] || { name: 'Team 2', avatar: '🎓', score: 0, streak: 0 };
      const t2Active = (currentIdx === 1);

      rightBox.innerHTML = `
        <div class="gc-bbz-team-card ${t2Active ? 'bbz-active-turn' : ''}">
          <div class="gc-bbz-team-badge team-2-bg">
            <span>${t2.avatar} ${t2.name}</span>
            ${t2.streak > 1 ? `<span class="gc-bbz-streak">🔥${t2.streak}</span>` : ''}
          </div>
          <div class="gc-bbz-score-num">${t2.score}</div>
        </div>
      `;
    } else {
      // Solo Mode
      rightBox.innerHTML = `
        <div class="gc-bbz-team-card">
          <div class="gc-bbz-team-badge" style="background:#0284c7;">
            <span>⭐ Champion</span>
          </div>
          <div class="gc-bbz-score-num">${t1.score}</div>
        </div>
      `;
    }
  },

  // Update Active Turn Indicator
  updateTurnBanner() {
    this.updateScoreboard();
  },

  // Show Victory / Results Screen
  showVictoryScreen() {
    document.body.classList.add('gc-scrollable');
    document.documentElement.classList.add('gc-scrollable');
    window.switchScreen('screen-gc-results');
    const screen = document.getElementById('screen-gc-results');
    if (!screen) return;

    window.GC_AUDIO?.playFanfare();
    window.GC_AUDIO?.playCoins();

    const teams = [...window.GC_STATE.teams].sort((a, b) => b.score - a.score);
    const winner = teams[0];
    const isTie = (teams.length > 1 && teams[0].score === teams[1].score);

    screen.innerHTML = `
      <div class="gc-results-container animate-fade-in">
        <div class="gc-results-podium animate-pop">
          <div class="gc-trophy-icon">🏆</div>
          <h1 class="gc-victory-title">${isTie ? "It's a Tie Match!" : "Victory Celebration!"}</h1>
          <h2 class="gc-winner-tag" style="color: ${winner.color}">
            ${isTie ? "🤝 Outstanding Performance by Both Players!" : `${winner.avatar} ${winner.name} Wins the Championship!`}
          </h2>
          <div class="gc-winner-score">${winner.score} Points</div>
        </div>

        <!-- Scores Breakdown -->
        <div class="gc-leaderboard-box">
          <h3>Final Standings & Performance</h3>
          <div class="gc-leaderboard-list">
            ${teams.map((t, idx) => `
              <div class="gc-leader-item">
                <span class="gc-rank">${idx === 0 && !isTie ? '🥇' : idx === 1 && !isTie ? '🥈' : '#' + (idx + 1)}</span>
                <span class="gc-leader-avatar">${t.avatar}</span>
                <span class="gc-leader-name">${t.name}</span>
                <span class="gc-leader-stats">✅ ${t.correctCount} Correct / ❌ ${t.wrongCount} Missed</span>
                <span class="gc-leader-score">${t.score} Pts</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Actions -->
        <div class="gc-results-actions">
          <button class="gc-btn-secondary" id="gc-btn-play-again">
            🔄 Play Again
          </button>
          <button class="gc-btn-secondary" id="gc-btn-another-game">
            🎮 Choose Another Game
          </button>
          <button class="gc-btn-secondary" id="gc-btn-home-gateway">
            🏠 Main Gateway
          </button>
        </div>
      </div>
    `;

    // Event Bindings
    screen.querySelector('#gc-btn-play-again').onclick = () => {
      this.openSetupModal(window.GC_STATE.activeGameId);
    };

    screen.querySelector('#gc-btn-another-game').onclick = () => {
      this.openPortal();
    };

    screen.querySelector('#gc-btn-home-gateway').onclick = () => {
      window.switchScreen('screen-mode-select');
    };
  }
};
