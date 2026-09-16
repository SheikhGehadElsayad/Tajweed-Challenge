/**
 * Storage Service
 * Core Layer: LocalStorage Wrapper & Leaderboard Persistence
 */

(function(window) {
    'use strict';

    const STORAGE_KEY = window.LOCAL_STORAGE_KEY || 'tajweed_app_state';

    function readStorage(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch(e) {
            return fallback;
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch(e) {
            console.warn("Storage quota exceeded or storage disabled:", e);
            return false;
        }
    }

    function getLeaderboard(period = 'all') {
        if (typeof window.StudentEngine !== 'undefined' && typeof window.StudentEngine.getLeaderboard === 'function') {
            return window.StudentEngine.getLeaderboard(period);
        }
        return readStorage(STORAGE_KEY, { leaderboard: [] }).leaderboard || [];
    }

    function saveScore(name, score, acc, streak, avatar) {
        let data = readStorage(STORAGE_KEY, { leaderboard: [] });
        let lb = data.leaderboard || [];
        const existingIdx = lb.findIndex(p => p.name && p.name.toLowerCase() === (name || '').toLowerCase());
        
        if (existingIdx > -1) {
            if (score > lb[existingIdx].score) {
                lb[existingIdx] = { name, score, acc, streak, avatar, date: Date.now() };
            }
        } else {
            lb.push({ name, score, acc, streak, avatar, date: Date.now() });
        }

        lb.sort((a, b) => b.score - a.score || b.acc - a.acc || b.streak - a.streak);
        data.leaderboard = lb;
        writeStorage(STORAGE_KEY, data);

        if (typeof window.StudentEngine !== 'undefined' && typeof window.StudentEngine.addPoints === 'function') {
            const earnedStars = acc >= 100 ? 3 : acc >= 80 ? 2 : acc >= 60 ? 1 : 0;
            window.StudentEngine.addPoints(score, earnedStars);
        }
    }

    window.readStorage = readStorage;
    window.writeStorage = writeStorage;
    window.getLeaderboard = getLeaderboard;
    window.saveScore = saveScore;

    window.StorageService = {
        read: readStorage,
        write: writeStorage,
        getLeaderboard,
        saveScore
    };

})(typeof window !== 'undefined' ? window : this);
