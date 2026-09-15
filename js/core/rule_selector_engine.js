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
                // Default setup: activate Qalqalah with Max
                if (state['qalqalah']) {
                    Object.keys(state['qalqalah']).forEach(subKey => {
                        state['qalqalah'][subKey].enabled = true;
                    });
                }
            }

            let activeWorldId = 'qalqalah';
            if (!CATEGORY_DEFINITIONS.some(c => c.id === activeWorldId)) {
                activeWorldId = CATEGORY_DEFINITIONS[0].id;
            }

            // Create Root Arena Container
            const arena = document.createElement('div');
            arena.className = 'rule-arena-container';

            // 1. Top Command Bar (English Only)
            const cmdBar = document.createElement('div');
            cmdBar.className = 'arena-cmd-bar';
            cmdBar.innerHTML = `
                <div class="arena-cmd-left">
                    <span class="arena-cmd-icon">🎯</span>
                    <div class="arena-cmd-titles">
                        <span class="arena-cmd-title-ar">Tajweed Mission Control</span>
                        <span class="arena-cmd-title-en">Choose specific rules & question amounts or select all</span>
                    </div>
                </div>
                <div class="arena-cmd-actions">
                    <button type="button" class="arena-btn-cmd highlight" id="arena-cmd-all">🌟 Select All (Max)</button>
                    <button type="button" class="arena-btn-cmd" id="arena-cmd-clear">🧹 Clear All</button>
                </div>
            `;
            arena.appendChild(cmdBar);

            // 2. Full-Width Realm Dropdown Bar (From far right to far left, 100% width)
            const dropdownBanner = document.createElement('div');
            dropdownBanner.className = 'arena-realm-dropdown-banner';
            dropdownBanner.innerHTML = `
                <div class="arena-dropdown-header">
                    <label for="arena-realm-dropdown" class="arena-dropdown-label">
                        <span class="adh-icon">📂</span>
                        <span class="adh-text">Select Realm (Full-Width Dropdown):</span>
                    </label>
                    <div class="arena-dropdown-nav">
                        <button type="button" class="arena-nav-step-btn" id="arena-realm-prev" title="Previous Realm">⬅️ Previous</button>
                        <button type="button" class="arena-nav-step-btn" id="arena-realm-next" title="Next Realm">Next ➡️</button>
                    </div>
                </div>
                <div class="arena-dropdown-select-wrap">
                    <select id="arena-realm-dropdown" class="arena-realm-dropdown" aria-label="Select Realm"></select>
                </div>
            `;
            arena.appendChild(dropdownBanner);

            // 3. Stage Deck (Full Width)
            const stageDeck = document.createElement('div');
            stageDeck.className = 'arena-stage-deck';
            arena.appendChild(stageDeck);

            // 4. Bottom Arena HUD Bar (Displays Total Selected Questions & Start Button)
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
                        <span class="hud-sub-val" id="arena-hud-subs-val">0 Sub-Rules</span>
                    </div>
                </div>
                <div id="arena-hud-action-slot" style="display: flex; align-items: center;">
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
                    const activeSubEntries = Object.entries(subMap).filter(([k, s]) => s.enabled);
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

            // Main UI Refresh Function
            const updateUI = () => {
                const { exported, pool, totalPoolCount, activeWorlds, activeSubs } = getExportedState();

                // 1. Update HUD metrics
                const totalValEl = hudBar.querySelector('#arena-hud-total-val');
                const subsValEl = hudBar.querySelector('#arena-hud-subs-val');
                if (totalValEl) totalValEl.textContent = totalPoolCount;
                if (subsValEl) subsValEl.textContent = `${activeSubs} Sub-Rules (${activeWorlds} Realms)`;

                // 2. Refresh Full-Width Dropdown
                const dropdownEl = dropdownBanner.querySelector('#arena-realm-dropdown');
                if (dropdownEl) {
                    const activeDef = CATEGORY_DEFINITIONS.find(c => c.id === activeWorldId) || CATEGORY_DEFINITIONS[0];
                    dropdownEl.style.setProperty('--world-color', activeDef.color);
                    dropdownEl.style.borderColor = activeDef.color;

                    let optionsHtml = '';
                    CATEGORY_DEFINITIONS.forEach(catDef => {
                        const qList = bank[catDef.id]?.questions || [];
                        if (qList.length === 0) return;

                        const catState = state[catDef.id] || {};
                        const subEntries = Object.entries(catState);
                        const enabledSubs = subEntries.filter(([k, s]) => s.enabled);

                        let totalActiveCatQs = 0;
                        enabledSubs.forEach(([k, s]) => {
                            const count = (typeof s.qty === 'number') ? Math.min(s.qty, s.maxAvailable) : s.maxAvailable;
                            totalActiveCatQs += count;
                        });

                        const isSel = catDef.id === activeWorldId;
                        const statusBadge = enabledSubs.length > 0 
                            ? `[${enabledSubs.length}/${subEntries.length} Active • ${totalActiveCatQs} Qs]` 
                            : '[Inactive]';

                        optionsHtml += `<option value="${catDef.id}" ${isSel ? 'selected' : ''}>
                            ${catDef.icon} ${catDef.title} ${statusBadge}
                        </option>`;
                    });
                    dropdownEl.innerHTML = optionsHtml;

                    dropdownEl.onchange = (e) => {
                        playClick();
                        activeWorldId = e.target.value;
                        updateUI();
                    };
                }

                // 3. Render Active Realm Stage Deck (English Only)
                const activeDef = CATEGORY_DEFINITIONS.find(c => c.id === activeWorldId) || CATEGORY_DEFINITIONS[0];
                const activeCatState = state[activeDef.id] || {};
                const activeSubEntries = Object.entries(activeCatState);
                const activeEnabledCount = activeSubEntries.filter(([k, s]) => s.enabled).length;
                const isAllActiveInRealm = activeEnabledCount === activeSubEntries.length && activeSubEntries.length > 0;

                stageDeck.style.setProperty('--world-color', activeDef.color);

                stageDeck.innerHTML = `
                    <div class="stage-header" style="border-left: 8px solid ${activeDef.color}; background: linear-gradient(135deg, ${activeDef.color}15, #ffffff 85%);">
                        <div class="stage-title-wrap">
                            <span class="stage-icon">${activeDef.icon}</span>
                            <div>
                                <h3 class="stage-title-ar" style="color: ${activeDef.color};">${activeDef.title}</h3>
                                <p class="stage-subtitle">${activeDef.subtitle}</p>
                            </div>
                        </div>
                        <div class="stage-actions">
                            <button type="button" class="stage-action-btn highlight" id="stage-btn-toggle-all">
                                ${isAllActiveInRealm ? 'Deselect Realm' : 'Select All in Realm (Max)'}
                            </button>
                        </div>
                    </div>
                    <div class="stage-missions-grid" id="stage-missions-container"></div>
                `;

                // Realm Header Actions
                const toggleAllBtn = stageDeck.querySelector('#stage-btn-toggle-all');
                if (toggleAllBtn) {
                    toggleAllBtn.onclick = () => {
                        playClick();
                        const nextState = !isAllActiveInRealm;
                        Object.keys(activeCatState).forEach(k => {
                            activeCatState[k].enabled = nextState;
                            if (nextState) {
                                activeCatState[k].qty = activeCatState[k].maxAvailable;
                            }
                        });
                        updateUI();
                    };
                }

                // Render Sub-rule Mission Cards:
                // Only TWO OPTIONS:
                // 1) Type custom number with Max displayed next to it (capped at maxAvailable)
                // 2) Select All / Max at once
                const missionsContainer = stageDeck.querySelector('#stage-missions-container');
                activeDef.subrules.forEach(sub => {
                    const subState = activeCatState[sub.key] || { enabled: false, qty: 5, maxAvailable: 0 };
                    if (subState.maxAvailable === 0) return;

                    const isChecked = subState.enabled;
                    const displayQty = (subState.qty === 'ALL' || subState.qty >= subState.maxAvailable) 
                        ? subState.maxAvailable 
                        : (typeof subState.qty === 'number' ? subState.qty : subState.maxAvailable);

                    const isAllQty = (subState.qty === 'ALL' || subState.qty === subState.maxAvailable);

                    const card = document.createElement('div');
                    card.className = `mission-card ${isChecked ? 'active' : ''}`;
                    card.style.setProperty('--world-color', activeDef.color);

                    card.innerHTML = `
                        <div class="mc-header">
                            <div class="mc-title-wrap">
                                <span class="mc-check-badge ${isChecked ? 'checked' : ''}">
                                    ${isChecked ? '✔️ Active' : '⭕ Select'}
                                </span>
                                <div class="mc-titles">
                                    <div class="mc-title-ar">${sub.label}</div>
                                </div>
                            </div>
                            <span class="mc-bank-pill">Bank: ${subState.maxAvailable} Qs</span>
                        </div>
                        <div class="mc-two-options-row">
                            <!-- Option 1: Custom Quantity Input with Max Display -->
                            <div class="mc-custom-qty-box">
                                <span class="mc-opt-label">Qty:</span>
                                <input type="number" class="mc-qty-direct-input" min="1" max="${subState.maxAvailable}" value="${displayQty}">
                                <span class="mc-opt-max">/ ${subState.maxAvailable} max</span>
                            </div>

                            <!-- Option 2: Max All Button -->
                            <button type="button" class="mc-max-all-btn ${isChecked && isAllQty ? 'active' : ''}">
                                All (${subState.maxAvailable}) ⭐
                            </button>
                        </div>
                    `;

                    // Toggle when clicking header
                    const headerEl = card.querySelector('.mc-header');
                    headerEl.onclick = (e) => {
                        e.stopPropagation();
                        playClick();
                        subState.enabled = !subState.enabled;
                        if (subState.enabled && (subState.qty === undefined || subState.qty === 0)) {
                            subState.qty = subState.maxAvailable;
                        }
                        updateUI();
                    };

                    // Option 1: Direct Number Input (Capped automatically at maxAvailable)
                    const inputEl = card.querySelector('.mc-qty-direct-input');
                    inputEl.onclick = (e) => e.stopPropagation();
                    inputEl.onfocus = () => { inputEl.select(); };
                    inputEl.onchange = (e) => {
                        playClick();
                        let val = parseInt(e.target.value, 10);
                        if (isNaN(val) || val < 1) val = 1;
                        if (val > subState.maxAvailable) val = subState.maxAvailable;
                        e.target.value = val;
                        subState.enabled = true;
                        subState.qty = val;
                        updateUI();
                    };

                    // Option 2: Max All Button
                    const maxAllBtn = card.querySelector('.mc-max-all-btn');
                    maxAllBtn.onclick = (e) => {
                        e.stopPropagation();
                        playClick();
                        subState.enabled = true;
                        subState.qty = subState.maxAvailable;
                        updateUI();
                    };

                    missionsContainer.appendChild(card);
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

            // 3. Dropdown Prev / Next Navigation Buttons
            const prevBtn = arena.querySelector('#arena-realm-prev');
            const nextBtn = arena.querySelector('#arena-realm-next');

            if (prevBtn) {
                prevBtn.onclick = () => {
                    playClick();
                    const idx = CATEGORY_DEFINITIONS.findIndex(c => c.id === activeWorldId);
                    if (idx > 0) {
                        activeWorldId = CATEGORY_DEFINITIONS[idx - 1].id;
                    } else {
                        activeWorldId = CATEGORY_DEFINITIONS[CATEGORY_DEFINITIONS.length - 1].id;
                    }
                    updateUI();
                };
            }

            if (nextBtn) {
                nextBtn.onclick = () => {
                    playClick();
                    const idx = CATEGORY_DEFINITIONS.findIndex(c => c.id === activeWorldId);
                    if (idx < CATEGORY_DEFINITIONS.length - 1) {
                        activeWorldId = CATEGORY_DEFINITIONS[idx + 1].id;
                    } else {
                        activeWorldId = CATEGORY_DEFINITIONS[0].id;
                    }
                    updateUI();
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

            // Initial render
            updateUI();

            return {
                getSelectedConfig: () => getExportedState().exported,
                getPool: () => getExportedState().pool,
                getTotalCount: () => getExportedState().totalPoolCount,
                update: () => updateUI(),
                selectWorld: (catId) => {
                    activeWorldId = catId;
                    updateUI();
                }
            };
        }
    };

    window.RuleSelectorEngine = RuleSelectorEngine;

})(typeof window !== 'undefined' ? window : global);
