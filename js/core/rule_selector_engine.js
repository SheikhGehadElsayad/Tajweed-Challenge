/**
 * Universal Rule & Sub-Rule Selection Engine
 * Version 39: Streamlined Two Options (Custom Number with Max indicator OR Max All at once),
 * 100% English Interface (all Arabic guidance text removed), Full-Width Edge-to-Edge Dropdown,
 * Dedicated Total Question Count Only, and High Readability.
 */

(function(window) {
    'use strict';

    function getBank() {
        if (typeof TAJWEED_BANK !== 'undefined') return TAJWEED_BANK;
        if (typeof window !== 'undefined' && window.TAJWEED_BANK) return window.TAJWEED_BANK;
        if (typeof global !== 'undefined' && global.TAJWEED_BANK) return global.TAJWEED_BANK;
        return {};
    }

    const CATEGORY_DEFINITIONS = [
        {
            id: 'image_bank',
            title: 'Noon & Meem Mushaddad',
            subtitle: 'Letters with permanent two-count Ghunnah (Noon & Meem Mushaddad)',
            icon: '💎',
            color: '#06b6d4',
            subrules: [
                { key: 'Noon Mushaddad', label: 'Noon Mushaddadah' },
                { key: 'Meem Mushaddad', label: 'Meem Mushaddadah' },
                { key: 'Two counts of ghunna', label: 'All Mushaddad (Ghunnah)' }
            ]
        },
        {
            id: 'qalqalah',
            title: 'Qalqalah (Echo)',
            subtitle: 'Echoing vibration on Qalqalah letters (Q-T-B-J-D)',
            icon: '⚡',
            color: '#f59e0b',
            subrules: [
                { key: 'General Qalqalah', label: 'General Qalqalah (Yes/No)' },
                { key: 'Minor', label: 'Minor Qalqalah (Sughra)' },
                { key: 'Medium', label: 'Medium Qalqalah (Wusta)' },
                { key: 'Major', label: 'Major Qalqalah (Kubra)' }
            ]
        },
        {
            id: 'meem_sakinah',
            title: 'Meem Sakinah',
            subtitle: 'Oral rules for Meem with Sukoon',
            icon: '🌙',
            color: '#8b5cf6',
            subrules: [
                { key: 'Oral + Clarity', label: 'Izhar Shafawi (Oral Clarity)' },
                { key: 'Oral + Merger', label: 'Idgham Shafawi (Oral Merging)' },
                { key: 'Oral + Hiding', label: 'Ikhfaa Shafawi (Oral Hiding)' }
            ]
        },
        {
            id: 'noon_sakinah_tanween',
            title: 'Noon Sakinah & Tanween',
            subtitle: 'Clarity, merging, conversion, and hiding rules',
            icon: '📖',
            color: '#10b981',
            subrules: [
                { key: 'Izhar', label: 'Izhar Halqi (Throat Clarity)' },
                { key: 'Idgham with Ghunnah', label: 'Idgham with Ghunnah (Merging)' },
                { key: 'Idgham without Ghunnah', label: 'Idgham without Ghunnah' },
                { key: 'Iqlab', label: 'Iqlab (Conversion to Meem)' },
                { key: 'Ikhfa', label: 'Ikhfaa Haqiqi (True Hiding)' },
                { key: 'Izhar Mutlaq', label: 'Izhar Mutlaq (Absolute Clarity)' },
                { key: 'Ikhfa Ghunnah', label: 'Ikhfaa Ghunnah (Heavy / Light)' },
                { key: 'Idgham Completeness', label: 'Idgham Completeness (Kamil / Naqis)' }
            ]
        },
        {
            id: 'tafkheem_tarqeeq',
            title: 'Tafkheem & Tarqeeq',
            subtitle: 'Heavy & light letter characteristics (Heavy Letters, Raa, Laam)',
            icon: '⚖️',
            color: '#ec4899',
            subrules: [
                { key: 'Always Heavy', label: 'Always Heavy Letters (Istilaa)' },
                { key: 'Heavy Ra', label: 'Heavy Raa (Tafkheem)' },
                { key: 'Light Ra', label: 'Light Raa (Tarqeeq)' },
                { key: 'Ra Both Options', label: 'Raa: Both Options Allowed' },
                { key: 'Lam of Allah', label: 'Laam in Word of Allah' },
                { key: 'Alif', label: 'Alif of Madd' }
            ]
        },
        {
            id: 'madd_rules',
            title: 'Madd Rules (Elongation)',
            subtitle: 'Natural, secondary, and compulsory lengthenings',
            icon: '🌊',
            color: '#3b82f6',
            subrules: [
                { key: 'Natural Madd', label: 'Natural Madd (Tabee\'ee)' },
                { key: 'Connected', label: 'Connected Madd (Muttasil)' },
                { key: 'Separated', label: 'Separated Madd (Munfasil)' },
                { key: 'Substitute', label: 'Substitute Madd (Badal)' },
                { key: 'Compensatory Madd', label: 'Compensatory Madd (\'Iwad)' },
                { key: 'Temporary Madd', label: 'Temporary Madd (\'Aarid)' },
                { key: 'Soft Madd', label: 'Soft Madd (Leen)' },
                { key: 'Minor Sila Madd', label: 'Minor Sila Madd (Ha Kinaayah)' },
                { key: 'Major Sila Madd', label: 'Major Sila Madd' },
                { key: 'Permanent Word Based Heavy', label: 'Compulsory Word Heavy (Muthaqqal)' },
                { key: 'Permanent Word Based Light', label: 'Compulsory Word Light (Mukhaffaf)' },
                { key: 'Permanent Letter Based Heavy', label: 'Compulsory Letter Heavy (Harfee)' },
                { key: 'Permanent Letter Based Light', label: 'Compulsory Letter Light' },
                { key: 'Stabilizing Madd', label: 'Stabilizing Madd (Tamkeen)' }
            ]
        },
        {
            id: 'hamzat_wasl',
            title: 'Hamzat Al-Wasl',
            subtitle: 'Connecting hamzah dropping and vowel starting rules',
            icon: '🔗',
            color: '#6366f1',
            subrules: [
                { key: 'Dropped', label: 'Dropped in Continuous Speech' },
                { key: 'Start with fatha', label: 'Start with Fathah (Al- nouns)' },
                { key: 'Start with damma', label: 'Start with Dammah (Verbs)' },
                { key: 'Start with kasra', label: 'Start with Kasrah (Verbs & Nouns)' }
            ]
        },
        {
            id: 'lam_shamsiyyah_qamariyyah',
            title: 'Lam Shamsiyyah & Qamariyyah',
            subtitle: 'Solar and lunar letter assimilations with Al-',
            icon: '☀️',
            color: '#ea580c',
            subrules: [
                { key: 'Lam Shamsiyyah', label: 'Lam Shamsiyyah (Solar - Merged)' },
                { key: 'Lam Qamariyyah', label: 'Lam Qamariyyah (Lunar - Clear)' }
            ]
        },
        {
            id: 'lam_harf',
            title: 'Lam of Hal & Bal',
            subtitle: 'Rules of the Saakin Lam in particles Hal and Bal (Merging & Clarity)',
            icon: '⚡',
            color: '#0284c7',
            subrules: [
                { key: 'Idgham', label: 'Idgham (Merged in Laam & Raa)' },
                { key: 'Izhar', label: 'Izhar (Clear Pronunciation)' }
            ]
        },
        {
            id: 'letter_relations',
            title: 'Letter Relationships',
            subtitle: 'Identical, homogeneous, and close letter combinations',
            icon: '🤝',
            color: '#14b8a6',
            subrules: [
                { key: 'Identical', label: 'Identical Letters (Mutamathilayn)' },
                { key: 'Similar', label: 'Homogeneous Letters (Mutajanisayn)' },
                { key: 'Close', label: 'Close Letters (Mutaqaribayn)' }
            ]
        }
    ];

    const RuleSelectorEngine = {
        definitions: CATEGORY_DEFINITIONS,

        /**
         * Get questions in category matching a sub-rule key
         */
        filterSubQuestions(catKey, subKey, qList) {
            if (!Array.isArray(qList) || qList.length === 0) return [];
            if (typeof window !== 'undefined' && window.QuestionRepository) {
                return window.QuestionRepository.getBySubRule(catKey, subKey, qList);
            }
            if (typeof window !== 'undefined' && typeof window.getSubQuestions === 'function') {
                return window.getSubQuestions(catKey, subKey, qList);
            }
            return qList.filter(q => (q.subcat === subKey || q.subRule === subKey || q.ans === subKey));
        },

        /**
         * Helper: Unified shuffle
         */
        shuffle(arr) {
            if (typeof shuffleArray === 'function') return shuffleArray(arr);
            if (typeof window !== 'undefined' && typeof window.shuffleArray === 'function') return window.shuffleArray(arr);
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },

        /**
         * Build Question Pool with Per-Subrule Granular Quantities
         */
        buildPool(selectionConfig = {}) {
            const bank = getBank();
            const pool = [];
            const seenIds = new Set();

            Object.entries(selectionConfig).forEach(([catId, val]) => {
                const catObj = bank[catId];
                if (!catObj || !Array.isArray(catObj.questions)) return;

                const qList = catObj.questions;
                const catTitle = catObj.title || catId;

                // Case 1: Legacy Array format ['ALL'] or ['subKey1', ...]
                if (Array.isArray(val)) {
                    if (val.length === 0 || val.includes('ALL')) {
                        qList.forEach(q => {
                            if (!seenIds.has(q.id)) {
                                seenIds.add(q.id);
                                pool.push({ ...q, categoryId: catId, categoryTitle: catTitle });
                            }
                        });
                    } else {
                        val.forEach(subKey => {
                            const matches = this.filterSubQuestions(catId, subKey, qList);
                            matches.forEach(q => {
                                if (!seenIds.has(q.id)) {
                                    seenIds.add(q.id);
                                    pool.push({ ...q, categoryId: catId, categoryTitle: catTitle, subRuleKey: subKey });
                                }
                            });
                        });
                    }
                }
                // Case 2: Rich Object format with per-subrule toggles and quantities
                else if (typeof val === 'object' && val !== null) {
                    Object.entries(val).forEach(([subKey, subConf]) => {
                        let isEnabled = true;
                        let qty = 'ALL';

                        if (typeof subConf === 'boolean') {
                            isEnabled = subConf;
                        } else if (typeof subConf === 'number') {
                            isEnabled = true;
                            qty = subConf;
                        } else if (typeof subConf === 'object' && subConf !== null) {
                            isEnabled = subConf.enabled !== false;
                            qty = subConf.qty !== undefined ? subConf.qty : 'ALL';
                        }

                        if (!isEnabled) return;

                        let matches = [];
                        if (subKey === 'ALL') {
                            matches = [...qList];
                        } else {
                            matches = this.filterSubQuestions(catId, subKey, qList);
                        }

                        let shuffled = this.shuffle(matches);
                        if (typeof qty === 'number' && qty > 0) {
                            shuffled = shuffled.slice(0, qty);
                        }

                        shuffled.forEach(q => {
                            if (!seenIds.has(q.id)) {
                                seenIds.add(q.id);
                                pool.push({ ...q, categoryId: catId, categoryTitle: catTitle, subRuleKey: subKey });
                            }
                        });
                    });
                }
            });

            return pool;
        },

        /**
         * Count total available questions for a selection
         */
        countAvailable(selectionConfig = {}) {
            return this.buildPool(selectionConfig).length;
        },

        /**
         * Render the Streamlined Rule Selector Engine Component
         * - Clean English Interface (No Arabic guidance)
         * - Two options per subrule: Custom quantity (with max limit displayed) OR Max All at once
         * - Full-width dropdown from edge to edge
         * - No duplicate questions count picker (HUD displays total count only)
         */
        render(container, options = {}) {
            if (!container) return null;
            container.innerHTML = '';

            const bank = getBank();

            // Internal State Structure:
            // state[catId][subKey] = { enabled: boolean, qty: number | 'ALL', maxAvailable: number }
            const state = {};

            // Populate default state
            CATEGORY_DEFINITIONS.forEach(catDef => {
                state[catDef.id] = {};
                const qList = bank[catDef.id]?.questions || [];
                catDef.subrules.forEach(sub => {
                    const subCount = this.filterSubQuestions(catDef.id, sub.key, qList).length;
                    state[catDef.id][sub.key] = {
                        enabled: false,
                        qty: subCount,
                        maxAvailable: subCount
                    };
                });
            });

            // Hydrate initial selection if provided
            if (options.initialSelection && typeof options.initialSelection === 'object') {
                Object.entries(options.initialSelection).forEach(([catId, val]) => {
                    if (!state[catId]) return;
                    if (Array.isArray(val)) {
                        if (val.includes('ALL')) {
                            Object.keys(state[catId]).forEach(subKey => {
                                state[catId][subKey].enabled = true;
                            });
                        } else {
                            val.forEach(subKey => {
                                if (state[catId][subKey]) state[catId][subKey].enabled = true;
                            });
                        }
                    } else if (typeof val === 'object' && val !== null) {
                        Object.entries(val).forEach(([subKey, subConf]) => {
                            if (!state[catId][subKey]) return;
                            if (typeof subConf === 'boolean') {
                                state[catId][subKey].enabled = subConf;
                            } else if (typeof subConf === 'number') {
                                state[catId][subKey].enabled = true;
                                state[catId][subKey].qty = subConf;
                            } else if (typeof subConf === 'object' && subConf !== null) {
                                state[catId][subKey].enabled = subConf.enabled !== false;
                                if (subConf.qty !== undefined) state[catId][subKey].qty = subConf.qty;
                            }
                        });
                    }
                });
            } else {
                // Clean zero-state start: no pre-selected rules
            }

            // Track expanded realms for sub-rules customization
            const expandedRealms = new Set();

            // Create Root Arena Container
            const arena = document.createElement('div');
            arena.className = 'rule-arena-container';

            // 1. Top Command Bar (100% English)
            const cmdBar = document.createElement('div');
            cmdBar.className = 'arena-cmd-bar';
            cmdBar.innerHTML = `
                <div class="arena-cmd-left">
                    <span class="arena-cmd-icon">🎯</span>
                    <div class="arena-cmd-titles">
                        <span class="arena-cmd-title-en">Challenge Rule Selector</span>
                        <span class="arena-cmd-subtitle-en">Toggle rules to practice and set question counts</span>
                    </div>
                </div>
                <div class="arena-cmd-actions">
                    <button type="button" class="arena-btn-cmd highlight" id="arena-cmd-all" title="Select all questions across all rules">🌟 Select All (Max)</button>
                    <button type="button" class="arena-btn-cmd" id="arena-cmd-clear" title="Reset all selections to zero">🧹 Clear All</button>
                </div>
            `;
            arena.appendChild(cmdBar);

            // 2. Modern Card Grid for all Realms
            const realmGrid = document.createElement('div');
            realmGrid.className = 'arena-realm-grid';
            arena.appendChild(realmGrid);

            // 3. Bottom Arena HUD Bar (100% English)
            const hudBar = document.createElement('div');
            hudBar.className = 'arena-hud-bar';
            hudBar.innerHTML = `
                <div class="arena-hud-metrics">
                    <div class="hud-metric">
                        <span class="hud-label">Total Questions:</span>
                        <span class="hud-val" id="arena-hud-total-val">0</span>
                    </div>
                    <div class="hud-metric">
                        <span class="hud-label">Active Rules:</span>
                        <span class="hud-sub-val" id="arena-hud-subs-val">0 Sub-Rules (0 Realms)</span>
                    </div>
                </div>
                <div class="arena-hud-actions" style="display: flex; align-items: center; gap: 10px;">
                    <button type="button" class="arena-btn-cmd" id="arena-hud-reset" title="Reset all to zero">🧹 Reset</button>
                    ${options.showLaunchButton ? `
                        <button type="button" class="arena-hero-btn" id="arena-hero-launch-btn">
                            ${options.launchButtonText || '🚀 Start Challenge Now'}
                        </button>
                    ` : ''}
                </div>
            `;
            arena.appendChild(hudBar);

            container.appendChild(arena);

            // Audio Helper
            const playClick = () => {
                if (typeof window !== 'undefined' && window.SFX && typeof window.SFX.click === 'function') {
                    try { window.SFX.click(); } catch(e) {}
                }
            };

            // Calculate current metrics & build exported config
            const getExportedState = () => {
                const exported = {};
                let activeWorlds = 0;
                let activeSubs = 0;

                Object.entries(state).forEach(([catId, subMap]) => {
                    const activeSubEntries = Object.entries(subMap).filter(([k, s]) => s.enabled && s.qty > 0);
                    if (activeSubEntries.length > 0) {
                        activeWorlds++;
                        exported[catId] = {};
                        activeSubEntries.forEach(([k, s]) => {
                            activeSubs++;
                            exported[catId][k] = {
                                enabled: true,
                                qty: s.qty
                            };
                        });
                    }
                });

                const pool = this.buildPool(exported);
                const totalPoolCount = pool.length;

                return {
                    exported,
                    pool,
                    totalPoolCount,
                    activeWorlds,
                    activeSubs
                };
            };

            // Main UI Refresh Function (Card-Based Option 1, 100% English)
            const updateUI = () => {
                const { exported, pool, totalPoolCount, activeWorlds, activeSubs } = getExportedState();

                // 1. Update HUD metrics
                const totalValEl = hudBar.querySelector('#arena-hud-total-val');
                const subsValEl = hudBar.querySelector('#arena-hud-subs-val');
                if (totalValEl) totalValEl.textContent = totalPoolCount;
                if (subsValEl) subsValEl.textContent = `${activeSubs} Sub-Rules (${activeWorlds} Realms)`;

                // 2. Render Modern Realm Cards
                realmGrid.innerHTML = '';
                CATEGORY_DEFINITIONS.forEach(catDef => {
                    const qList = bank[catDef.id]?.questions || [];
                    if (qList.length === 0) return;

                    const catState = state[catDef.id] || {};
                    const subEntries = Object.entries(catState);
                    const enabledSubs = subEntries.filter(([k, s]) => s.enabled && s.qty > 0);

                    // Calculate bank and active counts for realm
                    let totalBankQs = 0;
                    let activeTotalCatQs = 0;
                    subEntries.forEach(([k, s]) => {
                        totalBankQs += s.maxAvailable;
                        if (s.enabled) {
                            const count = (typeof s.qty === 'number') ? Math.min(s.qty, s.maxAvailable) : s.maxAvailable;
                            activeTotalCatQs += count;
                        }
                    });

                    const isRealmActive = enabledSubs.length > 0;
                    const isAllMax = isRealmActive && (activeTotalCatQs === totalBankQs);
                    const isExpanded = expandedRealms.has(catDef.id);

                    const card = document.createElement('div');
                    card.className = `realm-card ${isRealmActive ? 'active' : ''}`;
                    card.style.setProperty('--world-color', catDef.color);

                    // Build Subrules Drawer HTML
                    let subRulesHtml = '';
                    catDef.subrules.forEach(sub => {
                        const subState = catState[sub.key] || { enabled: false, qty: 0, maxAvailable: 0 };
                        if (subState.maxAvailable === 0) return;
                        const isSubActive = subState.enabled && subState.qty > 0;
                        const subDisplayQty = (subState.qty === 'ALL' || subState.qty >= subState.maxAvailable)
                            ? subState.maxAvailable
                            : (typeof subState.qty === 'number' ? subState.qty : subState.maxAvailable);
                        const isSubAll = (subDisplayQty === subState.maxAvailable);

                        subRulesHtml += `
                            <div class="subrule-item ${isSubActive ? 'active' : ''}" data-subkey="${sub.key}">
                                <label class="subrule-item-header">
                                    <input type="checkbox" class="subrule-checkbox" ${isSubActive ? 'checked' : ''}>
                                    <span class="subrule-name">${sub.label}</span>
                                    <span class="subrule-bank-mini">${subState.maxAvailable} Qs</span>
                                </label>
                                <div class="subrule-item-controls ${isSubActive ? '' : 'disabled'}">
                                    <div class="subrule-mini-stepper">
                                        <button type="button" class="subrule-mini-btn minus" ${!isSubActive ? 'disabled' : ''} aria-label="Decrease">−</button>
                                        <input type="number" class="subrule-mini-input" min="1" max="${subState.maxAvailable}" value="${subDisplayQty}" ${!isSubActive ? 'disabled' : ''}>
                                        <button type="button" class="subrule-mini-btn plus" ${!isSubActive ? 'disabled' : ''} aria-label="Increase">+</button>
                                    </div>
                                    <button type="button" class="subrule-mini-all ${isSubActive && isSubAll ? 'active' : ''}" ${!isSubActive ? 'disabled' : ''}>Max</button>
                                </div>
                            </div>
                        `;
                    });

                    card.innerHTML = `
                        <div class="realm-card-top">
                            <div class="realm-icon-title">
                                <div class="realm-icon-box" style="background: ${catDef.color}15; color: ${catDef.color}; border: 1.5px solid ${catDef.color}35;">
                                    ${catDef.icon}
                                </div>
                                <div class="realm-text-wrap">
                                    <h3 class="realm-title">${catDef.title}</h3>
                                    <p class="realm-desc">${catDef.subtitle}</p>
                                </div>
                            </div>
                            <span class="realm-bank-pill">Bank: ${totalBankQs} Qs</span>
                        </div>

                        <div class="realm-control-bar">
                            <label class="realm-toggle-label" title="Toggle ${catDef.title}">
                                <input type="checkbox" class="realm-toggle-switch" ${isRealmActive ? 'checked' : ''}>
                                <span class="realm-slider"></span>
                                <span class="realm-status-badge ${isRealmActive ? 'on' : 'off'}">${isRealmActive ? 'ACTIVE' : 'OFF'}</span>
                            </label>

                            <button type="button" class="realm-subrules-toggle ${isExpanded ? 'open' : ''}">
                                ${isExpanded ? '▲ Hide Details' : '▼ Sub-Rules (' + enabledSubs.length + '/' + catDef.subrules.length + ')'}
                            </button>
                        </div>

                        <div class="realm-stepper-row ${isRealmActive ? '' : 'disabled'}">
                            <div class="realm-stepper-box">
                                <button type="button" class="realm-step-btn minus" ${!isRealmActive ? 'disabled' : ''} aria-label="Decrease">−</button>
                                <input type="number" class="realm-qty-input" min="1" max="${totalBankQs}" value="${activeTotalCatQs || totalBankQs}" ${!isRealmActive ? 'disabled' : ''}>
                                <button type="button" class="realm-step-btn plus" ${!isRealmActive ? 'disabled' : ''} aria-label="Increase">+</button>
                                <span class="realm-qty-max">/ ${totalBankQs} Qs</span>
                            </div>
                            <button type="button" class="realm-all-btn ${isRealmActive && isAllMax ? 'active' : ''}" ${!isRealmActive ? 'disabled' : ''}>
                                All (${totalBankQs}) ⭐
                            </button>
                        </div>

                        <div class="realm-subrules-drawer ${isExpanded ? 'expanded' : ''}">
                            ${subRulesHtml}
                        </div>
                    `;

                    // Wire Toggle Switch
                    const toggleInput = card.querySelector('.realm-toggle-switch');
                    if (toggleInput) {
                        toggleInput.onchange = (e) => {
                            playClick();
                            const willEnable = e.target.checked;
                            Object.keys(catState).forEach(k => {
                                catState[k].enabled = willEnable;
                                if (willEnable) {
                                    catState[k].qty = catState[k].maxAvailable;
                                }
                            });
                            updateUI();
                        };
                    }

                    // Wire Sub-rules Expand/Collapse
                    const subrulesBtn = card.querySelector('.realm-subrules-toggle');
                    if (subrulesBtn) {
                        subrulesBtn.onclick = () => {
                            playClick();
                            if (expandedRealms.has(catDef.id)) {
                                expandedRealms.delete(catDef.id);
                            } else {
                                expandedRealms.add(catDef.id);
                            }
                            updateUI();
                        };
                    }

                    // Wire Steppers for Realm
                    const realmMinus = card.querySelector('.realm-step-btn.minus');
                    const realmPlus = card.querySelector('.realm-step-btn.plus');
                    const realmQtyInput = card.querySelector('.realm-qty-input');
                    const realmAllBtn = card.querySelector('.realm-all-btn');

                    if (realmMinus) {
                        realmMinus.onclick = () => {
                            playClick();
                            if (activeTotalCatQs <= 1) {
                                Object.keys(catState).forEach(k => { catState[k].enabled = false; });
                            } else {
                                const targetSub = Object.values(catState).filter(s => s.enabled && s.qty > 1).sort((a, b) => b.qty - a.qty)[0];
                                if (targetSub) {
                                    targetSub.qty--;
                                } else {
                                    const oneSub = Object.values(catState).find(s => s.enabled);
                                    if (oneSub) oneSub.enabled = false;
                                }
                            }
                            updateUI();
                        };
                    }

                    if (realmPlus) {
                        realmPlus.onclick = () => {
                            playClick();
                            if (!isRealmActive) {
                                Object.keys(catState).forEach(k => {
                                    catState[k].enabled = true;
                                    catState[k].qty = catState[k].maxAvailable;
                                });
                            } else {
                                const targetSub = Object.values(catState).find(s => s.enabled && s.qty < s.maxAvailable);
                                if (targetSub) {
                                    targetSub.qty++;
                                } else {
                                    const disabledSub = Object.values(catState).find(s => !s.enabled);
                                    if (disabledSub) {
                                        disabledSub.enabled = true;
                                        disabledSub.qty = 1;
                                    }
                                }
                            }
                            updateUI();
                        };
                    }

                    if (realmQtyInput) {
                        realmQtyInput.onfocus = () => realmQtyInput.select();
                        realmQtyInput.onchange = (e) => {
                            playClick();
                            let val = parseInt(e.target.value, 10);
                            if (isNaN(val) || val <= 0) {
                                Object.keys(catState).forEach(k => { catState[k].enabled = false; });
                            } else {
                                if (val > totalBankQs) val = totalBankQs;
                                let remaining = val;
                                Object.keys(catState).forEach(k => {
                                    const sub = catState[k];
                                    if (remaining > 0) {
                                        sub.enabled = true;
                                        sub.qty = Math.min(remaining, sub.maxAvailable);
                                        remaining -= sub.qty;
                                    } else {
                                        sub.enabled = false;
                                        sub.qty = 0;
                                    }
                                });
                            }
                            updateUI();
                        };
                    }

                    if (realmAllBtn) {
                        realmAllBtn.onclick = () => {
                            playClick();
                            Object.keys(catState).forEach(k => {
                                catState[k].enabled = true;
                                catState[k].qty = catState[k].maxAvailable;
                            });
                            updateUI();
                        };
                    }

                    // Wire Individual Subrules inside drawer
                    card.querySelectorAll('.subrule-item').forEach(subItem => {
                        const subKey = subItem.getAttribute('data-subkey');
                        const subState = catState[subKey];
                        if (!subState) return;

                        const chk = subItem.querySelector('.subrule-checkbox');
                        if (chk) {
                            chk.onchange = (e) => {
                                playClick();
                                subState.enabled = e.target.checked;
                                if (subState.enabled && (!subState.qty || subState.qty <= 0)) {
                                    subState.qty = subState.maxAvailable;
                                }
                                updateUI();
                            };
                        }

                        const subMinus = subItem.querySelector('.subrule-mini-btn.minus');
                        if (subMinus) {
                            subMinus.onclick = (e) => {
                                e.stopPropagation();
                                playClick();
                                if (subState.qty > 1) {
                                    subState.qty--;
                                } else {
                                    subState.enabled = false;
                                }
                                updateUI();
                            };
                        }

                        const subPlus = subItem.querySelector('.subrule-mini-btn.plus');
                        if (subPlus) {
                            subPlus.onclick = (e) => {
                                e.stopPropagation();
                                playClick();
                                if (subState.qty < subState.maxAvailable) {
                                    subState.qty++;
                                    subState.enabled = true;
                                    updateUI();
                                }
                            };
                        }

                        const subInput = subItem.querySelector('.subrule-mini-input');
                        if (subInput) {
                            subInput.onfocus = () => subInput.select();
                            subInput.onchange = (e) => {
                                playClick();
                                let val = parseInt(e.target.value, 10);
                                if (isNaN(val) || val <= 0) {
                                    subState.enabled = false;
                                } else {
                                    if (val > subState.maxAvailable) val = subState.maxAvailable;
                                    subState.qty = val;
                                    subState.enabled = true;
                                }
                                updateUI();
                            };
                        }

                        const subMax = subItem.querySelector('.subrule-mini-all');
                        if (subMax) {
                            subMax.onclick = (e) => {
                                e.stopPropagation();
                                playClick();
                                subState.enabled = true;
                                subState.qty = subState.maxAvailable;
                                updateUI();
                            };
                        }
                    });

                    realmGrid.appendChild(card);
                });

                // Notify callback
                if (typeof options.onChange === 'function') {
                    options.onChange({
                        selectedConfig: exported,
                        pool,
                        totalCount: totalPoolCount,
                        activeWorldCount: activeWorlds,
                        activeSubRuleCount: activeSubs
                    });
                }
            };

            // Global Command Bar Events
            // 1. Select All Realms (Max)
            const cmdAllBtn = arena.querySelector('#arena-cmd-all');
            if (cmdAllBtn) {
                cmdAllBtn.onclick = () => {
                    playClick();
                    CATEGORY_DEFINITIONS.forEach(catDef => {
                        const catState = state[catDef.id];
                        if (!catState) return;
                        Object.keys(catState).forEach(subKey => {
                            catState[subKey].enabled = true;
                            catState[subKey].qty = catState[subKey].maxAvailable;
                        });
                    });
                    updateUI();
                };
            }

            // 2. Clear All
            const cmdClearBtn = arena.querySelector('#arena-cmd-clear');
            if (cmdClearBtn) {
                cmdClearBtn.onclick = () => {
                    playClick();
                    CATEGORY_DEFINITIONS.forEach(catDef => {
                        const catState = state[catDef.id];
                        if (!catState) return;
                        Object.keys(catState).forEach(subKey => {
                            catState[subKey].enabled = false;
                        });
                    });
                    updateUI();
                };
            }

            // 3. Reset Button in HUD
            const hudResetBtn = arena.querySelector('#arena-hud-reset');
            if (hudResetBtn) {
                hudResetBtn.onclick = () => {
                    if (cmdClearBtn) cmdClearBtn.click();
                };
            }

            // Launch Hero Button (if configured)
            const launchBtn = arena.querySelector('#arena-hero-launch-btn');
            if (launchBtn && typeof options.onLaunch === 'function') {
                launchBtn.onclick = () => {
                    playClick();
                    const { exported, pool, totalPoolCount } = getExportedState();
                    options.onLaunch({ pool, selectedConfig: exported, totalCount: totalPoolCount });
                };
            }

            // Initial render (Clean 0-state)
            updateUI();

            return {
                getSelectedConfig: () => getExportedState().exported,
                getPool: () => getExportedState().pool,
                getTotalCount: () => getExportedState().totalPoolCount,
                update: () => updateUI(),
                reset: () => { if (cmdClearBtn) cmdClearBtn.click(); }
            };
        }
    };

    window.RuleSelectorEngine = RuleSelectorEngine;

})(typeof window !== 'undefined' ? window : global);
