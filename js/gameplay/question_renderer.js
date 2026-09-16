/**
 * Question Renderer & Choices Generator
 * Gameplay Layer: Quranic Text/Theory View, Bilingual Options, Recitation Audio
 */

(function(window) {
    'use strict';

    function renderExampleSelector() {
        const sel = document.getElementById('example-selector');
        if (!sel || !window.session.playlist) return;
        sel.innerHTML = '';
        const total = window.session.playlist.length;
        window.session.playlist.forEach((_, i) => {
            let opt = document.createElement('option');
            opt.value = i;
            opt.text = `${i + 1} / ${total}`;
            sel.appendChild(opt);
        });
        sel.value = window.session.playHead;
    }

    function jumpToExample(playlistIndexStr) {
        clearTimeout(window.autoAdvanceTimer);
        const newHead = Number(playlistIndexStr);
        if (newHead >= 0 && newHead < window.session.playlist.length) {
            window.session.playHead = newHead;
            loadQuestion();
        }
    }

    function navQuestion(dir) {
        if (typeof window.stopAllActiveAudio === 'function') window.stopAllActiveAudio();
        clearTimeout(window.autoAdvanceTimer);
        const newHead = window.session.playHead + dir;
        if (newHead >= 0 && newHead < window.session.playlist.length) {
            window.session.playHead = newHead;
            loadQuestion();
        }
    }

    function showExplanation(q) {
        const expBox = document.getElementById('explanation-box');
        if (!expBox) return;
        
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
            if (typeof window.announce === 'function') window.announce(expBox.innerText);
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
        if (q.categoryId === 'madd_rules' || (typeof window.maddCounts !== 'undefined' && window.maddCounts[q.ans])) {
            let countText = "2 Counts (Harakat)";
            if (typeof window.maddCounts !== 'undefined' && window.maddCounts[q.ans]) countText = window.maddCounts[q.ans];
            durationBadge = `<span style="display:inline-flex; align-items:center; background:#fef3c7; color:#92400e; font-weight:900; font-size:0.86rem; padding:2px 10px; border-radius:999px; border:1px solid #fde68a; white-space:nowrap;">⏱️ ${countText}</span>`;
        } else if (q.categoryId === 'image_bank' || (q.ans && (q.ans.includes('ghunna') || q.ans.includes('Ghunnah')))) {
            durationBadge = `<span style="display:inline-flex; align-items:center; background:#dcfce7; color:#166534; font-weight:900; font-size:0.86rem; padding:2px 10px; border-radius:999px; border:1px solid #bbf7d0; white-space:nowrap;">⏱️ Ghunnah: 2 Counts</span>`;
        }

        const ruleData = (typeof window.ruleMeanings !== 'undefined' && window.ruleMeanings[q.ans]) ? window.ruleMeanings[q.ans] : { en: q.ans, franco: q.ans };
        const francoText = ruleData.franco || ruleData.en;
        
        expBox.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:4px 10px; line-height:1.2; text-align:center; width:100%;">
                ${durationBadge}
                <span style="font-weight:900; font-size:0.92rem; color:#1e293b;">Rule: ${ruleData.en} <span style="color:#64748b; font-weight:800;">(${francoText})</span></span>
                <span style="font-size:0.90rem; color:#334155; font-weight:700;">💡 ${generatedExpl}</span>
            </div>
        `;
        expBox.classList.add('show');
        if (typeof window.announce === 'function') window.announce(expBox.innerText);
    }

    function loadQuestion() {
        if (typeof window.stopAllActiveAudio === 'function') window.stopAllActiveAudio();
        window.isAnswering = false;
        window.isFrozen = false;
        window.hasShield = false;
        
        const q = window.session.playlist[window.session.playHead];
        if (!q) return;

        renderExampleSelector();
        const msgToast = document.getElementById('msg-toast');
        if (msgToast) msgToast.classList.remove('show');
        
        let fillPct = ((window.session.playHead) / window.session.playlist.length) * 100;
        const progFill = document.getElementById('progress-fill');
        if (progFill) progFill.style.width = `${fillPct}%`;
        let textElem = document.getElementById('progress-text');
        if (textElem) textElem.textContent = '';
        
        if (typeof window.setMascot === 'function') window.setMascot('idle'); 
        if (typeof window.FaridaMascot !== 'undefined' && typeof window.FaridaMascot.dismiss === 'function') {
            window.FaridaMascot.dismiss();
        }
        if (typeof window.updateHUD === 'function') window.updateHUD();
        
        const qBox = document.getElementById('quran-box');
        if (qBox) qBox.classList.remove('shake-anim');
        const timerBox = document.getElementById('timer-container');
        if (timerBox) timerBox.classList.remove('frozen');
        const shieldInd = document.getElementById('shield-indicator');
        if (shieldInd) shieldInd.style.display = 'none';

        let isGolden = false, isTrap = false;
        if (window.session.playHead > 0 && !window.session.isPracticeMode) {
            let rand = Math.random();
            if (rand < 0.10) isGolden = true; 
            else if (rand < 0.20) isTrap = true;
        }
        window.session.currentModifiers = { golden: isGolden, trap: isTrap };
        
        const isTheoryQ = !!(q.isTheory || q.type === 'tf' || (!q.src && q.choicesList));
        
        let promptTxt = q.prompt;
        if (isTheoryQ) {
            promptTxt = `📚 ${q.categoryTitle || (typeof window.THEORETICAL_BANK !== 'undefined' && window.THEORETICAL_BANK[q.categoryId]?.title) || "Tajweed Theory"}`;
        } else if (!promptTxt) {
            if (q.categoryId === 'noon_sakinah_tanween') promptTxt = "What is the rule of noon sakin / tanween?";
            else if (q.categoryId === 'meem_sakinah') promptTxt = "What is the rule of meem sakin?";
            else if (q.categoryId === 'image_bank') promptTxt = "What is the rule of noon and meem mushaddad?";
            else if (q.categoryId === 'lam_harf') promptTxt = "What is the rule of the Saakin Lam in Hal / Bal?";
            else promptTxt = (window.TAJWEED_BANK && window.TAJWEED_BANK[q.categoryId]?.title) || "Identify the Tajweed Rule";
        }
        
        const qLabel = document.getElementById('q-mode-label');
        let extraHTML = '';
        if (isGolden) extraHTML = `<span style="color:#f59e0b; display:block; font-size:1.1rem; margin-top:4px; font-weight:900;">🌟 GOLDEN QUESTION (x2 Pts)</span>`;
        if (isTrap) extraHTML = `<span style="color:#ef4444; display:block; font-size:1.1rem; margin-top:4px; font-weight:900;">⚠️ TRAP QUESTION (-10 Pts if wrong)</span>`;
        if (qLabel) qLabel.innerHTML = promptTxt + extraHTML;

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
        
        // Audio pronunciation support
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
        if (!container) return;
        container.innerHTML = '';
        
        const shuffleArray = (typeof window.shuffleArray === 'function') 
            ? window.shuffleArray 
            : (arr => [...arr].sort(() => Math.random() - 0.5));

        if (!q.choicesList) {
            let categoryChoices = [...((window.TAJWEED_BANK && window.TAJWEED_BANK[q.categoryId]?.choices) || [])];
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
                            <span style="font-size:clamp(1.15rem, 2vw, 1.45rem); font-weight:900; color:#ffffff;">${isT ? 'True' : 'False'}</span>
                        </div>`;
                } else {
                    const meaningData = (typeof window.ruleMeanings !== 'undefined' && window.ruleMeanings[choiceTxt]) ? window.ruleMeanings[choiceTxt] : null;
                    if (meaningData && meaningData.franco && meaningData.franco !== meaningData.en) {
                        const maxLen = Math.max(meaningData.en.length, meaningData.franco.length);
                        let fs = 'clamp(1.10rem, 1.85vw, 1.35rem)';
                        if (maxLen > 24) fs = 'clamp(0.90rem, 1.4vw, 1.08rem)';
                        else if (maxLen > 15) fs = 'clamp(1.0rem, 1.6vw, 1.22rem)';
                        btn.innerHTML = `
                            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; gap: 2px; text-align:center;">
                                <span class="ans-text-en" style="font-size:${fs}; font-weight:900; line-height:1.2; text-align:center; color:#ffffff; max-width:100%; word-break:break-word; display:block;">${meaningData.en}</span>
                                <span class="ans-text-franco" style="font-size:${fs}; font-weight:900; line-height:1.2; text-align:center; color:#fde047; max-width:100%; word-break:break-word; display:block; margin-top:2px;">${meaningData.franco}</span>
                            </div>`;
                    } else {
                        btn.innerHTML = `
                            <div style="display:flex; align-items:center; justify-content:center; width:100%; padding:4px 8px; text-align:center;">
                                <span style="font-size:clamp(0.95rem, 1.55vw, 1.18rem); font-weight:800; line-height:1.3; text-align:center; color:#ffffff;">${choiceTxt}</span>
                            </div>`;
                    }
                }
            } else {
                const meaningData = (typeof window.ruleMeanings !== 'undefined' && window.ruleMeanings[choiceTxt]) ? window.ruleMeanings[choiceTxt] : { en: choiceTxt, franco: choiceTxt };
                const francoText = meaningData.franco || meaningData.en;
                
                const maxLen = Math.max(meaningData.en.length, (francoText || '').length);
                let fs = 'clamp(1.10rem, 1.85vw, 1.35rem)';
                if (maxLen > 24) {
                    fs = 'clamp(0.90rem, 1.4vw, 1.08rem)';
                } else if (maxLen > 15) {
                    fs = 'clamp(1.0rem, 1.6vw, 1.22rem)';
                }

                btn.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; gap: 2px; text-align:center;">
                        <span class="ans-text-en" style="font-size:${fs}; font-weight:900; line-height:1.2; text-align:center; color:#ffffff; max-width:100%; word-break:break-word; display:block;">${meaningData.en}</span>
                        <span class="ans-text-franco" style="font-size:${fs}; font-weight:900; line-height:1.2; text-align:center; color:#fde047; max-width:100%; word-break:break-word; display:block; margin-top:2px;">${francoText}</span>
                    </div>`;
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
                btn.onclick = () => {
                    if (typeof window.handleAnswer === 'function') window.handleAnswer(choiceTxt, btn, q);
                }; 
            }
            
            container.appendChild(btn);
        });
        
        if (q.userAnswer) {
            window.isAnswering = false;
            clearInterval(window.timerInterval);
            showExplanation(q);
            if (typeof window.showNextQuestionButton === 'function') window.showNextQuestionButton();
            const timerTxt = document.getElementById('timer-text');
            if (timerTxt) timerTxt.textContent = '--';
        } else {
            if (typeof window.startTimer === 'function') window.startTimer(); 
        }
    }

    window.renderExampleSelector = renderExampleSelector;
    window.jumpToExample = jumpToExample;
    window.navQuestion = navQuestion;
    window.showExplanation = showExplanation;
    window.loadQuestion = loadQuestion;

})(typeof window !== 'undefined' ? window : this);
