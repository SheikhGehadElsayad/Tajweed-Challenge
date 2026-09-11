/**
 * Universal Rule & Sub-Rule Selection Engine
 * Provides standardized multi-rule, sub-rule hierarchy, granular per-subrule question quantities,
 * dynamic count calculation, and reusable Arcade Stage Arena UI component across
 * Game Center, Classic Challenge, Free Practice, and Homework Creator.
 * 
 * Version 38: Zoom Accessibility, Full-Width Edge-to-Edge Dropdown,
 * Smooth Up/Down Scrolling, Large Vibrant Typography, and Simplified Friendly Options.
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
            titleAr: 'النون والميم المشددتان',
            subtitle: 'حروف الغنة الدائمة بمقدار حركتين (نّ - مّ)',
            icon: '💎',
            color: '#06b6d4',
            subrules: [
                { key: 'Noon Mushaddad', label: 'Noon Mushaddadah (نّ)', labelAr: 'نون مشددة (نّ)' },
                { key: 'Meem Mushaddad', label: 'Meem Mushaddadah (مّ)', labelAr: 'ميم مشددة (مّ)' },
                { key: 'Two counts of ghunna', label: 'All Mushaddad (Ghunnah)', labelAr: 'غنة النون والميم المشددتين (حركتان)' }
            ]
        },
        {
            id: 'qalqalah',
            title: 'Qalqalah (Echo)',
            titleAr: 'أحكام القلقلة',
            subtitle: 'اضطراب الصوت عند النطق بالحرف الساكن (ق ط ب ج د)',
            icon: '⚡',
            color: '#f59e0b',
            subrules: [
                { key: 'General Qalqalah', label: 'General Qalqalah (Yes/No)', labelAr: 'قلقلة عامة (تمييز القلقلة)' },
                { key: 'Minor', label: 'Minor Qalqalah (Sughra)', labelAr: 'قلقلة صغرى (وسط الكلمة)' },
                { key: 'Medium', label: 'Medium Qalqalah (Wusta)', labelAr: 'قلقلة وسطى (آخر الكلمة غير مشدد)' },
                { key: 'Major', label: 'Major Qalqalah (Kubra)', labelAr: 'قلقلة كبرى (آخر الكلمة مشدد)' }
            ]
        },
        {
            id: 'meem_sakinah',
            title: 'Meem Sakinah',
            titleAr: 'أحكام الميم الساكنة',
            subtitle: 'الأحكام الشفوية للميم الساكنة (مْ)',
            icon: '🌙',
            color: '#8b5cf6',
            subrules: [
                { key: 'Oral + Clarity', label: 'Izhar Shafawi (Oral Clarity)', labelAr: 'إظهار شفوي (جميع الحروف عدا الباء والميم)' },
                { key: 'Oral + Merger', label: 'Idgham Shafawi (Oral Merging)', labelAr: 'إدغام شفوي / متماثلين (مع الميم)' },
                { key: 'Oral + Hiding', label: 'Ikhfaa Shafawi (Oral Hiding)', labelAr: 'إخفاء شفوي (مع الباء بغنة)' }
            ]
        },
        {
            id: 'noon_sakinah_tanween',
            title: 'Noon Sakinah & Tanween',
            titleAr: 'أحكام النون الساكنة والتنوين',
            subtitle: 'أحكام الإظهار والإدغام والإقلاب والإخفاء',
            icon: '📖',
            color: '#10b981',
            subrules: [
                { key: 'Izhar', label: 'Izhar Halqi (Throat Clarity)', labelAr: 'إظهار حلقي (ء هـ ع ح غ خ)' },
                { key: 'Idgham with Ghunnah', label: 'Idgham with Ghunnah', labelAr: 'إدغام بغنة (ي ن م و)' },
                { key: 'Idgham without Ghunnah', label: 'Idgham without Ghunnah', labelAr: 'إدغام بغير غنة (ل ر)' },
                { key: 'Iqlab', label: 'Iqlab (Conversion to Meem)', labelAr: 'إقلاب (قلب النون ميماً عند الباء)' },
                { key: 'Ikhfa', label: 'Ikhfaa Haqiqi (True Hiding)', labelAr: 'إخفاء حقيقي (باقي الحروف الـ 15)' },
                { key: 'Izhar Mutlaq', label: 'Izhar Mutlaq (Absolute Clarity)', labelAr: 'إظهار مطلق (دنيا، بنيان، قنوان، صنوان)' },
                { key: 'Ikhfa Ghunnah', label: 'Ikhfaa Ghunnah (Heavy / Light)', labelAr: 'مراتب غنة الإخفاء (مفخمة ومرفقة)' }
            ]
        },
        {
            id: 'tafkheem_tarqeeq',
            title: 'Tafkheem & Tarqeeq',
            titleAr: 'التفخيم والترقيق',
            subtitle: 'أحكام الاستعلاء والاستفال وتفخيم وترقيق الراء واللام والألف',
            icon: '⚖️',
            color: '#ec4899',
            subrules: [
                { key: 'Always Heavy', label: 'Always Heavy Letters', labelAr: 'حروف الاستعلاء المفخمة دائماً (خص ضغط قظ)' },
                { key: 'Heavy Ra', label: 'Heavy Raa (Tafkheem)', labelAr: 'الراء المفخمة' },
                { key: 'Light Ra', label: 'Light Raa (Tarqeeq)', labelAr: 'الراء المرققة' },
                { key: 'Ra Both Options', label: 'Raa: Both Options Allowed', labelAr: 'الراء جواز الوجهين (فرق، مصر، القطر)' },
                { key: 'Lam of Allah', label: 'Laam in Word of Allah', labelAr: 'لام لفظ الجلالة (تغليظ وترقيق)' },
                { key: 'Alif', label: 'Alif of Madd', labelAr: 'ألف المد (تتبع ما قبلها تفخيماً وترقيقاً)' }
            ]
        },
        {
            id: 'madd_rules',
            title: 'Madd Rules',
            titleAr: 'أحكام المدود',
            subtitle: 'المدود الأصلية والفرعية وأزمنتها',
            icon: '🌊',
            color: '#3b82f6',
            subrules: [
                { key: 'Natural Madd', label: 'Natural Madd (Tabee\'ee)', labelAr: 'المد الطبيعي (الأصلي - حركتان)' },
                { key: 'Connected', label: 'Connected Madd (Muttasil)', labelAr: 'المد المتصل (واجب 4-5 حركات)' },
                { key: 'Separated', label: 'Separated Madd (Munfasil)', labelAr: 'المد المنفصل (جائز 4-5 حركات)' },
                { key: 'Substitute', label: 'Substitute Madd (Badal)', labelAr: 'مد البدل (حركتان)' },
                { key: 'Compensatory Madd', label: 'Compensatory Madd (\'Iwad)', labelAr: 'مد العوض (حركتان عند الوقف)' },
                { key: 'Temporary Madd', label: 'Temporary Madd (\'Aarid)', labelAr: 'المد العارض للسكون (2-4-6 حركات)' },
                { key: 'Soft Madd', label: 'Soft Madd (Leen)', labelAr: 'مد اللين (2-4-6 حركات)' },
                { key: 'Minor Sila Madd', label: 'Minor Sila Madd', labelAr: 'مد الصلة الصغرى (حركتان)' },
                { key: 'Major Sila Madd', label: 'Major Sila Madd', labelAr: 'مد الصلة الكبرى (4-5 حركات)' },
                { key: 'Permanent Word Based Heavy', label: 'Compulsory Word Heavy', labelAr: 'مد لازم كلمي مثقل (6 حركات)' },
                { key: 'Permanent Word Based Light', label: 'Compulsory Word Light', labelAr: 'مد لازم كلمي مخفف (6 حركات)' },
                { key: 'Permanent Letter Based Heavy', label: 'Compulsory Letter Heavy', labelAr: 'مد لازم حرفي مثقل (6 حركات)' },
                { key: 'Permanent Letter Based Light', label: 'Compulsory Letter Light', labelAr: 'مد لازم حرفي مخفف (6 حركات)' },
                { key: 'Stabilizing Madd', label: 'Stabilizing Madd (Tamkeen)', labelAr: 'مد التمكين (حركتان)' }
            ]
        },
        {
            id: 'hamzat_wasl',
            title: 'Hamzat Al-Wasl',
            titleAr: 'همزة الوصل',
            subtitle: 'أحكام البدء بهمزة الوصل وسقوطها في درج الكلام',
            icon: '🔗',
            color: '#6366f1',
            subrules: [
                { key: 'Dropped', label: 'Dropped in Continuous Speech', labelAr: 'سقوط همزة الوصل وصلاً' },
                { key: 'Start with fatha', label: 'Start with Fathah (Al- nouns)', labelAr: 'البدء بالفتح (في الأسماء المعرفة بـ الـ)' },
                { key: 'Start with damma', label: 'Start with Dammah (Verbs)', labelAr: 'البدء بالضم (إذا كان ثالث الفعل مضموماً ضماً لازماً)' },
                { key: 'Start with kasra', label: 'Start with Kasrah (Verbs & Nouns)', labelAr: 'البدء بالكسر (في الأفعال والأسماء القياسية والسماعية)' }
            ]
        },
        {
            id: 'lam_shamsiyyah_qamariyyah',
            title: 'Lam Shamsiyyah & Qamariyyah',
            titleAr: 'اللام الشمسية واللام القمرية',
            subtitle: 'إدغام وإظهار لام التعريف مع الحروف الهجائية',
            icon: '☀️',
            color: '#ea580c',
            subrules: [
                { key: 'Lam Shamsiyyah', label: 'Lam Shamsiyyah (Solar)', labelAr: 'اللام الشمسية (المدغمة - 14 حرفاً)' },
                { key: 'Lam Qamariyyah', label: 'Lam Qamariyyah (Lunar)', labelAr: 'اللام القمرية (المظهرة - ابغ حجك وخف عقيمه)' }
            ]
        },
        {
            id: 'letter_relations',
            title: 'Letter Relationships',
            titleAr: 'علاقات الحروف',
            subtitle: 'المتماثلان والمتجانسان والمتقاربان والمتباعدان',
            icon: '🤝',
            color: '#14b8a6',
            subrules: [
                { key: 'Identical', label: 'Identical Letters (Mutamathilayn)', labelAr: 'المتماثلان (اتفقا مخرجاً وصفة)' },
                { key: 'Similar', label: 'Homogeneous Letters (Mutajanisayn)', labelAr: 'المتجانسان (اتفقا مخرجاً واختلفا صفة)' },
                { key: 'Close', label: 'Close Letters (Mutaqaribayn)', labelAr: 'المتقاربان (تقاربا مخرجاً وصفة)' }
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
         * Cleaned, simplified, zoom-accessible, full-width dropdown from far right to far left.
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

            // 1. Top Simplified Command Bar
            const cmdBar = document.createElement('div');
            cmdBar.className = 'arena-cmd-bar';
            cmdBar.innerHTML = `
                <div class="arena-cmd-left">
                    <span class="arena-cmd-icon">🎯</span>
                    <div class="arena-cmd-titles">
                        <span class="arena-cmd-title-ar">تخصيص قواعد التحدي والأبواب التجويدية</span>
                        <span class="arena-cmd-title-en">Select Tajweed Rules & Question Counts</span>
                    </div>
                </div>
                <div class="arena-cmd-actions">
                    <button type="button" class="arena-btn-cmd highlight" id="arena-cmd-all">🌟 تفعيل كل الأبواب (Select All)</button>
                    <button type="button" class="arena-btn-cmd" id="arena-cmd-clear">🧹 مسح الكل (Clear All)</button>
                </div>
            `;
            arena.appendChild(cmdBar);

            // 2. Full-Width Realm Dropdown Bar (من أقصى اليمين إلى اليسار وبحجم كبير وملون)
            const dropdownBanner = document.createElement('div');
            dropdownBanner.className = 'arena-realm-dropdown-banner';
            dropdownBanner.innerHTML = `
                <div class="arena-dropdown-header">
                    <label for="arena-realm-dropdown" class="arena-dropdown-label">
                        <span class="adh-icon">📂</span>
                        <span class="adh-text">اختر الباب التجويدي (قائمة منسدلة عريضة وكبيرة):</span>
                    </label>
                    <div class="arena-dropdown-nav">
                        <button type="button" class="arena-nav-step-btn" id="arena-realm-prev" title="الباب السابق">➡️ السابق</button>
                        <button type="button" class="arena-nav-step-btn" id="arena-realm-next" title="الباب التالي">التالي ⬅️</button>
                    </div>
                </div>
                <div class="arena-dropdown-select-wrap">
                    <select id="arena-realm-dropdown" class="arena-realm-dropdown" aria-label="اختر الباب التجويدي"></select>
                </div>
            `;
            arena.appendChild(dropdownBanner);

            // 3. Stage Deck (Full Width)
            const stageDeck = document.createElement('div');
            stageDeck.className = 'arena-stage-deck';
            arena.appendChild(stageDeck);

            // 4. Bottom Arena HUD Bar (Full Width, Large, Clean)
            const hudBar = document.createElement('div');
            hudBar.className = 'arena-hud-bar';
            hudBar.innerHTML = `
                <div class="arena-hud-metrics">
                    <div class="hud-metric">
                        <span class="hud-label">إجمالي الأسئلة:</span>
                        <span class="hud-val" id="arena-hud-total-val">0</span>
                    </div>
                    <div class="hud-metric">
                        <span class="hud-label">الأبواب والقواعد النشطة:</span>
                        <span class="hud-sub-val" id="arena-hud-subs-val">0 قاعدة</span>
                    </div>
                </div>
                <div class="arena-hud-presets">
                    <span class="hud-preset-label">كمية سريعة:</span>
                    <button type="button" class="hud-chip" data-limit="10">10 أسئلة</button>
                    <button type="button" class="hud-chip active" data-limit="20">20 سؤال</button>
                    <button type="button" class="hud-chip" data-limit="30">30 سؤال</button>
                    <button type="button" class="hud-chip" data-limit="ALL">جميع الأسئلة ⭐</button>
                </div>
                <div id="arena-hud-action-slot" style="display: flex; align-items: center;">
                    ${options.showLaunchButton ? `
                        <button type="button" class="arena-hero-btn" id="arena-hero-launch-btn">
                            ${options.launchButtonText || '🚀 ابدأ التحدي الآن 🚀'}
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
                if (subsValEl) subsValEl.textContent = `${activeSubs} قاعدة (${activeWorlds} أبواب)`;

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
                        const statusBadge = enabledSubs.length > 0 ? `[${enabledSubs.length}/${subEntries.length} مفعلة • ${totalActiveCatQs} سؤال]` : '[غير مفعل]';

                        optionsHtml += `<option value="${catDef.id}" ${isSel ? 'selected' : ''}>
                            ${catDef.icon} ${catDef.titleAr} - ${catDef.title} ${statusBadge}
                        </option>`;
                    });
                    dropdownEl.innerHTML = optionsHtml;

                    dropdownEl.onchange = (e) => {
                        playClick();
                        activeWorldId = e.target.value;
                        updateUI();
                    };
                }

                // 3. Render Active Realm Stage Deck (Wide, Big, Simplified)
                const activeDef = CATEGORY_DEFINITIONS.find(c => c.id === activeWorldId) || CATEGORY_DEFINITIONS[0];
                const activeCatState = state[activeDef.id] || {};
                const activeSubEntries = Object.entries(activeCatState);
                const activeEnabledCount = activeSubEntries.filter(([k, s]) => s.enabled).length;
                const isAllActiveInRealm = activeEnabledCount === activeSubEntries.length && activeSubEntries.length > 0;

                stageDeck.style.setProperty('--world-color', activeDef.color);

                stageDeck.innerHTML = `
                    <div class="stage-header" style="border-right: 8px solid ${activeDef.color}; background: linear-gradient(135deg, ${activeDef.color}18, #ffffff 85%);">
                        <div class="stage-title-wrap">
                            <span class="stage-icon">${activeDef.icon}</span>
                            <div>
                                <h3 class="stage-title-ar" style="color: ${activeDef.color};">${activeDef.titleAr}</h3>
                                <div class="stage-title-en">${activeDef.title}</div>
                                <p class="stage-subtitle">${activeDef.subtitle}</p>
                            </div>
                        </div>
                        <div class="stage-actions">
                            <button type="button" class="stage-action-btn highlight" id="stage-btn-toggle-all">
                                ${isAllActiveInRealm ? '✖️ إلغاء تحديد الباب' : '✔️ تفعيل كل قواعد الباب'}
                            </button>
                            <button type="button" class="stage-action-btn" id="stage-btn-all-5">5 أسئلة لكل قاعدة</button>
                            <button type="button" class="stage-action-btn" id="stage-btn-all-max">أقصى حد لكل القواعد</button>
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

                // Render Sub-rule Mission Cards (Simplified, Clear, Easy to Tap)
                const missionsContainer = stageDeck.querySelector('#stage-missions-container');
                activeDef.subrules.forEach(sub => {
                    const subState = activeCatState[sub.key] || { enabled: false, qty: 5, maxAvailable: 0 };
                    if (subState.maxAvailable === 0) return;

                    const isChecked = subState.enabled;
                    const card = document.createElement('div');
                    card.className = `mission-card ${isChecked ? 'active' : ''}`;
                    card.style.setProperty('--world-color', activeDef.color);

                    card.innerHTML = `
                        <div class="mc-header">
                            <div class="mc-title-wrap">
                                <span class="mc-check-badge ${isChecked ? 'checked' : ''}">
                                    ${isChecked ? '✔️ مفعّلة' : '⭕ اضغط للاختيار'}
                                </span>
                                <div class="mc-titles">
                                    <div class="mc-title-ar">${sub.labelAr || sub.label}</div>
                                    <div class="mc-title-en">${sub.label}</div>
                                </div>
                            </div>
                            <span class="mc-bank-pill">${subState.maxAvailable} سؤال بالبنك</span>
                        </div>
                        <div class="mc-easy-controls">
                            <span class="mc-choice-label">اختر عدد الأسئلة:</span>
                            <div class="mc-presets">
                                <button type="button" class="mc-preset-btn ${isChecked && subState.qty === 5 ? 'active' : ''}" data-val="5">5 أسئلة</button>
                                <button type="button" class="mc-preset-btn ${isChecked && subState.qty === 10 ? 'active' : ''}" data-val="10">10 أسئلة</button>
                                <button type="button" class="mc-preset-btn ${isChecked && (subState.qty === 'ALL' || subState.qty >= subState.maxAvailable) ? 'active' : ''}" data-val="ALL">الكل (${subState.maxAvailable}) ⭐</button>
                            </div>
                        </div>
                    `;

                    // Clicking header or badge toggles on/off
                    const headerEl = card.querySelector('.mc-header');
                    headerEl.onclick = (e) => {
                        e.stopPropagation();
                        playClick();
                        subState.enabled = !subState.enabled;
                        updateUI();
                    };

                    // Preset buttons
                    card.querySelectorAll('.mc-preset-btn').forEach(btn => {
                        btn.onclick = (e) => {
                            e.stopPropagation();
                            playClick();
                            const val = btn.dataset.val;
                            subState.enabled = true;
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
