/**
 * Tajweed Question Repository & Modular Chunking Layer
 * Provides clean accessors, chunking in groups of 10,
 * and unified query methods while keeping TAJWEED_BANK as the single truth source.
 */

(function(window) {
    'use strict';

    function getBank() {
        if (typeof TAJWEED_BANK !== 'undefined') return TAJWEED_BANK;
        if (typeof window !== 'undefined' && window.TAJWEED_BANK) return window.TAJWEED_BANK;
        return {};
    }

    function getTheoryBank() {
        if (typeof THEORETICAL_BANK !== 'undefined') return THEORETICAL_BANK;
        if (typeof window !== 'undefined' && window.THEORETICAL_BANK) return window.THEORETICAL_BANK;
        return {};
    }

    const QuestionRepository = {
        CHUNK_SIZE: 10,

        /**
         * Get raw category array from TAJWEED_BANK
         */
        getCategoryQuestions(catId) {
            const bank = getBank();
            const cat = bank[catId];
            if (!cat) return [];
            if (Array.isArray(cat.questions)) return cat.questions;
            if (Array.isArray(cat)) return cat;
            return [];
        },

        /**
         * Get questions divided into chunks of 10
         */
        getCategoryChunks(catId) {
            const list = this.getCategoryQuestions(catId);
            const chunks = {};
            const total = list.length;
            let chunkIdx = 1;

            for (let i = 0; i < total; i += this.CHUNK_SIZE) {
                const start = i + 1;
                const end = Math.min(i + this.CHUNK_SIZE, total);
                const padStart = String(start).padStart(3, '0');
                const padEnd = String(end).padStart(3, '0');
                const chunkKey = `${catId}_${padStart}_${padEnd}`;
                chunks[chunkKey] = list.slice(i, i + this.CHUNK_SIZE);
                chunkIdx++;
            }
            return chunks;
        },

        /**
         * Get specific chunk by key
         */
        getChunk(catId, chunkKey) {
            const chunks = this.getCategoryChunks(catId);
            return chunks[chunkKey] || [];
        },

        /**
         * Unified sub-rule question filter across practical categories
         */
        getBySubRule(catId, subRuleName, customList = null) {
            const list = customList || this.getCategoryQuestions(catId);
            if (!Array.isArray(list) || list.length === 0) return [];
            if (!subRuleName || subRuleName === 'all' || subRuleName === 'ALL') return list;

            if (catId === 'tafkheem_tarqeeq') {
                return list.filter(q => q.subcat === subRuleName);
            }
            if (catId === 'noon_sakinah_tanween') {
                if (subRuleName === 'Ikhfa Ghunnah') return list.filter(q => (q.id && q.id.startsWith('ikhfa_gh')) || q.subcat === 'Ikhfa Ghunnah' || (q.prompt && q.prompt.includes('Ghunnah')));
                if (subRuleName === 'Idgham Completeness') return list.filter(q => (q.id && q.id.startsWith('idgham_comp')) || q.subcat === 'Idgham Completeness');
                if (subRuleName === 'Idgham with Ghunnah') return list.filter(q => q.subcat === 'Idgham with Ghunnah' || q.ans === 'Idgham with Ghunnah');
                if (subRuleName === 'Idgham without Ghunnah') return list.filter(q => q.subcat === 'Idgham without Ghunnah' || q.ans === 'Idgham without Ghunnah');
            }
            if (catId === 'qalqalah') {
                if (subRuleName === 'General Qalqalah') return list.filter(q => q.subcat === 'General Qalqalah' || q.ans === 'Qalqalah' || q.ans === 'No Qalqalah');
                if (subRuleName === 'Minor') return list.filter(q => q.ans === 'Minor' || q.subcat === 'Minor');
                if (subRuleName === 'Medium') return list.filter(q => q.ans === 'Medium' || q.subcat === 'Medium');
                if (subRuleName === 'Major') return list.filter(q => q.ans === 'Major' || q.subcat === 'Major');
                if (subRuleName === 'Qalqalah Degree') return list.filter(q => q.subcat === 'Qalqalah Degree' || ['Minor', 'Medium', 'Major'].includes(q.ans));
            }
            if (catId === 'image_bank') {
                if (subRuleName === 'Noon Mushaddad') return list.filter(q => q.subcat === 'Noon Mushaddad');
                if (subRuleName === 'Meem Mushaddad') return list.filter(q => q.subcat === 'Meem Mushaddad');
                return list;
            }
            if (catId === 'lam_harf') {
                return list.filter(q => q.subcat === subRuleName || q.ans === subRuleName || (q.ans && q.ans.startsWith(subRuleName)));
            }

            const mapping = (typeof SUB_CATEGORY_MAPPING !== 'undefined') ? SUB_CATEGORY_MAPPING[catId] : null;
            if (mapping && mapping[subRuleName]) {
                const answers = mapping[subRuleName];
                return list.filter(q => {
                    if (q.subcat === subRuleName) return true;
                    if (answers.includes(q.ans)) return true;
                    const nAns = (q.ans || '').replace(/[\u2010-\u2015]/g, '-');
                    return answers.some(a => a.replace(/[\u2010-\u2015]/g, '-') === nAns);
                });
            }

            return list.filter(q => (q.subcat === subRuleName || q.subRule === subRuleName || q.ans === subRuleName));
        },

        /**
         * Query matching multiple categories and multiple sub-rules
         * criteria: { [catId]: ['sub1', 'sub2'] }
         */
        queryQuestions(criteria = {}) {
            let results = [];
            const bank = getBank();

            Object.entries(criteria).forEach(([catId, subRules]) => {
                const catList = this.getCategoryQuestions(catId);
                const title = bank[catId]?.title || catId;

                if (!subRules || subRules.length === 0 || subRules.includes('ALL')) {
                    results.push(...catList.map(q => ({ ...q, categoryId: catId, categoryTitle: title })));
                } else {
                    subRules.forEach(sub => {
                        const filtered = this.getBySubRule(catId, sub, catList);
                        results.push(...filtered.map(q => ({ ...q, categoryId: catId, categoryTitle: title })));
                    });
                }
            });

            return results;
        },

        /**
         * Count total available questions for criteria
         */
        countAvailable(criteria = {}) {
            return this.queryQuestions(criteria).length;
        },

        /**
         * Find single question across both practical and theoretical banks
         */
        findQuestionById(qId) {
            if (!qId) return null;
            // 1. Check TAJWEED_BANK
            const bank = getBank();
            for (const catId of Object.keys(bank)) {
                const list = this.getCategoryQuestions(catId);
                const found = list.find(q => q.id === qId);
                if (found) return { ...found, categoryId: catId, categoryTitle: bank[catId]?.title || catId };
            }
            // 2. Check THEORETICAL_BANK
            const tBank = getTheoryBank();
            for (const catId of Object.keys(tBank)) {
                const cat = tBank[catId];
                const list = cat?.questions || [];
                const found = list.find(q => q.id === qId);
                if (found) return { ...found, categoryId: catId, categoryTitle: cat?.title || catId, isTheory: true };
            }
            return null;
        }
    };

    window.QuestionRepository = QuestionRepository;

})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
