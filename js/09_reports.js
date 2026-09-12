function finishAndShowReport(earlyExit = false) { 
            clearInterval(timerInterval); 
            session.endTime = Date.now();
            document.getElementById('progress-fill').style.width = '100%';
            
            renderReportUI(earlyExit); 
            switchScreen('screen-report'); 
            if(session.score > 0 && !session.isPracticeMode && typeof confetti !== 'undefined') confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } }); 
        }

        function renderReportUI(earlyExit) {
            const totalQs = session.responses.length; 
            const correctCount = session.responses.filter(r => r.isCorrect).length;
            const accuracy = totalQs > 0 ? Math.round((correctCount / totalQs) * 100) : 0;
            let totalTime = session.responses.reduce((sum, r) => sum + r.time, 0);
            const avgTime = totalQs > 0 ? Math.round(totalTime / totalQs) : 0;
            
            document.getElementById('report-title').textContent = session.isPracticeMode ? `Practice Complete, ${session.studentName}!` : `🎉 Great Job, ${session.studentName}!`; 
            document.getElementById('report-subtitle').textContent = earlyExit ? "Challenge ended early." : "You finished the challenge!";
            
            const rulesStatsBox = document.getElementById('rule-stats-breakdown');
            rulesStatsBox.innerHTML = '';

            if(session.isPracticeMode) {
                document.getElementById('main-stats-grid').style.display = 'none';
                rulesStatsBox.style.display = 'none';
            } else {
                document.getElementById('main-stats-grid').style.display = 'grid';
                document.getElementById('r-score').textContent = session.score; 
                document.getElementById('r-acc').textContent = `${accuracy}%`;
                document.getElementById('r-streak').textContent = session.bestStreak; 
                document.getElementById('r-time').textContent = `${avgTime}s`;
                
                if(!earlyExit && totalQs > 0) saveScore(session.studentName, session.score, accuracy, session.bestStreak, session.studentAvatar);

                let catStats = {};
                session.responses.forEach(r => {
                    if(!catStats[r.categoryId]) {
                        const title = (TAJWEED_BANK[r.categoryId]?.title || (typeof THEORETICAL_BANK !== 'undefined' && THEORETICAL_BANK[r.categoryId]?.title) || r.categoryTitle || r.categoryId);
                        catStats[r.categoryId] = { correct: 0, total: 0, title: title };
                    }
                    catStats[r.categoryId].total++;
                    if(r.isCorrect) catStats[r.categoryId].correct++;
                });

                if(Object.keys(catStats).length > 0) {
                    rulesStatsBox.style.display = 'grid';
                    Object.values(catStats).forEach(stat => {
                        let pct = Math.round((stat.correct / stat.total) * 100);
                        let color = pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
                        rulesStatsBox.innerHTML += `
                            <div class="rule-stat-item">
                                <span class="rule-stat-name">${stat.title}</span>
                                <span class="rule-stat-score" style="color: ${color}">${stat.correct}/${stat.total} (${pct}%)</span>
                            </div>
                        `;
                    });
                } else { rulesStatsBox.style.display = 'none'; }
            }
            
            const certRepBtn = document.getElementById('btn-cert-report');
            if (certRepBtn) {
                certRepBtn.style.display = (accuracy >= 80 && !session.isPracticeMode) ? 'inline-block' : 'none';
            }

            const list = document.getElementById('mistakes-list'); 
            list.innerHTML = '';
            
            let missedQs = session.responses.filter(r => !r.isCorrect); 
            
            const subBtn = document.getElementById('btn-submit-hw');
            const subParent = subBtn ? subBtn.parentElement : null;
            if (subBtn) subBtn.style.display = 'none';

            if (isHomeworkMode && subParent) {
                // Get teacher details from URL or StudentEngine
                const teacher = (window.CURRENT_HW_CONFIG && window.CURRENT_HW_CONFIG.teacher) 
                    || (typeof window.StudentEngine !== 'undefined' ? window.StudentEngine.getTeacherInfo() : { name: 'الشيخ جهاد الصياد', whatsapp: '+201099684126', email: 'gehadnagah789@gmail.com' });

                const timeSec = Math.max(1, Math.round((session.endTime - session.startTime) / 1000));
                
                // Format detailed mistakes for sync and messages
                const cleanMistakes = missedQs.map((q, idx) => ({
                    qId: q.id || ('q_' + idx),
                    text: q.text || q.prompt || '',
                    src: q.src || q.image || '',
                    image: q.image || q.src || '',
                    userAns: q.userChoice || q.userAns || 'إجابة خاطئة',
                    ans: q.ans || q.correctAns || '',
                    correctAns: q.ans || q.correctAns || '',
                    prompt: q.prompt || '',
                    categoryId: q.categoryId || '',
                    rule: q.categoryTitle || q.categoryId || 'حكم تجويدي',
                    explanation: q.explanation || ''
                }));

                // Build Magic Sync Payload
                const syncPayload = {
                    n: session.studentName,
                    s: session.score,
                    tot: totalQs,
                    a: accuracy,
                    t: timeSec,
                    tc: teacher.name,
                    m: cleanMistakes
                };
                const b64 = btoa(encodeURIComponent(JSON.stringify(syncPayload)));
                const magicSyncLink = `${window.location.origin}${window.location.pathname}?import_hw=${b64}`;

                // Build WhatsApp & Email formatted message
                let mistakesText = "";
                if (cleanMistakes.length > 0) {
                    mistakesText = "❌ Mistakes Review:\n" + cleanMistakes.map((m, i) => 
                        `${i + 1}. [${m.rule}] ${m.prompt || ''} ${m.text || ''}\n   - Student's Answer: ${m.userAns} ❌\n   - Correct Answer: ${m.correctAns} ✅`
                    ).join('\n');
                } else {
                    mistakesText = "🌟 Outstanding! 100% Perfect score with zero mistakes! 🎉";
                }

                const reportMsg = 
`📖 Tajweed Challenge | Supervised & Developed by Sheikh Gehad Elsayad
=====================================
📝 Homework Assignment Report
👤 Student: ${session.studentName}
👨‍🏫 Teacher: ${teacher.name}
🎯 Score: ${correctCount} of ${totalQs} (${accuracy}%)
⏱️ Time: ${timeSec} seconds
-------------------------------------
${mistakesText}
-------------------------------------
🔗 Click here to save results to student profile:
${magicSyncLink}`;

                // Render multi-channel delivery bar
                subParent.innerHTML = `
                    <div style="width:100%; display:flex; flex-direction:column; gap:10px; background:#f8fafc; border:2px solid #e2e8f0; border-radius:16px; padding:16px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                        <div style="font-size:1.1rem; font-weight:900; color:#1e293b; text-align:center;">
                            📤 Submit Homework Report to Teacher (${teacher.name})
                        </div>
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-top:5px;">
                            <button id="btn-hw-wa" type="button" style="background:#25d366; color:white; font-weight:800; font-size:1rem; padding:12px 16px; border-radius:12px; border:none; cursor:pointer; box-shadow:0 3px 0 #1ea952; display:flex; align-items:center; justify-content:center; gap:8px;">
                                <span>📲</span> Send via WhatsApp
                            </button>
                            <button id="btn-hw-gm" type="button" style="background:#ea4335; color:white; font-weight:800; font-size:1rem; padding:12px 16px; border-radius:12px; border:none; cursor:pointer; box-shadow:0 3px 0 #c5221f; display:flex; align-items:center; justify-content:center; gap:8px;">
                                <span>✉️</span> Send via Gmail
                            </button>
                            <button id="btn-hw-zm" type="button" style="background:#2563eb; color:white; font-weight:800; font-size:1rem; padding:12px 16px; border-radius:12px; border:none; cursor:pointer; box-shadow:0 3px 0 #1d4ed8; display:flex; align-items:center; justify-content:center; gap:8px;">
                                <span>📋</span> Copy Report
                            </button>
                        </div>
                        <div style="font-size:0.78rem; color:#64748b; text-align:center; margin-top:2px;">
                            ✨ Tajweed Challenge | Supervised & Developed by Sheikh Gehad Elsayad
                        </div>
                    </div>
                `;

                // 1. WhatsApp Button
                const waBtn = subParent.querySelector('#btn-hw-wa');
                if (waBtn) {
                    waBtn.onclick = () => {
                        const cleanPhone = (teacher.whatsapp || '').replace(/[^\d]/g, '');
                        const waUrl = cleanPhone 
                            ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(reportMsg)}`
                            : `https://wa.me/?text=${encodeURIComponent(reportMsg)}`;
                        window.open(waUrl, '_blank');
                    };
                }

                // 2. Gmail Button
                const gmBtn = subParent.querySelector('#btn-hw-gm');
                if (gmBtn) {
                    gmBtn.onclick = () => {
                        const subject = `Tajweed Challenge HW Report - ${session.studentName} (${accuracy}%)`;
                        const targetEmail = teacher.email || 'gehadnagah789@gmail.com';
                        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(reportMsg)}`;
                        window.open(gmailUrl, '_blank');
                    };
                }

                // 3. General Copy Button
                const zmBtn = subParent.querySelector('#btn-hw-zm');
                if (zmBtn) {
                    zmBtn.onclick = () => {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(reportMsg);
                        }
                        zmBtn.innerHTML = '<span>✅</span> Report Copied!';
                        setTimeout(() => {
                            zmBtn.innerHTML = '<span>📋</span> Copy Report';
                        }, 2500);
                    };
                }
            } else if (isProgressiveMode && currentProgressiveStageInfo) {
                const stageId = currentProgressiveStageInfo.stageId;
                const passed = accuracy >= 70;
                let stars = 0;
                if (accuracy === 100) stars = 3;
                else if (accuracy >= 85) stars = 2;
                else if (accuracy >= 70) stars = 1;

                const progData = getProgressionData();
                const allStages = getAllProgressiveStages();
                const currIndex = allStages.findIndex(s => s.id === stageId);
                const nextStage = (currIndex >= 0 && currIndex + 1 < allStages.length) ? allStages[currIndex + 1] : null;

                if (passed) {
                    if (typeof window.StudentEngine !== 'undefined') {
                        window.StudentEngine.recordStageResult(stageId, {
                            stars: stars,
                            score: session.score,
                            accuracy: accuracy,
                            nextStageId: nextStage ? nextStage.id : null,
                            bestStreak: session.bestStreak
                        });
                    }

                    const prevInfo = progData.completedStages[stageId] || { stars: 0, score: 0 };
                    progData.completedStages[stageId] = {
                        stars: Math.max(prevInfo.stars || 0, stars),
                        score: Math.max(prevInfo.score || 0, session.score),
                        accuracy: Math.max(prevInfo.accuracy || 0, accuracy),
                        completedAt: Date.now()
                    };

                    if (nextStage) {
                        const unlockedIdx = allStages.findIndex(s => s.id === progData.unlockedStageId);
                        if (currIndex >= unlockedIdx) {
                            progData.unlockedStageId = nextStage.id;
                        }
                    }
                    saveProgressionData(progData);

                    const worldStages = currentProgressiveStageInfo.world.stages;
                    const worldCleared = worldStages.every(stg => (progData.completedStages[stg.id]?.stars || 0) >= 1);

                    if (worldCleared && nextStage && nextStage.worldIdx !== currentProgressiveStageInfo.worldIdx) {
                        showToast(`🌟 World Cleared! World ${nextStage.worldIdx + 1} Unlocked! 🎊`);
                    } else if (nextStage) {
                        showToast(`Stage Cleared! Next Stage Unlocked! ⭐${stars}`);
                    } else {
                        showToast(`🏆 ALL 46 STAGES COMPLETED! CONGRATULATIONS! 🌟`);
                    }

                    setTimeout(() => {
                        if (typeof confetti !== 'undefined') confetti({ particleCount: 220, spread: 360 });
                    }, 600);
                } else {
                    showToast(`Stage Not Passed. Need ≥70% (You scored ${accuracy}%). Try again!`, true);
                }

                renderProgressiveReportCard(passed, stars, accuracy, nextStage);
            } else {
                // Clear any progressive report card if in standard mode
                renderProgressiveReportCard(false, 0, 0, null);
            }
            document.getElementById('mistake-count').textContent = missedQs.length;

            if(missedQs.length === 0) { 
                list.innerHTML = `<div style="text-align:center; padding: 2vh; background: white; border-radius: 12px; border: 2px solid #10b981;">
                                    <span style="font-size:2rem;">🎉</span>
                                    <p style="font-size:1.2rem; color:#10b981; font-weight:800; margin-top:10px;">Perfect Accuracy! No mistakes.</p>
                                  </div>`; 
            } else { 
                if(!session.isPracticeMode) {
                    let practiceDiv = document.createElement('div');
                    practiceDiv.style.display = 'flex'; practiceDiv.style.gap = '10px'; practiceDiv.style.flexWrap = 'wrap'; practiceDiv.style.marginBottom = '15px';
                    
                    let pBtn = document.createElement('button');
                    pBtn.className = 'practice-btn';
                    pBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6d28d9)';
                    pBtn.style.color = 'white';
                    pBtn.style.border = 'none';
                    pBtn.style.borderRadius = '12px';
                    pBtn.style.fontWeight = '900';
                    pBtn.style.boxShadow = '0 4px 0 #5b21b6';
                    pBtn.style.cursor = 'pointer';
                    pBtn.style.padding = '14px 26px';
                    pBtn.style.fontSize = '1.15rem';
                    pBtn.innerHTML = `🎯 Immediate Remediation Drill (معالجة فورية للأخطاء - ${missedQs.length} أسئلة)`;
                    
                    pBtn.onclick = () => {
                        let practicePlay = [];
                        missedQs.forEach(m => {
                            let qObj = (TAJWEED_BANK[m.categoryId]?.questions || (typeof THEORETICAL_BANK !== 'undefined' && THEORETICAL_BANK[m.categoryId]?.questions) || []).find(q => q.id === m.qId);
                            if(qObj) practicePlay.push({...qObj, categoryId: m.categoryId, categoryTitle: m.categoryTitle, isTheory: m.isTheory});
                        });
                        if(practicePlay.length > 0) {
                            showToast(`Launching Remediation Drill with ${practicePlay.length} missed questions... 🔄`);
                            initGameSession(true, shuffleArray(practicePlay));
                        } else {
                            showToast("No practice questions found.", true);
                        }
                    };
                    
                    practiceDiv.appendChild(pBtn);
                    list.appendChild(practiceDiv);
                }

                missedQs.forEach(m => { 
                    const card = document.createElement('div');
                    card.className = 'mistake-card';
                    const visualDisplay = m.src ? `<img src="${m.src}" class="mistake-img" alt="Mistake Image">` : `<div style="font-size:1.05rem; font-weight:800; color:#0f172a; padding:12px; background:#f8fafc; border-radius:10px; border:2px solid #e2e8f0; width:100%; text-align:center; line-height:1.4;">${m.prompt || ''}</div>`;
                    card.innerHTML = `
                        <div class="mistake-top">
                            ${visualDisplay}
                        </div>
                        <div style="margin-top:8px; font-weight:800; font-size:1rem; color:#15803d;">Correct Answer: ${m.correctRule}</div>
                        <div style="margin-top:2px; font-weight:700; font-size:0.95rem; color:#b91c1c;">Your Answer: ${m.studentRule}</div>
                        <div class="explanation-box show" style="margin-top:10px; display:block; text-align:left; font-size: 0.95rem;">💡 ${m.explanation}</div>
                    `;
                    list.appendChild(card);
                }); 
            }
        }

        function showLeaderboard(fromScreen) {
            const lb = getLeaderboard();
            const container = document.getElementById('lb-container');
            container.innerHTML = '';
            
            if(lb.length === 0) {
                container.innerHTML = '<div style="padding: 20px; text-align: center; color: #64748b; font-weight: 800;">No scores recorded yet. Be the first!</div>';
            } else {
                lb.forEach((entry, i) => {
                    const row = document.createElement('div');
                    row.className = 'lb-item';
                    let rankIcon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
                    
                    const nameSpan = document.createElement('div');
                    nameSpan.className = 'lb-name';
                    nameSpan.textContent = entry.name;
                    
                    let avatarHtml = entry.avatar ? `<img src="${entry.avatar}" alt="User Avatar" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; margin-right: 10px; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">` : `<span style="font-size: 1.5rem; margin-right: 10px; line-height: 1;">👤</span>`;
                    
                    const userGrp = document.createElement('div');
                    userGrp.style.display = 'flex'; userGrp.style.alignItems = 'center';
                    userGrp.innerHTML = avatarHtml;
                    userGrp.appendChild(nameSpan);

                    row.innerHTML = `<div class="lb-rank" aria-hidden="true">${rankIcon}</div>`;
                    row.appendChild(userGrp);
                    
                    const statsDiv = document.createElement('div');
                    statsDiv.className = 'lb-stats';
                    statsDiv.innerHTML = `
                        <span title="Accuracy">${entry.acc}%</span>
                        <span title="Best Streak">🔥${entry.streak}</span>
                        <span class="lb-score" title="Score">🏆${entry.score}</span>
                    `;
                    row.appendChild(statsDiv);
                    container.appendChild(row);
                });
            }
            const btnBack = document.getElementById('btn-back-lb');
            if(btnBack) btnBack.onclick = () => { if(typeof SFX !== 'undefined') SFX.click(); switchScreen(fromScreen || 'screen-splash'); };
            
            const btnHome = document.getElementById('btn-home-lb');
            if(btnHome) btnHome.onclick = () => { if(typeof SFX !== 'undefined') SFX.click(); switchScreen(fromScreen || 'screen-splash'); };

            switchScreen('screen-leaderboard');
        }

        function renderProgressiveReportCard(passed, stars, accuracy, nextStage) {
            let box = document.getElementById('prog-stage-report-box');
            if (!box) {
                box = document.createElement('div');
                box.id = 'prog-stage-report-box';
                const statsGrid = document.getElementById('main-stats-grid');
                if (statsGrid && statsGrid.parentElement) {
                    statsGrid.parentElement.insertBefore(box, statsGrid);
                }
            }

            const replayBtn = document.getElementById('btn-replay');

            if (!isProgressiveMode || !currentProgressiveStageInfo) {
                if (box) box.style.display = 'none';
                if (replayBtn) {
                    replayBtn.innerHTML = `⚙️ New Challenge`;
                    replayBtn.onclick = () => {
                        if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                        switchScreen('screen-start');
                    };
                }
                return;
            }

            box.style.display = 'block';
            let starIcons = '';
            for (let i = 1; i <= 3; i++) {
                starIcons += `<span class="rep-star ${i <= stars ? 'earned' : 'empty'}">★</span>`;
            }

            const stageTitle = `${currentProgressiveStageInfo.world.icon} ${currentProgressiveStageInfo.world.title} • ${currentProgressiveStageInfo.stage.name}`;

            box.innerHTML = `
                <div class="prog-rep-card ${passed ? 'cleared' : 'failed'}">
                    <div class="prog-rep-badge">${passed ? '🎉 STAGE CLEARED' : '⚠️ ATTEMPT FINISHED'}</div>
                    <h3 class="prog-rep-title">${stageTitle}</h3>
                    <div class="prog-rep-stars">${starIcons}</div>
                    <p class="prog-rep-desc">
                        ${passed 
                            ? `Excellent job! You earned ${stars} Star${stars > 1 ? 's' : ''} with ${accuracy}% accuracy!` 
                            : `You need at least 70% accuracy to unlock the next stage (your score: ${accuracy}%). Review your mistakes below and try again!`}
                    </p>
                    <div class="prog-rep-actions">
                        ${passed && nextStage ? `<button id="btn-rep-next-stage" class="btn-prog-rep primary">Next Stage ▶</button>` : ''}
                        ${passed ? `<button id="btn-rep-cert" class="btn-prog-rep cert" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; font-weight: 800; padding: 10px 18px; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 0 #b45309;">📜 Download Certificate</button>` : ''}
                        <button id="btn-rep-retry-stage" class="btn-prog-rep secondary">🔄 Replay Stage</button>
                        <button id="btn-rep-back-map" class="btn-prog-rep map">🗺️ Return to Roadmap</button>
                    </div>
                </div>
            `;

            const certBtn = document.getElementById('btn-rep-cert');
            if (certBtn && passed) {
                certBtn.onclick = () => {
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                    if (window.CertificateGenerator) {
                        const teacherInfo = (typeof window.StudentEngine !== 'undefined' && window.StudentEngine.getTeacherInfo()) || (window.APP_CONFIG && window.APP_CONFIG.DEFAULT_TEACHER) || { name: 'الشيخ جهاد الصياد' };
                        window.CertificateGenerator.generate({
                            studentName: session.studentName || 'Honored Student',
                            worldTitle: currentProgressiveStageInfo.world.title || 'Tajweed Stage',
                            teacherName: teacherInfo.name
                        });
                    } else if (typeof showToast === 'function') {
                        showToast('Certificate generator is loading...', true);
                    }
                };
            }

            const nextBtn = document.getElementById('btn-rep-next-stage');
            if (nextBtn && nextStage) {
                nextBtn.onclick = () => {
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                    startProgressiveStage(nextStage.worldIdx, nextStage.stageIdx);
                };
            }

            const retryBtn = document.getElementById('btn-rep-retry-stage');
            if (retryBtn) {
                retryBtn.onclick = () => {
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                    startProgressiveStage(currentProgressiveStageInfo.worldIdx, currentProgressiveStageInfo.stageIdx);
                };
            }

            const mapBtn = document.getElementById('btn-rep-back-map');
            if (mapBtn) {
                mapBtn.onclick = () => {
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                    switchScreen('screen-progressive');
                    renderProgressiveMap();
                };
            }

            if (replayBtn) {
                replayBtn.innerHTML = `🗺️ Return to Roadmap`;
                replayBtn.onclick = () => {
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                    switchScreen('screen-progressive');
                    renderProgressiveMap();
                };
            }
        }



