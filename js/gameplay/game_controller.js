/**
 * Game Controller & Session Orchestrator
 * Gameplay Layer: Timer, Answers Processing, State Progression, Modals
 */

(function(window) {
    'use strict';

    function pauseGame() {
        window.isGamePaused = true;
        clearInterval(window.timerInterval);
        clearTimeout(window.autoAdvanceTimer);
        const pauseModal = document.getElementById('pause-modal');
        if (pauseModal) pauseModal.style.display = 'flex';
    }

    function resumeGame() {
        window.isGamePaused = false;
        const pauseModal = document.getElementById('pause-modal');
        if (pauseModal) pauseModal.style.display = 'none';
        if (!window.isAnswering) {
            clearInterval(window.timerInterval);
            updateTimerUI();
            window.timerInterval = setInterval(() => {
                if (window.isFrozen || window.isGamePaused) return; 
                window.timeLeft--; 
                updateTimerUI();
                const soundThreshold = Math.ceil(window.TIME_LIMIT / 3);
                if (window.timeLeft <= soundThreshold && window.timeLeft > 0) {
                    if (window.timeLeft <= 5) {
                        if (typeof window.SFX !== 'undefined' && window.SFX.alarm) window.SFX.alarm();
                    } else {
                        if (typeof window.SFX !== 'undefined' && window.SFX.tickTock) window.SFX.tickTock();
                    }
                }
                if (window.timeLeft <= 0) {
                    clearInterval(window.timerInterval);
                    handleTimeout(window.session.playlist[window.session.playHead]);
                }
            }, 1000);
        }
    }

    function quitGame() {
        const doQuit = () => {
            window.isGamePaused = false;
            const pauseModal = document.getElementById('pause-modal');
            if (pauseModal) pauseModal.style.display = 'none';
            if (typeof window.finishAndShowReport === 'function') {
                window.finishAndShowReport(true);
            }
        };
        if (typeof window.showAppConfirm === 'function') {
            window.showAppConfirm('Are you sure you want to end the game?', 'End Game', doQuit);
        } else if (confirm('Are you sure you want to end the game?')) {
            doQuit();
        }
    }

    function startTimer() {
        clearInterval(window.timerInterval); 
        window.timeLeft = window.TIME_LIMIT; 
        updateTimerUI();
        window.timerInterval = setInterval(() => {
            if (window.isFrozen || window.isGamePaused) return; 
            window.timeLeft--; 
            updateTimerUI();
            const soundThreshold = Math.ceil(window.TIME_LIMIT / 3);
            if (window.timeLeft <= soundThreshold && window.timeLeft > 0) {
                if (window.timeLeft <= 5) {
                    if (typeof window.SFX !== 'undefined' && window.SFX.alarm) window.SFX.alarm();
                } else {
                    if (typeof window.SFX !== 'undefined' && window.SFX.tickTock) window.SFX.tickTock();
                }
            }
            if (window.timeLeft <= 0) {
                clearInterval(window.timerInterval);
                handleTimeout(window.session.playlist[window.session.playHead]);
            }
        }, 1000);
    }

    function updateTimerUI() {
        const txt = document.getElementById('timer-text'); 
        if (!txt) return;
        txt.textContent = window.timeLeft; 
        txt.parentElement.classList.toggle('urgent', window.timeLeft <= 5 && !window.isFrozen && window.timeLeft > 0);
        const starMeter = document.getElementById('star-meter');
        if (starMeter) {
            starMeter.innerHTML = window.timeLeft > 13 ? "★★★" : window.timeLeft > 6 ? "★★<span style='color:#cbd5e1;filter:grayscale(1)'>★</span>" : window.timeLeft > 0 ? "★<span style='color:#cbd5e1;filter:grayscale(1)'>★★</span>" : "<span style='color:#cbd5e1;filter:grayscale(1)'>★★★</span>";
        }
    }

    function handleTimeout(q) {
        if (!q || window.isAnswering) return;
        window.isAnswering = true;
        document.querySelectorAll('.ans-card').forEach(b => b.disabled = true);
        processAnswerRecord(q, null, false, 0); 
        if (typeof window.SFX !== 'undefined' && window.SFX.wrong) window.SFX.wrong();
        if (typeof window.setMascot === 'function') window.setMascot('sad');
        
        if (window.session.currentModifiers?.trap && !window.session.isPracticeMode) {
            window.session.score = Math.max(0, window.session.score - 10);
            if (typeof window.showToast === 'function') window.showToast("Time's Up! Trap Triggered! -10 Pts 💥", true);
        } else {
            if (typeof window.showToast === 'function') window.showToast("Time's Up! ⏰", true);
        }
        
        const qBox = document.getElementById('quran-box');
        if (qBox) qBox.classList.add('shake-anim');
        
        document.querySelectorAll('.ans-card').forEach(b => {
            if (b.dataset.answer === q.ans) {
                b.classList.add('correct');
                const firstSpan = b.querySelector('div')?.firstElementChild;
                if (firstSpan && !firstSpan.innerHTML.includes('🌟')) {
                    firstSpan.innerHTML = `🌟 ` + firstSpan.innerHTML;
                }
            }
        });
        if (typeof window.showExplanation === 'function') window.showExplanation(q); 
        window.isAnswering = false;
        showNextQuestionButton();
    }

    function handleAnswer(sel, btn, q) {
        if (window.FaridaMascot && typeof window.FaridaMascot.dismiss === 'function') {
            window.FaridaMascot.dismiss();
        }
        if (window.isAnswering) return;
        window.isAnswering = true;
        clearInterval(window.timerInterval);
        document.querySelectorAll('.ans-card').forEach(b => b.disabled = true);
        
        const isCorrect = (sel === q.ans);
        let starsEarned = isCorrect ? (window.timeLeft > 13 ? 3 : window.timeLeft > 6 ? 2 : 1) : 0;
        
        q.userAnswer = sel;
        q.wasCorrect = isCorrect;
        
        processAnswerRecord(q, sel, isCorrect, starsEarned, window.TIME_LIMIT - Math.max(0, window.timeLeft));

        btn.classList.add('selected-answer');
        btn.style.outline = isCorrect ? "3px solid #10b981" : "3px solid #ef4444";
        btn.style.outlineOffset = "3px";

        if (isCorrect) {
            if (typeof window.SFX !== 'undefined' && window.SFX.applause) window.SFX.applause();
            if (typeof window.confetti !== 'undefined') {
                window.confetti({ particleCount: 150, spread: 360, startVelocity: 35, origin: { y: 0.6 } });
            }
            btn.classList.add('correct');
            const firstSpan = btn.querySelector('div')?.firstElementChild;
            if (firstSpan && !firstSpan.innerHTML.includes('🌟')) {
                firstSpan.innerHTML = `🌟 ` + firstSpan.innerHTML;
            }
            
            let pts = 10 + (starsEarned * 5);
            if (window.session.currentModifiers?.golden) pts *= 2;
            
            if (!window.session.isPracticeMode) {
                window.session.streak++; 
                if (window.session.streak > window.session.bestStreak) window.session.bestStreak = window.session.streak;
                let streakMsg = "Correct! 🌟"; 
                if (window.session.streak === 3) {
                    pts += 10;
                    streakMsg = "🔥 x3 Combo!";
                } else if (window.session.streak === 10) {
                    pts += 20;
                    streakMsg = "👑 x10 LEGENDARY STREAK!";
                    if (typeof window.SFX !== 'undefined' && window.SFX.celebrateStreak10) window.SFX.celebrateStreak10();
                    if (typeof window.confetti !== 'undefined') {
                        window.confetti({ particleCount: 220, spread: 360, startVelocity: 45, origin: { y: 0.5 } });
                    }
                } else if (window.session.streak >= 5) {
                    pts += 20;
                    streakMsg = "🔥🔥 Super Streak!";
                }
                window.session.score += pts;
                window.session.coins += starsEarned; 
                if (typeof window.setMascot === 'function') window.setMascot('happy');
                if (typeof window.showToast === 'function') window.showToast(streakMsg, false);
            } else {
                if (typeof window.setMascot === 'function') window.setMascot('happy');
                if (typeof window.showToast === 'function') window.showToast("Fixed! 👍", false);
            }
        } else {
            if (typeof window.SFX !== 'undefined' && window.SFX.wrong) window.SFX.wrong();
            btn.classList.add('wrong', 'shake-anim'); 
            const wrongFirstSpan = btn.querySelector('div')?.firstElementChild;
            if (wrongFirstSpan && !wrongFirstSpan.innerHTML.includes('❌')) {
                wrongFirstSpan.innerHTML = `❌ ` + wrongFirstSpan.innerHTML;
            }
            const qBox = document.getElementById('quran-box');
            if (qBox) qBox.classList.add('shake-anim');
            
            if (window.hasShield && !window.session.isPracticeMode) { 
                window.hasShield = false; 
                const shieldInd = document.getElementById('shield-indicator');
                if (shieldInd) shieldInd.style.display = 'none';
                if (typeof window.showToast === 'function') window.showToast("Shield Used! 🛡️", false); 
            } else { 
                if (!window.session.isPracticeMode) {
                    window.session.streak = 0;
                    if (window.session.currentModifiers?.trap) {
                        window.session.score = Math.max(0, window.session.score - 10);
                        if (typeof window.showToast === 'function') window.showToast("Trap Triggered! -10 Points 💥", true);
                    } else {
                        if (typeof window.showToast === 'function') window.showToast("Streak Lost! 💔", true); 
                    }
                } else {
                    if (typeof window.showToast === 'function') window.showToast("Keep trying!", true);
                }
                if (typeof window.setMascot === 'function') window.setMascot('sad'); 
            }
            document.querySelectorAll('.ans-card').forEach(b => {
                if (b.dataset.answer === q.ans) {
                    b.classList.add('correct');
                    const correctFirstSpan = b.querySelector('div')?.firstElementChild;
                    if (correctFirstSpan && !correctFirstSpan.innerHTML.includes('🌟')) {
                        correctFirstSpan.innerHTML = `🌟 ` + correctFirstSpan.innerHTML;
                    }
                }
            });
        }
        if (typeof window.showExplanation === 'function') window.showExplanation(q); 
        window.isAnswering = false;
        updateHUD(); 

        clearTimeout(window._audioPlayTimeout);
        if (q._audioObj && (typeof window.isMuted === 'undefined' || !window.isMuted)) {
            try {
                window._audioPlayTimeout = setTimeout(() => {
                    window.currentPlayingAudio = q._audioObj;
                    q._audioObj.currentTime = 0;
                    q._audioObj.play().catch(() => {});
                }, 400);
            } catch(e) {}
        }
        
        showNextQuestionButton();
    }

    function showNextQuestionButton() {
        let nextActionBox = document.getElementById('next-action-container');
        let nextBtn = document.getElementById('btn-next-action');
        if (nextActionBox && nextBtn) {
            nextActionBox.style.display = 'block';
            nextBtn.onclick = () => {
                if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
                nextQuestion();
            };
        }
    }

    function processAnswerRecord(q, studentAns, isCorrect, stars, timeTaken = 20) {
        window.session.responses = window.session.responses.filter(r => r.qId !== q.id);
        
        let correctData = (typeof window.ruleMeanings !== 'undefined' && window.ruleMeanings[q.ans]) ? window.ruleMeanings[q.ans] : { en: q.ans, franco: q.ans };
        let correctMeaning = q.isTheory ? q.ans : `${correctData.en} (${correctData.franco || correctData.ar || correctData.en})`;
        
        let studentMeaning = "Timeout";
        if (studentAns) {
            let studentData = (typeof window.ruleMeanings !== 'undefined' && window.ruleMeanings[studentAns]) ? window.ruleMeanings[studentAns] : { en: studentAns, franco: studentAns };
            studentMeaning = q.isTheory ? studentAns : `${studentData.en} (${studentData.franco || studentData.ar || studentData.en})`;
        }

        let generatedExpl = q.explanation || (typeof window.ruleExplanations !== 'undefined' && window.ruleExplanations[q.ans]) || `This is an example of ${q.ans}.`;

        window.session.responses.push({ 
            qId: q.id,
            categoryId: q.categoryId,
            categoryTitle: q.categoryTitle,
            isTheory: q.isTheory,
            prompt: q.prompt,
            src: q.src, 
            correctRule: correctMeaning, 
            studentRule: studentMeaning, 
            isCorrect: isCorrect, 
            time: timeTaken,
            explanation: generatedExpl 
        });

        if (!isCorrect && typeof window.StudentEngine !== 'undefined') {
            window.StudentEngine.addMistake({
                qId: q.id,
                categoryId: q.categoryId,
                categoryTitle: q.categoryTitle,
                isTheory: q.isTheory,
                prompt: q.prompt,
                src: q.src,
                correctRule: correctMeaning,
                studentRule: studentMeaning,
                rule: q.ans,
                explanation: generatedExpl
            });
        }

        if (!window.session.isPracticeMode) window.session.stars += stars;
    }

    const MASCOT_INTERRUPT_INTERVAL = 6;
    const MASCOT_INTERRUPT_MODE = 'alternate';
    let mascotInterruptCounter = 0;

    function triggerMascotInterrupt(onComplete) {
        const tips = (typeof window !== 'undefined' && window.MASCOT_TIPS) || [];
        const icebreakers = (typeof window !== 'undefined' && window.MASCOT_ICEBREAKERS) || [];

        if (tips.length === 0 && icebreakers.length === 0) {
            onComplete();
            return;
        }

        const isIcebreaker = (MASCOT_INTERRUPT_MODE === 'alternate')
            ? (mascotInterruptCounter % 2 === 1 && icebreakers.length > 0)
            : (Math.random() > 0.5 && icebreakers.length > 0);
        mascotInterruptCounter++;

        let modal = document.getElementById('mascot-interrupt-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'mascot-interrupt-modal';
            modal.className = 'mascot-interrupt-overlay';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-label', "Farida's Learning Break");
            document.body.appendChild(modal);
        }

        let advanceTimer = null;
        let countdownInterval = null;

        const closeAndResume = () => {
            if (advanceTimer) { clearTimeout(advanceTimer); advanceTimer = null; }
            if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
            modal.classList.remove('active');
            modal.style.display = 'none';
            if (typeof window.setMascot === 'function') window.setMascot('idle');
            onComplete();
        };

        if (!isIcebreaker) {
            const tip = tips[Math.floor(Math.random() * tips.length)];
            const isTajweed = (tip.type === 'tajweed');
            const badgeStyle = isTajweed 
                ? 'background:#eff6ff; color:#1d4ed8; border:1.5px solid #bfdbfe;' 
                : 'background:#f0fdf4; color:#15803d; border:1.5px solid #bbf7d0;';
            const badgeLabel = isTajweed ? '📖 Tajweed Tip' : '🌙 Islamic Reminder';

            modal.innerHTML = `
                <div class="mascot-interrupt-card">
                    <div class="mascot-interrupt-badge" style="${badgeStyle}">
                        ${badgeLabel}
                    </div>
                    <div class="mascot-interrupt-avatar">
                        <span>🧕</span>
                    </div>
                    <h3 class="mascot-interrupt-title">Farida's Quick Break ✨</h3>
                    <p class="mascot-interrupt-text">"${tip.text}"</p>
                    <button id="btn-mascot-continue" class="mascot-continue-btn" type="button" aria-label="Continue Quiz">
                        Continue Quiz ➡ (<span id="mascot-countdown">4</span>s)
                    </button>
                </div>
            `;

            modal.style.display = 'flex';
            modal.classList.add('active');
            if (typeof window.setMascot === 'function') window.setMascot('happy');
            if (typeof window.SFX !== 'undefined' && window.SFX.ting) window.SFX.ting();

            let secondsLeft = 4;
            const countdownSpan = modal.querySelector('#mascot-countdown');
            countdownInterval = setInterval(() => {
                secondsLeft--;
                if (countdownSpan) countdownSpan.textContent = secondsLeft;
                if (secondsLeft <= 0) {
                    clearInterval(countdownInterval);
                }
            }, 1000);

            advanceTimer = setTimeout(closeAndResume, 4000);

            const btnContinue = modal.querySelector('#btn-mascot-continue');
            if (btnContinue) {
                btnContinue.onclick = () => {
                    if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
                    closeAndResume();
                };
            }
        } else {
            const ib = icebreakers[Math.floor(Math.random() * icebreakers.length)];

            modal.innerHTML = `
                <div class="mascot-interrupt-card">
                    <div class="mascot-interrupt-badge" style="background:#fef3c7; color:#92400e; border:1.5px solid #fde68a;">
                        🎲 Farida's Mini Icebreaker
                    </div>
                    <div class="mascot-interrupt-avatar">
                        <span>🎯</span>
                    </div>
                    <h3 class="mascot-interrupt-title">Quick Fun Question!</h3>
                    <p class="mascot-interrupt-text" style="color:#0f172a;">${ib.question}</p>
                    <div style="font-size:0.8rem; color:#64748b; font-weight:700; margin-top:-6px;">
                        Zero pressure • Purely for fun!
                    </div>
                    <div class="mascot-interrupt-options" id="mascot-ib-options">
                        ${ib.options.map((opt, idx) => `
                            <button type="button" class="mascot-option-btn" data-index="${idx}">${opt}</button>
                        `).join('')}
                    </div>
                    <div id="mascot-funfact" class="mascot-funfact-box" style="display:none;"></div>
                    <button id="btn-mascot-continue" class="mascot-continue-btn" type="button" style="display:none; margin-top:6px;" aria-label="Continue Quiz">
                        Continue Quiz ➡
                    </button>
                </div>
            `;

            modal.style.display = 'flex';
            modal.classList.add('active');
            if (typeof window.SFX !== 'undefined' && window.SFX.ting) window.SFX.ting();

            const optionBtns = modal.querySelectorAll('.mascot-option-btn');
            const funFactBox = modal.querySelector('#mascot-funfact');
            const btnContinue = modal.querySelector('#btn-mascot-continue');

            optionBtns.forEach(btn => {
                btn.onclick = () => {
                    const selIdx = parseInt(btn.dataset.index, 10);
                    optionBtns.forEach(b => b.disabled = true);

                    const isCorrect = (selIdx === ib.correctIndex);
                    if (isCorrect) {
                        btn.classList.add('correct');
                        if (typeof window.SFX !== 'undefined' && window.SFX.ting) window.SFX.ting();
                    } else {
                        btn.classList.add('wrong');
                        const correctBtn = modal.querySelector(`.mascot-option-btn[data-index="${ib.correctIndex}"]`);
                        if (correctBtn) correctBtn.classList.add('correct');
                        if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
                    }

                    if (typeof window.setMascot === 'function') window.setMascot('happy');

                    if (funFactBox) {
                        funFactBox.innerHTML = `💡 <strong>${ib.funFact}</strong>`;
                        funFactBox.style.display = 'block';
                    }

                    if (btnContinue) {
                        btnContinue.style.display = 'inline-block';
                        btnContinue.onclick = () => {
                            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
                            closeAndResume();
                        };
                    }

                    advanceTimer = setTimeout(closeAndResume, 2800);
                };
            });
        }
    }

    function nextQuestion() {
        if (typeof window.stopAllActiveAudio === 'function') window.stopAllActiveAudio();
        clearTimeout(window.autoAdvanceTimer);
        const nextActionBox = document.getElementById('next-action-container');
        if (nextActionBox) nextActionBox.style.display = 'none';
        const expBox = document.getElementById('explanation-box');
        if (expBox) {
            expBox.classList.remove('show');
            expBox.innerHTML = '';
        }
        window.session.playHead++; 
        if (window.session.playHead >= window.session.playlist.length) {
            if (typeof window.finishAndShowReport === 'function') {
                window.finishAndShowReport();
            }
            return;
        }

        if (window.session.playHead > 0 && (window.session.playHead % MASCOT_INTERRUPT_INTERVAL === 0)) {
            triggerMascotInterrupt(() => {
                if (typeof window.loadQuestion === 'function') window.loadQuestion();
            });
            return;
        }

        if (window.session.playHead > 0 && window.session.playHead % 20 === 0) {
            if (typeof window.showLogoPopup === 'function') window.showLogoPopup(window.session.playHead);
            setTimeout(() => {
                if (typeof window.loadQuestion === 'function') window.loadQuestion();
            }, 3000);
        } else {
            if (typeof window.loadQuestion === 'function') window.loadQuestion();
        }
    }

    function updateHUD() {
        const scoreDisp = document.getElementById('score-display');
        const coinsDisp = document.getElementById('coins-display');
        if (scoreDisp) scoreDisp.textContent = window.session.score; 
        if (coinsDisp) coinsDisp.textContent = window.session.coins;
        
        const sBadge = document.getElementById('streak-badge'); 
        const sDisp = document.getElementById('streak-display');
        if (sBadge) {
            if (window.session.streak > 1) { 
                sBadge.style.display = 'flex';
                if (sDisp) sDisp.textContent = window.session.streak; 
            } else {
                sBadge.style.display = 'none';
            }
        }
        
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        if (btnPrev) btnPrev.disabled = window.session.playHead === 0;
        if (btnNext) btnNext.disabled = window.session.playlist ? window.session.playHead >= window.session.playlist.length - 1 : false;

        const topCounter = document.getElementById('top-nav-counter');
        if (topCounter && window.session.playlist) {
            topCounter.textContent = `${window.session.playHead + 1} / ${window.session.playlist.length}`;
        }
        const topNav = document.getElementById('top-nav-controls');
        const hudStats = document.getElementById('hud-stats');
        if (topNav) topNav.style.display = 'flex';
        if (hudStats) hudStats.style.display = 'flex';
        
        const costs = { '5050': 5, 'time': 5, 'shield': 10, 'freeze': 10 };
        ['5050', 'time', 'shield', 'freeze'].forEach(t => { 
            const btn = document.getElementById(`pu-${t}`);
            if (btn) btn.disabled = (window.session.coins < costs[t]) || window.session.isPracticeMode || window.isAnswering; 
        });
        const hintBtn = document.getElementById('pu-hint');
        if (hintBtn) hintBtn.disabled = window.session.isPracticeMode || window.isAnswering;
    }

    function smartMix(pool) {
        if (!pool || pool.length <= 1) return pool ? [...pool] : [];

        const shuffle = (typeof window.shuffleArray === 'function') 
            ? window.shuffleArray 
            : (arr => [...arr].sort(() => Math.random() - 0.5));

        const getRule = q => q.subcat || q.ans || q.categoryId;
        const getCat = q => q.categoryId;

        let remaining = shuffle(pool);
        let result = [];

        while (remaining.length > 0) {
            const len = result.length;
            const last1 = len >= 1 ? result[len - 1] : null;
            const last2 = len >= 2 ? result[len - 2] : null;

            const ruleRepeat2 = (last1 && last2 && getRule(last1) === getRule(last2)) ? getRule(last1) : null;
            const catRepeat2 = (last1 && last2 && getCat(last1) === getCat(last2)) ? getCat(last1) : null;

            const hasDiffRule = ruleRepeat2 ? remaining.some(q => getRule(q) !== ruleRepeat2) : false;
            const hasDiffCat = catRepeat2 ? remaining.some(q => getCat(q) !== catRepeat2) : false;

            let validCandidates = remaining.filter(q => {
                if (hasDiffRule && getRule(q) === ruleRepeat2) return false;
                if (hasDiffCat && getCat(q) === catRepeat2) return false;
                return true;
            });

            if (validCandidates.length === 0) {
                if (hasDiffRule) {
                    validCandidates = remaining.filter(q => getRule(q) !== ruleRepeat2);
                }
            }
            if (validCandidates.length === 0) {
                validCandidates = remaining;
            }

            const ruleCounts = {};
            remaining.forEach(q => {
                const r = getRule(q);
                ruleCounts[r] = (ruleCounts[r] || 0) + 1;
            });

            validCandidates.sort((a, b) => {
                const rA = getRule(a);
                const rB = getRule(b);
                let scoreA = ruleCounts[rA] * 2 + Math.random() * 2;
                let scoreB = ruleCounts[rB] * 2 + Math.random() * 2;
                if (last1 && rA === getRule(last1)) scoreA -= 2.5;
                if (last1 && rB === getRule(last1)) scoreB -= 2.5;
                return scoreB - scoreA;
            });

            const chosen = validCandidates[0];
            const idx = remaining.indexOf(chosen);
            remaining.splice(idx, 1);
            result.push(chosen);
        }
        return result;
    }

    function initGameSession(isPractice = false, practicePlaylist = []) {
        clearInterval(window.timerInterval);
        const msgToast = document.getElementById('msg-toast');
        if (msgToast) msgToast.classList.remove('show');

        if (Array.isArray(isPractice)) {
            let pool = isPractice;
            let qty = typeof practicePlaylist === 'number' ? practicePlaylist : pool.length;
            let mixed = smartMix(pool);
            practicePlaylist = mixed.slice(0, qty);
            isPractice = false;
        }
        
        window.session = { 
            isPracticeMode: isPractice,
            studentName: window.session.studentName,
            studentAvatar: window.session.studentAvatar,
            score: 0, coins: 0, stars: 0, streak: 0, bestStreak: 0, 
            responses: [], 
            playlist: practicePlaylist,
            playHead: 0,
            startTime: Date.now(), endTime: 0
        };
        
        const pracBadge = document.getElementById('practice-badge');
        if (pracBadge) pracBadge.style.display = isPractice ? 'block' : 'none';
        if (typeof window.switchScreen === 'function') window.switchScreen('screen-game'); 
        if (typeof window.loadQuestion === 'function') window.loadQuestion();
    }

    function attemptStartGame() {
        if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();

        if (window.isHomeworkMode && typeof window.launchHomeworkGame === 'function') {
            window.launchHomeworkGame();
            return;
        }

        const input = document.getElementById('student-name');
        const nameErr = document.getElementById('name-error');
        const setupErr = document.getElementById('setup-error');

        let name = input ? input.value.trim().replace(/\s+/g, ' ') : '';
        if (!name) name = "Champion";
        if (name.length > 20) name = name.slice(0, 20);

        if (nameErr) nameErr.hidden = true;
        if (setupErr) setupErr.hidden = true;
        if (input) input.setAttribute('aria-invalid', 'false');

        let pool = [];
        if (window.activeRseInstance && typeof window.activeRseInstance.getPool === 'function') {
            pool = window.activeRseInstance.getPool();
        } else if (typeof window.RuleSelectorEngine !== 'undefined') {
            pool = window.RuleSelectorEngine.buildPool();
        } else if (typeof window.QuestionRepository !== 'undefined') {
            pool = window.QuestionRepository.queryQuestions();
        }

        if (!pool || pool.length === 0) {
            if (setupErr) {
                setupErr.textContent = "Please select at least one Tajweed rule or sub-rule before starting.";
                setupErr.hidden = false;
            }
            return;
        }

        let timerSelect = parseInt(document.getElementById('timer-select')?.value);
        if (!isNaN(timerSelect)) window.TIME_LIMIT = timerSelect;

        let finalPlaylist = smartMix(pool);

        const activeStd = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;
        if (activeStd) {
            window.session.studentName = activeStd.name;
            window.session.studentAvatar = activeStd.avatar;
        } else {
            window.session.studentName = name;
            window.session.studentAvatar = typeof window.currentStudentAvatar !== 'undefined' ? window.currentStudentAvatar : null;
        }
        initGameSession(false, finalPlaylist);
    }

    window.pauseGame = pauseGame;
    window.resumeGame = resumeGame;
    window.quitGame = quitGame;
    window.startTimer = startTimer;
    window.updateTimerUI = updateTimerUI;
    window.handleTimeout = handleTimeout;
    window.handleAnswer = handleAnswer;
    window.showNextQuestionButton = showNextQuestionButton;
    window.processAnswerRecord = processAnswerRecord;
    window.triggerMascotInterrupt = triggerMascotInterrupt;
    window.nextQuestion = nextQuestion;
    window.updateHUD = updateHUD;
    window.smartMix = smartMix;
    window.initGameSession = initGameSession;
    window.attemptStartGame = attemptStartGame;

})(typeof window !== 'undefined' ? window : this);
