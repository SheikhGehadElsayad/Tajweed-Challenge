function readStorage(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } }
        function writeStorage(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
        function getLeaderboard() { return readStorage(LOCAL_STORAGE_KEY, { leaderboard: [] }).leaderboard; }
        function saveScore(name, score, acc, streak, avatar) {
            let data = readStorage(LOCAL_STORAGE_KEY, { leaderboard: [] }); let lb = data.leaderboard;
            const existingIdx = lb.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
            if (existingIdx > -1) { if (score > lb[existingIdx].score) lb[existingIdx] = { name, score, acc, streak, avatar }; } 
            else { lb.push({ name, score, acc, streak, avatar }); }
            lb.sort((a, b) => b.score - a.score || b.acc - a.acc || b.streak - a.streak);
            data.leaderboard = lb.slice(0, 10);
            writeStorage(LOCAL_STORAGE_KEY, data);
        }
        
