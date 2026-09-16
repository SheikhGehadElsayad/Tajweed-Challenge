/**
 * Homework Portal & Assignment Generator
 * Modes Layer: Teacher Assignment Creation, Encoding & Decoding
 */

(function(window) {
    'use strict';

    const HW_RULE_CODES = {
        'im': 'image_bank',
        'ql': 'qalqalah',
        'ms': 'meem_sakinah',
        'ns': 'noon_sakinah_tanween',
        'tt': 'tafkheem_tarqeeq',
        'md': 'madd_rules',
        'hw': 'hamzat_wasl',
        'lq': 'lam_shamsiyyah_qamariyyah',
        'lh': 'lam_harf',
        'lr': 'letter_relations'
    };
    const HW_CODES_REVERSE = Object.fromEntries(Object.entries(HW_RULE_CODES).map(([k, v]) => [v, k]));

    function getPublicAppBaseUrl() {
        if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'https://sheikhgehadelsayad.github.io/Tajweed-Challenge/';
        }
        return window.location.origin + window.location.pathname;
    }

    let hwRseInstance = null;

    function renderHomeworkCreator() {
        const root = document.getElementById('hw-creator-root');
        if (!root) return;

        const defaultTeacher = (typeof window.APP_CONFIG !== 'undefined') 
            ? window.APP_CONFIG.getDefaultTeacher() 
            : { name: 'Sheikh Gehad Elsayad', whatsapp: '+201099684126', email: 'gehadnagah789@gmail.com' };
        const teacherInfo = (typeof window.StudentEngine !== 'undefined') 
            ? window.StudentEngine.getTeacherInfo() 
            : defaultTeacher;

        let teacherDisplayName = teacherInfo.name || 'Sheikh Gehad Elsayad';
        if (teacherDisplayName.includes('جهاد') || teacherDisplayName.includes('الصياد')) {
            teacherDisplayName = 'Sheikh Gehad Elsayad';
        }

        const badgeEl = document.getElementById('hw-active-teacher-badge');
        if (badgeEl) {
            badgeEl.innerHTML = `👨‍🏫 Teacher: <strong>${teacherDisplayName}</strong>`;
        }

        const students = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getAllStudents() : [];
        const activeStudent = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;

        root.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                
                <!-- Step 1: Select Student -->
                <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <label for="hw-student-select" style="font-size: 1.05rem; font-weight: 900; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                            <span>👤</span> 1. Select Student
                        </label>
                        <button type="button" id="btn-hw-open-roster" style="background: white; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 4px 10px; font-size: 0.8rem; font-weight: 800; color: #475569; cursor: pointer;">
                            👥 Manage Students
                        </button>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <select id="hw-student-select" style="flex: 1; min-width: 200px; padding: 10px 14px; font-size: 1rem; border-radius: 10px; border: 2px solid #cbd5e1; font-weight: 800; color: #1e293b; background: white;">
                            <option value="">-- Choose a registered student --</option>
                            ${students.map(s => `
                                <option value="${s.name}" ${activeStudent && activeStudent.id === s.id ? 'selected' : ''}>
                                    ${s.avatar || '👤'} ${s.name} (${s.stats?.stars || 0} ⭐)
                                </option>
                            `).join('')}
                            <option value="__NEW__">➕ Type a new student name...</option>
                        </select>
                        <input type="text" id="hw-custom-student-name" placeholder="Type student name..." style="display: none; flex: 1; min-width: 200px; padding: 10px 14px; font-size: 1rem; border-radius: 10px; border: 2px solid #3b82f6; font-weight: 800; color: #1e293b; background: white;" />
                    </div>
                </div>

                <!-- Step 2: Tajweed Rules Selection -->
                <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                    <div style="font-size: 1.05rem; font-weight: 900; color: #1e293b; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                        <span>📖 2. Select Tajweed Rules for Homework</span>
                        <span style="font-size: 0.82rem; color: #64748b; font-weight: 700;">Pick specific sub-rules & quantities</span>
                    </div>
                    <div id="hw-rse-container" style="width: 100%;">
                        <!-- Populated by RuleSelectorEngine -->
                    </div>
                </div>

                <!-- Step 3: Question Count & Timer -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
                    
                    <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                        <label style="font-size: 1.05rem; font-weight: 900; color: #1e293b; display: block; margin-bottom: 8px;">
                            🎯 3. Homework Questions Count
                        </label>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="hw-qty-chips">
                            <button type="button" class="hw-chip-btn" data-qty="5" style="padding: 8px 14px; border-radius: 8px; border: 1.5px solid #cbd5e1; background: white; font-weight: 800; cursor: pointer;">5</button>
                            <button type="button" class="hw-chip-btn active" data-qty="10" style="padding: 8px 14px; border-radius: 8px; border: 1.5px solid #2563eb; background: #2563eb; color: white; font-weight: 800; cursor: pointer;">10</button>
                            <button type="button" class="hw-chip-btn" data-qty="15" style="padding: 8px 14px; border-radius: 8px; border: 1.5px solid #cbd5e1; background: white; font-weight: 800; cursor: pointer;">15</button>
                            <button type="button" class="hw-chip-btn" data-qty="20" style="padding: 8px 14px; border-radius: 8px; border: 1.5px solid #cbd5e1; background: white; font-weight: 800; cursor: pointer;">20</button>
                        </div>
                        <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 0.85rem; font-weight: 700; color: #64748b;">Or Custom:</span>
                            <input type="number" id="hw-custom-qty" min="1" max="100" value="10" style="width: 80px; padding: 6px 10px; font-weight: 800; border-radius: 8px; border: 1.5px solid #cbd5e1;" />
                        </div>
                    </div>

                    <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                        <label for="hw-timer-select" style="font-size: 1.05rem; font-weight: 900; color: #1e293b; display: block; margin-bottom: 8px;">
                            ⏱️ 4. Time Limit per Question
                        </label>
                        <select id="hw-timer-select" style="width: 100%; padding: 10px 14px; font-size: 1rem; border-radius: 10px; border: 2px solid #cbd5e1; font-weight: 800; color: #1e293b; background: white;">
                            <option value="15" selected>15 Seconds (Standard / Recommended)</option>
                            <option value="20">20 Seconds</option>
                            <option value="30">30 Seconds (Relaxed)</option>
                            <option value="45">45 Seconds</option>
                            <option value="60">60 Seconds</option>
                            <option value="0">No Timer (Unlimited Time)</option>
                        </select>
                        <span style="display: block; font-size: 0.8rem; color: #64748b; margin-top: 6px; font-weight: 700;">
                            💡 Homework links will auto-apply this timer for the student.
                        </span>
                    </div>

                </div>

                <!-- Action: Generate Link Button -->
                <div>
                    <button type="button" id="hw-btn-generate" class="btn-start" style="width: 100%; padding: 16px; font-size: 1.3rem; border-radius: 14px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; font-weight: 900; box-shadow: 0 4px 0 #1e40af; cursor: pointer; letter-spacing: 0.5px;">
                        🔗 Generate Homework Link for Student
                    </button>
                </div>

                <!-- Result Card (Shown after generation) -->
                <div id="hw-result-card" style="display: none; background: #ecfdf5; border: 2px solid #10b981; border-radius: 16px; padding: 20px; animation: popIn 0.25s ease;">
                    <div style="font-size: 1.25rem; font-weight: 900; color: #065f46; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                        <span>✅</span> Homework Link Ready!
                    </div>
                    <p style="font-size: 0.95rem; color: #047857; font-weight: 700; margin-bottom: 12px;" id="hw-result-target">
                        Target Student: <strong>Student</strong>
                    </p>
                    <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
                        <input type="text" id="hw-result-url" readonly style="flex: 1; min-width: 240px; padding: 10px 14px; font-size: 0.95rem; border-radius: 10px; border: 1.5px solid #10b981; background: white; font-weight: 700; color: #065f46;" />
                        <button type="button" id="hw-btn-copy-result" style="padding: 10px 20px; font-size: 1rem; border-radius: 10px; background: #10b981; color: white; border: none; font-weight: 900; cursor: pointer; box-shadow: 0 3px 0 #059669; white-space: nowrap;">
                            📋 Copy Link
                        </button>
                        <button type="button" id="hw-btn-wa-share" style="padding: 10px 20px; font-size: 1rem; border-radius: 10px; background: #25d366; color: white; border: none; font-weight: 900; cursor: pointer; box-shadow: 0 3px 0 #128c7e; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
                            <span>💬</span> Share on WhatsApp
                        </button>
                    </div>
                    <div style="font-size: 0.82rem; color: #047857; font-weight: 700;">
                        ✨ Student's score and accuracy will automatically sync back when completed!
                    </div>
                </div>

            </div>
        `;

        // Student Select Logic
        const studentSelect = root.querySelector('#hw-student-select');
        const customInput = root.querySelector('#hw-custom-student-name');
        studentSelect.onchange = () => {
            if (studentSelect.value === '__NEW__') {
                customInput.style.display = 'block';
                customInput.focus();
            } else {
                customInput.style.display = 'none';
            }
        };

        // Open Roster button
        root.querySelector('#btn-hw-open-roster').onclick = () => {
            if (typeof window.StudentModal !== 'undefined') {
                window.StudentModal.open('roster');
            }
        };

        // Render Rule Selector inside HW creator
        const rseContainer = root.querySelector('#hw-rse-container');
        if (typeof window.RuleSelectorEngine !== 'undefined') {
            hwRseInstance = window.RuleSelectorEngine.render(rseContainer, {
                initialSelection: {
                    'qalqalah': {
                        'General Qalqalah': { enabled: true, qty: 5 },
                        'Minor': { enabled: true, qty: 5 },
                        'Medium': { enabled: true, qty: 5 },
                        'Major': { enabled: true, qty: 5 }
                    },
                    'noon_sakinah_tanween': {
                        'Izhar': { enabled: true, qty: 5 }
                    }
                },
                showLaunchButton: false,
                onChange: (data) => {
                    const customQty = root.querySelector('#hw-custom-qty');
                    if (customQty) customQty.value = data.totalCount;
                }
            });
        }

        // Quantity Chips
        const qtyChips = root.querySelectorAll('.hw-chip-btn');
        const customQty = root.querySelector('#hw-custom-qty');

        qtyChips.forEach(btn => {
            btn.onclick = () => {
                qtyChips.forEach(b => {
                    b.style.background = 'white';
                    b.style.color = '#334155';
                    b.style.borderColor = '#cbd5e1';
                    b.classList.remove('active');
                });
                btn.style.background = '#2563eb';
                btn.style.color = 'white';
                btn.style.borderColor = '#2563eb';
                btn.classList.add('active');
                customQty.value = btn.dataset.qty;
            };
        });

        customQty.oninput = () => {
            const val = parseInt(customQty.value);
            qtyChips.forEach(b => {
                const isActive = parseInt(b.dataset.qty) === val;
                b.style.background = isActive ? '#2563eb' : 'white';
                b.style.color = isActive ? 'white' : '#334155';
                b.style.borderColor = isActive ? '#2563eb' : '#cbd5e1';
            });
        };

        // Generate Button Click
        root.querySelector('#hw-btn-generate').onclick = () => {
            let studentName = studentSelect.value;
            if (studentName === '__NEW__') {
                studentName = customInput.value.trim();
            }
            if (!studentName) {
                if (typeof window.showToast === 'function') window.showToast("Please select or type a student name!", true);
                else if (typeof window.showAppAlert === 'function') window.showAppAlert("Please select or type a student name!", "Validation");
                else alert("Please select or type a student name!");
                if (studentSelect.value === '__NEW__') customInput.focus();
                return;
            }

            const config = hwRseInstance ? hwRseInstance.getSelectedConfig() : {};
            const codeTokens = [];
            const definitions = (typeof window.RuleSelectorEngine !== 'undefined') ? window.RuleSelectorEngine.definitions : [];

            Object.entries(config).forEach(([catId, subMap]) => {
                const catCode = HW_CODES_REVERSE[catId] || catId;
                const def = definitions.find(d => d.id === catId);
                if (!def || !def.subrules) {
                    codeTokens.push(catCode);
                    return;
                }
                const activeSubs = Object.entries(subMap).filter(([k, s]) => s.enabled);
                if (activeSubs.length === 0) return;

                const isAllMax = activeSubs.length === def.subrules.length && activeSubs.every(([k, s]) => s.qty === 'ALL');
                if (isAllMax) {
                    codeTokens.push(catCode);
                } else {
                    const tokens = activeSubs.map(([subKey, subConf]) => {
                        const idx = def.subrules.findIndex(s => s.key === subKey);
                        if (idx === -1) return null;
                        if (typeof subConf.qty === 'number' && subConf.qty > 0) {
                            return `${idx}x${subConf.qty}`;
                        }
                        return `${idx}`;
                    }).filter(Boolean);

                    if (tokens.length > 0) {
                        codeTokens.push(`${catCode}:${tokens.join('.')}`);
                    }
                }
            });

            if (codeTokens.length === 0) {
                if (typeof window.showToast === 'function') window.showToast("Please select at least one Tajweed rule or sub-rule!", true);
                else if (typeof window.showAppAlert === 'function') window.showAppAlert("Please select at least one Tajweed rule or sub-rule!", "Validation");
                else alert("Please select at least one Tajweed rule or sub-rule!");
                return;
            }

            const qty = parseInt(customQty.value) || 10;
            const timer = parseInt(root.querySelector('#hw-timer-select').value) || 15;

            const base = getPublicAppBaseUrl();
            const url = new URL(base);
            url.searchParams.set('hw', codeTokens.join(','));
            url.searchParams.set('st', studentName);
            url.searchParams.set('q', qty);
            url.searchParams.set('t', timer);

            const isDefaultTeacher = (!teacherInfo.name || teacherInfo.name.includes('جهاد') || teacherInfo.name.toLowerCase().includes('gehad'))
                && (!teacherInfo.whatsapp || teacherInfo.whatsapp.includes('1099684126'));

            if (!isDefaultTeacher) {
                if (teacherInfo.name) url.searchParams.set('tc', teacherInfo.name);
                if (teacherInfo.whatsapp) url.searchParams.set('wa', teacherInfo.whatsapp.replace(/[^\d+]/g, ''));
                if (teacherInfo.email) url.searchParams.set('gm', teacherInfo.email);
            }

            const linkStr = url.toString();

            const resultCard = root.querySelector('#hw-result-card');
            const targetEl = root.querySelector('#hw-result-target');
            const urlInput = root.querySelector('#hw-result-url');
            const copyBtn = root.querySelector('#hw-btn-copy-result');
            const waBtn = root.querySelector('#hw-btn-wa-share');

            resultCard.style.display = 'block';
            const safeStudent = typeof window.escapeHtml === 'function' ? window.escapeHtml(studentName) : studentName;
            targetEl.innerHTML = `🎯 Target Student: <strong dir="auto">${safeStudent}</strong> (${qty} Questions • ${timer > 0 ? timer + 's per Q' : 'No timer'})`;
            urlInput.value = linkStr;

            copyBtn.onclick = () => {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(linkStr);
                } else {
                    urlInput.select();
                    document.execCommand('copy');
                }
                copyBtn.innerHTML = '✅ Link Copied!';
                setTimeout(() => { copyBtn.innerHTML = '📋 Copy Link'; }, 2500);
            };

            const waText = `Assalamu Alaikum ${studentName}!\nHere is your Tajweed Homework assignment from teacher ${teacherDisplayName}:\n\n${linkStr}\n\nPlease complete it at home! 📖`;
            waBtn.onclick = () => {
                window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
            };

            resultCard.scrollIntoView({ behavior: 'smooth' });
        };
    }

    function decodeHwToSelection(hwStr) {
        const selMap = {};
        if (!hwStr) return selMap;

        if (hwStr.startsWith('ey') || hwStr.length > 30) {
            try {
                const legacy = JSON.parse(atob(hwStr));
                (legacy.c || []).forEach(c => selMap[c] = ['ALL']);
                return selMap;
            } catch(e) {}
        }

        const parts = hwStr.split(',');
        const definitions = (typeof window.RuleSelectorEngine !== 'undefined' && window.RuleSelectorEngine.definitions) 
            ? window.RuleSelectorEngine.definitions 
            : [];

        parts.forEach(part => {
            if (!part) return;
            if (part.includes(':')) {
                const [cCode, idxStr] = part.split(':');
                const catId = HW_RULE_CODES[cCode] || cCode;
                const def = definitions.find(d => d.id === catId);
                if (def && def.subrules) {
                    selMap[catId] = {};
                    const tokenItems = idxStr.split('.');
                    tokenItems.forEach(item => {
                        let idx, qty = 'ALL';
                        if (item.includes('x')) {
                            const [iStr, qStr] = item.split('x');
                            idx = parseInt(iStr, 10);
                            qty = parseInt(qStr, 10) || 'ALL';
                        } else {
                            idx = parseInt(item, 10);
                        }
                        if (!isNaN(idx) && def.subrules[idx]) {
                            const subKey = def.subrules[idx].key;
                            selMap[catId][subKey] = { enabled: true, qty: qty };
                        }
                    });
                } else {
                    selMap[catId] = ['ALL'];
                }
            } else {
                const catId = HW_RULE_CODES[part] || part;
                selMap[catId] = ['ALL'];
            }
        });
        return selMap;
    }

    function launchHomeworkGame() {
        if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
        const cfg = window.CURRENT_HW_CONFIG || {};
        const pool = window.CURRENT_HW_POOL || [];
        if (pool.length === 0) {
            if (typeof window.showToast === 'function') window.showToast("Homework questions could not be loaded. Please check your link.", true);
            else if (typeof window.showAppAlert === 'function') window.showAppAlert("Homework questions could not be loaded. Please check your link.", "Error");
            else alert("Homework questions could not be loaded. Please check your link.");
            return;
        }

        const studentName = cfg.studentName || 'Student';
        const qty = cfg.qty || 10;
        const timer = cfg.timer !== undefined ? cfg.timer : 15;

        window.isHomeworkMode = true;
        window.isProgressiveMode = false;

        window.session.studentName = studentName;
        window.session.studentAvatar = '🎓';
        window.TIME_LIMIT = timer;

        let finalPlaylist = (typeof window.smartMix === 'function') ? window.smartMix(pool) : pool;
        if (qty > 0 && qty < finalPlaylist.length) {
            finalPlaylist = finalPlaylist.slice(0, qty);
        }

        if (typeof window.initGameSession === 'function') {
            window.initGameSession(false, finalPlaylist);
        }
    }

    window.HW_RULE_CODES = HW_RULE_CODES;
    window.HW_CODES_REVERSE = HW_CODES_REVERSE;
    window.renderHomeworkCreator = renderHomeworkCreator;
    window.decodeHwToSelection = decodeHwToSelection;
    window.launchHomeworkGame = launchHomeworkGame;
    window.generateHWLink = renderHomeworkCreator;

})(typeof window !== 'undefined' ? window : this);
