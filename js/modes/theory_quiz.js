/**
 * Theoretical Quiz Engine
 * Modes Layer: 480 Questions Setup, Filters, Smart Mixing
 */

(function(window) {
    'use strict';

    let currentTheoryFilter = 'all'; // 'all', 'tf', 'mc'
    let currentTheoryLength = 60;    // 10, 20, 30, 60, 'all', or custom integer

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

        let uniqueMap = new Map();
        pool.forEach(q => {
            if (!uniqueMap.has(q.id)) {
                uniqueMap.set(q.id, { ...q, _subRule: detectTheorySubRule(q) });
            }
        });
        let remaining = Array.from(uniqueMap.values());

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
                let score = Math.random() * 5;

                if (last1 && q.categoryId === last1.categoryId) {
                    score -= 120;
                } else if (last2 && q.categoryId === last2.categoryId) {
                    score -= 50;
                } else if (last3 && q.categoryId === last3.categoryId) {
                    score -= 20;
                } else {
                    score += 35;
                }

                if (last1 && q._subRule === last1._subRule) {
                    score -= 80;
                } else if (last2 && q._subRule === last2._subRule) {
                    score -= 35;
                } else if (last3 && q._subRule === last3._subRule) {
                    score -= 15;
                }

                if (lastType && q.type) {
                    if (q.type !== lastType) {
                        score += 30;
                    } else if (last2TypesSame) {
                        score -= 60;
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
        if (!grid || typeof window.THEORETICAL_BANK === 'undefined') return;
        grid.innerHTML = '';

        const activeStudent = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;
        const savedName = activeStudent ? activeStudent.name : (localStorage.getItem('tajweed_player_name') || window.session.studentName || '');
        const nameInput = document.getElementById('theory-student-name');
        if (nameInput && !nameInput.value) nameInput.value = savedName;

        Object.keys(window.THEORETICAL_BANK).forEach(catKey => {
            const cat = window.THEORETICAL_BANK[catKey];
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
        if (!badge || typeof window.THEORETICAL_BANK === 'undefined') return;

        let totalAvailable = 0;
        document.querySelectorAll('.theory-topic-cb:checked').forEach(cb => {
            const cat = window.THEORETICAL_BANK[cb.value];
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
            const cat = window.THEORETICAL_BANK[tKey];
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

        window.session.studentName = name;
        localStorage.setItem('tajweed_player_name', name);
        window.TIME_LIMIT = 25;
        if (typeof window.initGameSession === 'function') {
            window.initGameSession(false, finalPlaylist);
        }
    }

    window.smartMixTheory = smartMixTheory;
    window.renderTheorySetupUI = renderTheorySetupUI;
    window.setAllTheoryTopics = setAllTheoryTopics;
    window.updateTheoryTotalBadge = updateTheoryTotalBadge;
    window.attemptStartTheoryGame = attemptStartTheoryGame;

})(typeof window !== 'undefined' ? window : this);
