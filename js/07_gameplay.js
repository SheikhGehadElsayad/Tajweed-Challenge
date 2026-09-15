        let isGamePaused = false;
        let pausedTimeLeft = 0;

        function pauseGame() {
            isGamePaused = true;
            clearInterval(timerInterval);
            clearTimeout(window.autoAdvanceTimer);
            document.getElementById('pause-modal').style.display = 'flex';
        }

        function resumeGame() {
            isGamePaused = false;
            document.getElementById('pause-modal').style.display = 'none';
            if (!isAnswering) {
                // resume timer
                clearInterval(timerInterval);
                updateTimerUI();
                timerInterval = setInterval(() => {
                    if(isFrozen || isGamePaused) return; 
                    timeLeft--; 
                    updateTimerUI();
                    const soundThreshold = Math.ceil(TIME_LIMIT / 3);
                    if(timeLeft <= soundThreshold && timeLeft > 0) {
                        if(timeLeft <= 5) SFX.alarm();
                        else SFX.tickTock();
                    }
                    if(timeLeft <= 0) { clearInterval(timerInterval); handleTimeout(session.playlist[session.playHead]); }
                }, 1000);
            }
        }

        function quitGame() {
            const doQuit = () => {
                isGamePaused = false;
                document.getElementById('pause-modal').style.display = 'none';
                finishAndShowReport();
            };
            if (typeof showAppConfirm === 'function') {
                showAppConfirm('Are you sure you want to end the game?', 'End Game', doQuit);
            } else if (confirm('Are you sure you want to end the game?')) {
                doQuit();
            }
        }

        function startTimer() {
            clearInterval(timerInterval); 
            timeLeft = TIME_LIMIT; 
            updateTimerUI();
            timerInterval = setInterval(() => {
                if(isFrozen || isGamePaused) return; 
                timeLeft--; 
                updateTimerUI();
                const soundThreshold = Math.ceil(TIME_LIMIT / 3);
                if(timeLeft <= soundThreshold && timeLeft > 0) {
                    if(timeLeft <= 5) SFX.alarm();
                    else SFX.tickTock();
                }
                if(timeLeft <= 0) { clearInterval(timerInterval); handleTimeout(session.playlist[session.playHead]); }
            }, 1000);
        }

        function updateTimerUI() {
            const txt = document.getElementById('timer-text'); 
            txt.textContent = timeLeft; 
            txt.parentElement.classList.toggle('urgent', timeLeft <= 5 && !isFrozen && timeLeft > 0);
            document.getElementById('star-meter').innerHTML = timeLeft > 13 ? "★★★" : timeLeft > 6 ? "★★<span style='color:#cbd5e1;filter:grayscale(1)'>★</span>" : timeLeft > 0 ? "★<span style='color:#cbd5e1;filter:grayscale(1)'>★★</span>" : "<span style='color:#cbd5e1;filter:grayscale(1)'>★★★</span>";
        }

                        function showExplanation(q) {
            const expBox = document.getElementById('explanation-box');
            
            if (q.isTheory) {
                expBox.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; line-height:1.4; text-align:center; width:100%; padding: 4px;">
                        <div style="font-weight:900; font-size:1.05rem; color:#1e293b;">
                            Answer: <span style="color:#15803d; font-weight:900;">${q.ans}</span>
                        </div>
                        <div style="font-size:0.95rem; color:#334155; font-weight:700; max-width:92%;">
                            💡 ${q.explanation || ''}
                        </div>
                    </div>
                `;
                expBox.classList.add('show');
                announce(expBox.innerText);
                return;
            }

            let generatedExpl = q.explanation;
            
            if (q.categoryId === 'image_bank' || q.ans === 'Two counts of ghunna') {
                generatedExpl = "This is the most complete ghunna.";
            }

            if (!generatedExpl) {
                if (q.ans === 'Heavy Raa' || (q.ans === 'Heavy' && q.categoryId === 'tafkheem_tarqeeq')) {
                    generatedExpl = "Raa with Fathah or Dammah (or Saakinah preceded by Fathah/Dammah) → Heavy Raa (Mufakhkhamah).";
                } else if (q.ans === 'Light Raa' || (q.ans === 'Light' && q.categoryId === 'tafkheem_tarqeeq')) {
                    generatedExpl = "Raa with Kasrah (or Saakinah preceded by Kasrah or Yaa) → Light Raa (Muraqqaqah).";
                } else if (q.ans === 'Heavy Letter' || q.subcat === 'Always Heavy') {
                    generatedExpl = "This letter is from Isti'la letters (Khas Dagt Qiz) → Always Heavy (Tafkheem).";
                } else if (q.ans === 'Light Letter') {
                    generatedExpl = "This letter is from Istifal letters → Always Light (Tarqeeq).";
                } else if (q.ans === 'Heavy Laam' || (q.subcat === 'Lam of Allah' && q.ans === 'Heavy')) {
                    generatedExpl = "Lam in 'Allah' preceded by Fathah or Dammah → Heavy Lam (Tafkheem).";
                } else if (q.ans === 'Light Laam' || (q.subcat === 'Lam of Allah' && q.ans === 'Light')) {
                    generatedExpl = "Lam in 'Allah' preceded by Kasrah → Light Lam (Tarqeeq).";
                } else if (q.ans === 'Heavy Alif') {
                    generatedExpl = "Alif follows a heavy letter → Heavy Alif.";
                } else if (q.ans === 'Light Alif') {
                    generatedExpl = "Alif follows a light letter → Light Alif.";
                } else if (q.ans === 'Heavy' && q.prompt && q.prompt.toLowerCase().includes('ikhfa')) {
                    generatedExpl = "The following Ikhfa letter is heavy (Saad, Dhad, Taa', Zhaa, Qaaf) → Heavy Ghunnah.";
                } else if (q.ans === 'Light' && q.prompt && q.prompt.toLowerCase().includes('ikhfa')) {
                    generatedExpl = "The following Ikhfa letter is light → Light Ghunnah.";
                } else if (q.ans && q.ans.includes('Tarqeeq is preferred')) {
                    generatedExpl = "Raa with Sukoon when stopping preceded by Kasrah → Both permissible, Light (Tarqeeq) is preferred.";
                } else if (q.ans && q.ans.includes('Tafkheem is preferred')) {
                    generatedExpl = "Raa with Sukoon when stopping preceded by Fathah/Dammah or Isti'la letter → Both permissible, Heavy (Tafkheem) is preferred.";
                } else if (q.ans === 'Natural Madd') {
                    generatedExpl = "Madd letter with no Hamzah or Sukoon after it → Natural Madd (Madd Tabe'e, 2 counts).";
                } else {
                    generatedExpl = `Condition met for ${q.ans}.`;
                }
            }
            
            let durationBadge = '';
            if (q.categoryId === 'madd_rules' || (typeof maddCounts !== 'undefined' && maddCounts[q.ans])) {
                let countText = "2 Counts (Harakat)";
                if (typeof maddCounts !== 'undefined' && maddCounts[q.ans]) countText = maddCounts[q.ans];
                durationBadge = `<span style="display:inline-flex; align-items:center; background:#fef3c7; color:#92400e; font-weight:900; font-size:0.86rem; padding:2px 10px; border-radius:999px; border:1px solid #fde68a; white-space:nowrap;">⏱️ ${countText}</span>`;
            } else if (q.categoryId === 'image_bank' || (q.ans && (q.ans.includes('ghunna') || q.ans.includes('Ghunnah')))) {
                durationBadge = `<span style="display:inline-flex; align-items:center; background:#dcfce7; color:#166534; font-weight:900; font-size:0.86rem; padding:2px 10px; border-radius:999px; border:1px solid #bbf7d0; white-space:nowrap;">⏱️ Ghunnah: 2 Counts</span>`;
            }

            const ruleData = (typeof ruleMeanings !== 'undefined' && ruleMeanings[q.ans]) ? ruleMeanings[q.ans] : { en: q.ans, franco: q.ans };
            const francoText = ruleData.franco || ruleData.en;
            
            expBox.innerHTML = `
                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:4px 10px; line-height:1.2; text-align:center; width:100%;">
                    ${durationBadge}
                    <span style="font-weight:900; font-size:0.92rem; color:#1e293b;">Rule: ${ruleData.en} <span style="color:#64748b; font-weight:800;">(${francoText})</span></span>
                    <span style="font-size:0.90rem; color:#334155; font-weight:700;">💡 ${generatedExpl}</span>
                </div>
            `;
            expBox.classList.add('show');
            announce(expBox.innerText);
        }

        function handleTimeout(q) {
            if(isAnswering) return; isAnswering = true;
            document.querySelectorAll('.ans-card').forEach(b => b.disabled = true);
            processAnswerRecord(q, null, false, 0); 
            SFX.wrong(); setMascot('sad');
            
            if (session.currentModifiers?.trap && !session.isPracticeMode) {
                session.score = Math.max(0, session.score - 10);
                showToast("Time's Up! Trap Triggered! -10 Pts 💥", true);
            } else {
                showToast("Time's Up! ⏰", true);
            }
            
            document.getElementById('quran-box').classList.add('shake-anim');
            
            document.querySelectorAll('.ans-card').forEach(b => {
                if(b.dataset.answer === q.ans) {
                    b.classList.add('correct');
                    const firstSpan = b.querySelector('div').firstElementChild;
                    if (!firstSpan.innerHTML.includes('🌟')) {
                        firstSpan.innerHTML = `🌟 ` + firstSpan.innerHTML;
                    }
                }
            });
            showExplanation(q); 
            isAnswering = false;
            showNextQuestionButton();
        }

        function handleAnswer(sel, btn, q) {
            if (window.FaridaMascot && typeof window.FaridaMascot.dismiss === 'function') {
                window.FaridaMascot.dismiss();
            }
            if(isAnswering) return; isAnswering = true; clearInterval(timerInterval);
            document.querySelectorAll('.ans-card').forEach(b => b.disabled = true);
            
            const isCorrect = (sel === q.ans);
            let starsEarned = isCorrect ? (timeLeft > 13 ? 3 : timeLeft > 6 ? 2 : 1) : 0;
            
            // Save state
            q.userAnswer = sel;
            q.wasCorrect = isCorrect;
            
            processAnswerRecord(q, sel, isCorrect, starsEarned, TIME_LIMIT - Math.max(0, timeLeft));

            // Clearly indicate selected button
            btn.classList.add('selected-answer');
            btn.style.outline = isCorrect ? "3px solid #10b981" : "3px solid #ef4444";
            btn.style.outlineOffset = "3px";

            if(isCorrect) {
                SFX.applause();
                if(typeof confetti !== 'undefined') confetti({ particleCount: 150, spread: 360, startVelocity: 35, origin: { y: 0.6 } }); 
                btn.classList.add('correct');
                const firstSpan = btn.querySelector('div').firstElementChild;
                if (!firstSpan.innerHTML.includes('🌟')) {
                    firstSpan.innerHTML = `🌟 ` + firstSpan.innerHTML;
                }
                
                let pts = 10 + (starsEarned * 5);
                if (session.currentModifiers?.golden) pts *= 2;
                
                if (!session.isPracticeMode) {
                    session.streak++; 
                    if(session.streak > session.bestStreak) session.bestStreak = session.streak;
                    let streakMsg = "Correct! 🌟"; 
                    if(session.streak === 3) { pts += 10; streakMsg = "🔥 x3 Combo!"; } 
                    else if(session.streak === 10) {
                        pts += 20;
                        streakMsg = "👑 x10 LEGENDARY STREAK!";
                        if (typeof SFX !== 'undefined' && SFX.celebrateStreak10) SFX.celebrateStreak10();
                        if (typeof confetti !== 'undefined') {
                            confetti({ particleCount: 220, spread: 360, startVelocity: 45, origin: { y: 0.5 } });
                        }
                    }
                    else if(session.streak >= 5) { pts += 20; streakMsg = "🔥🔥 Super Streak!"; }
                    session.score += pts; session.coins += starsEarned; 
                    setMascot('happy'); showToast(streakMsg, false);
                } else { setMascot('happy'); showToast("Fixed! 👍", false); }
            } else {
                SFX.wrong(); 
                btn.classList.add('wrong', 'shake-anim'); 
                const wrongFirstSpan = btn.querySelector('div').firstElementChild;
                if (!wrongFirstSpan.innerHTML.includes('❌')) {
                    wrongFirstSpan.innerHTML = `❌ ` + wrongFirstSpan.innerHTML;
                }
                document.getElementById('quran-box').classList.add('shake-anim');
                
                if(hasShield && !session.isPracticeMode) { 
                    hasShield = false; 
                    document.getElementById('shield-indicator').style.display = 'none';
                    showToast("Shield Used! 🛡️", false); 
                } else { 
                    if (!session.isPracticeMode) {
                        session.streak = 0;
                        if (session.currentModifiers?.trap) {
                            session.score = Math.max(0, session.score - 10);
                            showToast("Trap Triggered! -10 Points 💥", true);
                        } else {
                            showToast("Streak Lost! 💔", true); 
                        }
                    } else {
                        showToast("Keep trying!", true);
                    }
                    setMascot('sad'); 
                }
                document.querySelectorAll('.ans-card').forEach(b => {
                    if(b.dataset.answer === q.ans) {
                        b.classList.add('correct');
                        const correctFirstSpan = b.querySelector('div').firstElementChild;
                        if (!correctFirstSpan.innerHTML.includes('🌟')) {
                            correctFirstSpan.innerHTML = `🌟 ` + correctFirstSpan.innerHTML;
                        }
                    }
                });
            }
            showExplanation(q); 
            isAnswering = false;
            updateHUD(); 

            // Play Sheikh's audio pronunciation if available
            clearTimeout(window._audioPlayTimeout);
            if (q._audioObj && (typeof isMuted === 'undefined' || !isMuted)) {
                try {
                    window._audioPlayTimeout = setTimeout(() => {
                        window.currentPlayingAudio = q._audioObj;
                        q._audioObj.currentTime = 0;
                        q._audioObj.play().catch(() => {});
                    }, 400);
                } catch(e) {}
            }
            
            // Show explicit Next Question button underneath explanation
            showNextQuestionButton();
        }

        function showNextQuestionButton() {
            let nextActionBox = document.getElementById('next-action-container');
            let nextBtn = document.getElementById('btn-next-action');
            if (nextActionBox && nextBtn) {
                nextActionBox.style.display = 'block';
                nextBtn.onclick = () => { SFX.click(); nextQuestion(); };
            }
        }

        function processAnswerRecord(q, studentAns, isCorrect, stars, timeTaken = 20) {
            session.responses = session.responses.filter(r => r.qId !== q.id);
            
            let correctData = (typeof ruleMeanings !== 'undefined' && ruleMeanings[q.ans]) ? ruleMeanings[q.ans] : { en: q.ans, franco: q.ans };
            let correctMeaning = q.isTheory ? q.ans : `${correctData.en} (${correctData.franco || correctData.ar || correctData.en})`;
            
            let studentMeaning = "Timeout";
            if(studentAns) {
                let studentData = (typeof ruleMeanings !== 'undefined' && ruleMeanings[studentAns]) ? ruleMeanings[studentAns] : { en: studentAns, franco: studentAns };
                studentMeaning = q.isTheory ? studentAns : `${studentData.en} (${studentData.franco || studentData.ar || studentData.en})`;
            }

            let generatedExpl = q.explanation || (typeof ruleExplanations !== 'undefined' && ruleExplanations[q.ans]) || `This is an example of ${q.ans}.`;

            session.responses.push({ 
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

            // Log mistake to StudentEngine per-student mistake bank
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

            if (!session.isPracticeMode) session.stars += stars;
        }

        // ============================================================
        // MID-QUIZ MASCOT INTERRUPT SYSTEM (Farida)
        // ============================================================
        const MASCOT_INTERRUPT_INTERVAL = 6; // Trigger every 6 answered questions (5-7 range)
        const MASCOT_INTERRUPT_MODE = 'alternate'; // 'alternate' (tip, icebreaker, tip, ...) or 'random'
        let mascotInterruptCounter = 0;

        function triggerMascotInterrupt(onComplete) {
            const tips = (typeof window !== 'undefined' && window.MASCOT_TIPS) || (typeof MASCOT_TIPS !== 'undefined' ? MASCOT_TIPS : []);
            const icebreakers = (typeof window !== 'undefined' && window.MASCOT_ICEBREAKERS) || (typeof MASCOT_ICEBREAKERS !== 'undefined' ? MASCOT_ICEBREAKERS : []);

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
                if (typeof setMascot === 'function') setMascot('idle');
                onComplete();
            };

            if (!isIcebreaker) {
                // (a) RANDOM TIP CARD
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
                if (typeof setMascot === 'function') setMascot('happy');
                if (typeof SFX !== 'undefined' && SFX.ting) SFX.ting();

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
                        if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                        closeAndResume();
                    };
                }
            } else {
                // (b) RANDOM ICEBREAKER QUESTION
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
                if (typeof SFX !== 'undefined' && SFX.ting) SFX.ting();

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
                            if (typeof SFX !== 'undefined' && SFX.ting) SFX.ting();
                        } else {
                            btn.classList.add('wrong');
                            const correctBtn = modal.querySelector(`.mascot-option-btn[data-index="${ib.correctIndex}"]`);
                            if (correctBtn) correctBtn.classList.add('correct');
                            if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                        }

                        if (typeof setMascot === 'function') setMascot('happy');

                        if (funFactBox) {
                            funFactBox.innerHTML = `💡 <strong>${ib.funFact}</strong>`;
                            funFactBox.style.display = 'block';
                        }

                        if (btnContinue) {
                            btnContinue.style.display = 'inline-block';
                            btnContinue.onclick = () => {
                                if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                                closeAndResume();
                            };
                        }

                        // Auto advance after 2.8 seconds
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
            session.playHead++; 
            if (session.playHead >= session.playlist.length) {
                finishAndShowReport(); 
                return;
            }

            // Mid-quiz Mascot Interrupt Break (every MASCOT_INTERRUPT_INTERVAL answered questions)
            if (session.playHead > 0 && (session.playHead % MASCOT_INTERRUPT_INTERVAL === 0)) {
                triggerMascotInterrupt(() => {
                    loadQuestion();
                });
                return;
            }

            if (session.playHead > 0 && session.playHead % 20 === 0) {
                if (typeof showLogoPopup === 'function') showLogoPopup(session.playHead);
                setTimeout(() => {
                    loadQuestion();
                }, 3000);
            } else {
                loadQuestion();
            }
        }

        function updateHUD() {
            document.getElementById('score-display').textContent = session.score; 
            document.getElementById('coins-display').textContent = session.coins;
            
            const sBadge = document.getElementById('streak-badge'); 
            if(session.streak > 1) { 
                sBadge.style.display = 'flex'; document.getElementById('streak-display').textContent = session.streak; 
            } else { sBadge.style.display = 'none'; }
            
            document.getElementById('btn-prev').disabled = session.playHead === 0;
            document.getElementById('btn-next').disabled = session.playlist ? session.playHead >= session.playlist.length - 1 : false;

            const topCounter = document.getElementById('top-nav-counter');
            if (topCounter && session.playlist) {
                topCounter.textContent = `${session.playHead + 1} / ${session.playlist.length}`;
            }
            const topNav = document.getElementById('top-nav-controls');
            const hudStats = document.getElementById('hud-stats');
            if (topNav) topNav.style.display = 'flex';
            if (hudStats) hudStats.style.display = 'flex';
            
            const costs = { '5050': 5, 'time': 5, 'shield': 10, 'freeze': 10 };
            ['5050', 'time', 'shield', 'freeze'].forEach(t => { 
                const btn = document.getElementById(`pu-${t}`);
                btn.disabled = (session.coins < costs[t]) || session.isPracticeMode || isAnswering; 
            });
            document.getElementById('pu-hint').disabled = session.isPracticeMode || isAnswering;
        }

        










