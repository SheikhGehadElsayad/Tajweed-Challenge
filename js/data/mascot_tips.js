// ============================================================
// MASCOT TIP BANK — "Farida" character content
// Used for the mid-quiz mascot bubble (js/07_gameplay.js)
// type: "tajweed" or "islamic"
// ============================================================

const MASCOT_TIPS = [
    // ---------- TAJWEED TIPS ----------
    { id: "t001", type: "tajweed", text: "Noon Sakinah & Tanween have 4 core rules: Izhar, Idgham, Iqlab, and Ikhfa!" },
    { id: "t002", type: "tajweed", text: "Izhar means to pronounce the Noon Sakinah clearly, when it's followed by one of the 6 throat letters." },
    { id: "t003", type: "tajweed", text: "The 6 letters of Izhar Halqi are: أ هـ ع ح غ خ — they all come from the throat!" },
    { id: "t004", type: "tajweed", text: "Idgham means 'merging' — the Noon Sakinah blends into the next letter instead of being pronounced." },
    { id: "t005", type: "tajweed", text: "Idgham with Ghunnah uses 4 letters: ي ن م و — remember them with the word 'يَنْمُو' (yanmu)!" },
    { id: "t006", type: "tajweed", text: "Idgham without Ghunnah only has 2 letters: ل and ر — no nasal sound here!" },
    { id: "t007", type: "tajweed", text: "Iqlab means 'to flip' — Noon Sakinah turns into a Meem sound before the letter ب, with a tiny nasal hum." },
    { id: "t008", type: "tajweed", text: "Ikhfa has the most letters of all — 15 in total! It's a hidden, nasal sound between Izhar and Idgham." },
    { id: "t009", type: "tajweed", text: "Qalqalah letters spell out 'قطب جد' — Qaf, Taa, Baa, Jeem, Daal. They make an echoing bounce sound!" },
    { id: "t010", type: "tajweed", text: "Qalqalah Kubra (major) happens when the letter is at the very end of a stopped word — the echo is stronger!" },
    { id: "t011", type: "tajweed", text: "Meem Sakinah has 3 rules: Ikhfa Shafawi, Idgham Shafawi, and Izhar Shafawi." },
    { id: "t012", type: "tajweed", text: "Idgham Shafawi happens only when Meem Sakinah meets another Meem — two lips, one sound!" },
    { id: "t013", type: "tajweed", text: "Ikhfa Shafawi happens when Meem Sakinah meets the letter ب — say it softly through the nose." },
    { id: "t014", type: "tajweed", text: "Madd means 'prolongation' — stretching a vowel sound for extra beats when reciting." },
    { id: "t015", type: "tajweed", text: "Madd Tabee'i (natural Madd) is always stretched for exactly 2 counts — no more, no less!" },
    { id: "t016", type: "tajweed", text: "Madd Laazim is the longest Madd of all — a full 6 counts, every single time it appears!" },
    { id: "t017", type: "tajweed", text: "Tafkheem means giving a letter a 'heavy', full sound — like the letter ق or ص." },
    { id: "t018", type: "tajweed", text: "Tarqeeq means giving a letter a 'light', thin sound — most Arabic letters are naturally Raqeeqah." },
    { id: "t019", type: "tajweed", text: "The letter ل is heavy only in one special word: the name of Allah, when preceded by Fatha or Damma!" },
    { id: "t020", type: "tajweed", text: "Hamzat Al-Wasl is a 'connecting' Hamza — you only pronounce it if you start reading from that word." },
    { id: "t021", type: "tajweed", text: "The Shamsiyyah Lam is silent — it merges into the next letter, like in 'الشمس' (ash-shams)." },
    { id: "t022", type: "tajweed", text: "The Qamariyyah Lam is always pronounced clearly, like in 'القمر' (al-qamar)." },
    { id: "t023", type: "tajweed", text: "Ghunnah is a nasal sound that lasts about 2 counts — it happens with a Noon or Meem that has a Shaddah." },
    { id: "t024", type: "tajweed", text: "Good Tajweed isn't about speed — it's about giving every letter its full, correct right (Makhraj + Sifah)!" },
    { id: "t025", type: "tajweed", text: "When stopping on a word ending with Tanween Fatha, it changes into a 2-count Alif Madd (Madd Iwadh)!" },
    { id: "t026", type: "tajweed", text: "Letters of Isti'la (elevated letters) are always heavy: خ ص ض غ ط ق ظ." },
    { id: "t027", type: "tajweed", text: "The letters of Hams (whisper) allow breath to flow: ف ح ث هـ ش خ ص س ك ت." },
    { id: "t028", type: "tajweed", text: "Madd Munfasil happens when the Madd letter and Hamzah are in two separate words — stretched 4 or 5 counts." },
    { id: "t029", type: "tajweed", text: "Madd Muttasil happens when the Madd letter and Hamzah meet in the very same word — stretched 4 or 5 counts." },
    { id: "t030", type: "tajweed", text: "In Izhar Shafawi, pronounce the Meem Saakinah clearly when followed by any letter except Meem or Baa!" },
    { id: "t031", type: "tajweed", text: "Stopping on a word with a Madd letter before the last letter creates Madd 'Aarid Li-Sukoon (2, 4, or 6 counts)." },
    { id: "t032", type: "tajweed", text: "The letter Raa is heavy (Mufakhkham) when it carries Fatha or Damma, or has Sukoon after Fatha/Damma!" },
    { id: "t033", type: "tajweed", text: "The letter Raa is light (Muraqqaq) when it carries a Kasrah, or has Sukoon preceded by an original Kasrah." },
    { id: "t034", type: "tajweed", text: "Reciting with Tartil means reading calmly, distinctly, and giving every single letter its Tajweed rights!" },

    // ---------- ISLAMIC KNOWLEDGE TIPS ----------
    { id: "i001", type: "islamic", text: "The Quran has 114 Surahs in total, and the longest one is Surah Al-Baqarah!" },
    { id: "i002", type: "islamic", text: "The shortest Surah in the Quran is Surah Al-Kawthar — just 3 short ayahs!" },
    { id: "i003", type: "islamic", text: "Saying 'Bismillah' before you start something is a beautiful Sunnah that brings blessing to your work." },
    { id: "i004", type: "islamic", text: "The Prophet Muhammad ﷺ said: 'The best of you are those who learn the Quran and teach it.'" },
    { id: "i005", type: "islamic", text: "Muslims pray 5 times a day: Fajr, Dhuhr, Asr, Maghrib, and Isha." },
    { id: "i006", type: "islamic", text: "A smile is a form of charity (Sadaqah) — it's an easy way to earn good deeds every day!" },
    { id: "i007", type: "islamic", text: "The Quran was revealed over about 23 years to the Prophet Muhammad ﷺ." },
    { id: "i008", type: "islamic", text: "Surah Al-Fatiha is called 'The Opening' and is recited in every single unit of prayer." },
    { id: "i009", type: "islamic", text: "Being kind to your parents is one of the most beloved deeds to Allah in Islam." },
    { id: "i010", type: "islamic", text: "The Quran was first revealed in the Cave of Hira, on Mount Al-Noor near Makkah." },
    { id: "i011", type: "islamic", text: "Muslims fast during the month of Ramadan, from dawn until sunset." },
    { id: "i012", type: "islamic", text: "Saying 'Alhamdulillah' means thanking Allah — try to say it often, even for small blessings!" },
    { id: "i013", type: "islamic", text: "The Kaaba in Makkah is the direction Muslims face when they pray, called the Qibla." },
    { id: "i014", type: "islamic", text: "Angels are created from light, and they never disobey Allah." },
    { id: "i015", type: "islamic", text: "The word 'Quran' means 'the recitation' — it was meant to be read aloud beautifully." },
    { id: "i016", type: "islamic", text: "Helping someone in need, even with a kind word, is considered an act of worship in Islam." },
    { id: "i017", type: "islamic", text: "The first word revealed in the Quran was 'Iqra' — which means 'Read!'" },
    { id: "i018", type: "islamic", text: "Muslims believe in all the prophets, including Adam, Ibrahim, Musa, and Isa, peace be upon them all." },
    { id: "i019", type: "islamic", text: "Patience (Sabr) is one of the most rewarded qualities a Muslim can have." },
    { id: "i020", type: "islamic", text: "The Prophet Muhammad ﷺ was known as 'Al-Amin' — 'The Trustworthy' — even before he became a prophet." },
    { id: "i021", type: "islamic", text: "Reading just one page of Quran a day adds up to finishing the whole Quran in about a year!" },
    { id: "i022", type: "islamic", text: "Being honest, even when it's hard, is a value the Quran teaches again and again." },
    { id: "i023", type: "islamic", text: "The five daily prayers are one of the Five Pillars of Islam." },
    { id: "i024", type: "islamic", text: "Every letter you read from the Quran earns a good deed — and each good deed is multiplied by ten!" },
    { id: "i025", type: "islamic", text: "Ayat Al-Kursi is the greatest single ayah in the Holy Quran, found in Surah Al-Baqarah!" },
    { id: "i026", type: "islamic", text: "The Prophet Muhammad ﷺ taught us: 'Cleanliness is half of faith (Iman).'" },
    { id: "i027", type: "islamic", text: "Saying 'SubhanAllah wa bihamdihi' 100 times wipes away minor sins like foam on the ocean!" },
    { id: "i028", type: "islamic", text: "There are 25 Prophets and Messengers mentioned by their names in the Holy Quran." },
    { id: "i029", type: "islamic", text: "Surah Al-Ikhlas is equal to one third of the Quran in reward when recited with reflection!" },
    { id: "i030", type: "islamic", text: "Making Dua for your brother or sister in secret is answered by an angel saying: 'And to you the same!'" },
    { id: "i031", type: "islamic", text: "The Night of Power (Laylatul Qadr) is better than a thousand months of worship!" },
    { id: "i032", type: "islamic", text: "Honoring guests and speaking good words or remaining silent are marks of true faith." },
    { id: "i033", type: "islamic", text: "Allah has 99 Beautiful Names, and whoever memorizes and acts upon them will enter Paradise!" },
    { id: "i034", type: "islamic", text: "Giving water to a thirsty person or animal is a deeply rewarded charity in Islam." }
];

