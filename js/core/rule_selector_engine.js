/**
 * Universal Rule & Sub-Rule Selection Engine
 * Provides standardized multi-rule, sub-rule hierarchy, dynamic count calculation,
 * and reusable UI component across Game Center, Classic Challenge, and Free Practice.
 */

(function(window) {
    'use strict';

    function getBank() {
        if (typeof TAJWEED_BANK !== 'undefined') return TAJWEED_BANK;
        if (typeof window !== 'undefined' && window.TAJWEED_BANK) return window.TAJWEED_BANK;
        return {};
    }

    const CATEGORY_DEFINITIONS = [
        {
            id: 'image_bank',
            title: 'Noon & Meem Mushaddad',
            titleAr: 'النون والميم المشددتان',
            icon: '💎',
            color: '#06b6d4',
            subrules: [
                { key: 'Noon Mushaddad', label: 'Noon Mushaddadah', labelAr: 'النون المشددة' },
                { key: 'Meem Mushaddad', label: 'Meem Mushaddadah', labelAr: 'الميم المشددة' },
                { key: 'Two counts of ghunna', label: 'All Mushaddad (Ghunnah)', labelAr: 'غنة النون والميم' }
            ]
        },
        {
            id: 'qalqalah',
            title: 'Qalqalah',
            titleAr: 'القلقلة',
            icon: '⚡',
            color: '#f59e0b',
            subrules: [
                { key: 'General Qalqalah', label: 'General Qalqalah (Yes/No)', labelAr: 'تمييز القلقلة' },
                { key: 'Minor', label: 'Minor Qalqalah (Sughra)', labelAr: 'قلقلة صغرى' },
                { key: 'Medium', label: 'Medium Qalqalah (Wusta)', labelAr: 'قلقلة وسطى' },
                { key: 'Major', label: 'Major Qalqalah (Kubra)', labelAr: 'قلقلة كبرى' }
            ]
        },
        {
            id: 'meem_sakinah',
            title: 'Meem Sakinah',
            titleAr: 'أحكام الميم الساكنة',
            icon: '🌙',
            color: '#8b5cf6',
            subrules: [
                { key: 'Oral + Clarity', label: 'Izhar Shafawi (Oral Clarity)', labelAr: 'إظهار شفوي' },
                { key: 'Oral + Merger', label: 'Idgham Shafawi (Oral Merging)', labelAr: 'إدغام شفوي' },
                { key: 'Oral + Hiding', label: 'Ikhfaa Shafawi (Oral Hiding)', labelAr: 'إخفاء شفوي' }
            ]
        },
        {
            id: 'noon_sakinah_tanween',
            title: 'Noon Sakinah & Tanween',
            titleAr: 'النون الساكنة والتنوين',
            icon: '📖',
            color: '#10b981',
            subrules: [
                { key: 'Izhar', label: 'Izhar Halqi (Clear)', labelAr: 'إظهار حلقي' },
                { key: 'Idgham with Ghunnah', label: 'Idgham with Ghunnah', labelAr: 'إدغام بغنة' },
                { key: 'Idgham without Ghunnah', label: 'Idgham without Ghunnah', labelAr: 'إدغام بغير غنة' },
                { key: 'Iqlab', label: 'Iqlab (Conversion to Meem)', labelAr: 'إقلاب' },
                { key: 'Ikhfa', label: 'Ikhfaa Haqiqi (Hiding)', labelAr: 'إخفاء حقيقي' },
                { key: 'Izhar Mutlaq', label: 'Izhar Mutlaq', labelAr: 'إظهار مطلق' },
                { key: 'Ikhfa Ghunnah', label: 'Ikhfaa Ghunnah (Heavy/Light)', labelAr: 'مراتب غنة الإخفاء' }
            ]
        },
        {
            id: 'tafkheem_tarqeeq',
            title: 'Tafkheem & Tarqeeq',
            titleAr: 'التفخيم والترقيق',
            icon: '⚖️',
            color: '#ec4899',
            subrules: [
                { key: 'Always Heavy', label: 'Always Heavy Letters', labelAr: 'حروف الاستعلاء' },
                { key: 'Heavy Ra', label: 'Heavy Raa (Tafkheem)', labelAr: 'تفخيم الراء' },
                { key: 'Light Ra', label: 'Light Raa (Tarqeeq)', labelAr: 'ترقيق الراء' },
                { key: 'Ra Both Options', label: 'Raa: Both Options Allowed', labelAr: 'جواز الوجهين في الراء' },
                { key: 'Lam of Allah', label: 'Laam in Word of Allah', labelAr: 'لام لفظ الجلالة' },
                { key: 'Alif', label: 'Alif of Madd (Heavy/Light)', labelAr: 'ألف المد' }
            ]
        },
        {
            id: 'madd_rules',
            title: 'Madd Rules',
            titleAr: 'أحكام المدود',
            icon: '🌊',
            color: '#3b82f6',
            subrules: [
                { key: 'Natural Madd', label: 'Natural Madd (Tabee\'ee)', labelAr: 'المد الطبيعي' },
                { key: 'Connected', label: 'Connected Madd (Muttasil)', labelAr: 'المد المتصل' },
                { key: 'Separated', label: 'Separated Madd (Munfasil)', labelAr: 'المد المنفصل' },
                { key: 'Substitute', label: 'Substitute Madd (Badal)', labelAr: 'مد البدل' },
                { key: 'Compensatory Madd', label: 'Compensatory Madd (\'Iwad)', labelAr: 'مد العوض' },
                { key: 'Temporary Madd', label: 'Temporary Madd (\'Aarid)', labelAr: 'المد العارض للسكون' },
                { key: 'Soft Madd', label: 'Soft Madd (Leen)', labelAr: 'مد اللين' },
                { key: 'Minor Sila Madd', label: 'Minor Sila Madd', labelAr: 'مد الصلة الصغرى' },
                { key: 'Major Sila Madd', label: 'Major Sila Madd', labelAr: 'مد الصلة الكبرى' },
                { key: 'Permanent Word Based Heavy', label: 'Compulsory Word Heavy', labelAr: 'مد لازم كلمي مثقل' },
                { key: 'Permanent Word Based Light', label: 'Compulsory Word Light', labelAr: 'مد لازم كلمي مخفف' },
                { key: 'Permanent Letter Based Heavy', label: 'Compulsory Letter Heavy', labelAr: 'مد لازم حرفي مثقل' },
                { key: 'Permanent Letter Based Light', label: 'Compulsory Letter Light', labelAr: 'مد لازم حرفي مخفف' },
                { key: 'Stabilizing Madd', label: 'Stabilizing Madd (Tamkeen)', labelAr: 'مد التمكين' }
            ]
        },
        {
            id: 'hamzat_wasl',
            title: 'Hamzat Al-Wasl',
            titleAr: 'همزة الوصل',
            icon: '🔗',
            color: '#6366f1',
            subrules: [
                { key: 'Dropped', label: 'Dropped in Connection', labelAr: 'ساقطة وصلاً' },
                { key: 'Start with fatha', label: 'Start with Fathah (Al-)', labelAr: 'البدء بالفتح' },
                { key: 'Start with damma', label: 'Start with Dammah', labelAr: 'البدء بالضم' },
                { key: 'Start with kasra', label: 'Start with Kasrah', labelAr: 'البدء بالكسر' }
            ]
        },
        {
            id: 'lam_shamsiyyah_qamariyyah',
            title: 'Lam Shamsiyyah & Qamariyyah',
            titleAr: 'اللام الشمسية والقمرية',
            icon: '☀️',
            color: '#ea580c',
            subrules: [
                { key: 'Lam Shamsiyyah', label: 'Lam Shamsiyyah (Solar)', labelAr: 'لام شمسية' },
                { key: 'Lam Qamariyyah', label: 'Lam Qamariyyah (Lunar)', labelAr: 'لام قمرية' }
            ]
        },
        {
            id: 'letter_relations',
            title: 'Relations Between Letters',
            titleAr: 'علاقات الحروف',
            icon: '🤝',
            color: '#14b8a6',
            subrules: [
                { key: 'Identical', label: 'Identical (Mutamathilayn)', labelAr: 'المتماثلان' },
                { key: 'Similar', label: 'Homogeneous (Mutajanisayn)', labelAr: 'المتجنسان' },
                { key: 'Close', label: 'Close (Mutaqaribayn)', labelAr: 'المتقاربان' }
            ]
        }
    ];

    const RuleSelectorEngine = {
        definitions: CATEGORY_DEFINITIONS,

        /**
         * Get questions in category matching a sub-rule key
         */
        filterSubQuestions(catKey, subKey, qList) {
            if (typeof window.getSubQuestions === 'function') {
                return window.getSubQuestions(catKey, subKey, qList);
            }
            // Built-in fallback
            if (catKey === 'tafkheem_tarqeeq') return qList.filter(q => q.subcat === subKey);
            if (catKey === 'noon_sakinah_tanween' && subKey === 'Ikhfa Ghunnah') {
                return qList.filter(q => q.id.startsWith('ikhfa_gh') || q.subcat === 'Ikhfa Ghunnah' || (q.prompt && q.prompt.includes('Ghunnah')));
            }
            if (catKey === 'qalqalah') {
                if (subKey === 'General Qalqalah') return qList.filter(q => q.subcat === 'General Qalqalah' || q.ans === 'Qalqalah' || q.ans === 'No Qalqalah');
                if (subKey === 'Minor') return qList.filter(q => q.ans === 'Minor');
                if (subKey === 'Medium') return qList.filter(q => q.ans === 'Medium');
                if (subKey === 'Major') return qList.filter(q => q.ans === 'Major');
            }
            if (catKey === 'image_bank') {
                if (subKey === 'Noon Mushaddad') return qList.filter(q => q.subcat === 'Noon Mushaddad');
                if (subKey === 'Meem Mushaddad') return qList.filter(q => q.subcat === 'Meem Mushaddad');
                return qList;
            }
            return qList.filter(q => (q.subcat === subKey || q.subRule === subKey || q.ans === subKey));
        },

        /**
         * Calculate count of available questions matching selected criteria
         * selectedMap: { [catId]: ['subKey1', 'subKey2'] | ['ALL'] }
         */
        countAvailable(selectedMap = {}) {
            return this.buildPool(selectedMap).length;
        },

        /**
         * Build questions array matching selected criteria
         */
        buildPool(selectedMap = {}) {
            const bank = getBank();
            const pool = [];
            const seenIds = new Set();

            Object.entries(selectedMap).forEach(([catId, subKeys]) => {
                const catObj = bank[catId];
                if (!catObj || !Array.isArray(catObj.questions)) return;

                const qList = catObj.questions;
                const catTitle = catObj.title || catId;

                if (!subKeys || subKeys.length === 0 || subKeys.includes('ALL')) {
                    // Include all questions in category
                    qList.forEach(q => {
                        if (!seenIds.has(q.id)) {
                            seenIds.add(q.id);
                            pool.push({ ...q, categoryId: catId, categoryTitle: catTitle });
                        }
                    });
                } else {
                    subKeys.forEach(subKey => {
                        const matches = this.filterSubQuestions(catId, subKey, qList);
                        matches.forEach(q => {
                            if (!seenIds.has(q.id)) {
                                seenIds.add(q.id);
                                pool.push({ ...q, categoryId: catId, categoryTitle: catTitle });
                            }
                        });
                    });
                }
            });

            return pool;
        },

        /**
         * Render Universal Rule & Sub-rule Selector Component
         * @param {HTMLElement} container
         * @param {Object} options
         *   - initialSelection: { [catId]: ['ALL' | subKey] }
         *   - initialCount: 20
         *   - onChange: function({ selectedMap, totalAvailable, selectedCount, pool })
         */
        render(container, options = {}) {
            if (!container) return null;
            container.innerHTML = '';

            const selectedMap = Object.assign({}, options.initialSelection || { 'image_bank': ['ALL'] });
            let selectedCount = options.initialCount || 20;

            const root = document.createElement('div');
            root.className = 'rule-selector-engine-root';

            // Top Quick Actions Bar: identical to Free Practice setup
            const topBar = document.createElement('div');
            topBar.className = 'rse-top-bar';
            topBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:2px solid #f1f5f9; padding-bottom:8px;';
            topBar.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size: 1.1rem; font-weight: 900; color: #1e293b;">📜 Select Tajweed Rules</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <label class="rule-checkbox-lbl" style="background:#e0e7ff; color:#3730a3; border: 1.5px solid #c7d2fe; padding:4px 12px; border-radius:8px; font-weight:800; font-size:0.85rem; cursor:pointer; display:inline-flex; align-items:center; gap:6px; user-select:none;">
                        <input type="checkbox" class="rse-master-cb" id="rse-cb-all-rules" style="width:17px; height:17px; cursor:pointer; accent-color:#2563eb;"> Select All
                    </label>
                    <button type="button" class="rse-btn-action secondary" id="rse-clear-all" style="background:white; color:#64748b; border:1.5px solid #cbd5e1; padding:4px 10px; border-radius:8px; font-weight:800; font-size:0.82rem; cursor:pointer;">Clear</button>
                </div>
            `;
            root.appendChild(topBar);

            // Rules Container: Clean vertical list of category cards (identical to Free Practice #rules-container)
            const grid = document.createElement('div');
            grid.className = 'rse-rules-container';
            grid.style.cssText = 'display:flex; flex-direction:column; gap:12px; max-height:400px; overflow-y:auto; padding:2px 4px;';

            CATEGORY_DEFINITIONS.forEach(catDef => {
                const bank = getBank();
                const qList = bank[catDef.id]?.questions || [];
                const totalCatQs = qList.length;
                if (totalCatQs === 0) return;

                const isCatActive = !!selectedMap[catDef.id];
                const activeSubs = selectedMap[catDef.id] || [];
                const isAllSubs = activeSubs.includes('ALL') || (activeSubs.length > 0 && activeSubs.length === catDef.subrules.length);

                const card = document.createElement('div');
                card.className = `rule-card rse-rule-card ${isCatActive ? 'active' : ''}`;
                card.dataset.catId = catDef.id;
                card.style.cssText = `background: ${isCatActive ? '#f8fafc' : 'white'}; border: 2px solid ${isCatActive ? '#93c5fd' : '#e2e8f0'}; border-radius: 14px; padding: 12px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); transition: all 0.2s ease; flex-shrink: 0;`;

                const hasSubs = catDef.subrules && catDef.subrules.length > 0;

                let html = `
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%;">
                        <label style="cursor: pointer; display: flex; align-items: center; gap: 10px; flex: 1; margin: 0; user-select: none;">
                            <input type="checkbox" class="cat-cb rse-main-cb" data-cat="${catDef.id}" ${isCatActive ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer; accent-color: #2563eb; flex-shrink: 0;">
                            <span style="font-size: 1.2rem; line-height: 1;">${catDef.icon}</span>
                            <span style="font-size: 1.05rem; font-weight: 800; color: #1e293b;">${catDef.title}</span>
                            <span style="font-size: 0.85rem; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 2px 10px; border-radius: 999px; margin-left: auto; margin-right: 8px;">${totalCatQs} examples</span>
                        </label>
                        ${hasSubs ? `
                        <button type="button" class="rse-expand-toggle" title="Expand Sub-rules" style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #475569; font-size: 0.8rem; flex-shrink: 0;">
                            <span class="rse-expand-arrow">${isCatActive ? '▲' : '▼'}</span>
                        </button>
                        ` : ''}
                    </div>
                `;

                if (hasSubs) {
                    html += `
                    <div class="sub-rules-list rse-subrules-list" style="margin-left: 28px; margin-top: 10px; padding-left: 14px; border-left: 3px solid #cbd5e1; display: ${isCatActive ? 'flex' : 'none'}; flex-direction: column; gap: 8px;">
                    `;

                    catDef.subrules.forEach(sub => {
                        const subMatches = this.filterSubQuestions(catDef.id, sub.key, qList);
                        const isSubChecked = isCatActive && (isAllSubs || activeSubs.includes(sub.key));
                        html += `
                            <div class="sub-rule-row rse-sub-row" style="display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%;">
                                <label style="cursor: pointer; display: flex; align-items: center; gap: 8px; flex: 1; margin: 0; user-select: none;">
                                    <input type="checkbox" class="sub-cb rse-sub-cb" data-parent="${catDef.id}" data-sub="${sub.key}" ${isSubChecked ? 'checked' : ''} style="width: 17px; height: 17px; cursor: pointer; accent-color: #3b82f6; flex-shrink: 0;">
                                    <span style="font-size: 0.95rem; font-weight: 700; color: #475569;">${sub.label}</span>
                                    <span style="font-size: 0.82rem; font-weight: 600; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 999px; margin-left: auto;">${subMatches.length} examples</span>
                                </label>
                            </div>
                        `;
                    });

                    html += `</div>`;
                }

                card.innerHTML = html;
                grid.appendChild(card);
            });
            root.appendChild(grid);

            // Bottom Dynamic Question Count Bar (identical to Free Practice)
            const countBar = document.createElement('div');
            countBar.className = 'rse-count-bar';
            countBar.style.cssText = 'margin-top: 14px; background: linear-gradient(135deg, #eff6ff, #f8fafc); padding: 14px 18px; border-radius: 14px; border: 2px solid #bfdbfe; display: flex; flex-direction: column; gap: 10px;';
            countBar.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                    <div>
                        <span style="font-size: 1.05rem; font-weight: 900; color: #1e3a8a;">Total Available Questions: </span>
                        <span style="font-size: 1.35rem; font-weight: 900; color: #2563eb; background: #dbeafe; padding: 2px 14px; border-radius: 999px;" id="rse-available-count">0</span>
                    </div>
                </div>
                <div>
                    <div style="font-size: 0.85rem; font-weight: 800; color: #475569; margin-bottom: 6px;">Choose Question Count:</div>
                    <div id="rse-chips-container" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
                </div>
            `;
            root.appendChild(countBar);

            container.appendChild(root);

            // Internal helper to update calculations and trigger onChange
            const updateUI = () => {
                const pool = this.buildPool(selectedMap);
                const totalAvailable = pool.length;

                // Update available count display
                const countValEl = root.querySelector('#rse-available-count');
                if (countValEl) countValEl.textContent = totalAvailable;

                // Sync master checkbox state
                const masterCb = root.querySelector('#rse-cb-all-rules');
                if (masterCb) {
                    const allCards = Array.from(root.querySelectorAll('.rse-rule-card'));
                    const checkedCards = allCards.filter(c => {
                        const mcb = c.querySelector('.rse-main-cb');
                        return mcb && mcb.checked;
                    });
                    masterCb.checked = allCards.length > 0 && checkedCards.length === allCards.length;
                    masterCb.indeterminate = checkedCards.length > 0 && checkedCards.length < allCards.length;
                }

                // Render dynamic chips: [5, 10, 15, 20, 25, 30, 40, 'All']
                const chipsContainer = root.querySelector('#rse-chips-container');
                if (chipsContainer) {
                    chipsContainer.innerHTML = '';
                    const baseCounts = [5, 10, 15, 20, 25, 30, 40];
                    const availableOptions = baseCounts.filter(c => c <= totalAvailable);

                    if (availableOptions.length === 0 && totalAvailable > 0) {
                        availableOptions.push(totalAvailable);
                    }

                    availableOptions.forEach(num => {
                        const chip = document.createElement('button');
                        chip.type = 'button';
                        chip.className = `rse-chip ${selectedCount === num ? 'active' : ''}`;
                        chip.style.cssText = `background: ${selectedCount === num ? '#2563eb' : 'white'}; color: ${selectedCount === num ? 'white' : '#334155'}; border: 1.5px solid ${selectedCount === num ? '#2563eb' : '#cbd5e1'}; padding: 6px 14px; border-radius: 8px; font-size: 0.88rem; font-weight: 800; cursor: pointer; transition: all 0.15s;`;
                        chip.textContent = `${num} Questions`;
                        chip.onclick = () => {
                            selectedCount = num;
                            updateUI();
                        };
                        chipsContainer.appendChild(chip);
                    });

                    // 'All' chip
                    if (totalAvailable > 0) {
                        const allChip = document.createElement('button');
                        allChip.type = 'button';
                        const isAllActive = selectedCount === 'all' || selectedCount >= totalAvailable;
                        allChip.className = `rse-chip ${isAllActive ? 'active' : ''}`;
                        allChip.style.cssText = `background: ${isAllActive ? '#2563eb' : 'white'}; color: ${isAllActive ? 'white' : '#334155'}; border: 1.5px solid ${isAllActive ? '#2563eb' : '#cbd5e1'}; padding: 6px 14px; border-radius: 8px; font-size: 0.88rem; font-weight: 800; cursor: pointer; transition: all 0.15s;`;
                        allChip.textContent = `All (${totalAvailable}) ⭐`;
                        allChip.onclick = () => {
                            selectedCount = totalAvailable;
                            updateUI();
                        };
                        chipsContainer.appendChild(allChip);
                    }
                }

                // If selectedCount is higher than totalAvailable, clamp it
                if (typeof selectedCount === 'number' && selectedCount > totalAvailable && totalAvailable > 0) {
                    selectedCount = totalAvailable;
                }

                // Fire callback
                if (typeof options.onChange === 'function') {
                    options.onChange({
                        selectedMap,
                        totalAvailable,
                        selectedCount: selectedCount === 'all' ? totalAvailable : selectedCount,
                        pool: pool.slice(0, selectedCount === 'all' ? totalAvailable : Math.min(selectedCount, totalAvailable))
                    });
                }
            };

            // Event Bindings
            // 1. Expand / Collapse drawers
            root.querySelectorAll('.rse-expand-toggle').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const card = btn.closest('.rse-rule-card');
                    const drawer = card.querySelector('.rse-subrules-list');
                    if (!drawer) return;
                    const isVisible = drawer.style.display !== 'none';
                    drawer.style.display = isVisible ? 'none' : 'flex';
                    const arrow = btn.querySelector('.rse-expand-arrow');
                    if (arrow) arrow.textContent = isVisible ? '▼' : '▲';
                };
            });

            // 2. Main Rule Checkbox change
            root.querySelectorAll('.rse-main-cb').forEach(cb => {
                cb.onchange = () => {
                    const catId = cb.dataset.cat;
                    const card = cb.closest('.rse-rule-card');
                    const drawer = card.querySelector('.rse-subrules-list');
                    const subCbs = card.querySelectorAll('.rse-sub-cb');
                    const arrow = card.querySelector('.rse-expand-arrow');

                    if (cb.checked) {
                        card.style.borderColor = '#93c5fd';
                        card.style.background = '#f8fafc';
                        card.classList.add('active');
                        if (drawer) {
                            drawer.style.display = 'flex';
                            if (arrow) arrow.textContent = '▲';
                        }
                        selectedMap[catId] = ['ALL'];
                        subCbs.forEach(s => s.checked = true);
                    } else {
                        card.style.borderColor = '#e2e8f0';
                        card.style.background = 'white';
                        card.classList.remove('active');
                        if (drawer) {
                            drawer.style.display = 'none';
                            if (arrow) arrow.textContent = '▼';
                        }
                        delete selectedMap[catId];
                        subCbs.forEach(s => s.checked = false);
                    }
                    updateUI();
                };
            });

            // 3. Individual Sub-rule checkbox change
            root.querySelectorAll('.rse-sub-cb').forEach(cb => {
                cb.onchange = () => {
                    const catId = cb.dataset.parent;
                    const card = cb.closest('.rse-rule-card');
                    const mainCb = card.querySelector('.rse-main-cb');
                    const subCbs = Array.from(card.querySelectorAll('.rse-sub-cb'));

                    const checkedKeys = subCbs.filter(s => s.checked).map(s => s.dataset.sub);

                    if (checkedKeys.length === 0) {
                        mainCb.checked = false;
                        mainCb.indeterminate = false;
                        card.style.borderColor = '#e2e8f0';
                        card.style.background = 'white';
                        card.classList.remove('active');
                        delete selectedMap[catId];
                    } else if (checkedKeys.length === subCbs.length) {
                        mainCb.checked = true;
                        mainCb.indeterminate = false;
                        card.style.borderColor = '#93c5fd';
                        card.style.background = '#f8fafc';
                        card.classList.add('active');
                        selectedMap[catId] = ['ALL'];
                    } else {
                        mainCb.checked = true;
                        mainCb.indeterminate = true;
                        card.style.borderColor = '#93c5fd';
                        card.style.background = '#f8fafc';
                        card.classList.add('active');
                        selectedMap[catId] = checkedKeys;
                    }
                    updateUI();
                };
            });

            // 4. Master Select All Checkbox
            const masterCb = root.querySelector('#rse-cb-all-rules');
            if (masterCb) {
                masterCb.onchange = (e) => {
                    const checked = e.target.checked;
                    CATEGORY_DEFINITIONS.forEach(cat => {
                        if (checked) {
                            selectedMap[cat.id] = ['ALL'];
                        } else {
                            delete selectedMap[cat.id];
                        }
                    });

                    root.querySelectorAll('.rse-rule-card').forEach(card => {
                        const mcb = card.querySelector('.rse-main-cb');
                        if (mcb) {
                            mcb.checked = checked;
                            mcb.indeterminate = false;
                        }
                        card.querySelectorAll('.rse-sub-cb').forEach(s => s.checked = checked);
                        const drawer = card.querySelector('.rse-subrules-list');
                        const arrow = card.querySelector('.rse-expand-arrow');
                        if (checked) {
                            card.style.borderColor = '#93c5fd';
                            card.style.background = '#f8fafc';
                            card.classList.add('active');
                            if (drawer) {
                                drawer.style.display = 'flex';
                                if (arrow) arrow.textContent = '▲';
                            }
                        } else {
                            card.style.borderColor = '#e2e8f0';
                            card.style.background = 'white';
                            card.classList.remove('active');
                            if (drawer) {
                                drawer.style.display = 'none';
                                if (arrow) arrow.textContent = '▼';
                            }
                        }
                    });
                    updateUI();
                };
            }

            // 5. Clear All Button
            const clearAllBtn = root.querySelector('#rse-clear-all');
            if (clearAllBtn) {
                clearAllBtn.onclick = () => {
                    Object.keys(selectedMap).forEach(k => delete selectedMap[k]);
                    if (masterCb) {
                        masterCb.checked = false;
                        masterCb.indeterminate = false;
                    }
                    root.querySelectorAll('.rse-rule-card').forEach(card => {
                        const mcb = card.querySelector('.rse-main-cb');
                        if (mcb) {
                            mcb.checked = false;
                            mcb.indeterminate = false;
                        }
                        card.querySelectorAll('.rse-sub-cb').forEach(s => s.checked = false);
                        card.style.borderColor = '#e2e8f0';
                        card.style.background = 'white';
                        card.classList.remove('active');
                        const drawer = card.querySelector('.rse-subrules-list');
                        const arrow = card.querySelector('.rse-expand-arrow');
                        if (drawer) drawer.style.display = 'none';
                        if (arrow) arrow.textContent = '▼';
                    });
                    updateUI();
                };
            }

            // Initial calculation
            updateUI();

            return {
                getSelectedMap: () => selectedMap,
                getSelectedCount: () => selectedCount,
                getPool: () => this.buildPool(selectedMap),
                update: updateUI
            };
        }
    };

    window.RuleSelectorEngine = RuleSelectorEngine;

})(typeof window !== 'undefined' ? window : global);
