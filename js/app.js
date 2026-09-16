/**
 * Application Entry Point & Global Event Bindings
 * Presentation Shell Layer
 */

(function(window) {
    'use strict';

    function initApp() {
        if (typeof window.LicenseManager !== 'undefined') window.LicenseManager.updateBadgeUI();
        if (typeof window.renderSetupUI === 'function') window.renderSetupUI();
        if (typeof window.bindAvatarUploads === 'function') window.bindAvatarUploads();

        // Entry Screen Navigation
        const enterBtn = document.getElementById('btn-enter-app');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => { 
                try { if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); } catch(e){}
                if (typeof window.switchScreen === 'function') window.switchScreen('screen-mode-select'); 
            });
        }

        const modeBackBtn = document.getElementById('btn-mode-back');
        if (modeBackBtn) {
            modeBackBtn.addEventListener('click', () => {
                try { if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); } catch(e){}
                if (typeof window.switchScreen === 'function') window.switchScreen('screen-splash');
            });
        }

        const splashHwBtn = document.getElementById('btn-splash-hw');
        if (splashHwBtn) {
            splashHwBtn.addEventListener('click', () => {
                try { if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); } catch(e){}
                if (typeof window.switchScreen === 'function') window.switchScreen('screen-homework');
                if (typeof window.renderHomeworkCreator === 'function') window.renderHomeworkCreator();
            });
        }

        const modeGcBtn = document.getElementById('btn-mode-gc');
        if (modeGcBtn) {
            modeGcBtn.addEventListener('click', () => {
                try { if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); } catch(e){}
                if (window.GC_UI && typeof window.GC_UI.openPortal === 'function') {
                    window.GC_UI.openPortal();
                }
            });
        }

        // Keyboard navigation for mode cards (Enter / Space)
        document.querySelectorAll('.mode-card[role="button"]').forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        // Accessibility & Preferences Toolbar
        const btnToggleLang = document.getElementById('btn-toggle-lang');
        const lblCurrLang = document.getElementById('lbl-curr-lang');
        if (btnToggleLang && window.I18n) {
            const updateLangLabel = () => {
                const curr = window.I18n.getLanguage();
                if (lblCurrLang) lblCurrLang.textContent = (curr === 'ar') ? 'English' : 'العربية';
            };
            updateLangLabel();
            btnToggleLang.addEventListener('click', () => {
                const curr = window.I18n.getLanguage();
                window.I18n.setLanguage(curr === 'ar' ? 'en' : 'ar');
                updateLangLabel();
            });
            window.addEventListener('languageChanged', updateLangLabel);
        }

        const btnToggleContrast = document.getElementById('btn-toggle-contrast');
        const lblContrast = document.getElementById('lbl-contrast');
        if (btnToggleContrast) {
            const savedContrast = localStorage.getItem('tajweed_contrast') || 'normal';
            if (savedContrast === 'high') {
                document.documentElement.setAttribute('data-contrast', 'high');
                if (lblContrast) lblContrast.textContent = 'Normal';
            }
            btnToggleContrast.addEventListener('click', () => {
                const isHigh = document.documentElement.getAttribute('data-contrast') === 'high';
                if (isHigh) {
                    document.documentElement.removeAttribute('data-contrast');
                    localStorage.setItem('tajweed_contrast', 'normal');
                    if (lblContrast) lblContrast.textContent = 'Contrast';
                    if (typeof window.showToast === 'function') window.showToast('Contrast: Standard');
                } else {
                    document.documentElement.setAttribute('data-contrast', 'high');
                    localStorage.setItem('tajweed_contrast', 'high');
                    if (lblContrast) lblContrast.textContent = 'Normal';
                    if (typeof window.showToast === 'function') window.showToast('Contrast: High Contrast (WCAG AAA)');
                }
            });
        }

        const btnToggleFont = document.getElementById('btn-toggle-font');
        const lblFont = document.getElementById('lbl-font');
        if (btnToggleFont) {
            const fontSizes = ['normal', 'large', 'xl'];
            const fontLabels = { normal: 'A+', large: 'A++', xl: 'A' };
            let currentFont = localStorage.getItem('tajweed_font_size') || 'normal';
            if (currentFont !== 'normal') {
                document.documentElement.setAttribute('data-font-size', currentFont);
            }
            if (lblFont) lblFont.textContent = fontLabels[currentFont] || 'A+';

            btnToggleFont.addEventListener('click', () => {
                const curIdx = fontSizes.indexOf(currentFont);
                const nextIdx = (curIdx + 1) % fontSizes.length;
                currentFont = fontSizes[nextIdx];
                if (currentFont === 'normal') {
                    document.documentElement.removeAttribute('data-font-size');
                } else {
                    document.documentElement.setAttribute('data-font-size', currentFont);
                }
                localStorage.setItem('tajweed_font_size', currentFont);
                if (lblFont) lblFont.textContent = fontLabels[currentFont];
                if (typeof window.showToast === 'function') window.showToast('Text Size: ' + currentFont.toUpperCase());
            });
        }
        
        // Mode Buttons
        document.getElementById('btn-mode-prog')?.addEventListener('click', () => {
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
            if (typeof window.switchScreen === 'function') window.switchScreen('screen-progressive');
            if (typeof window.renderProgressiveMap === 'function') window.renderProgressiveMap();
        });

        document.getElementById('btn-mode-free')?.addEventListener('click', () => {
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
            if (typeof window.switchScreen === 'function') window.switchScreen('screen-start');
            const hwPanel = document.getElementById('hw-teacher-panel');
            if (hwPanel) hwPanel.hidden = true;
            const startTitle = document.getElementById('start-title');
            if (startTitle) startTitle.textContent = "Challenge Setup ⚙️";
        });

        document.getElementById('btn-mode-hw')?.addEventListener('click', () => {
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
            if (typeof window.switchScreen === 'function') window.switchScreen('screen-homework');
            if (typeof window.renderHomeworkCreator === 'function') window.renderHomeworkCreator();
        });
        
        // Deep Links Route Parsing
        if (typeof window.parseURLModes === 'function') window.parseURLModes();

        document.getElementById('btn-show-lb-splash')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.showLeaderboard === 'function') window.showLeaderboard('screen-splash'); 
        });
        document.getElementById('btn-mode-lb')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.showLeaderboard === 'function') window.showLeaderboard('screen-mode-select'); 
        });
        
        // Theoretical Quiz Mode
        document.getElementById('btn-mode-theory')?.addEventListener('click', () => {
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.switchScreen === 'function') window.switchScreen('screen-theory-setup');
            if (typeof window.renderTheorySetupUI === 'function') window.renderTheorySetupUI();
        });
        document.getElementById('btn-start-theory-quiz')?.addEventListener('click', () => {
            if (typeof window.attemptStartTheoryGame === 'function') window.attemptStartTheoryGame();
        });
        document.getElementById('theory-student-name')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (typeof window.attemptStartTheoryGame === 'function') window.attemptStartTheoryGame();
            }
        });
        document.getElementById('btn-theory-select-all')?.addEventListener('click', () => {
            if (typeof window.setAllTheoryTopics === 'function') window.setAllTheoryTopics(true);
        });
        document.getElementById('btn-theory-deselect-all')?.addEventListener('click', () => {
            if (typeof window.setAllTheoryTopics === 'function') window.setAllTheoryTopics(false);
        });
        
        // Standard Start Challenge Game
        document.getElementById('btn-start-game')?.addEventListener('click', () => {
            if (typeof window.attemptStartGame === 'function') window.attemptStartGame();
        });
        document.getElementById('student-name')?.addEventListener('keydown', (e) => { 
            if (e.key === 'Enter') {
                if (typeof window.attemptStartGame === 'function') window.attemptStartGame();
            }
        });
        document.getElementById('prog-student-name')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const unlockedLvl = typeof window.getUnlockedLevel === 'function' ? window.getUnlockedLevel() : 1;
                const allStages = typeof window.getAllProgressiveStages === 'function' ? window.getAllProgressiveStages() : [];
                const lvlIdx = Math.max(0, allStages.findIndex(l => l.globalIdx + 1 === unlockedLvl));
                if (typeof window.startProgressiveLevel === 'function') window.startProgressiveLevel(lvlIdx >= 0 ? lvlIdx : 0);
            }
        });

        // Global Enter key navigation
        function handleGlobalEnter(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                const activeModal = document.querySelector('.modal-overlay.active, .modal-overlay[style*="flex"], #pause-modal[style*="flex"]');
                if (activeModal && activeModal.style.display !== 'none' && !activeModal.hidden) return;

                const splashScreen = document.getElementById('screen-splash');
                const isSplashActive = splashScreen && (splashScreen.classList.contains('active') || (getComputedStyle(splashScreen).display !== 'none' && splashScreen.style.display !== 'none'));

                if (isSplashActive) {
                    e.preventDefault();
                    try { if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); } catch(err){}
                    if (typeof window.switchScreen === 'function') window.switchScreen('screen-mode-select');
                    return;
                }

                const activeScreen = document.querySelector('.screen.active');
                if (!activeScreen) return;

                if (activeScreen.id === 'screen-mode-select') {
                    e.preventDefault();
                    try { if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); } catch(err){}
                    if (typeof window.switchScreen === 'function') window.switchScreen('screen-start');
                    const hwPanel = document.getElementById('hw-teacher-panel');
                    if (hwPanel) hwPanel.hidden = true;
                    const startTitle = document.getElementById('start-title');
                    if (startTitle) startTitle.textContent = "Challenge Setup ⚙️";
                    return;
                } else if (activeScreen.id === 'screen-start') {
                    if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
                    e.preventDefault();
                    if (typeof window.attemptStartGame === 'function') window.attemptStartGame();
                } else if (activeScreen.id === 'screen-progressive') {
                    if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
                    e.preventDefault();
                    const unlockedLvl = typeof window.getUnlockedLevel === 'function' ? window.getUnlockedLevel() : 1;
                    const allStages = typeof window.getAllProgressiveStages === 'function' ? window.getAllProgressiveStages() : [];
                    const lvlIdx = Math.max(0, allStages.findIndex(l => l.globalIdx + 1 === unlockedLvl));
                    if (typeof window.startProgressiveLevel === 'function') window.startProgressiveLevel(lvlIdx >= 0 ? lvlIdx : 0);
                } else if (activeScreen.id === 'screen-game') {
                    const nextBtn = document.getElementById('btn-next-action');
                    if (nextBtn && nextBtn.parentElement && nextBtn.parentElement.style.display !== 'none') {
                        e.preventDefault();
                        nextBtn.click();
                    }
                }
            }
        }

        window.addEventListener('keydown', handleGlobalEnter, true);

        setTimeout(() => {
            const btnEnter = document.getElementById('btn-enter-app');
            if (btnEnter) btnEnter.focus();
        }, 100);

        // In-game top bar buttons
        document.getElementById('btn-home-game')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            document.getElementById('exit-modal')?.classList.add('active'); 
        });
        document.getElementById('btn-end-challenge')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            document.getElementById('exit-modal')?.classList.add('active'); 
        });
        document.getElementById('btn-mute')?.addEventListener('click', () => {
            window.isMuted = !window.isMuted; 
            const muteBtn = document.getElementById('btn-mute');
            if (muteBtn) {
                muteBtn.classList.toggle('muted', window.isMuted); 
                muteBtn.textContent = window.isMuted ? '🔇' : '🔊';
            }
            if (typeof window.showToast === 'function') window.showToast(window.isMuted ? 'Sound Muted' : 'Sound Enabled');
        });

        document.getElementById('btn-pause')?.addEventListener('click', () => {
            if (typeof window.pauseGame === 'function') window.pauseGame();
        });
        document.getElementById('btn-resume')?.addEventListener('click', () => {
            if (typeof window.resumeGame === 'function') window.resumeGame();
        });
        document.getElementById('btn-end-game')?.addEventListener('click', () => {
            if (typeof window.quitGame === 'function') window.quitGame();
        });

        document.getElementById('example-selector')?.addEventListener('change', (e) => {
            if (typeof window.jumpToExample === 'function') window.jumpToExample(e.target.value);
        });
        document.getElementById('btn-prev')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.navQuestion === 'function') window.navQuestion(-1); 
        });
        document.getElementById('btn-next')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.navQuestion === 'function') window.navQuestion(1); 
        });

        // Power-ups
        ['hint', '5050', 'time', 'shield', 'freeze'].forEach(pu => {
            document.getElementById(`pu-${pu}`)?.addEventListener('click', () => {
                if (typeof window.usePowerUp === 'function') window.usePowerUp(pu);
            });
        });

        // Report buttons
        document.getElementById('btn-replay')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.switchScreen === 'function') window.switchScreen('screen-start'); 
        });
        document.getElementById('btn-home-report')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.switchScreen === 'function') window.switchScreen('screen-start'); 
        });
        document.getElementById('btn-lb-report')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.showLeaderboard === 'function') window.showLeaderboard('screen-report'); 
        });

        // Daily Challenge Mode Card
        const btnModeDaily = document.getElementById('btn-mode-daily');
        if (btnModeDaily) {
            btnModeDaily.addEventListener('click', () => {
                if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
                if (typeof window.StudentEngine !== 'undefined') {
                    const active = window.StudentEngine.getActiveStudent();
                    const challenge = window.StudentEngine.getDailyChallenge(active ? active.id : null);
                    if (challenge && challenge.questions && challenge.questions.length > 0) {
                        if (typeof window.showToast === 'function') window.showToast(`🔥 Daily Challenge: ${challenge.lessonContext || challenge.ruleTitle}`);
                        window.session.isDailyChallenge = true;
                        window.session.dailyChallengeInfo = challenge;
                        if (typeof window.initGameSession === 'function') window.initGameSession(false, challenge.questions);
                    } else {
                        if (typeof window.showToast === 'function') window.showToast('Starting Daily Challenge session...');
                        if (typeof window.switchScreen === 'function') window.switchScreen('screen-start');
                    }
                } else {
                    if (typeof window.switchScreen === 'function') window.switchScreen('screen-start');
                }
            });
        }

        // Certificate Button
        const btnCertRep = document.getElementById('btn-cert-report');
        if (btnCertRep) {
            btnCertRep.addEventListener('click', () => {
                if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
                if (window.CertificateGenerator) {
                    const teacherInfo = (typeof window.StudentEngine !== 'undefined' && window.StudentEngine.getTeacherInfo()) 
                        || (window.APP_CONFIG && window.APP_CONFIG.DEFAULT_TEACHER) 
                        || { name: 'Sheikh Gehad Elsayad' };
                    window.CertificateGenerator.generate({
                        studentName: window.session.studentName || 'Student',
                        worldTitle: 'Tajweed Mastery Challenge',
                        teacherName: teacherInfo.name
                    });
                } else if (typeof window.showToast === 'function') {
                    window.showToast('Certificate generator is loading...', true);
                }
            });
        }

        // Leaderboard clear & exit modals
        document.getElementById('btn-home-lb')?.addEventListener('click', () => { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            if (typeof window.switchScreen === 'function') window.switchScreen('screen-start'); 
        });
        document.getElementById('btn-clear-lb')?.addEventListener('click', () => {
            const doClear = () => {
                if (typeof window.writeStorage === 'function') window.writeStorage(window.LOCAL_STORAGE_KEY, { leaderboard: [] }); 
                if (typeof window.showLeaderboard === 'function') window.showLeaderboard('screen-start');
                if (typeof window.showToast === 'function') window.showToast('Leaderboard cleared.');
            };
            if (typeof window.showAppConfirm === 'function') {
                window.showAppConfirm("Are you sure you want to delete all local leaderboard data?", "Clear Leaderboard", doClear);
            } else if (confirm("Are you sure you want to delete all local leaderboard data?")) {
                doClear();
            }
        });

        document.getElementById('btn-cancel-exit')?.addEventListener('click', () => {
            document.getElementById('exit-modal')?.classList.remove('active');
        });
        document.getElementById('btn-confirm-exit')?.addEventListener('click', () => {
            document.getElementById('exit-modal')?.classList.remove('active'); 
            clearInterval(window.timerInterval); 
            if (typeof window.finishAndShowReport === 'function') window.finishAndShowReport(true);
        });
        
        const qImgEl = document.getElementById('q-img-element');
        if (qImgEl) {
            qImgEl.onerror = function() {
                const q = window.session.playlist ? window.session.playlist[window.session.playHead] : null;
                if (q) {
                    this.onerror = null; 
                    this.src = `https://placehold.co/800x400/f8fafc/334155?text=${encodeURIComponent('Local Image Missing\n' + q.id)}`;
                }
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

    window.initApp = initApp;

})(typeof window !== 'undefined' ? window : this);
