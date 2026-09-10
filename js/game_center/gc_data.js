// Game Center Data Adapter
// Safely reads from TAJWEED_BANK without modifying it.

function getTajweedBank() {
  if (typeof TAJWEED_BANK !== 'undefined') return TAJWEED_BANK;
  if (typeof window !== 'undefined' && window.TAJWEED_BANK) return window.TAJWEED_BANK;
  return {};
}

// Guarantee window.TAJWEED_BANK and window.ruleMeanings are populated
try {
  if (typeof TAJWEED_BANK !== 'undefined' && typeof window !== 'undefined') {
    window.TAJWEED_BANK = TAJWEED_BANK;
  }
} catch(e) {}

try {
  if (typeof ruleMeanings !== 'undefined' && typeof window !== 'undefined') {
    window.ruleMeanings = ruleMeanings;
  }
} catch(e) {}

window.GC_DATA = {
  // Category metadata matching the 9 main rules
  categories: [
    { id: 'image_bank', name: 'Noon & Meem Mushaddad', nameAr: 'النون والميم المشددتان', icon: '✨' },
    { id: 'qalqalah', name: 'Qalqalah', nameAr: 'القلقلة', icon: '💥' },
    { id: 'meem_sakinah', name: 'Meem Sakinah', nameAr: 'الميم الساكنة', icon: '🌙' },
    { id: 'noon_sakinah_tanween', name: 'Noon Sakinah & Tanween', nameAr: 'النون الساكنة والتنوين', icon: '📜' },
    { id: 'tafkheem_tarqeeq', name: 'Tafkheem & Tarqeeq', nameAr: 'التفخيم والترقيق', icon: '⚖️' },
    { id: 'madd_rules', name: 'Madd Rules', nameAr: 'أحكام المدود', icon: '〰️' },
    { id: 'hamzat_wasl', name: 'Hamzat Al-Wasl', nameAr: 'همزة الوصل', icon: '🔗' },
    { id: 'lam_shamsiyyah_qamariyyah', name: 'Lam Shamsiyyah & Lam Qamariyyah', nameAr: 'اللام الشمسية والقمرية', icon: '☀️' },
    { id: 'letter_relations', name: 'Relations Between Letters', nameAr: 'علاقات الحروف', icon: '🤝' }
  ],

  // Helper to extract questions array safely from category object
  getCategoryQuestions(catId) {
    const bank = getTajweedBank();
    const catObj = bank[catId];
    if (!catObj) return [];
    if (Array.isArray(catObj.questions)) return catObj.questions;
    if (Array.isArray(catObj)) return catObj;
    return [];
  },

  // Get question counts per category
  getAvailableCounts() {
    const counts = {};
    let total = 0;
    this.categories.forEach(cat => {
      const list = this.getCategoryQuestions(cat.id);
      counts[cat.id] = list.length;
      total += list.length;
    });
    counts.total = total;
    return counts;
  },

  // Get all unique sub-rules for a given category
  getSubRules(catId) {
    const list = this.getCategoryQuestions(catId);
    const subSet = new Set();
    list.forEach(q => {
      if (q.subcat) subSet.add(q.subcat);
      if (q.subRule) subSet.add(q.subRule);
    });
    return Array.from(subSet);
  },

  // Build a randomized question pool based on user configuration
  // config: { selectedCats: ['image_bank', ...], selectedSubRules: { catId: [...] }, maxCount: 20 }
  buildQuestionPool(config = {}) {
    let pool = [];

    const catsToUse = (config.selectedCats && config.selectedCats.length > 0)
      ? config.selectedCats
      : this.categories.map(c => c.id);

    catsToUse.forEach(catId => {
      const list = this.getCategoryQuestions(catId);
      const subRuleFilters = (config.selectedSubRules && config.selectedSubRules[catId]) || [];

      list.forEach(q => {
        const sub = q.subcat || q.subRule;
        if (subRuleFilters.length === 0 || (sub && subRuleFilters.includes(sub))) {
          // Clone question to prevent mutation
          pool.push({
            ...q,
            categoryId: catId,
            categoryName: this.getCategoryName(catId)
          });
        }
      });
    });

    // Shuffle pool with Fisher-Yates
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // If user requested more questions than currently available in selected categories, auto-cycle and reshuffle!
    if (config.maxCount && config.maxCount > 0 && pool.length > 0 && pool.length < config.maxCount) {
      const basePool = [...pool];
      while (pool.length < config.maxCount) {
        const extra = basePool.map(q => ({
          ...q,
          id: q.id + '_cyc_' + Math.random().toString(36).substring(2, 6)
        }));
        for (let i = extra.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [extra[i], extra[j]] = [extra[j], extra[i]];
        }
        pool = pool.concat(extra);
      }
      pool = pool.slice(0, config.maxCount);
    } else if (config.maxCount && config.maxCount > 0 && pool.length > config.maxCount) {
      pool = pool.slice(0, config.maxCount);
    }

    return pool;
  },

  getCategoryName(catId) {
    const found = this.categories.find(c => c.id === catId);
    return found ? found.name : catId;
  },

  getCategoryNameAr(catId) {
    const found = this.categories.find(c => c.id === catId);
    return found ? found.nameAr : catId;
  }
};
