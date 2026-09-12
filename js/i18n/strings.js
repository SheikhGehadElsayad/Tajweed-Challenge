/**
 * Central Internationalization (i18n) Engine
 * Tajweed Challenge - Bilingual English & Arabic Support
 */

(function(window) {
    'use strict';

    const STRINGS = {
        en: {
            appName: "Tajweed Challenge",
            appEdition: "Student Edition",
            preparedBy: "Prepared by",
            teacherName: "Sheikh Gehad Elsayad",
            enterApp: "Enter App",
            back: "Back",
            home: "Home",
            leaderboard: "Leaderboard",
            gameCenter: "Game Center",
            teachersAndParents: "Teachers & Parents",
            assignHomework: "Assign HW",
            recitationReview: "Recitation Audio Review",
            whatsAppContact: "WhatsApp Contact",
            linktree: "Linktree",
            
            // Mode Select Screen
            chooseMode: "Choose Learning Mode",
            chooseModeSub: "Select your challenge to start learning",
            dailyChallenge: "Daily Challenge",
            dailyChallengeDesc: "5 Questions • Streak tracked",
            progressiveMode: "Progressive Mode",
            progressiveModeDesc: "Unlock levels one by one",
            freePractice: "Free Practice",
            freePracticeDesc: "Custom practical cards",
            theoreticalQuiz: "Theoretical Quiz",
            theoreticalQuizDesc: "340 Questions • T/F & MC",
            gameCenterMode: "Game Center",
            gameCenterDesc: "7 Interactive arcade games",
            
            // Leaderboard
            hallOfFame: "Hall of Fame & Leaderboard",
            hallOfFameSub: "Compete daily and weekly with fellow Tajweed students to reach the highest rank! ✨",
            todayRanking: "Today's Ranking",
            weeklyRanking: "Weekly Ranking",
            allTimeRanking: "All-Time Ranking",
            rank: "Rank",
            student: "Student",
            streak: "Streak",
            stars: "Stars",
            accuracy: "Accuracy",
            score: "Score",
            points: "Pts",
            dayStreak: "Day Streak",
            you: "You",
            standingAndBalance: "Your Standing & Balance",
            clearLocal: "Clear Local",
            noScoresYet: "No scores recorded yet for this period. Be the first to play! 🚀",

            // Settings & Accessibility
            language: "Language",
            highContrast: "High Contrast",
            fontSize: "Font Size",
            fontSizeNormal: "Normal",
            fontSizeLarge: "Large",
            fontSizeXLarge: "Extra Large",
            switchProfile: "Switch Profile",
            playerName: "Player Name",
            timer: "Timer",
            startGame: "Start Game",
            startChallengeNow: "Start Challenge Now 🚀",

            // Multi-Teacher / Multi-Class
            workspaceLabel: "Class",
            switchWorkspace: "Switch Class",
            newWorkspace: "New Class",
            workspaceName: "Class Name",
            createWorkspace: "Create Class",
            defaultWorkspaceName: "Primary Class",

            // General Modals & Messages
            gamePaused: "Game Paused",
            continueGame: "Continue",
            endGame: "End Game",
            exitConfirm: "Are you sure you want to end this challenge?",
            yesExit: "Yes, End Challenge",
            noStay: "No, Keep Playing",
            remediationDrill: "Immediate Remediation Drill",
            questions: "Questions"
        },
        ar: {
            appName: "تحدي التجويد",
            appEdition: "نسخة الطالب",
            preparedBy: "إعداد وتطوير",
            teacherName: "الشيخ جهاد الصياد",
            enterApp: "دخول التطبيق",
            back: "رجوع",
            home: "الرئيسية",
            leaderboard: "لوحة الشرف",
            gameCenter: "مركز الألعاب",
            teachersAndParents: "المعلمون وأولياء الأمور",
            assignHomework: "تكليف واجب",
            recitationReview: "تدقيق النطق الصوتي",
            whatsAppContact: "تواصل عبر واتساب",
            linktree: "رابط لينكتري",
            
            // Mode Select Screen
            chooseMode: "اختر نمط التعلم",
            chooseModeSub: "اختر التحدي المناسب لبدء التعلم والممارسة",
            dailyChallenge: "التحدي اليومي",
            dailyChallengeDesc: "٥ أسئلة يومية • متابعة الستريك",
            progressiveMode: "المسار المتدرج",
            progressiveModeDesc: "فتح المستويات خطوة بخطوة",
            freePractice: "الممارسة الحرة",
            freePracticeDesc: "بطاقات عملية مخصصة",
            theoreticalQuiz: "الاختبار النظري",
            theoreticalQuizDesc: "٣٤٠ سؤال نظري • صح/خطأ واختيارات",
            gameCenterMode: "مركز الألعاب",
            gameCenterDesc: "٧ ألعاب تفاعلية حماسية",
            
            // Leaderboard
            hallOfFame: "لوحة الشرف والمتصدرين",
            hallOfFameSub: "تنافس يومياً وأسبوعياً مع طلاب التجويد وارتقِ بأعلى المراتب! ✨",
            todayRanking: "الترتيب اليومي",
            weeklyRanking: "الترتيب الأسبوعي",
            allTimeRanking: "الترتيب العام",
            rank: "الترتيب",
            student: "الطالب",
            streak: "الستريك",
            stars: "النجوم",
            accuracy: "الدقة",
            score: "النقاط",
            points: "نقطة",
            dayStreak: "أيام ستريك",
            you: "أنت",
            standingAndBalance: "رصيدك وترتيبك الحالي",
            clearLocal: "مسح المحلي",
            noScoresYet: "لا توجد نتائج مسجلة لهذه الفترة بعد. كن أول من يلعب! 🚀",

            // Settings & Accessibility
            language: "اللغة",
            highContrast: "تباين عالٍ",
            fontSize: "حجم الخط",
            fontSizeNormal: "عادي",
            fontSizeLarge: "كبير",
            fontSizeXLarge: "كبير جداً",
            switchProfile: "تبديل الطالب",
            playerName: "اسم اللاعب",
            timer: "المؤقت",
            startGame: "بدء اللعبة",
            startChallengeNow: "ابدأ التحدي الآن 🚀",

            // Multi-Teacher / Multi-Class
            workspaceLabel: "الفصل",
            switchWorkspace: "تبديل الفصل",
            newWorkspace: "فصل جديد",
            workspaceName: "اسم الفصل",
            createWorkspace: "إنشاء الفصل",
            defaultWorkspaceName: "الفصل الأساسي",

            // General Modals & Messages
            gamePaused: "تم إيقاف اللعبة مؤقتاً",
            continueGame: "متابعة",
            endGame: "إنهاء اللعبة",
            exitConfirm: "هل أنت متأكد من إنهاء هذا التحدي؟",
            yesExit: "نعم، إنهاء",
            noStay: "لا، متابعة اللعب",
            remediationDrill: "معالجة فورية للأخطاء",
            questions: "أسئلة"
        }
    };

    const STORAGE_KEY = 'tajweed_language';

    const I18n = {
        STRINGS,

        getLanguage() {
            try {
                const storage = (typeof window !== 'undefined' && window.localStorage) ? window.localStorage : (typeof localStorage !== 'undefined' ? localStorage : null);
                const saved = storage ? storage.getItem(STORAGE_KEY) : null;
                if (saved === 'ar' || saved === 'en') return saved;
            } catch (e) {}
            return 'en';
        },

        setLanguage(lang) {
            if (lang !== 'en' && lang !== 'ar') lang = 'en';
            try {
                const storage = (typeof window !== 'undefined' && window.localStorage) ? window.localStorage : (typeof localStorage !== 'undefined' ? localStorage : null);
                if (storage) storage.setItem(STORAGE_KEY, lang);
            } catch (e) {}

            this.applyLanguage(lang);

            try {
                window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
            } catch (e) {}

            return lang;
        },

        applyLanguage(lang) {
            if (typeof document !== 'undefined' && document.documentElement) {
                document.documentElement.lang = lang;
                document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
                if (document.body) {
                    if (lang === 'ar') {
                        document.body.classList.add('lang-ar');
                        document.body.classList.remove('lang-en');
                    } else {
                        document.body.classList.add('lang-en');
                        document.body.classList.remove('lang-ar');
                    }
                }
            }
        },

        t(key, fallback = '') {
            const lang = this.getLanguage();
            if (STRINGS[lang] && STRINGS[lang][key] !== undefined) {
                return STRINGS[lang][key];
            }
            if (STRINGS.en && STRINGS.en[key] !== undefined) {
                return STRINGS.en[key];
            }
            return fallback || key;
        },

        init() {
            const currentLang = this.getLanguage();
            this.applyLanguage(currentLang);
        }
    };

    // Auto-init immediately
    I18n.init();

    // Export globally
    window.I18n = I18n;
    window.t = function(key, fallback) {
        return I18n.t(key, fallback);
    };

})(window);
