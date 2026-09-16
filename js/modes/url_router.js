/**
 * URL Parameter Router
 * Modes Layer: External Deep Linking (?hw=, ?import_hw=, ?result=)
 */

(function(window) {
    'use strict';

    function parseURLModes() {
        const params = new URLSearchParams(window.location.search);

        // 1. Handling Homework Assignment Link
        if (params.has('hw')) {
            try {
                const rawHw = params.get('hw');
                const selectionMap = (typeof window.decodeHwToSelection === 'function')
                    ? window.decodeHwToSelection(rawHw)
                    : {};

                const defaultTc = (typeof window.APP_CONFIG !== 'undefined') 
                    ? window.APP_CONFIG.getDefaultTeacher() 
                    : { name: 'Sheikh Gehad Elsayad', whatsapp: '+201099684126', email: 'gehadnagah789@gmail.com' };

                const studentName = params.get('st') || params.get('name') || 'Student';
                const qty = parseInt(params.get('q') || '10', 10);
                const timer = parseInt(params.get('t') || '15', 10);
                const teacherName = params.get('tc') || defaultTc.name;
                const teacherWa = params.get('wa') || defaultTc.whatsapp;
                const teacherGm = params.get('gm') || defaultTc.email;

                let pool = [];
                if (typeof window.RuleSelectorEngine !== 'undefined' && window.RuleSelectorEngine.buildPool) {
                    pool = window.RuleSelectorEngine.buildPool(selectionMap);
                }

                if (pool.length === 0 && typeof window.RuleSelectorEngine !== 'undefined') {
                    pool = window.RuleSelectorEngine.buildPool({ 'qalqalah': ['ALL'] });
                }

                const definitions = (typeof window.RuleSelectorEngine !== 'undefined') ? window.RuleSelectorEngine.definitions : [];
                const topicLabels = [];
                Object.entries(selectionMap).forEach(([catId, val]) => {
                    const def = definitions.find(d => d.id === catId);
                    if (!def) return;
                    if (Array.isArray(val)) {
                        if (val.includes('ALL') || val.length === def.subrules?.length) {
                            topicLabels.push(def.title);
                        } else {
                            const subLabels = val.map(k => {
                                const s = def.subrules?.find(sub => sub.key === k);
                                return s ? s.label : k;
                            });
                            topicLabels.push(`${def.title} (${subLabels.join(', ')})`);
                        }
                    } else if (typeof val === 'object' && val !== null) {
                        const activeEntries = Object.entries(val).filter(([k, s]) => s === true || (s && s.enabled !== false));
                        if (activeEntries.length === def.subrules?.length) {
                            topicLabels.push(def.title);
                        } else {
                            const subLabels = activeEntries.map(([k, s]) => {
                                const subObj = def.subrules?.find(sub => sub.key === k);
                                const q = s && typeof s.qty === 'number' ? s.qty : null;
                                return (subObj ? subObj.label : k) + (q ? ` [${q} Qs]` : '');
                            });
                            topicLabels.push(`${def.title} (${subLabels.join(', ')})`);
                        }
                    }
                });

                window.CURRENT_HW_POOL = pool;
                window.CURRENT_HW_CONFIG = {
                    studentName: studentName,
                    selectionMap: selectionMap,
                    qty: qty,
                    timer: timer,
                    teacher: {
                        name: teacherName,
                        whatsapp: teacherWa,
                        email: teacherGm
                    }
                };

                window.isHomeworkMode = true;
                window.isProgressiveMode = false;

                if (typeof window.switchScreen === 'function') {
                    window.switchScreen('screen-start');
                }

                const safeStudent = typeof window.escapeHtml === 'function' ? window.escapeHtml(studentName) : studentName;
                const safeTeacher = typeof window.escapeHtml === 'function' ? window.escapeHtml(teacherName) : teacherName;

                const titleEl = document.getElementById('start-title');
                if (titleEl) {
                    titleEl.innerHTML = `📝 Homework for <span style="color:#2563eb;" dir="auto">${safeStudent}</span>`;
                }

                const rulesBox = document.getElementById('rules-container');
                if (rulesBox) rulesBox.style.display = 'none';

                const legacyRulesBox = document.getElementById('cb-all-rules')?.closest('fieldset') 
                    || document.getElementById('cb-all-rules')?.parentElement?.parentElement?.parentElement;
                if (legacyRulesBox) legacyRulesBox.style.display = 'none';

                const nameInput = document.getElementById('student-name');
                if (nameInput) {
                    nameInput.value = studentName;
                    const nameContainer = nameInput.closest('div[style*="background: #f8fafc"]') || nameInput.parentElement;
                    if (nameContainer) nameContainer.style.display = 'none';
                }

                const timerSelect = document.getElementById('timer-select');
                if (timerSelect) {
                    timerSelect.value = String(timer);
                    const timerContainer = timerSelect.closest('div[style*="background: #f8fafc"]') || timerSelect.parentElement;
                    if (timerContainer) timerContainer.style.display = 'none';
                }

                document.querySelectorAll('#screen-start .arena-hero-btn').forEach(btn => btn.style.display = 'none');

                const hwTeacherPanel = document.getElementById('hw-teacher-panel');
                if (hwTeacherPanel) hwTeacherPanel.style.display = 'none';

                const setupOuterCard = document.querySelector('#screen-start div[style*="border-radius: 1.5rem"]') 
                    || document.querySelector('#screen-start div[style*="border-radius:1.5rem"]')
                    || document.querySelector('#screen-start section');

                let launchCard = document.getElementById('hw-student-launch-card');
                if (!launchCard && setupOuterCard) {
                    launchCard = document.createElement('div');
                    launchCard.id = 'hw-student-launch-card';
                    setupOuterCard.prepend(launchCard);
                }

                if (launchCard) {
                    const safeTopics = topicLabels.map(t => typeof window.escapeHtml === 'function' ? window.escapeHtml(t) : t).join(' • ');
                    launchCard.innerHTML = `
                        <div style="background: linear-gradient(135deg, #eff6ff, #f8fafc); border: 2.5px solid #3b82f6; border-radius: 20px; padding: 32px 24px; text-align: center; margin: 10px auto 20px auto; max-width: 680px; width: 100%; box-shadow: 0 12px 30px rgba(59,130,246,0.15);" dir="auto">
                            <div style="font-size: 3.5rem; margin-bottom: 8px;">🌟</div>
                            <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900; color: #1e293b; margin: 0 0 8px 0;" dir="auto">Welcome, ${safeStudent}!</h2>
                            <div style="font-size: 1.15rem; font-weight: 800; color: #2563eb; margin-bottom: 4px;" dir="auto">👨‍🏫 Teacher: ${safeTeacher}</div>
                            <div style="font-size: 0.85rem; font-weight: 700; color: #64748b; margin-bottom: 20px;" dir="auto">Supervised & Developed by Sheikh Gehad Elsayad 📖</div>

                            <div style="background: white; border: 1.5px solid #cbd5e1; border-radius: 14px; padding: 18px 22px; max-width: 520px; margin: 0 auto 24px auto; text-align: left; font-size: 0.95rem; color: #334155; font-weight: 700; line-height: 1.6; box-shadow: 0 4px 10px rgba(0,0,0,0.03);" dir="auto">
                                <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 1.1rem;">🎯</span> 
                                    <span><strong>Questions:</strong> <span style="color:#2563eb; font-weight:900;">${qty} Questions</span></span>
                                </div>
                                <div style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 1.1rem;">⏱️</span> 
                                    <span><strong>Timer:</strong> ${timer > 0 ? timer + ' seconds per question' : 'Unlimited time'}</span>
                                </div>
                                <div style="display: flex; align-items: flex-start; gap: 8px;">
                                    <span style="font-size: 1.1rem;">📜</span> 
                                    <span dir="auto"><strong>Assigned Topics:</strong> <span style="color:#0f766e;">${safeTopics || 'Selected Rules'}</span></span>
                                </div>
                            </div>

                            <button type="button" id="btn-hw-start-direct" class="btn-start" style="font-size: 1.4rem; padding: 16px 36px; width: 100%; max-width: 360px; margin: 0 auto; background: linear-gradient(135deg, #2563eb, #1d4ed8); box-shadow: 0 5px 0 #1e40af; font-weight: 900; cursor: pointer; border-radius: 14px; color: white; border: none; letter-spacing: 0.5px;">
                                Start Homework 🚀
                            </button>
                        </div>
                    `;

                    document.getElementById('btn-hw-start-direct')?.addEventListener('click', () => {
                        if (typeof window.launchHomeworkGame === 'function') window.launchHomeworkGame();
                    });
                }

                const startBtn = document.getElementById('btn-start-game');
                if (startBtn) {
                    startBtn.textContent = "Start Homework 🚀";
                    startBtn.onclick = () => {
                        if (typeof window.launchHomeworkGame === 'function') window.launchHomeworkGame();
                    };
                    startBtn.style.display = 'none';
                }

            } catch (e) {
                console.error("Error loading homework mode from URL:", e);
            }
        } 
        // 2. Handling Magic Sync Import Link for Teachers
        else if (params.has('import_hw')) {
            try {
                const rawData = params.get('import_hw');
                const data = JSON.parse(decodeURIComponent(atob(rawData)));

                if (data && data.n && typeof window.StudentEngine !== 'undefined') {
                    window.StudentEngine.addHomeworkRecord(data.n, {
                        score: data.s || 0,
                        total: data.tot || (data.s + (data.m ? data.m.length : 0)),
                        accuracy: data.a || 0,
                        timeSpent: data.t || 0,
                        teacherName: data.tc || 'Sheikh Gehad Elsayad',
                        rules: data.r || [],
                        mistakes: data.m || []
                    });

                    window.history.replaceState({}, document.title, window.location.pathname);

                    setTimeout(() => {
                        if (typeof window.StudentModal !== 'undefined') {
                            window.StudentModal.open('roster');
                        }
                        if (typeof window.confetti !== 'undefined') {
                            window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
                        }
                        if (typeof window.showToast === 'function') {
                            window.showToast(`🎉 Saved homework for student [${data.n}]! Profile updated.`);
                        } else if (typeof window.showAppAlert === 'function') {
                            window.showAppAlert(`🎉 Successfully saved homework for student [${data.n}]! Profile & mistake bank updated.`, "Homework Imported");
                        } else {
                            alert(`🎉 Successfully saved homework for student [${data.n}]! Profile & mistake bank updated.`);
                        }
                    }, 400);
                }
            } catch(e) {
                console.error("Failed to import homework record from URL:", e);
            }
        }
        // 3. Backward compatible legacy result
        else if (params.has('result')) {
            try {
                const data = JSON.parse(decodeURIComponent(atob(params.get('result'))));
                document.getElementById('screen-splash')?.classList.remove('active');
                const rep = document.getElementById('screen-report');
                if (rep) rep.classList.add('active');

                const title = document.getElementById('report-title');
                const safeResultName = typeof window.escapeHtml === 'function' ? window.escapeHtml(data.n) : data.n;
                if (title) title.innerHTML = `📝 Student Report: <span style="color:#3b82f6" dir="auto">${safeResultName}</span>`;

                let html = `<div style="text-align:center; padding:15px; font-size:1.2rem;">
                    <strong>Score:</strong> ${data.s} | <strong>Accuracy:</strong> ${data.a}%<br>
                    <strong>Correct:</strong> ${data.c} | <strong>Incorrect:</strong> ${data.m?.length || 0}
                </div>`;
                const grid = document.getElementById('main-stats-grid');
                if (grid) {
                    grid.innerHTML = html;
                    grid.style.display = 'block';
                }
            } catch(e) {}
        }
    }

    window.parseURLModes = parseURLModes;

})(typeof window !== 'undefined' ? window : this);
