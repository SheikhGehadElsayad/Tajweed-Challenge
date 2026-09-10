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

    const QuestionRepository = {
        // Chunk size requested: 10 questions per group
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
         * e.g. { "chunk_001_010": [...], "chunk_011_020": [...] }
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
         * Get questions filtered by sub-rule
         */
        getBySubRule(catId, subRuleName) {
            const list = this.getCategoryQuestions(catId);
            if (!subRuleName || subRuleName === 'all') return list;

            return list.filter(q => {
                const sub = q.subcat || q.subRule || q.rule;
                return sub === subRuleName;
            });
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
                    const filtered = catList.filter(q => {
                        const sub = q.subcat || q.subRule || q.rule;
                        return subRules.includes(sub);
                    });
                    results.push(...filtered.map(q => ({ ...q, categoryId: catId, categoryTitle: title })));
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
         * Find single question across all categories
         */
        findQuestionById(qId) {
            const bank = getBank();
            for (const catId of Object.keys(bank)) {
                const list = this.getCategoryQuestions(catId);
                const found = list.find(q => q.id === qId);
                if (found) return { ...found, categoryId: catId };
            }
            return null;
        }
    };

    window.QuestionRepository = QuestionRepository;

})(typeof window !== 'undefined' ? window : global);
