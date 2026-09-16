/**
 * Game State Management & Session Lifecycle
 * Core Layer: Decoupled State
 */

(function(window) {
    'use strict';

    const LOCAL_STORAGE_KEY = 'tajweed_app_state';

    const initialSession = () => ({
        isPracticeMode: false,
        isDailyChallenge: false,
        dailyChallengeInfo: null,
        studentName: "",
        studentAvatar: null,
        playlist: [], 
        playHead: 0,
        score: 0, 
        coins: 0, 
        stars: 0, 
        streak: 0, 
        bestStreak: 0,
        responses: [],
        startTime: 0, 
        endTime: 0,
        currentModifiers: { golden: false, trap: false }
    });

    let session = initialSession();
    let TIME_LIMIT = 20;
    let timeLeft = 0;
    let timerInterval = null;
    let isAnswering = false;
    let hasShield = false;
    let isFrozen = false;
    let isMuted = false;
    let totalAvailableQuestions = 0;
    let isGamePaused = false;
    let pausedTimeLeft = 0;
    let isHomeworkMode = false;
    let isProgressiveMode = false;
    let progressiveLevelIndex = 0;

    const GameState = {
        LOCAL_STORAGE_KEY,
        
        get session() { return session; },
        set session(val) { session = val; },

        get TIME_LIMIT() { return TIME_LIMIT; },
        set TIME_LIMIT(val) { TIME_LIMIT = val; },

        get timeLeft() { return timeLeft; },
        set timeLeft(val) { timeLeft = val; },

        get timerInterval() { return timerInterval; },
        set timerInterval(val) { timerInterval = val; },

        get isAnswering() { return isAnswering; },
        set isAnswering(val) { isAnswering = val; },

        get hasShield() { return hasShield; },
        set hasShield(val) { hasShield = val; },

        get isFrozen() { return isFrozen; },
        set isFrozen(val) { isFrozen = val; },

        get isMuted() { return isMuted; },
        set isMuted(val) { isMuted = val; },

        get isGamePaused() { return isGamePaused; },
        set isGamePaused(val) { isGamePaused = val; },

        get isHomeworkMode() { return isHomeworkMode; },
        set isHomeworkMode(val) { isHomeworkMode = val; },

        get isProgressiveMode() { return isProgressiveMode; },
        set isProgressiveMode(val) { isProgressiveMode = val; },

        resetSession() {
            session = initialSession();
            return session;
        }
    };

    // Expose directly to window for vanilla layer compatibility
    window.LOCAL_STORAGE_KEY = LOCAL_STORAGE_KEY;
    window.session = session;
    window.TIME_LIMIT = TIME_LIMIT;
    window.timeLeft = timeLeft;
    window.timerInterval = timerInterval;
    window.isAnswering = isAnswering;
    window.hasShield = hasShield;
    window.isFrozen = isFrozen;
    window.isMuted = isMuted;
    window.totalAvailableQuestions = totalAvailableQuestions;
    window.isGamePaused = isGamePaused;
    window.pausedTimeLeft = pausedTimeLeft;
    window.isHomeworkMode = isHomeworkMode;
    window.isProgressiveMode = isProgressiveMode;
    window.progressiveLevelIndex = progressiveLevelIndex;
    window.GameState = GameState;

})(typeof window !== 'undefined' ? window : this);
