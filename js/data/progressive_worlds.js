/**
 * Progressive Worlds & Stages Data
 * 10 Worlds • 48 Gamified Stages
 * Pure Stateless Data Layer
 */

(function(window) {
    'use strict';

    const PROGRESSIVE_WORLDS = [
        {
            id: 'world_1',
            catKey: 'image_bank',
            title: 'Noon & Meem Mushaddad',
            icon: '💎',
            color: '#06b6d4',
            desc: 'Master the 2-count ghunnah on Noon & Meem Mushaddadah',
            stages: [
                { id: 'stg_1_1', name: 'Noon Mushaddadah', desc: 'Identify Noon with Shaddah (2-count ghunnah)', subcat: 'Noon Mushaddad', qty: 6 },
                { id: 'stg_1_2', name: 'Meem Mushaddadah', desc: 'Identify Meem with Shaddah (2-count ghunnah)', subcat: 'Meem Mushaddad', qty: 8 },
                { id: 'stg_1_3', name: 'Mushaddad Mastery', desc: 'Combined challenge on all Noon & Meem Mushaddadah', subKey: 'Two counts of ghunna', qty: 10 }
            ]
        },
        {
            id: 'world_2',
            catKey: 'qalqalah',
            title: 'Qalqalah',
            icon: '⚡',
            color: '#f59e0b',
            desc: 'Echoing sound on the letters of Qutb Jad (Qaaf, Taa, Baa, Jeem, Daal)',
            stages: [
                { id: 'stg_2_1', name: 'General Qalqalah', desc: 'Identify whether the word contains Qalqalah or not', subKey: 'General Qalqalah', qty: 10 },
                { id: 'stg_2_2', name: 'Minor Qalqalah (Sughra)', desc: 'Qalqalah letter with Sukoon in the middle of a word or sentence', subKey: 'Minor', qty: 10 },
                { id: 'stg_2_3', name: 'Medium Qalqalah (Wusta)', desc: 'Stopping on an un-doubled Qalqalah letter at the end of a word', subKey: 'Medium', qty: 10 },
                { id: 'stg_2_4', name: 'Major Qalqalah (Kubra)', desc: 'Stopping on a doubled (mushaddad) Qalqalah letter', subKey: 'Major', qty: 4 }
            ]
        },
        {
            id: 'world_3',
            catKey: 'meem_sakinah',
            title: 'Meem Sakinah',
            icon: '🌙',
            color: '#8b5cf6',
            desc: 'The three rules of Meem Saakinah: Ikhfaa, Idgham, and Izhar Shafawi',
            stages: [
                { id: 'stg_3_1', name: 'Ikhfaa Shafawi', desc: 'Meem Saakinah followed by letter Baa', subKey: 'Oral + Hiding', qty: 8 },
                { id: 'stg_3_2', name: 'Idgham Shafawi', desc: 'Meem Saakinah followed by another Meem', subKey: 'Oral + Merger', qty: 8 },
                { id: 'stg_3_3', name: 'Izhar Shafawi', desc: 'Meem Saakinah followed by all other letters', subKey: 'Oral + Clarity', qty: 8 }
            ]
        },
        {
            id: 'world_4',
            catKey: 'noon_sakinah_tanween',
            title: 'Noon Sakinah & Tanween',
            icon: '📖',
            color: '#10b981',
            desc: 'The fundamental rules of Noon Saakinah and Tanween',
            stages: [
                { id: 'stg_4_1', name: 'Izhar Halqi', desc: 'Clear pronunciation with the 6 throat letters', subKey: 'Izhar', qty: 10 },
                { id: 'stg_4_2', name: 'Idgham with Ghunnah', desc: 'Merging with nasalization in letters Yanmoo (Yaa, Noon, Meem, Waw)', subKey: 'Idgham with Ghunnah', qty: 10 },
                { id: 'stg_4_3', name: 'Idgham without Ghunnah', desc: 'Complete merging without nasal sound in Laam and Raa', subKey: 'Idgham without Ghunnah', qty: 10 },
                { id: 'stg_4_4', name: 'Iqlab', desc: 'Converting Noon or Tanween into a Meem before Baa', subKey: 'Iqlab', qty: 8 },
                { id: 'stg_4_5', name: 'Ikhfaa Haqiqi', desc: 'Concealing the Noon sound before the 15 Ikhfaa letters', subKey: 'Ikhfa', qty: 10 },
                { id: 'stg_4_6', name: 'Izhar Mutlaq', desc: 'Noon Saakinah followed by Waw or Yaa in a single word', subKey: 'Izhar Mutlaq', qty: 4 },
                { id: 'stg_4_7', name: 'Ikhfaa Ghunnah', desc: 'Distinguish between Heavy and Light Ghunnah of Ikhfaa', subKey: 'Ikhfa Ghunnah', qty: 10 },
                { id: 'stg_4_8', name: 'Idgham Completeness', desc: 'Distinguish between Complete (Kamil) and Incomplete (Naqis) Idgham', subKey: 'Idgham Completeness', qty: 10 }
            ]
        },
        {
            id: 'world_5',
            catKey: 'tafkheem_tarqeeq',
            title: 'Tafkheem & Tarqeeq',
            icon: '⚖️',
            color: '#ec4899',
            desc: 'Heaviness and Lightness of Arabic letters, Raa, and Laam of Allah',
            stages: [
                { id: 'stg_5_1', name: 'Always Heavy Letters', desc: 'The seven permanent heavy letters (Kh-S-D-Gh-T-Q-Z)', subKey: 'Always Heavy', qty: 8 },
                { id: 'stg_5_2', name: 'Heavy Raa (Tafkheem)', desc: 'Cases where letter Raa is pronounced heavy (Fathah, Dammah, etc.)', subKey: 'Heavy Ra', qty: 10 },
                { id: 'stg_5_3', name: 'Light Raa (Tarqeeq)', desc: 'Cases where letter Raa is pronounced light (Kasrah, etc.)', subKey: 'Light Ra', qty: 8 },
                { id: 'stg_5_4', name: 'Raa: Both Options', desc: 'Words where Raa can be read with either Tafkheem or Tarqeeq', subKey: 'Ra Both Options', qty: 6 },
                { id: 'stg_5_5', name: 'Laam of Allah', desc: 'Heaviness or Lightness of the Laam in the Divine Name', subKey: 'Lam of Allah', qty: 10 },
                { id: 'stg_5_6', name: 'Alif of Madd', desc: 'Alif follows the letter preceding it in heaviness and lightness', subKey: 'Alif', qty: 7 }
            ]
        },
        {
            id: 'world_6',
            catKey: 'madd_rules',
            title: 'Madd Rules',
            icon: '🌊',
            color: '#3b82f6',
            desc: 'Comprehensive rules of Natural, Secondary, and Compulsory Prolongation',
            stages: [
                { id: 'stg_6_1', name: 'Natural Madd (Tabee\'ee)', desc: 'The basic two-count prolongation on Alif, Waw, and Yaa', subKey: 'Natural Madd', qty: 10 },
                { id: 'stg_6_2', name: 'Connected Madd (Muttasil)', desc: 'Madd letter followed by Hamzah in the same word (4-5 counts)', subKey: 'Connected', qty: 10 },
                { id: 'stg_6_3', name: 'Separated Madd (Munfasil)', desc: 'Madd letter followed by Hamzah in the next word (4-5 counts)', subKey: 'Separated', qty: 10 },
                { id: 'stg_6_4', name: 'Substitute Madd (Badal)', desc: 'Hamzah precedes the Madd letter in the same word (2 counts)', subKey: 'Substitute', qty: 10 },
                { id: 'stg_6_5', name: 'Compensatory Madd (\'Iwad)', desc: 'Stopping on Tanween Fath replaced with two-count Alif', subKey: 'Compensatory Madd', qty: 10 },
                { id: 'stg_6_6', name: 'Temporary Madd (\'Aarid)', desc: 'Temporary Sukoon caused by stopping at the end of a word (2/4/6 counts)', subKey: 'Temporary Madd', qty: 10 },
                { id: 'stg_6_7', name: 'Soft Madd (Leen)', desc: 'Saakin Waw or Yaa preceded by Fathah before a stopping Sukoon', subKey: 'Soft Madd', qty: 10 },
                { id: 'stg_6_8', name: 'Minor Sila Madd', desc: 'Pronoun Haa between two vowels without following Hamzah (2 counts)', subKey: 'Minor Sila Madd', qty: 7 },
                { id: 'stg_6_9', name: 'Major Sila Madd', desc: 'Pronoun Haa followed by Hamzah in the next word (4-5 counts)', subKey: 'Major Sila Madd', qty: 8 },
                { id: 'stg_6_10', name: 'Compulsory Word Heavy', desc: 'Madd followed by Shaddah in a word (6 counts compulsory)', subKey: 'Permanent Word Based Heavy', qty: 10 },
                { id: 'stg_6_11', name: 'Compulsory Word Light', desc: 'Madd followed by un-doubled Sukoon in a word (6 counts)', subKey: 'Permanent Word Based Light', qty: 2 },
                { id: 'stg_6_12', name: 'Compulsory Letter Heavy', desc: 'Disjointed opening letters with Idgham (e.g. Laam in Alif-Laam-Meem)', subKey: 'Permanent Letter Based Heavy', qty: 4 },
                { id: 'stg_6_13', name: 'Compulsory Letter Light', desc: 'Disjointed opening letters without Idgham (e.g. Qaf, Saad, Noon)', subKey: 'Permanent Letter Based Light', qty: 10 },
                { id: 'stg_6_14', name: 'Stabilizing Madd (Tamkeen)', desc: 'Two consecutive Yaas or Waws to prevent dropping the elongation', subKey: 'Stabilizing Madd', qty: 4 }
            ]
        },
        {
            id: 'world_7',
            catKey: 'hamzat_wasl',
            title: 'Hamzat Al-Wasl',
            icon: '🔗',
            color: '#6366f1',
            desc: 'Pronunciation and vowelization rules of the connecting Hamzah',
            stages: [
                { id: 'stg_7_1', name: 'Dropped in Connection', desc: 'Dropped in speech when reading through from the preceding word', subKey: 'Dropped', qty: 8 },
                { id: 'stg_7_2', name: 'Start with Fathah', desc: 'Always begins with Fathah in the definite article (Al-)', subKey: 'Start with fatha', qty: 8 },
                { id: 'stg_7_3', name: 'Start with Dammah', desc: 'Begins with Dammah in verbs whose 3rd letter has an original Dammah', subKey: 'Start with damma', qty: 8 },
                { id: 'stg_7_4', name: 'Start with Kasrah', desc: 'Begins with Kasrah in regular verbs and irregular Quranic nouns', subKey: 'Start with kasra', qty: 10 }
            ]
        },
        {
            id: 'world_8',
            catKey: 'lam_shamsiyyah_qamariyyah',
            title: 'Lam Shamsiyyah & Qamariyyah',
            icon: '☀️',
            color: '#ea580c',
            desc: 'Solar and Lunar letters in the definite article (Al-)',
            stages: [
                { id: 'stg_8_1', name: 'Lam Shamsiyyah (Solar)', desc: 'Laam merges completely into the following solar letter (with Shaddah)', subKey: 'Lam Shamsiyyah', qty: 8 },
                { id: 'stg_8_2', name: 'Lam Qamariyyah (Lunar)', desc: 'Laam is clearly articulated before the 14 lunar letters', subKey: 'Lam Qamariyyah', qty: 8 }
            ]
        },
        {
            id: 'world_8b',
            catKey: 'lam_harf',
            title: 'Lam of Hal & Bal',
            icon: '⚡',
            color: '#0284c7',
            desc: 'Rules of the Saakin Lam in particles Hal and Bal (Idgham & Izhar)',
            stages: [
                { id: 'stg_hb_1', name: 'Idgham (Merging in Lam & Raa)', desc: 'Lam merges completely when followed by Lam or Raa', subKey: 'Idgham', qty: 8 },
                { id: 'stg_hb_2', name: 'Izhar (Clear Pronunciation)', desc: 'Lam is pronounced clearly when followed by any other letter', subKey: 'Izhar', qty: 10 }
            ]
        },
        {
            id: 'world_9',
            catKey: 'letter_relations',
            title: 'Relations Between Letters',
            icon: '🤝',
            color: '#14b8a6',
            desc: 'Mutamathilayn, Mutajanisayn, and Mutaqaribayn letters',
            stages: [
                { id: 'stg_9_1', name: 'Identical (Mutamathilayn)', desc: 'Two identical letters meeting (same articulation point & characteristics)', subKey: 'Identical', qty: 10 },
                { id: 'stg_9_2', name: 'Homogeneous (Mutajanisayn)', desc: 'Letters sharing the same articulation point but differing in characteristics', subKey: 'Similar', qty: 8 },
                { id: 'stg_9_3', name: 'Close (Mutaqaribayn)', desc: 'Letters close in articulation point or characteristics', subKey: 'Close', qty: 6 }
            ]
        }
    ];

    function getAllProgressiveStages() {
        const list = [];
        PROGRESSIVE_WORLDS.forEach((world, worldIdx) => {
            world.stages.forEach((stage, stageIdx) => {
                list.push({
                    worldIdx,
                    stageIdx,
                    world,
                    stage,
                    id: stage.id,
                    globalIdx: list.length
                });
            });
        });
        return list;
    }

    // Expose to window and global
    window.PROGRESSIVE_WORLDS = PROGRESSIVE_WORLDS;
    window.getAllProgressiveStages = getAllProgressiveStages;

    // Backwards-compatibility alias for legacy bindings
    window.LEVELS_CONFIG = getAllProgressiveStages().map((s, idx) => ({
        id: idx + 1,
        title: `${s.world.title} - ${s.stage.name}`,
        desc: s.stage.desc,
        stageInfo: s
    }));

})(typeof window !== 'undefined' ? window : this);