// ============================================================
// ICEBREAKER QUESTIONS — light, non-scored, mid-quiz break
// ============================================================

const MASCOT_ICEBREAKERS = [
    {
        id: "ib001",
        question: "How many letters make up the Ikhfa rule?",
        options: ["5", "10", "15"],
        correctIndex: 2,
        funFact: "Yes! 15 letters — the most of any Noon Sakinah rule!"
    },
    {
        id: "ib002",
        question: "What does 'Qalqalah' sound like?",
        options: ["A bouncing echo", "A silent pause", "A long stretch"],
        correctIndex: 0,
        funFact: "Exactly — that little bounce is the Qalqalah echo!"
    },
    {
        id: "ib003",
        question: "How many Surahs are in the Quran?",
        options: ["100", "114", "120"],
        correctIndex: 1,
        funFact: "114 Surahs — you're a Quran expert!"
    },
    {
        id: "ib004",
        question: "What's the shortest Surah in the Quran?",
        options: ["Al-Kawthar", "Al-Baqarah", "Al-Fatiha"],
        correctIndex: 0,
        funFact: "Correct! Al-Kawthar has only 3 ayahs."
    },
    {
        id: "ib005",
        question: "How many counts does Madd Tabee'i get stretched for?",
        options: ["1 count", "2 counts", "6 counts"],
        correctIndex: 1,
        funFact: "Right — always exactly 2 counts!"
    },
    {
        id: "ib006",
        question: "How many times a day do Muslims pray?",
        options: ["3 times", "5 times", "7 times"],
        correctIndex: 1,
        funFact: "Yes — Fajr, Dhuhr, Asr, Maghrib, and Isha!"
    },
    {
        id: "ib007",
        question: "Which letters make Idgham WITHOUT Ghunnah?",
        options: ["ل and ر", "ي and و", "ن and م"],
        correctIndex: 0,
        funFact: "Great memory! Just ل and ر — no nasal sound."
    },
    {
        id: "ib008",
        question: "What does the word 'Quran' mean?",
        options: ["The Book", "The Recitation", "The Light"],
        correctIndex: 1,
        funFact: "Correct — it means 'the recitation'!"
    },
    {
        id: "ib009",
        question: "Which letter turns Noon Sakinah into a hidden Meem sound?",
        options: ["ب", "م", "ن"],
        correctIndex: 0,
        funFact: "Yes! That's the Iqlab rule with ب."
    },
    {
        id: "ib010",
        question: "In which cave was the Quran first revealed?",
        options: ["Cave of Hira", "Cave of Thawr", "Cave of Uhud"],
        correctIndex: 0,
        funFact: "That's right — the Cave of Hira!"
    },
    {
        id: "ib011",
        question: "How long is Qalqalah Kubra compared to Qalqalah Sughra?",
        options: ["Shorter", "The same", "Stronger/louder"],
        correctIndex: 2,
        funFact: "Exactly — Kubra has a stronger echo!"
    },
    {
        id: "ib012",
        question: "What's a simple way to earn a good deed right now?",
        options: ["Smile at someone", "Nothing works instantly", "Wait for Ramadan"],
        correctIndex: 0,
        funFact: "A smile really is charity in Islam!"
    },
    {
        id: "ib013",
        question: "Which Lam is silent — Shamsiyyah or Qamariyyah?",
        options: ["Shamsiyyah", "Qamariyyah", "Both are silent"],
        correctIndex: 0,
        funFact: "Correct! Shamsiyyah Lam disappears into the next letter."
    },
    {
        id: "ib014",
        question: "How many words are in Surah Al-Fatiha's opening line, 'Bismillah...'?",
        options: ["3 words", "4 words", "5 words"],
        correctIndex: 1,
        funFact: "Bismillahi-r-Rahmani-r-Raheem has 4 words!"
    },
    {
        id: "ib015",
        question: "What was the Prophet Muhammad ﷺ called before he became a prophet, meaning 'trustworthy'?",
        options: ["Al-Ameen", "Al-Kareem", "Al-Fateh"],
        correctIndex: 0,
        funFact: "Yes — Al-Ameen, 'The Trustworthy'!"
    },
    {
        id: "ib016",
        question: "Which Surah is equivalent to one-third of the Quran in reward?",
        options: ["Surah Al-Ikhlas", "Surah Al-Falaq", "Surah An-Nas"],
        correctIndex: 0,
        funFact: "Yes! Surah Al-Ikhlas is equal to one-third of the Quran!"
    },
    {
        id: "ib017",
        question: "How many letters make up the throat letters of Izhar Halqi?",
        options: ["4 letters", "6 letters", "8 letters"],
        correctIndex: 1,
        funFact: "That's it — 6 throat letters: أ هـ ع ح غ خ!"
    },
    {
        id: "ib018",
        question: "What is the longest Madd in Tajweed stretched for?",
        options: ["2 counts", "4 counts", "6 counts"],
        correctIndex: 2,
        funFact: "Madd Laazim is stretched for a full 6 counts!"
    },
    {
        id: "ib019",
        question: "What phrase do we say when starting a good action?",
        options: ["Bismillah", "Alhamdulillah", "Astaghfirullah"],
        correctIndex: 0,
        funFact: "Bismillah brings barakah and light to all we do!"
    },
    {
        id: "ib020",
        question: "How many counts is a standard Ghunnah held for?",
        options: ["1 count", "2 counts", "5 counts"],
        correctIndex: 1,
        funFact: "Exactly 2 counts of melodic nasal Ghunnah!"
    }
];

// Export for browser window and Node.js testing
if (typeof window !== 'undefined') {
    window.MASCOT_TIPS = MASCOT_TIPS;
    window.MASCOT_ICEBREAKERS = MASCOT_ICEBREAKERS;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MASCOT_TIPS, MASCOT_ICEBREAKERS };
}
