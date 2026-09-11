/**
 * Universal Rule & Sub-Rule Selection Engine
 * Provides standardized multi-rule, sub-rule hierarchy, granular per-subrule question quantities,
 * dynamic count calculation, and reusable Arcade Stage Arena UI component across
 * Game Center, Classic Challenge, Free Practice, and Homework Creator.
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
            subtitle: 'Letters with permanent two-count Ghunnah (نّ - مّ)',
            icon: '💎',
            color: '#06b6d4',
            subrules: [
                { key: 'Noon Mushaddad', label: 'Noon Mushaddadah (نّ)' },
                { key: 'Meem Mushaddad', label: 'Meem Mushaddadah (مّ)' },
                { key: 'Two counts of ghunna', label: 'All Mushaddad (Ghunnah)' }
            ]
        },
        {
            id: 'qalqalah',
            title: 'Qalqalah (Echo)',
            subtitle: 'Echoing vibration on letters (ق ط ب ج د)',
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
            subtitle: 'Oral rules for Meem with Sukoon (مْ)',
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
                { key: 'Ikhfa Ghunnah', label: 'Ikhfaa Ghunnah (Heavy / Light)' }
            ]
        },
        {
            id: 'tafkheem_tarqeeq',
            title: 'Tafkheem & Tarqeeq',
            subtitle: 'Heavy & light letter characteristics (خ ص ض غ ط ق ظ, Raa, Laam)',
            icon: '⚖️',
            color: '#ec4899',
            subrules: [
                { key: 'Always Heavy', label: 'Always Heavy Letters (Istilaa)' },
                { key: 'Heavy Ra', label: 'Heavy Raa (Tafkheem)' },
                { key: 'Light Ra', label: 'Light Raa (Tarqeeq)' },
                { key: 'Ra Both Options', label: 'Raa: Both Options Allowed' },
                { key: 'Lam of Allah', label: 'Laam in the Word of Allah' },
                { key: 'Alif', label: 'Alif of Madd (Follows Preceding)' }
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
            subtitle: 'Solar and lunar letter assimilations with Al- (ال)',
            icon: '☀️',
            color: '#ea580c',
            subrules: [
                { key: 'Lam Shamsiyyah', label: 'Lam Shamsiyyah (Solar - Merged)' },
                { key: 'Lam Qamariyyah', label: 'Lam Qamariyyah (Lunar - Clear)' }
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
            if (typeof window !== 'undefined' && typeof window.getSubQuestions === 'function') {
                try {
                    const res = window.getSubQuestions(catKey, subKey, qList);
                    if (Array.isArray(res) && res.length > 0) return res;
                } catch (e) {}
            }

            // Built-in robust filtering
            if (catKey === 'tafkheem_tarqeeq') return qList.filter(q => q.subcat === subKey);
            if (catKey === 'noon_sakinah_tanween' && subKey === 'Ikhfa Ghunnah') {
                return qList.filter(q => (q.id && q.id.startsWith('ikhfa_gh')) || q.subcat === 'Ikhfa Ghunnah' || (q.prompt && q.prompt.includes('Ghunnah')));
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
         * Helper: Fisher-Yates shuffle
         */
        shuffle(arr) {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },

        /**
         * Build Question Pool with Per-Subrule Granular Quantities
         * selectionConfig can be:
         * 1. Rich config: { [catId]: { [subKey]: { enabled: boolean, qty: number | 'ALL' } } }
         * 2. Direct qty: { [catId]: { [subKey]: 5 } }
         * 3. Legacy array: { [catId]: ['ALL'] | ['subKey1', 'subKey2'] }
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
         * Render the Gamified Arcade Stage Arena Component
         * @param {HTMLElement} container - Mount target element
         * @param {Object} options - Configuration options
         *   - initialSelection: Object mapping catId -> subKey config
         *   - showLaunchButton: boolean (default: false)
         *   - launchButtonText: string
         *   - onLaunch: function({ pool, selectedConfig, totalCount })
         *   - onChange: function({ selectedConfig, pool, totalCount, activeWorldCount, activeSubRuleCount })
         */
        render(container, options = {}) {
            if (!container) return null;
            container.innerHTML = '';

            const bank = getBank();

            // Internal State Structure:
            // state[catId][subKey] = { enabled: boolean, qty: number | 'ALL' }
            const state = {};

            // Helper: populate default state
            CATEGORY_DEFINITIONS.forEach(catDef => {
                state[catDef.id] = {};
                const qList = bank[catDef.id]?.questions || [];
                catDef.subrules.forEach(sub => {
                    const subCount = this.filterSubQuestions(catDef.id, sub.key, qList).length;
                    state[catDef.id][sub.key] = {
                        enabled: false,
                        qty: subCount > 5 ? 5 : subCount,
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
                // Default setup: activate Qalqalah with 5 each
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

            // 1. Top Command Bar
            const cmdBar = document.createElement('div');
            cmdBar.className = 'arena-cmd-bar';
            cmdBar.innerHTML = `
                <div class="arena-cmd-left">
                    <span class="arena-cmd-title">🎮 MISSION CONTROL: SELECT REALMS & SUB-RULES</span>
                </div>
                <div class="arena-cmd-actions">
                    <button type="button" class="arena-btn-cmd highlight" id="arena-cmd-all">🌟 Select All Realms</button>
                    <button type="button" class="arena-btn-cmd" id="arena-cmd-balanced">🎲 Balanced 20</button>
                    <button type="button" class="arena-btn-cmd" id="arena-cmd-clear">🧹 Clear All</button>
                </div>
            `;
            arena.appendChild(cmdBar);

            // 2. Dual Workspace: Left Dock & Right Stage Deck
            const workspace = document.createElement('div');
            workspace.className = 'arena-workspace';

            const worldsDock = document.createElement('div');
            worldsDock.className = 'arena-worlds-dock';
            workspace.appendChild(worldsDock);

            const stageDeck = document.createElement('div');
            stageDeck.className = 'arena-stage-deck';
            workspace.appendChild(stageDeck);

            arena.appendChild(workspace);

            // 3. Bottom Arena HUD Bar
            const hudBar = document.createElement('div');
            hudBar.className = 'arena-hud-bar';
            hudBar.innerHTML = `
                <div class="arena-hud-metrics">
                    <div class="hud-metric">
                        <span class="hud-label">Total Questions:</span>
                        <span class="hud-val" id="arena-hud-total-val">0</span>
                    </div>
                    <div class="hud-metric">
                        <span class="hud-label">Missions Active:</span>
                        <span class="hud-sub-val" id="arena-hud-subs-val">0 Sub-Rules</span>
                    </div>
                </div>
                <div class="arena-hud-presets">
                    <span class="hud-preset-label">Quick Limits:</span>
                    <button type="button" class="hud-chip" data-limit="10">10 Qs</button>
                    <button type="button" class="hud-chip active" data-limit="20">20 Qs</button>
                    <button type="button" class="hud-chip" data-limit="30">30 Qs</button>
                    <button type="button" class="hud-chip" data-limit="ALL">Max All ⭐</button>
                </div>
                <div id="arena-hud-action-slot" style="display: flex; align-items: center;">
                    ${options.showLaunchButton ? `
                        <button type="button" class="arena-hero-btn" id="arena-hero-launch-btn">
                            ${options.launchButtonText || '🚀 LAUNCH CHALLENGE 🚀'}
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

                // 2. Render Left Worlds Dock
                worldsDock.innerHTML = '';
                CATEGORY_DEFINITIONS.forEach(catDef => {
                    const qList = bank[catDef.id]?.questions || [];
                    const totalBankQs = qList.length;
                    if (totalBankQs === 0) return;

                    const catState = state[catDef.id] || {};
                    const subEntries = Object.entries(catState);
                    const enabledSubs = subEntries.filter(([k, s]) => s.enabled);
                    const isActiveWorld = catDef.id === activeWorldId;

                    let totalActiveCatQs = 0;
                    enabledSubs.forEach(([k, s]) => {
                        const count = (typeof s.qty === 'number') ? Math.min(s.qty, s.maxAvailable) : s.maxAvailable;
                        totalActiveCatQs += count;
                    });

                    const pill = document.createElement('div');
                    pill.className = `arena-world-pill ${isActiveWorld ? 'active' : ''} ${enabledSubs.length > 0 ? 'has-selected' : ''}`;
                    pill.style.setProperty('--world-color', catDef.color);

                    pill.innerHTML = `
                        <span class="awp-icon">${catDef.icon}</span>
                        <div class="awp-info">
                            <span class="awp-title">${catDef.title}</span>
                            <span class="awp-badge ${enabledSubs.length > 0 ? 'active-count' : ''}">
                                ${enabledSubs.length === 0 ? 'Inactive' : `${enabledSubs.length}/${subEntries.length} active • ${totalActiveCatQs} Qs`}
                            </span>
                        </div>
                    `;

                    pill.onclick = () => {
                        playClick();
                        activeWorldId = catDef.id;
                        updateUI();
                    };

                    worldsDock.appendChild(pill);
                });

                // 3. Render Active Realm Stage Deck
                const activeDef = CATEGORY_DEFINITIONS.find(c => c.id === activeWorldId) || CATEGORY_DEFINITIONS[0];
                const activeCatState = state[activeDef.id] || {};
                const activeSubEntries = Object.entries(activeCatState);
                const activeEnabledCount = activeSubEntries.filter(([k, s]) => s.enabled).length;
                const isAllActiveInRealm = activeEnabledCount === activeSubEntries.length && activeSubEntries.length > 0;

                stageDeck.innerHTML = `
                    <div class="stage-header" style="border-bottom-color: ${activeDef.color}33;">
                        <div class="stage-title-wrap">
                            <span class="stage-icon">${activeDef.icon}</span>
                            <div>
                                <h3 class="stage-title" style="color: ${activeDef.color};">${activeDef.title} Realm</h3>
                                <p class="stage-subtitle">${activeDef.subtitle}</p>
                            </div>
                        </div>
                        <div class="stage-actions">
                            <button type="button" class="stage-action-btn" id="stage-btn-toggle-all">
                                ${isAllActiveInRealm ? 'Deselect Realm' : 'Select All in Realm'}
                            </button>
                            <button type="button" class="stage-action-btn" id="stage-btn-all-5">Set 5 Each</button>
                            <button type="button" class="stage-action-btn" id="stage-btn-all-max">Set Max</button>
                        </div>
                    </div>
                    <div class="stage-missions-grid" id="stage-missions-container"></div>
                `;

                // Stage Header Actions
                const toggleAllBtn = stageDeck.querySelector('#stage-btn-toggle-all');
                if (toggleAllBtn) {
                    toggleAllBtn.onclick = () => {
                        playClick();
                        const nextState = !isAllActiveInRealm;
                        Object.keys(activeCatState).forEach(k => {
                            activeCatState[k].enabled = nextState;
                        });
                        updateUI();
                    };
                }

                const set5Btn = stageDeck.querySelector('#stage-btn-all-5');
                if (set5Btn) {
                    set5Btn.onclick = () => {
                        playClick();
                        Object.keys(activeCatState).forEach(k => {
                            activeCatState[k].enabled = true;
                            activeCatState[k].qty = Math.min(5, activeCatState[k].maxAvailable);
                        });
                        updateUI();
                    };
                }

                const setMaxBtn = stageDeck.querySelector('#stage-btn-all-max');
                if (setMaxBtn) {
                    setMaxBtn.onclick = () => {
                        playClick();
                        Object.keys(activeCatState).forEach(k => {
                            activeCatState[k].enabled = true;
                            activeCatState[k].qty = 'ALL';
                        });
                        updateUI();
                    };
                }

                // Render Sub-rule Mission Cards
                const missionsContainer = stageDeck.querySelector('#stage-missions-container');
                activeDef.subrules.forEach(sub => {
                    const subState = activeCatState[sub.key] || { enabled: false, qty: 5, maxAvailable: 0 };
                    if (subState.maxAvailable === 0) return;

                    const isChecked = subState.enabled;
                    const card = document.createElement('div');
                    card.className = `mission-card ${isChecked ? 'active' : ''}`;
                    card.style.setProperty('--world-color', activeDef.color);

                    const displayQty = subState.qty === 'ALL' ? subState.maxAvailable : subState.qty;

                    card.innerHTML = `
                        <div class="mc-header">
                            <label class="mc-check-label">
                                <input type="checkbox" class="mc-checkbox" ${isChecked ? 'checked' : ''}>
                                <span class="mc-title">${sub.label}</span>
                            </label>
                            <span class="mc-bank-pill">${subState.maxAvailable} in bank</span>
                        </div>
                        <div class="mc-controls" style="opacity: ${isChecked ? '1' : '0.4'}; pointer-events: ${isChecked ? 'auto' : 'none'};">
                            <div class="mc-stepper">
                                <button type="button" class="mc-step-btn minus" title="Decrease">−</button>
                                <input type="number" class="mc-qty-input" value="${displayQty}" min="1" max="${subState.maxAvailable}">
                                <button type="button" class="mc-step-btn plus" title="Increase">+</button>
                            </div>
                            <div class="mc-presets">
                                <button type="button" class="mc-preset-btn ${subState.qty === 5 ? 'active' : ''}" data-val="5">5</button>
                                <button type="button" class="mc-preset-btn ${subState.qty === 10 ? 'active' : ''}" data-val="10">10</button>
                                <button type="button" class="mc-preset-btn ${subState.qty === 'ALL' || subState.qty === subState.maxAvailable ? 'active' : ''}" data-val="ALL">All (${subState.maxAvailable})</button>
                            </div>
                        </div>
                    `;

                    // Checkbox toggle
                    const cb = card.querySelector('.mc-checkbox');
                    cb.onchange = (e) => {
                        playClick();
                        subState.enabled = e.target.checked;
                        updateUI();
                    };

                    // Stepper controls
                    const inputEl = card.querySelector('.mc-qty-input');
                    const minusBtn = card.querySelector('.mc-step-btn.minus');
                    const plusBtn = card.querySelector('.mc-step-btn.plus');

                    minusBtn.onclick = (e) => {
                        e.stopPropagation();
                        playClick();
                        let cur = typeof subState.qty === 'number' ? subState.qty : subState.maxAvailable;
                        cur = Math.max(1, cur - 1);
                        subState.qty = cur;
                        updateUI();
                    };

                    plusBtn.onclick = (e) => {
                        e.stopPropagation();
                        playClick();
                        let cur = typeof subState.qty === 'number' ? subState.qty : subState.maxAvailable;
                        cur = Math.min(subState.maxAvailable, cur + 1);
                        subState.qty = cur;
                        updateUI();
                    };

                    inputEl.onchange = (e) => {
                        let val = parseInt(e.target.value, 10);
                        if (isNaN(val) || val < 1) val = 1;
                        if (val > subState.maxAvailable) val = subState.maxAvailable;
                        subState.qty = val;
                        updateUI();
                    };

                    // Preset buttons
                    card.querySelectorAll('.mc-preset-btn').forEach(btn => {
                        btn.onclick = (e) => {
                            e.stopPropagation();
                            playClick();
                            const val = btn.dataset.val;
                            if (val === 'ALL') {
                                subState.qty = 'ALL';
                            } else {
                                subState.qty = Math.min(parseInt(val, 10), subState.maxAvailable);
                            }
                            updateUI();
                        };
                    });

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
            // 1. Select All Realms
            const cmdAllBtn = arena.querySelector('#arena-cmd-all');
            if (cmdAllBtn) {
                cmdAllBtn.onclick = () => {
                    playClick();
                    CATEGORY_DEFINITIONS.forEach(catDef => {
                        const catState = state[catDef.id];
                        if (!catState) return;
                        Object.keys(catState).forEach(subKey => {
                            catState[subKey].enabled = true;
                            if (catState[subKey].qty === undefined) catState[subKey].qty = 5;
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

            // 3. Balanced 20 Mix
            const cmdBalancedBtn = arena.querySelector('#arena-cmd-balanced');
            if (cmdBalancedBtn) {
                cmdBalancedBtn.onclick = () => {
                    playClick();
                    // Clear all
                    CATEGORY_DEFINITIONS.forEach(catDef => {
                        const catState = state[catDef.id];
                        if (!catState) return;
                        Object.keys(catState).forEach(subKey => {
                            catState[subKey].enabled = false;
                        });
                    });
                    // Pick 4 major realms, 5 questions each = 20 total
                    const mix = [
                        { cat: 'image_bank', sub: 'Noon Mushaddad', qty: 5 },
                        { cat: 'qalqalah', sub: 'Minor', qty: 5 },
                        { cat: 'noon_sakinah_tanween', sub: 'Izhar', qty: 5 },
                        { cat: 'madd_rules', sub: 'Connected', qty: 5 }
                    ];
                    mix.forEach(m => {
                        if (state[m.cat] && state[m.cat][m.sub]) {
                            state[m.cat][m.sub].enabled = true;
                            state[m.cat][m.sub].qty = m.qty;
                        }
                    });
                    activeWorldId = 'qalqalah';
                    updateUI();
                };
            }

            // Global HUD Quick Limit Chips
            arena.querySelectorAll('.hud-chip').forEach(chip => {
                chip.onclick = () => {
                    playClick();
                    arena.querySelectorAll('.hud-chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');

                    const limit = chip.dataset.limit;
                    if (limit === 'ALL') {
                        Object.values(state).forEach(catState => {
                            Object.values(catState).forEach(s => {
                                if (s.enabled) s.qty = 'ALL';
                            });
                        });
                    } else {
                        const targetLimit = parseInt(limit, 10);
                        const activeList = [];
                        Object.values(state).forEach(catState => {
                            Object.values(catState).forEach(s => {
                                if (s.enabled) activeList.push(s);
                            });
                        });
                        if (activeList.length > 0) {
                            const perSub = Math.max(1, Math.floor(targetLimit / activeList.length));
                            activeList.forEach(s => {
                                s.qty = Math.min(perSub, s.maxAvailable);
                            });
                        }
                    }
                    updateUI();
                };
            });

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
