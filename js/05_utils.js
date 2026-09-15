        function getSubQuestions(catKey, subKey, qList) {
            if (typeof window !== 'undefined' && window.QuestionRepository) {
                return window.QuestionRepository.getBySubRule(catKey, subKey, qList);
            }
            if (!Array.isArray(qList) || qList.length === 0) return [];
            return qList.filter(q => q.subcat === subKey || q.subRule === subKey || q.ans === subKey);
        }
        if (typeof window !== 'undefined') window.getSubQuestions = getSubQuestions;
        if (typeof global !== 'undefined') global.getSubQuestions = getSubQuestions;

        const MAIN_RULES_ORDER = [
            'image_bank',                 // 1. Noon & Meem Mushaddad
            'qalqalah',                   // 2. Qalqalah
            'meem_sakinah',               // 3. Meem Sakinah
            'noon_sakinah_tanween',       // 4. Noon Sakinah & Tanween
            'tafkheem_tarqeeq',           // 5. Tafkheem & Tarqeeq
            'madd_rules',                 // 6. Madd Rules
            'hamzat_wasl',                // 7. Hamzat Al-Wasl
            'lam_shamsiyyah_qamariyyah',  // 8. Lam Shamsiyyah & Lam Qamariyyah
            'lam_harf',                   // 9. Lam of Hal & Bal
            'letter_relations'            // 10. Relations Between Letters
        ];

        let activeRseInstance = null;

        function renderSetupUI() {
            const container = document.getElementById('rules-container');
            if (!container) return;
            container.innerHTML = '';

            if (typeof window.RuleSelectorEngine !== 'undefined') {
                activeRseInstance = window.RuleSelectorEngine.render(container, {
                    initialSelection: {
                        'qalqalah': {
                            'Minor': { enabled: true, qty: 5 },
                            'Medium': { enabled: true, qty: 5 },
                            'Major': { enabled: true, qty: 5 }
                        },
                        'madd_rules': {
                            'Connected': { enabled: true, qty: 5 }
                        }
                    },
                    showLaunchButton: false,
                    onChange: (data) => {
                        const totalCount = data.totalCount;
                        const lbl = document.getElementById('total-available-lbl');
                        if (lbl) lbl.textContent = totalCount;
                        const qtyInput = document.getElementById('custom-qty-input');
                        if (qtyInput) qtyInput.value = totalCount;
                    }
                });
            }
        }

        /* =========================================================
           ENGINE: PLAYLIST GENERATION
        ========================================================= */
        function attemptStartGame() {
            if (typeof SFX !== 'undefined' && SFX.click) SFX.click();

            // If in homework mode, delegate directly to homework launcher
            if (window.isHomeworkMode && typeof window.launchHomeworkGame === 'function') {
                window.launchHomeworkGame();
                return;
            }

            const input = document.getElementById('student-name');
            const nameErr = document.getElementById('name-error');
            const setupErr = document.getElementById('setup-error');

            let name = input ? input.value.trim().replace(/\s+/g, ' ') : '';
            if (!name) {
                name = "Champion";
            }
            if (name.length > 20) {
                name = name.slice(0, 20);
            }

            if (nameErr) nameErr.hidden = true;
            if (setupErr) setupErr.hidden = true;
            if (input) input.setAttribute('aria-invalid', 'false');

            let pool = [];
            if (activeRseInstance && typeof activeRseInstance.getPool === 'function') {
                pool = activeRseInstance.getPool();
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
            if (!isNaN(timerSelect)) TIME_LIMIT = timerSelect;

            let finalPlaylist = smartMix(pool);

            const activeStd = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;
            if (activeStd) {
                session.studentName = activeStd.name;
                session.studentAvatar = activeStd.avatar;
            } else {
                session.studentName = name;
                session.studentAvatar = typeof currentStudentAvatar !== 'undefined' ? currentStudentAvatar : null;
            }
            initGameSession(false, finalPlaylist);
        }

        function smartMix(pool) {
            if (!pool || pool.length <= 1) return pool ? [...pool] : [];

            const shuffle = (typeof shuffleArray === 'function') ? shuffleArray : ((typeof window !== 'undefined' && window.shuffleArray) ? window.shuffleArray : (arr => [...arr].sort(() => Math.random() - 0.5)));

            const getRule = q => q.subcat || q.ans || q.categoryId;
            const getCat = q => q.categoryId;

            // Pre-shuffle the pool so same-rule questions appear in random order
            let remaining = shuffle(pool);
            let result = [];

            while (remaining.length > 0) {
                const len = result.length;
                const last1 = len >= 1 ? result[len - 1] : null;
                const last2 = len >= 2 ? result[len - 2] : null;

                const ruleRepeat2 = (last1 && last2 && getRule(last1) === getRule(last2)) ? getRule(last1) : null;
                const catRepeat2 = (last1 && last2 && getCat(last1) === getCat(last2)) ? getCat(last1) : null;

                // Check if an alternative exists in the remaining pool
                const hasDiffRule = ruleRepeat2 ? remaining.some(q => getRule(q) !== ruleRepeat2) : false;
                const hasDiffCat = catRepeat2 ? remaining.some(q => getCat(q) !== catRepeat2) : false;

                // Filter candidates that avoid 3-in-a-row repetition
                let validCandidates = remaining.filter(q => {
                    if (hasDiffRule && getRule(q) === ruleRepeat2) return false;
                    if (hasDiffCat && getCat(q) === catRepeat2) return false;
                    return true;
                });

                // If filtering eliminated all (e.g. single category with multiple subrules)
                if (validCandidates.length === 0) {
                    if (hasDiffRule) {
                        validCandidates = remaining.filter(q => getRule(q) !== ruleRepeat2);
                    }
                }
                if (validCandidates.length === 0) {
                    validCandidates = remaining;
                }

                // Count remaining per rule to balance distribution
                const ruleCounts = {};
                remaining.forEach(q => {
                    const r = getRule(q);
                    ruleCounts[r] = (ruleCounts[r] || 0) + 1;
                });

                // Sort candidates to prefer variety and balance pool
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

        /* =========================================================
           GAMEPLAY LOGIC
        ========================================================= */
        function initGameSession(isPractice = false, practicePlaylist = []) {
            clearInterval(timerInterval);
            document.getElementById('msg-toast').classList.remove('show');

            if (Array.isArray(isPractice)) {
                let pool = isPractice;
                let qty = typeof practicePlaylist === 'number' ? practicePlaylist : pool.length;
                let mixed = smartMix(pool);
                practicePlaylist = mixed.slice(0, qty);
                isPractice = false;
            }
            
            session = { 
                isPracticeMode: isPractice,
                studentName: session.studentName,
                score: 0, coins: 0, stars: 0, streak: 0, bestStreak: 0, 
                responses: [], 
                playlist: practicePlaylist,
                playHead: 0,
                startTime: Date.now(), endTime: 0
            };
            
            document.getElementById('practice-badge').style.display = isPractice ? 'block' : 'none';
            switchScreen('screen-game'); 
            loadQuestion();
        }

                function renderExampleSelector() {
            const sel = document.getElementById('example-selector');
            sel.innerHTML = '';
            const total = session.playlist.length;
            session.playlist.forEach((_, i) => {
                let opt = document.createElement('option');
                opt.value = i;
                const pct = Math.round(((i + 1) / total) * 100);
                opt.text = `${i + 1} / ${total}`;
                sel.appendChild(opt);
            });
            sel.value = session.playHead;
        }

        function jumpToExample(playlistIndexStr) {
            clearTimeout(window.autoAdvanceTimer);
            const newHead = Number(playlistIndexStr);
            if (newHead >= 0 && newHead < session.playlist.length) { session.playHead = newHead; loadQuestion(); }
        }

        function navQuestion(dir) {
            if (typeof window.stopAllActiveAudio === 'function') window.stopAllActiveAudio();
            clearTimeout(window.autoAdvanceTimer);
            const newHead = session.playHead + dir;
            if (newHead >= 0 && newHead < session.playlist.length) { session.playHead = newHead; loadQuestion(); }
        }

        function loadQuestion() {
            if (typeof window.stopAllActiveAudio === 'function') window.stopAllActiveAudio();
            isAnswering = false; isFrozen = false; hasShield = false;
            
            const q = session.playlist[session.playHead];
            if(!q) return;

            renderExampleSelector();
            document.getElementById('msg-toast').classList.remove('show');
            
            let fillPct = ((session.playHead) / session.playlist.length) * 100;
            document.getElementById('progress-fill').style.width = `${fillPct}%`;
            let textElem = document.getElementById('progress-text');
            if(textElem) {
                textElem.textContent = '';
            }
            
            setMascot('idle'); 
            if (typeof window.FaridaMascot !== 'undefined' && typeof window.FaridaMascot.dismiss === 'function') {
                window.FaridaMascot.dismiss();
            }
            updateHUD();
            document.getElementById('quran-box').classList.remove('shake-anim');
            document.getElementById('timer-container').classList.remove('frozen');
            document.getElementById('shield-indicator').style.display = 'none';

            let isGolden = false, isTrap = false;
            if(session.playHead > 0 && !session.isPracticeMode) {
                let rand = Math.random();
                if(rand < 0.10) isGolden = true; 
                else if(rand < 0.20) isTrap = true;
            }
            session.currentModifiers = { golden: isGolden, trap: isTrap };
            
            const isTheoryQ = !!(q.isTheory || q.type === 'tf' || (!q.src && q.choicesList));
            
            let promptTxt = q.prompt;
            if (isTheoryQ) {
                promptTxt = `📚 ${q.categoryTitle || (typeof THEORETICAL_BANK !== 'undefined' && THEORETICAL_BANK[q.categoryId]?.title) || "Tajweed Theory"}`;
            } else if (!promptTxt) {
                if(q.categoryId === 'noon_sakinah_tanween') promptTxt = "What is the rule of noon sakin / tanween?";
                else if(q.categoryId === 'meem_sakinah') promptTxt = "What is the rule of meem sakin?";
                else if(q.categoryId === 'image_bank') promptTxt = "What is the rule of noon and meem mushaddad?";
                else if(q.categoryId === 'lam_harf') promptTxt = "What is the rule of the Saakin Lam in Hal / Bal?";
                else promptTxt = TAJWEED_BANK[q.categoryId]?.title || "Identify the Tajweed Rule";
            }
            
            const qLabel = document.getElementById('q-mode-label');
            let extraHTML = '';
            if(isGolden) extraHTML = `<span style="color:#f59e0b; display:block; font-size:1.1rem; margin-top:4px; font-weight:900;">🌟 GOLDEN QUESTION (x2 Pts)</span>`;
            if(isTrap) extraHTML = `<span style="color:#ef4444; display:block; font-size:1.1rem; margin-top:4px; font-weight:900;">⚠️ TRAP QUESTION (-10 Pts if wrong)</span>`;
            qLabel.innerHTML = promptTxt + extraHTML;

            const imgEl = document.getElementById('q-img-element');
            const theoryCard = document.getElementById('q-theory-card');
            const theoryBadge = document.getElementById('q-theory-badge');
            const theoryPrompt = document.getElementById('q-theory-prompt');

            if (isTheoryQ) {
                if (imgEl) imgEl.style.display = 'none';
                if (theoryCard) {
                    theoryCard.style.display = 'flex';
                    if (theoryBadge) {
                        if (q.type === 'tf') {
                            theoryBadge.textContent = '📝 TRUE OR FALSE';
                            theoryBadge.style.background = '#dbeafe';
                            theoryBadge.style.color = '#1d4ed8';
                            theoryBadge.style.border = '1px solid #93c5fd';
                        } else {
                            theoryBadge.textContent = '🎯 MULTIPLE CHOICE';
                            theoryBadge.style.background = '#fef3c7';
                            theoryBadge.style.color = '#b45309';
                            theoryBadge.style.border = '1px solid #fcd34d';
                        }
                    }
                    if (theoryPrompt) {
                        theoryPrompt.textContent = q.prompt;
                    }
                }
            } else {
                if (theoryCard) theoryCard.style.display = 'none';
                if (imgEl) {
                    imgEl.style.display = 'block';
                    imgEl.src = q.src;
                }
            }
            
            const expBox = document.getElementById('explanation-box');
            if (expBox) { expBox.classList.remove('show'); expBox.textContent = ''; }
            const nextActionBox = document.getElementById('next-action-container');
            if (nextActionBox) nextActionBox.style.display = 'none';
            
            // Audio pronunciation support (Safe & Non-breaking across webm, mp3, wav, m4a, ogg)
            const audioBtn = document.getElementById('btn-play-q-audio');
            if (audioBtn) {
                audioBtn.style.display = 'none';
                audioBtn.onclick = null;
                q._audioObj = null;
                if (!isTheoryQ && q.src) {
                    const parts = q.src.split('/');
                    const fullName = parts[parts.length - 1];
                    const baseName = fullName.substring(0, fullName.lastIndexOf('.')) || fullName;
                    
                    const exts = ['mp3', 'webm', 'wav', 'm4a', 'ogg'];
                    let found = false;
                    function testExtension(idx) {
                        if (idx >= exts.length || found) return;
                        const ext = exts[idx];
                        const testAudio = new Audio(`audio/${baseName}.${ext}`);
                        testAudio.preload = 'auto';
                        testAudio.onloadeddata = () => {
                            if (found) return;
                            found = true;
                            audioBtn.style.display = 'flex';
                            audioBtn.onclick = () => {
                                if (typeof window.stopAllActiveAudio === 'function') window.stopAllActiveAudio();
                                window.currentPlayingAudio = testAudio;
                                try { testAudio.currentTime = 0; testAudio.play(); } catch(e) {}
                            };
                            q._audioObj = testAudio;
                        };
                        testAudio.onerror = () => testExtension(idx + 1);
                        testAudio.load();
                    }
                    testExtension(0);
                }
            }
            
            const container = document.getElementById('choices-container');
            container.innerHTML = '';
            
            if (!q.choicesList) {
                let categoryChoices = [...(TAJWEED_BANK[q.categoryId]?.choices || [])];
                if (q.categoryId === 'tafkheem_tarqeeq') {
                    if (q.subcat === 'Light Ra' || q.subcat === 'Heavy Ra') {
                        categoryChoices = ["Heavy Raa", "Light Raa"];
                    } else if (q.subcat === 'Always Heavy') {
                        categoryChoices = ["Heavy Letter", "Light Letter"];
                    } else if (q.subcat === 'Lam of Allah') {
                        categoryChoices = ["Heavy Laam", "Light Laam"];
                    } else if (q.subcat === 'Alif') {
                        categoryChoices = ["Heavy Alif", "Light Alif"];
                    }
                } else if (q.id && (q.id.startsWith('ikhfa_gh') || q.subcat === 'Ikhfa Ghunnah' || (q.prompt && q.prompt.includes('Ghunnah')))) {
                    categoryChoices = ["Heavy Ghunnah", "Light Ghunnah"];
                } else if (q.id && (q.id.startsWith('idgham_comp') || q.subcat === 'Idgham Completeness' || (q.choicesList && q.choicesList.includes('Complete Idgham (Kamil)')))) {
                    categoryChoices = ["Complete Idgham (Kamil)", "Incomplete Idgham (Naqis)"];
                } else if (q.categoryId === 'lam_harf') {
                    categoryChoices = ["Idgham (Merging)", "Izhar (Clarity)"];
                }
                let choicesList = [q.ans];
                let wrongOptions = shuffleArray(categoryChoices.filter(c => c !== q.ans));
                choicesList = choicesList.concat(wrongOptions.slice(0, 2));
                q.choicesList = choicesList;
            }
            q.choicesList = [...new Set(q.choicesList)];
            
            if (!q.renderedChoices) {
                if (q.type === 'tf') {
                    q.renderedChoices = ['True', 'False'];
                } else if (isTheoryQ && q.choicesList) {
                    q.renderedChoices = shuffleArray([...q.choicesList]);
                } else {
                    q.renderedChoices = shuffleArray([...new Set(q.choicesList)]);
                }
            }
            q.renderedChoices.forEach((choiceTxt, idx) => {
                const btn = document.createElement('button'); 
                const styleCls = `rule-style-${idx % 6}`;
                btn.className = `ans-card ${styleCls}`; 
                btn.dataset.answer = choiceTxt;
                
                if (isTheoryQ) {
                    if (choiceTxt === 'True' || choiceTxt === 'False') {
                        const isT = choiceTxt === 'True';
                        btn.innerHTML = `
                            <div style="display:flex; align-items:center; justify-content:center; gap: 10px; width:100%;">
                                <span style="font-size:1.5rem;">${isT ? '✅' : '❌'}</span>
                                <span style="font-size:clamp(1.15rem, 2vw, 1.45rem); font-weight:900;">${isT ? 'True' : 'False'}</span>
                            </div>`;
                    } else {
                        btn.innerHTML = `
                            <div style="display:flex; align-items:center; justify-content:center; width:100%; padding:4px 8px; text-align:center;">
                                <span style="font-size:clamp(0.95rem, 1.5vw, 1.15rem); font-weight:800; line-height:1.3; text-align:center;">${choiceTxt}</span>
                            </div>`;
                    }
                } else {
                    let meaningData = (typeof ruleMeanings !== 'undefined' && ruleMeanings[choiceTxt]) ? ruleMeanings[choiceTxt] : { en: choiceTxt, franco: choiceTxt };
                    let francoText = meaningData.franco || meaningData.en;
                    
                    // Responsive proportional sizing for choices so long rules never blow up card height
                    const maxLen = Math.max(meaningData.en.length, (francoText || '').length);
                    let fsEn = 'clamp(0.98rem, 1.55vw, 1.18rem)';
                    let fsFranco = 'clamp(0.94rem, 1.45vw, 1.12rem)';
                    if (maxLen > 22) {
                        fsEn = 'clamp(0.82rem, 1.2vw, 0.95rem)';
                        fsFranco = 'clamp(0.78rem, 1.15vw, 0.90rem)';
                    } else if (maxLen > 14) {
                        fsEn = 'clamp(0.90rem, 1.35vw, 1.06rem)';
                        fsFranco = 'clamp(0.86rem, 1.3vw, 1.0rem)';
                    }

                    if (meaningData.top && meaningData.sub && meaningData.ar) {
                        btn.innerHTML = `
                            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; gap: 3px; text-align:center;">
                                <span style="font-size:clamp(0.85rem, 1.6vw, 1.08rem); font-weight:800; line-height:1.2; text-align:center; opacity:0.95;">${meaningData.top}</span>
                                <span style="font-size:clamp(1.15rem, 2.2vw, 1.45rem); font-weight:900; line-height:1.2; text-align:center; color:#fde047; text-shadow:0 1px 2px rgba(0,0,0,0.3); letter-spacing:0.5px;">${meaningData.sub}</span>
                                <span style="font-size:clamp(0.95rem, 1.8vw, 1.22rem); font-weight:800; line-height:1.2; text-align:center;">${meaningData.ar}</span>
                            </div>`;
                    } else {
                        btn.innerHTML = `
                            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; gap: 2px; text-align:center;">
                                <span style="font-size:${fsEn}; font-weight:900; line-height:1.15; text-align:center;">${meaningData.en}</span>
                                <span style="font-size:${fsFranco}; font-weight:800; line-height:1.15; text-align:center; opacity:0.9;">${francoText}</span>
                            </div>`;
                    }
                }
                
                if (q.userAnswer) {
                    btn.disabled = true;
                    if (choiceTxt === q.userAnswer) {
                        btn.classList.add('selected-answer');
                        btn.style.outline = q.wasCorrect ? "3px solid #10b981" : "3px solid #ef4444";
                        btn.style.outlineOffset = "2px";
                    }
                    if (choiceTxt === q.userAnswer && !q.wasCorrect) {
                        btn.classList.add('wrong');
                        const wrongFirstSpan = btn.querySelector('div')?.firstElementChild || btn;
                        if (!wrongFirstSpan.innerHTML.includes('❌')) {
                            wrongFirstSpan.innerHTML = `❌ ` + wrongFirstSpan.innerHTML;
                        }
                    }
                    if (choiceTxt === q.ans) {
                        btn.classList.add('correct');
                        const correctFirstSpan = btn.querySelector('div')?.firstElementChild || btn;
                        if (!correctFirstSpan.innerHTML.includes('🌟')) {
                            correctFirstSpan.innerHTML = `🌟 ` + correctFirstSpan.innerHTML;
                        }
                    }
                } else {
                    btn.onclick = () => handleAnswer(choiceTxt, btn, q); 
                }
                
                container.appendChild(btn);
            });
            
            if (q.userAnswer) {
                isAnswering = false;
                clearInterval(timerInterval);
                // Show Explanation and Next Button directly
                if (typeof showExplanation === 'function') showExplanation(q);
                if (typeof showNextQuestionButton === 'function') showNextQuestionButton();
                document.getElementById('timer-text').textContent = '--';
            } else {
                startTimer(); 
            }
        }

        let isHomeworkMode = false;
        let isProgressiveMode = false;
        let progressiveLevelIndex = 0;

        /* =========================================================
           THEORETICAL CHALLENGE & SETUP LOGIC
        ========================================================= */
        let currentTheoryFilter = 'all'; // 'all', 'tf', 'mc'
        let currentTheoryLength = 60; // 10, 20, 30, 60, 'all', or custom integer

        function detectTheorySubRule(q) {
            if (q.subcat) return q.subcat.toLowerCase();
            const text = ((q.prompt || '') + ' ' + (q.explanation || '') + ' ' + (q.ans || '')).toLowerCase();
            const rules = [
                'mutamathilayn', 'mutajanisayn', 'mutaqaribayn', 'mutaba\'idayn', 'mutaba',
                'izhar shafawi', 'ikhfa shafawi', 'idgham shafawi', 'shafawi',
                'izhar', 'idgham', 'iqlab', 'ikhfa',
                'muttasil', 'munfasil', 'badal', 'aarid', 'leen', 'tabee', 'iwad', 'silah', 'laazim',
                'kubra', 'sughra', 'wusta',
                'hamzat al-wasl', 'hamzat al-qat', 'wasl', 'qat',
                'heavy raa', 'light raa', 'laam of allah', 'isti\'la', 'istifal', 'tafkheem', 'tarqeeq'
            ];
            for (let r of rules) {
                if (text.includes(r)) return r;
            }
            return q.categoryId || 'general';
        }

        function smartMixTheory(pool, targetLength = null) {
            if (!pool || pool.length <= 1) return pool ? [...pool] : [];

            // Deduplicate questions by id
            let uniqueMap = new Map();
            pool.forEach(q => {
                if (!uniqueMap.has(q.id)) {
                    uniqueMap.set(q.id, { ...q, _subRule: detectTheorySubRule(q) });
                }
            });
            let remaining = Array.from(uniqueMap.values());

            // Initial random shuffle
            for (let i = remaining.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
            }

            const playlist = [];
            const maxItems = (targetLength && targetLength > 0) ? Math.min(targetLength, remaining.length) : remaining.length;

            while (remaining.length > 0 && playlist.length < maxItems) {
                const len = playlist.length;
                const last1 = len >= 1 ? playlist[len - 1] : null;
                const last2 = len >= 2 ? playlist[len - 2] : null;
                const last3 = len >= 3 ? playlist[len - 3] : null;

                const lastType = last1 ? last1.type : null;
                const last2TypesSame = (last1 && last2 && last1.type === last2.type);

                let bestCandidate = null;
                let bestScore = -Infinity;
                let bestIndex = -1;

                for (let i = 0; i < remaining.length; i++) {
                    const q = remaining[i];
                    let score = Math.random() * 5; // small jitter for dynamic variety

                    // Category spacing (penalize if appeared in last 1, 2, or 3 questions)
                    if (last1 && q.categoryId === last1.categoryId) {
                        score -= 120;
                    } else if (last2 && q.categoryId === last2.categoryId) {
                        score -= 50;
                    } else if (last3 && q.categoryId === last3.categoryId) {
                        score -= 20;
                    } else {
                        score += 35;
                    }

                    // Sub-rule spacing (even inside same category)
                    if (last1 && q._subRule === last1._subRule) {
                        score -= 80;
                    } else if (last2 && q._subRule === last2._subRule) {
                        score -= 35;
                    } else if (last3 && q._subRule === last3._subRule) {
                        score -= 15;
                    }

                    // Type spacing (interleave True/False and Multiple Choice)
                    if (lastType && q.type) {
                        if (q.type !== lastType) {
                            score += 30; // bonus for alternation
                        } else if (last2TypesSame) {
                            score -= 60; // penalty for 3-in-a-row of same question type
                        }
                    }

                    if (score > bestScore) {
                        bestScore = score;
                        bestCandidate = q;
                        bestIndex = i;
                    }
                }

                const chosen = { ...bestCandidate };
                delete chosen._subRule;
                playlist.push(chosen);
                remaining.splice(bestIndex, 1);
            }

            return playlist;
        }

        function renderTheorySetupUI() {
            const grid = document.getElementById('theory-topics-grid');
            if (!grid || typeof THEORETICAL_BANK === 'undefined') return;
            grid.innerHTML = '';

            const savedName = localStorage.getItem('tajweed_player_name') || session.studentName || '';
            const nameInput = document.getElementById('theory-student-name');
            if (nameInput && !nameInput.value) nameInput.value = savedName;

            Object.keys(THEORETICAL_BANK).forEach(catKey => {
                const cat = THEORETICAL_BANK[catKey];
                const card = document.createElement('div');
                card.className = 'theory-topic-card';
                card.dataset.topic = catKey;
                card.style.cssText = 'background:#f0f9ff; border-radius:14px; border:2px solid #0284c7; padding:14px; display:flex; align-items:flex-start; gap:12px; cursor:pointer; transition:all 0.15s; position:relative; box-shadow:0 2px 4px rgba(0,0,0,0.03);';
                
                const qList = cat.questions || [];
                const tfCount = qList.filter(q => q.type === 'tf').length;
                const mcCount = qList.filter(q => q.type === 'mc').length;

                card.innerHTML = `
                    <input type="checkbox" class="theory-topic-cb" value="${catKey}" checked style="width:20px; height:20px; accent-color:#0284c7; cursor:pointer; margin-top:2px;">
                    <div style="flex:1; pointer-events:none;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                            <span style="font-size:1.4rem;">${cat.icon || '📖'}</span>
                            <h3 style="font-size:1.05rem; font-weight:900; color:#0f172a; margin:0; line-height:1.2;">${cat.title}</h3>
                        </div>
                        <p style="font-size:0.8rem; color:#64748b; line-height:1.3; margin:0 0 6px 0; font-weight:600;">${cat.description || ''}</p>
                        <div style="display:flex; gap:6px; flex-wrap:wrap;">
                            <span class="theory-badge-total" style="background:#e0f2fe; color:#0369a1; font-weight:800; font-size:0.75rem; padding:2px 8px; border-radius:999px;">${qList.length} Questions</span>
                            <span class="theory-badge-tf" style="background:#f1f5f9; color:#475569; font-weight:700; font-size:0.75rem; padding:2px 6px; border-radius:999px;">${tfCount} T/F</span>
                            <span class="theory-badge-mc" style="background:#fef3c7; color:#92400e; font-weight:700; font-size:0.75rem; padding:2px 6px; border-radius:999px;">${mcCount} MC</span>
                        </div>
                    </div>
                `;

                card.onclick = (e) => {
                    const cb = card.querySelector('.theory-topic-cb');
                    if (e.target !== cb) {
                        cb.checked = !cb.checked;
                    }
                    card.style.borderColor = cb.checked ? '#0284c7' : '#cbd5e1';
                    card.style.background = cb.checked ? '#f0f9ff' : 'white';
                    updateTheoryTotalBadge();
                };

                const cb = card.querySelector('.theory-topic-cb');
                cb.onchange = () => {
                    card.style.borderColor = cb.checked ? '#0284c7' : '#cbd5e1';
                    card.style.background = cb.checked ? '#f0f9ff' : 'white';
                    updateTheoryTotalBadge();
                };

                grid.appendChild(card);
            });

            // Filter buttons (Question type: all, tf, mc)
            document.querySelectorAll('.theory-filter-btn').forEach(btn => {
                btn.onclick = () => {
                    document.querySelectorAll('.theory-filter-btn').forEach(b => {
                        b.classList.remove('active');
                        b.style.background = 'white';
                        b.style.color = '#334155';
                        b.style.borderColor = '#cbd5e1';
                    });
                    btn.classList.add('active');
                    btn.style.background = '#2563eb';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#2563eb';
                    currentTheoryFilter = btn.dataset.qtype;
                    updateTheoryTotalBadge();
                };
            });

            // Length buttons (10, 20, 30, 60, all) & Custom Count Input
            const customInput = document.getElementById('theory-custom-qty');
            document.querySelectorAll('.theory-len-btn').forEach(btn => {
                btn.onclick = () => {
                    document.querySelectorAll('.theory-len-btn').forEach(b => {
                        b.classList.remove('active');
                        b.style.background = 'white';
                        b.style.color = '#334155';
                        b.style.borderColor = '#cbd5e1';
                    });
                    btn.classList.add('active');
                    btn.style.background = '#2563eb';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#2563eb';
                    currentTheoryLength = btn.dataset.len === 'all' ? 'all' : parseInt(btn.dataset.len, 10);
                    if (customInput) {
                        customInput.value = '';
                        customInput.style.borderColor = '#cbd5e1';
                    }
                    updateTheoryTotalBadge();
                };
            });

            if (customInput) {
                customInput.oninput = () => {
                    const rawVal = customInput.value.trim();
                    const val = parseInt(rawVal, 10);
                    if (!isNaN(val) && val > 0) {
                        currentTheoryLength = val;
                        document.querySelectorAll('.theory-len-btn').forEach(b => {
                            b.classList.remove('active');
                            b.style.background = 'white';
                            b.style.color = '#334155';
                            b.style.borderColor = '#cbd5e1';
                        });
                        customInput.style.borderColor = '#2563eb';
                    } else if (rawVal === '') {
                        currentTheoryLength = 60;
                        const defaultBtn = document.querySelector('.theory-len-btn[data-len="60"]');
                        if (defaultBtn) {
                            defaultBtn.classList.add('active');
                            defaultBtn.style.background = '#2563eb';
                            defaultBtn.style.color = 'white';
                            defaultBtn.style.borderColor = '#2563eb';
                        }
                        customInput.style.borderColor = '#cbd5e1';
                    }
                    updateTheoryTotalBadge();
                };
            }

            updateTheoryTotalBadge();
        }

        function setAllTheoryTopics(check) {
            document.querySelectorAll('.theory-topic-card').forEach(card => {
                const cb = card.querySelector('.theory-topic-cb');
                if (cb) cb.checked = check;
                card.style.borderColor = check ? '#0284c7' : '#cbd5e1';
                card.style.background = check ? '#f0f9ff' : 'white';
            });
            updateTheoryTotalBadge();
        }

        function updateTheoryTotalBadge() {
            const badge = document.getElementById('theory-selected-count-badge');
            if (!badge || typeof THEORETICAL_BANK === 'undefined') return;

            let totalAvailable = 0;
            document.querySelectorAll('.theory-topic-cb:checked').forEach(cb => {
                const cat = THEORETICAL_BANK[cb.value];
                if (!cat || !cat.questions) return;
                if (currentTheoryFilter === 'tf') {
                    totalAvailable += cat.questions.filter(q => q.type === 'tf').length;
                } else if (currentTheoryFilter === 'mc') {
                    totalAvailable += cat.questions.filter(q => q.type === 'mc').length;
                } else {
                    totalAvailable += cat.questions.length;
                }
            });

            const customInput = document.getElementById('theory-custom-qty');
            if (customInput && customInput.value.trim()) {
                const val = parseInt(customInput.value.trim(), 10);
                if (!isNaN(val) && val > 0) {
                    currentTheoryLength = val;
                }
            }

            let willPlay = totalAvailable;
            if (currentTheoryLength !== 'all' && typeof currentTheoryLength === 'number') {
                willPlay = Math.min(currentTheoryLength, totalAvailable);
            }
            badge.textContent = `${willPlay} (out of ${totalAvailable} available)`;
        }

        function attemptStartTheoryGame() {
            const nameInput = document.getElementById('theory-student-name');
            const errEl = document.getElementById('theory-setup-error');
            if (errEl) errEl.hidden = true;

            let name = nameInput ? nameInput.value.trim().replace(/\s+/g, ' ') : '';
            if (!name) name = "Champion";
            if (name.length > 20) name = name.slice(0, 20);

            const checkedTopics = Array.from(document.querySelectorAll('.theory-topic-cb:checked')).map(cb => cb.value);
            if (checkedTopics.length === 0) {
                if (errEl) {
                    errEl.textContent = "Please select at least one Tajweed topic!";
                    errEl.hidden = false;
                }
                return;
            }

            let pool = [];
            checkedTopics.forEach(tKey => {
                const cat = THEORETICAL_BANK[tKey];
                if (!cat || !cat.questions) return;
                let qs = cat.questions;
                if (currentTheoryFilter === 'tf') qs = qs.filter(q => q.type === 'tf');
                else if (currentTheoryFilter === 'mc') qs = qs.filter(q => q.type === 'mc');
                pool = pool.concat(qs.map(q => ({ ...q, categoryId: tKey, categoryTitle: cat.title })));
            });

            if (pool.length === 0) {
                if (errEl) {
                    errEl.textContent = "No questions found matching the chosen filter.";
                    errEl.hidden = false;
                }
                return;
            }

            const customInput = document.getElementById('theory-custom-qty');
            if (customInput && customInput.value.trim()) {
                const val = parseInt(customInput.value.trim(), 10);
                if (!isNaN(val) && val > 0) {
                    currentTheoryLength = val;
                }
            }

            let targetLength = pool.length;
            if (currentTheoryLength !== 'all' && typeof currentTheoryLength === 'number') {
                targetLength = Math.min(currentTheoryLength, pool.length);
            }
            let finalPlaylist = smartMixTheory(pool, targetLength);

            session.studentName = name;
            localStorage.setItem('tajweed_player_name', name);
            TIME_LIMIT = 25;
            initGameSession(false, finalPlaylist);
        }

        

























