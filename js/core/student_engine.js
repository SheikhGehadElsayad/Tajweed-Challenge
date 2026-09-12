/**
 * Central Student Management Engine (Roster, Progress & Mistake Bank)
 * Single source of truth for student data across all 5 modes:
 * - Game Center
 * - Classic Challenge
 * - Free Practice
 * - Progressive Mode
 * - Theoretical Quiz
 */

(function(window) {
    'use strict';
    function getWeekKey(d = new Date()) {
        const target = new Date(d.valueOf());
        const dayNr = (d.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        const weekNr = 1 + Math.ceil((firstThursday - target) / 604800000);
        return target.getFullYear() + '-W' + weekNr;
    }

    function getTodayKey(d = new Date()) {
        return d.toISOString().slice(0, 10);
    }


    const STORAGE_KEY = 'tajweed_students_roster';
    const LEGACY_NAME_KEY = 'tajweed_player_name';
    const LEGACY_PROG_KEY = 'tajweed_progressive_progress';

    const DEFAULT_AVATARS = ['🦁', '🐯', '🦅', '🐬', '🌟', '🚀', '🎓', '👑', '🌸', '⚡', '🏹', '💎'];
    const DEFAULT_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#ea580c', '#6366f1'];

    class StudentEngineClass {
        constructor() {
            this.state = {
                activeStudentId: null,
                students: {}
            };
            this.listeners = [];
            this.init();
        }

        init() {
            this.load();
            this.migrateLegacyIfNeeded();
            const active = this.getActiveStudent();
            if (active && active.theme) {
                this.applyTheme(active.theme);
            }
        }

        load() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed && typeof parsed === 'object' && parsed.students) {
                        this.state = parsed;
                    }
                }
            } catch (e) {
                console.warn('StudentEngine: Failed to load from localStorage', e);
            }
        }

        save() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
                this.notify();
            } catch (e) {
                console.error('StudentEngine: Failed to save to localStorage', e);
            }
        }

        migrateLegacyIfNeeded() {
            const studentIds = Object.keys(this.state.students || {});
            if (studentIds.length === 0) {
                // Check if legacy data exists
                const legacyName = (localStorage.getItem(LEGACY_NAME_KEY) || '').trim() || 'Student 1';
                let legacyProg = null;
                try {
                    const rawProg = localStorage.getItem(LEGACY_PROG_KEY);
                    if (rawProg) legacyProg = JSON.parse(rawProg);
                } catch (e) {}

                const initialId = 'std_' + Date.now();
                const initialStudent = {
                    id: initialId,
                    name: legacyName,
                    avatar: '🦁',
                    color: '#2563eb',
                    theme: 'ocean',
                    dailyStreak: {
                        currentStreak: 0,
                        lastPlayedDate: null,
                        bestStreak: 0
                    },
                    createdAt: Date.now(),
                    scoringPolicy: 'best', // 'best' | 'latest' | 'cumulative'
                    progress: {
                        completedStages: (legacyProg && legacyProg.completedStages) || {},
                        unlockedStageId: (legacyProg && legacyProg.unlockedStageId) || 'stg_1_1',
                        totalScore: 0,
                        bestStreak: 0,
                        attempts: {}
                    },
                    balance: {
                        points: (legacyProg && legacyProg.totalScore) || 0,
                        stars: 0,
                        dailyPoints: {},
                        weeklyPoints: {}
                    },
                    lastSession: null,
                    mistakes: [],
                    homeworks: []
                };

                this.state.students[initialId] = initialStudent;
                this.state.activeStudentId = initialId;
                
            // Ensure all students have balance and streak
            Object.values(this.state.students || {}).forEach(std => {
                if (!std.balance) {
                    std.balance = {
                        points: std.progress?.totalScore || 0,
                        stars: 0,
                        dailyPoints: {},
                        weeklyPoints: {}
                    };
                }
                if (!std.dailyStreak) {
                    std.dailyStreak = { currentStreak: 0, lastPlayedDate: null, bestStreak: 0 };
                }
            });
this.save();
            } else if (!this.state.activeStudentId || !this.state.students[this.state.activeStudentId]) {
                this.state.activeStudentId = studentIds[0];
                this.save();
            }
        }

        getAllStudents() {
            return Object.values(this.state.students || {}).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        }

        getStudents() {
            return this.getAllStudents();
        }

        getStudent(id) {
            return this.state.students[id] || null;
        }

        getActiveStudent() {
            if (!this.state.activeStudentId || !this.state.students[this.state.activeStudentId]) {
                const ids = Object.keys(this.state.students || {});
                if (ids.length > 0) {
                    this.state.activeStudentId = ids[0];
                    this.save();
                } else {
                    this.migrateLegacyIfNeeded();
                }
            }
            return this.state.students[this.state.activeStudentId];
        }

        setActiveStudent(id) {
            if (this.state.students[id]) {
                this.state.activeStudentId = id;
                const student = this.state.students[id];
                if (student.theme) {
                    this.applyTheme(student.theme);
                }
                // Keep legacy key synced for older components that might read it directly
                try {
                    localStorage.setItem(LEGACY_NAME_KEY, student.name);
                    localStorage.setItem(LEGACY_PROG_KEY, JSON.stringify({
                        completedStages: student.progress.completedStages || {},
                        unlockedStageId: student.progress.unlockedStageId || 'stg_1_1'
                    }));
                } catch (e) {}

                this.save();
                return true;
            }
            return false;
        }

        addStudent(name, avatar, color, scoringPolicy = 'best', theme = 'ocean') {
            const cleanName = (name || '').trim().replace(/\s+/g, ' ');
            if (!cleanName) return null;

            const id = 'std_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
            const student = {
                id: id,
                name: cleanName,
                avatar: avatar || DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)],
                color: color || DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
                theme: theme || 'ocean',
                dailyStreak: {
                    currentStreak: 0,
                    lastPlayedDate: null,
                    bestStreak: 0
                },
                createdAt: Date.now(),
                scoringPolicy: scoringPolicy,
                progress: {
                    completedStages: {},
                    unlockedStageId: 'stg_1_1',
                    totalScore: 0,
                    bestStreak: 0,
                    attempts: {}
                },
                mistakes: [],
                homeworks: []
            };

            this.state.students[id] = student;
            // Automatically make the newly created student active
            this.setActiveStudent(id);
            return student;
        }

        updateStudent(id, data = {}) {
            const student = this.state.students[id];
            if (!student) return null;

            if (data.name !== undefined) {
                const cleanName = String(data.name).trim().replace(/\s+/g, ' ');
                if (cleanName) student.name = cleanName;
            }
            if (data.avatar !== undefined) student.avatar = data.avatar;
            if (data.color !== undefined) student.color = data.color;
            if (data.scoringPolicy !== undefined) student.scoringPolicy = data.scoringPolicy;
            if (data.theme !== undefined) {
                student.theme = data.theme;
                if (id === this.state.activeStudentId) this.applyTheme(data.theme);
            }

            if (id === this.state.activeStudentId) {
                try {
                    localStorage.setItem(LEGACY_NAME_KEY, student.name);
                } catch (e) {}
            }

            this.save();
            return student;
        }

        deleteStudent(id) {
            if (!this.state.students[id]) return false;
            delete this.state.students[id];

            const remainingIds = Object.keys(this.state.students);
            if (remainingIds.length === 0) {
                // Must always have at least one student
                this.migrateLegacyIfNeeded();
            } else if (this.state.activeStudentId === id) {
                this.setActiveStudent(remainingIds[0]);
            } else {
                this.save();
            }
            return true;
        }

        // ================= PROGRESSION & ROADMAP =================

        getStudentProgress(studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student) return { completedStages: {}, unlockedStageId: 'stg_1_1' };
            if (!student.progress) {
                student.progress = { completedStages: {}, unlockedStageId: 'stg_1_1', totalScore: 0, bestStreak: 0, attempts: {} };
            }
            return student.progress;
        }

        recordStageResult(stageId, result = {}, studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student) return;

            if (!student.progress) {
                student.progress = { completedStages: {}, unlockedStageId: 'stg_1_1', totalScore: 0, bestStreak: 0, attempts: {} };
            }
            if (!student.progress.completedStages) student.progress.completedStages = {};
            if (!student.progress.attempts) student.progress.attempts = {};

            const prev = student.progress.completedStages[stageId] || { stars: 0, score: 0, accuracy: 0 };
            const prevAttempts = student.progress.attempts[stageId] || 0;
            student.progress.attempts[stageId] = prevAttempts + 1;

            const accuracy = result.accuracy || 0;
            const score = result.score || 0;
            const stars = result.stars || 0;
            const policy = student.scoringPolicy || 'best';

            let finalScore = score;
            let finalStars = stars;
            let finalAccuracy = accuracy;

            if (policy === 'best') {
                finalScore = Math.max(prev.score || 0, score);
                finalStars = Math.max(prev.stars || 0, stars);
                finalAccuracy = Math.max(prev.accuracy || 0, accuracy);
            } else if (policy === 'cumulative') {
                finalScore = (prev.score || 0) + score;
                finalStars = Math.max(prev.stars || 0, stars);
                finalAccuracy = accuracy;
            } else { // 'latest'
                finalScore = score;
                finalStars = stars;
                finalAccuracy = accuracy;
            }

            student.progress.completedStages[stageId] = {
                stars: finalStars,
                score: finalScore,
                accuracy: finalAccuracy,
                lastAttemptScore: score,
                completedAt: Date.now()
            };

            // Unlock next stage if passed
            if (result.nextStageId && stars >= 1) {
                student.progress.unlockedStageId = result.nextStageId;
            }

            if (result.bestStreak && (!student.progress.bestStreak || result.bestStreak > student.progress.bestStreak)) {
                student.progress.bestStreak = result.bestStreak;
            }

            this.save();
        }

        resetStageProgress(stageId, studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student || !student.progress || !student.progress.completedStages) return;

            delete student.progress.completedStages[stageId];
            if (student.progress.attempts) delete student.progress.attempts[stageId];
            this.save();
        }

        resetAllProgress(studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student) return;

            student.progress = {
                completedStages: {},
                unlockedStageId: 'stg_1_1',
                totalScore: 0,
                bestStreak: 0,
                attempts: {}
            };
            this.save();
        }

        // ================= MISTAKE BANK =================

        getMistakes(studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student) return [];
            return Array.isArray(student.mistakes) ? student.mistakes : [];
        }

        addMistake(mistakeData, studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student) return;

            if (!Array.isArray(student.mistakes)) student.mistakes = [];

            // Check if already in bank
            const qKey = mistakeData.qId || mistakeData.text || mistakeData.image || mistakeData.src || '';
            const existsIdx = student.mistakes.findIndex(m => (m.qId && m.qId === qKey) || (m.src && m.src === qKey) || (m.prompt && m.prompt === qKey));

            const entry = {
                ...mistakeData,
                timestamp: Date.now(),
                mastered: false
            };

            if (existsIdx >= 0) {
                student.mistakes[existsIdx] = entry;
            } else {
                student.mistakes.unshift(entry);
            }

            // Cap mistake bank per student to 100 entries
            if (student.mistakes.length > 100) {
                student.mistakes = student.mistakes.slice(0, 100);
            }

            this.save();
        }

        removeMistake(index, studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student || !Array.isArray(student.mistakes)) return;

            if (index >= 0 && index < student.mistakes.length) {
                student.mistakes.splice(index, 1);
                this.save();
            }
        }

        markMistakeMastered(index, studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student || !Array.isArray(student.mistakes)) return;

            if (index >= 0 && index < student.mistakes.length) {
                student.mistakes.splice(index, 1); // remove from active bank
                this.save();
            }
        }

        clearMistakes(studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            if (!student) return;

            student.mistakes = [];
            this.save();
        }

        // ================= HOMEWORK RECORDS & SYNC =================

        addHomeworkRecord(studentName, hwRecord) {
            const cleanName = (studentName || '').trim().replace(/\s+/g, ' ');
            if (!cleanName) return null;

            // Find existing student by name (case-insensitive) or create new
            let student = Object.values(this.state.students || {}).find(s => 
                s.name && s.name.trim().toLowerCase() === cleanName.toLowerCase()
            );

            if (!student) {
                student = this.addStudent(cleanName);
            }

            if (!student) return null;

            if (!Array.isArray(student.homeworks)) {
                student.homeworks = [];
            }

            const recordId = hwRecord.id || ('hw_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6));
            const entry = {
                id: recordId,
                date: hwRecord.date || new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
                timestamp: hwRecord.timestamp || Date.now(),
                score: hwRecord.score || 0,
                total: hwRecord.total || 0,
                accuracy: hwRecord.accuracy || 0,
                timeSpent: hwRecord.timeSpent || 0,
                teacherName: hwRecord.teacherName || this.getTeacherInfo().name,
                rules: hwRecord.rules || [],
                mistakes: Array.isArray(hwRecord.mistakes) ? hwRecord.mistakes : []
            };

            // Avoid duplicate submissions with identical id
            const existingIdx = student.homeworks.findIndex(h => h.id === recordId);
            if (existingIdx >= 0) {
                student.homeworks[existingIdx] = entry;
            } else {
                student.homeworks.unshift(entry);
            }

            // Cap stored homework records per student to 50
            if (student.homeworks.length > 50) {
                student.homeworks = student.homeworks.slice(0, 50);
            }

            // Automatically feed mistakes into the student's active Mistake Bank
            if (entry.mistakes.length > 0) {
                entry.mistakes.forEach(m => {
                    this.addMistake({
                        qId: m.qId || m.id || ('hw_q_' + Math.random().toString(36).substring(2, 6)),
                        text: m.text || m.prompt || '',
                        src: m.src || m.image || '',
                        image: m.image || m.src || '',
                        userAns: m.userAns || m.choice || '',
                        ans: m.ans || m.correctAns || '',
                        correctAns: m.correctAns || m.ans || '',
                        prompt: m.prompt || 'Tajweed Rule Question',
                        categoryId: m.categoryId || m.rule || '',
                        explanation: m.explanation || ''
                    }, student.id);
                });
            }

            // Set as active student so teacher sees them immediately
            this.state.activeStudentId = student.id;
            this.save();
            return { student, record: entry };
        }

        getStudentHomeworks(studentId = null) {
            const student = studentId ? this.getStudent(studentId) : this.getActiveStudent();
            return (student && Array.isArray(student.homeworks)) ? student.homeworks : [];
        }

        // ================= TEACHER CONFIGURATION & CREATOR BRANDING =================

        getCreatorInfo() {
            return {
                name: 'Sheikh Gehad Elsayad',
                nameEn: 'Sheikh Gehad Elsayad',
                title: 'Creator & Supervisor of Tajweed Challenge',
                brandingText: 'Tajweed Challenge | Supervised & Developed by Sheikh Gehad Elsayad'
            };
        }

        getTeacherInfo() {
            try {
                const saved = localStorage.getItem('tajweed_teacher_info');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed && parsed.name) {
                        if (parsed.name.includes('جهاد') || parsed.name.includes('الصياد')) {
                            parsed.name = 'Sheikh Gehad Elsayad';
                        }
                        return parsed;
                    }
                }
            } catch (e) {}

            if (typeof window.APP_CONFIG !== 'undefined' && window.APP_CONFIG.getDefaultTeacher) {
                return window.APP_CONFIG.getDefaultTeacher();
            }
            return {
                name: 'Sheikh Gehad Elsayad',
                whatsapp: '+201099684126',
                email: 'gehadnagah789@gmail.com'
            };
        }

        saveTeacherInfo(info) {
            try {
                const current = this.getTeacherInfo();
                const updated = {
                    ...current,
                    name: (info.name || '').trim() || current.name,
                    whatsapp: (info.whatsapp || '').trim().replace(/[^\d+]/g, ''),
                    email: (info.email || '').trim()
                };
                localStorage.setItem('tajweed_teacher_info', JSON.stringify(updated));
                return updated;
            } catch (e) {
                console.error('Failed to save teacher info:', e);
                return this.getTeacherInfo();
            }
        }

        // ================= DAILY STREAK & CHALLENGE =================

        recordDailyPlay(studentId = null) {
            const id = studentId || this.state.activeStudentId;
            if (!id || !this.state.students[id]) return null;
            const student = this.state.students[id];

            if (!student.dailyStreak) {
                student.dailyStreak = { currentStreak: 0, lastPlayedDate: null, bestStreak: 0 };
            }

            const today = new Date().toISOString().slice(0, 10);
            const last = student.dailyStreak.lastPlayedDate;

            if (last === today) {
                return student.dailyStreak;
            }

            if (!last) {
                student.dailyStreak.currentStreak = 1;
            } else {
                const lastDate = new Date(last + 'T00:00:00');
                const todayDate = new Date(today + 'T00:00:00');
                const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    student.dailyStreak.currentStreak = (student.dailyStreak.currentStreak || 0) + 1;
                } else if (diffDays > 1) {
                    student.dailyStreak.currentStreak = 1;
                }
            }

            student.dailyStreak.lastPlayedDate = today;
            if (student.dailyStreak.currentStreak > (student.dailyStreak.bestStreak || 0)) {
                student.dailyStreak.bestStreak = student.dailyStreak.currentStreak;
            }

            this.save();
            return student.dailyStreak;
        }

        getDailyStreak(studentId = null) {
            const id = studentId || this.state.activeStudentId;
            if (!id || !this.state.students[id]) return { currentStreak: 0, lastPlayedDate: null, bestStreak: 0 };
            const student = this.state.students[id];
            if (!student.dailyStreak) {
                student.dailyStreak = { currentStreak: 0, lastPlayedDate: null, bestStreak: 0 };
            }

            const today = new Date().toISOString().slice(0, 10);
            const last = student.dailyStreak.lastPlayedDate;
            if (last && last !== today) {
                const lastDate = new Date(last + 'T00:00:00');
                const todayDate = new Date(today + 'T00:00:00');
                const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));
                if (diffDays > 1 && student.dailyStreak.currentStreak > 0) {
                    student.dailyStreak.currentStreak = 0;
                    this.save();
                }
            }

            return student.dailyStreak;
        }

        
        // ================= PERSISTENT BALANCE & WALLET =================

        addPoints(score = 0, stars = 0, studentId = null) {
            const id = studentId || this.state.activeStudentId;
            if (!id || !this.state.students[id]) return null;
            const student = this.state.students[id];

            if (!student.balance) {
                student.balance = { points: 0, stars: 0, dailyPoints: {}, weeklyPoints: {} };
            }

            const today = getTodayKey();
            const week = getWeekKey();

            student.balance.points = (student.balance.points || 0) + score;
            student.balance.stars = (student.balance.stars || 0) + stars;

            student.balance.dailyPoints = student.balance.dailyPoints || {};
            student.balance.weeklyPoints = student.balance.weeklyPoints || {};

            student.balance.dailyPoints[today] = (student.balance.dailyPoints[today] || 0) + score;
            student.balance.weeklyPoints[week] = (student.balance.weeklyPoints[week] || 0) + score;

            if (student.progress) {
                student.progress.totalScore = student.balance.points;
            }

            this.save();
            return student.balance;
        }

        recordSessionEnd(sessionData, studentId = null) {
            const id = studentId || this.state.activeStudentId;
            if (!id || !this.state.students[id]) return null;
            const student = this.state.students[id];

            const today = getTodayKey();
            const ruleKeys = sessionData.ruleKeys || [];
            const ruleTitles = sessionData.ruleTitles || [];

            // Update last session so next daily challenge continues from what was practiced in class!
            student.lastSession = {
                date: today,
                timestamp: Date.now(),
                ruleKeys: ruleKeys,
                ruleTitles: ruleTitles,
                totalQs: sessionData.totalQs || 0,
                isDailyChallenge: !!sessionData.isDailyChallenge
            };

            if (sessionData.isDailyChallenge) {
                this.recordDailyPlay(id);
            }

            return this.addPoints(sessionData.score || 0, sessionData.stars || 0, id);
        }

        getStudentBalance(studentId = null) {
            const id = studentId || this.state.activeStudentId;
            const student = this.getStudent(id);
            if (!student) return { points: 0, stars: 0, streak: 0, rankDaily: 1, rankWeekly: 1, rankAllTime: 1 };

            if (!student.balance) {
                student.balance = { points: 0, stars: 0, dailyPoints: {}, weeklyPoints: {} };
            }

            const today = getTodayKey();
            const week = getWeekKey();

            const lbAll = this.getLeaderboard('all');
            const lbWeek = this.getLeaderboard('week');
            const lbDaily = this.getLeaderboard('today');

            const rankAllTime = (lbAll.findIndex(r => r.id === id) + 1) || 1;
            const rankWeekly = (lbWeek.findIndex(r => r.id === id) + 1) || 1;
            const rankDaily = (lbDaily.findIndex(r => r.id === id) + 1) || 1;

            return {
                points: student.balance.points || (student.progress?.totalScore || 0),
                stars: student.balance.stars || 0,
                streak: student.dailyStreak?.currentStreak || 0,
                dailyPoints: student.balance.dailyPoints?.[today] || 0,
                weeklyPoints: student.balance.weeklyPoints?.[week] || 0,
                rankDaily,
                rankWeekly,
                rankAllTime
            };
        }

        // ================= DAILY CHALLENGE (BASED ON LAST LESSON) =================

        getDailyChallenge(studentId = null) {
            const id = studentId || this.state.activeStudentId;
            const student = this.getStudent(id);
            if (!student) return null;

            const bank = (typeof window.TAJWEED_BANK !== 'undefined') ? window.TAJWEED_BANK : {};
            let targetRuleKey = null;
            let targetRuleTitle = null;
            let lessonContext = '';

            // 1. First priority: Rules from student's last session / class lesson!
            if (student.lastSession && Array.isArray(student.lastSession.ruleKeys) && student.lastSession.ruleKeys.length > 0) {
                const recentKeys = student.lastSession.ruleKeys.filter(k => bank[k]);
                if (recentKeys.length > 0) {
                    targetRuleKey = recentKeys[Math.floor(Math.random() * recentKeys.length)];
                    targetRuleTitle = bank[targetRuleKey]?.title || student.lastSession.ruleTitles?.[0] || targetRuleKey;
                    lessonContext = `Based on your last lesson: ${targetRuleTitle} (بناءً على درسك الأخير في الحصة)`;
                }
            }

            // 2. Second priority: Latest homework assigned by teacher in class!
            if (!targetRuleKey && Array.isArray(student.homeworks) && student.homeworks.length > 0) {
                const latestHw = student.homeworks[student.homeworks.length - 1];
                if (latestHw.rules && latestHw.rules.length > 0) {
                    const hwKeys = latestHw.rules.filter(k => bank[k]);
                    if (hwKeys.length > 0) {
                        targetRuleKey = hwKeys[0];
                        targetRuleTitle = bank[targetRuleKey]?.title || targetRuleKey;
                        lessonContext = `Based on your last homework: ${targetRuleTitle} (بناءً على واجبك الأخير مع المعلم)`;
                    }
                }
            }

            // 3. Third priority: Weakest rule with mistakes
            if (!targetRuleKey && student.mistakes && student.mistakes.length > 0) {
                let maxMistakes = 0;
                const ruleCounts = {};
                student.mistakes.forEach(m => {
                    const r = m.ruleKey || m.categoryId || m.rule;
                    if (r && bank[r]) {
                        ruleCounts[r] = (ruleCounts[r] || 0) + 1;
                        if (ruleCounts[r] > maxMistakes) {
                            maxMistakes = ruleCounts[r];
                            targetRuleKey = r;
                        }
                    }
                });
                if (targetRuleKey && bank[targetRuleKey]) {
                    targetRuleTitle = bank[targetRuleKey]?.title || targetRuleKey;
                    lessonContext = `Remediating recent mistakes: ${targetRuleTitle} (معالجة وتثبيت أخطائك السابقة)`;
                }
            }

            // 4. Fallback: Foundational core Tajweed rule
            const availableKeys = Object.keys(bank);
            if (!targetRuleKey || !bank[targetRuleKey]) {
                const dayIndex = new Date().getDate() % (availableKeys.length || 1);
                targetRuleKey = availableKeys[dayIndex] || 'noon_sakinah_tanween';
                targetRuleTitle = bank[targetRuleKey]?.title || 'أحكام النون الساكنة والتنوين';
                lessonContext = `Daily Tajweed Mastery: ${targetRuleTitle} (تحدي التجويد اليومي الموجه)`;
            }

            const ruleObj = bank[targetRuleKey];
            if (!ruleObj) return null;

            let pool = [];
            if (Array.isArray(ruleObj.questions)) pool = pool.concat(ruleObj.questions);
            if (Array.isArray(ruleObj.examples)) pool = pool.concat(ruleObj.examples);
            if (ruleObj.subcategories) {
                Object.values(ruleObj.subcategories).forEach(sub => {
                    if (Array.isArray(sub.questions)) pool = pool.concat(sub.questions);
                    if (Array.isArray(sub.examples)) pool = pool.concat(sub.examples);
                });
            }

            if (pool.length === 0) {
                Object.values(bank).forEach(cat => {
                    if (Array.isArray(cat.questions)) pool = pool.concat(cat.questions);
                    if (Array.isArray(cat.examples)) pool = pool.concat(cat.examples);
                });
            }

            const questions = pool
                .map((q, idx) => ({
                    ...q,
                    id: q.id || (targetRuleKey + '_q_' + idx),
                    categoryId: targetRuleKey,
                    categoryTitle: targetRuleTitle
                }))
                .sort(() => 0.5 - Math.random())
                .slice(0, 5);

            return {
                ruleKey: targetRuleKey,
                ruleTitle: targetRuleTitle,
                lessonContext: lessonContext,
                questions: questions
            };
        }

        // ================= WIDESCREEN DAILY, WEEKLY & ALL-TIME LEADERBOARD =================

        getLeaderboard(period = 'all') {
            const today = getTodayKey();
            const week = getWeekKey();
            const activeId = this.state.activeStudentId;

            const allStudents = this.getAllStudents();
            const results = allStudents.map(std => {
                if (!std.balance) {
                    std.balance = {
                        points: std.progress?.totalScore || 0,
                        stars: 0,
                        dailyPoints: {},
                        weeklyPoints: {}
                    };
                }

                let starsCount = std.balance.stars || 0;
                if (starsCount === 0 && std.progress?.completedStages) {
                    Object.values(std.progress.completedStages).forEach(stg => {
                        starsCount += (stg.stars || 0);
                    });
                    std.balance.stars = starsCount;
                }

                let periodPoints = 0;
                if (period === 'today') {
                    periodPoints = std.balance.dailyPoints?.[today] || 0;
                } else if (period === 'week') {
                    periodPoints = std.balance.weeklyPoints?.[week] || 0;
                } else {
                    periodPoints = std.balance.points || (std.progress?.totalScore || 0);
                }

                let totalAcc = 0;
                let countAcc = 0;
                if (Array.isArray(std.homeworks)) {
                    std.homeworks.forEach(hw => {
                        if (hw.accuracy !== undefined) {
                            totalAcc += hw.accuracy;
                            countAcc++;
                        }
                    });
                }
                const avgAccuracy = countAcc > 0 ? Math.round(totalAcc / countAcc) : (periodPoints > 0 ? 90 : 0);

                return {
                    id: std.id,
                    name: std.name,
                    avatar: std.avatar || '🦁',
                    color: std.color || '#2563eb',
                    points: periodPoints,
                    allTimePoints: std.balance.points || 0,
                    stars: starsCount,
                    streak: std.dailyStreak?.currentStreak || 0,
                    accuracy: avgAccuracy,
                    isCurrent: std.id === activeId,
                    lastPlayed: std.dailyStreak?.lastPlayedDate || std.lastSession?.date || 'Today'
                };
            });

            // Also merge any local challenge scores
            try {
                const rawLb = localStorage.getItem('tajweed_challenge_v2');
                if (rawLb) {
                    const parsed = JSON.parse(rawLb);
                    if (Array.isArray(parsed.leaderboard)) {
                        parsed.leaderboard.forEach(entry => {
                            const exists = results.some(r => r.name.toLowerCase() === (entry.name || '').toLowerCase());
                            if (!exists && entry.name) {
                                results.push({
                                    id: 'legacy_' + entry.name,
                                    name: entry.name,
                                    avatar: entry.avatar || '👤',
                                    color: '#64748b',
                                    points: period === 'today' || period === 'week' ? Math.round((entry.score || 0) * 0.75) : (entry.score || 0),
                                    allTimePoints: entry.score || 0,
                                    stars: Math.max(1, Math.round((entry.score || 0) / 100)),
                                    streak: entry.streak || 0,
                                    accuracy: entry.acc || 85,
                                    isCurrent: false,
                                    lastPlayed: 'Recent'
                                });
                            }
                        });
                    }
                }
            } catch (e) {}

            // Sort descending by points -> stars -> accuracy -> streak
            results.sort((a, b) => b.points - a.points || b.stars - a.stars || b.accuracy - a.accuracy || b.streak - a.streak);

            // Assign rank numbers without slicing!
            return results.map((item, idx) => ({ ...item, rank: idx + 1 }));
        }

        // ================= PROGRESSION REWARDS & THEMES =================

        getUnlockedRewards(studentId = null) {
            const id = studentId || this.state.activeStudentId;
            const student = this.getStudent(id);
            const stages = (student && student.progress && student.progress.completedStages) || {};
            const clearedStagesCount = Object.values(stages).filter(s => s.stars >= 1).length;

            return {
                unlockedThemes: [
                    'ocean', // Default theme
                    ...(clearedStagesCount >= 3 ? ['emerald'] : []),
                    ...(clearedStagesCount >= 8 ? ['amber'] : []),
                    ...(clearedStagesCount >= 15 ? ['amethyst'] : []),
                    ...(clearedStagesCount >= 25 ? ['ruby'] : [])
                ],
                unlockedAvatars: [
                    '🦁', '🐯', '🌟', '🚀', // Base starters
                    ...(clearedStagesCount >= 3 ? ['🦅', '🐬', '🌸'] : []),
                    ...(clearedStagesCount >= 8 ? ['🎓', '👑', '⚡'] : []),
                    ...(clearedStagesCount >= 15 ? ['🏹', '💎', '🕌'] : []),
                    ...(clearedStagesCount >= 25 ? ['🌙', '📖', '🦚'] : [])
                ],
                clearedStagesCount
            };
        }

        setStudentTheme(themeName, studentId = null) {
            const id = studentId || this.state.activeStudentId;
            if (!id || !this.state.students[id]) return false;
            this.state.students[id].theme = themeName;
            this.save();
            if (id === this.state.activeStudentId) {
                this.applyTheme(themeName);
            }
            return true;
        }

        applyTheme(themeName) {
            if (typeof document !== 'undefined') {
                document.documentElement.setAttribute('data-theme', themeName || 'ocean');
            }
        }

        // ================= BACKUP & RESTORE =================

        exportData() {
            return JSON.stringify({
                version: 2,
                exportedAt: new Date().toISOString(),
                state: this.state
            }, null, 2);
        }

        importData(jsonString) {
            try {
                const parsed = JSON.parse(jsonString);
                const stateData = parsed.state || parsed;
                if (stateData && stateData.students && typeof stateData.students === 'object') {
                    this.state = stateData;
                    this.save();
                    return { success: true, count: Object.keys(this.state.students).length };
                }
                return { success: false, error: 'Invalid backup format' };
            } catch (e) {
                return { success: false, error: e.message };
            }
        }

        // ================= REACTIVE SUBSCRIPTION =================

        subscribe(listener) {
            if (typeof listener === 'function') {
                this.listeners.push(listener);
            }
        }

        unsubscribe(listener) {
            this.listeners = this.listeners.filter(l => l !== listener);
        }

        notify() {
            const active = this.getActiveStudent();
            this.listeners.forEach(fn => {
                try { fn(active, this.state); } catch (e) { console.error(e); }
            });

            // Dispatch DOM events for components
            if (typeof window !== 'undefined' && window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('studentChanged', { detail: { activeStudent: active } }));
                window.dispatchEvent(new CustomEvent('progressUpdated', { detail: { progress: active ? active.progress : null } }));
            }
        }
    }

    window.StudentEngine = new StudentEngineClass();

})(typeof window !== 'undefined' ? window : global);
