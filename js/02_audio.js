let TIME_LIMIT = 20;
const LOCAL_STORAGE_KEY = 'tajweed_app_state';

let session = {
    isPracticeMode: false,
    studentName: "",
    playlist: [], 
    playHead: 0,
    score: 0, coins: 0, stars: 0, streak: 0, bestStreak: 0,
    responses: [],
    startTime: 0, endTime: 0,
    currentModifiers: { golden: false, trap: false }
};

let timeLeft = 0, timerInterval = null;
let isAnswering = false, hasShield = false, isFrozen = false, isMuted = false;
let totalAvailableQuestions = 0;

const mascots = { idle: '😃', happy: '🤩', sad: '😢', boss: '😎', frozen: '🥶' };

let audioCtx;
function initAudio() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    } catch(e) {}
}

function playTone(freqs, type, dur, vol) { 
    if (typeof isMuted !== 'undefined' && isMuted) return;
    try { 
        initAudio(); 
        if (!audioCtx) return;
        const t = audioCtx.currentTime; 
        freqs.forEach((f, i) => { 
            const o = audioCtx.createOscillator(); 
            const g = audioCtx.createGain(); 
            o.type = type; 
            o.frequency.value = f; 
            g.gain.setValueAtTime(0, t + i*0.05); 
            g.gain.linearRampToValueAtTime(vol, t + i*0.05 + 0.05); 
            g.gain.exponentialRampToValueAtTime(0.01, t + dur); 
            o.connect(g); g.connect(audioCtx.destination); 
            o.start(t+i*0.05); o.stop(t+dur); 
        }); 
    } catch(e){} 
}
        
const SFX = { 
    click: () => { try { playTone([600], 'sine', 0.1, 0.1); } catch(e){} }, 
    wrong: () => { try { playTone([200, 150], 'sawtooth', 0.4, 0.2); } catch(e){} }, 
    tick: () => { try { playTone([800], 'sine', 0.05, 0.05); } catch(e){} }, 
    tickTock: () => {
        if (typeof isMuted !== 'undefined' && isMuted) return;
        try {
            initAudio(); if (!audioCtx) return; const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator(); const g = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime((typeof timeLeft !== 'undefined' && timeLeft % 2 === 0) ? 800 : 600, t);
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.05, t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
            osc.connect(g); g.connect(audioCtx.destination);
            osc.start(t); osc.stop(t + 0.1);
        } catch(e){}
    },
    alarm: () => {
        if (typeof isMuted !== 'undefined' && isMuted) return;
        try {
            initAudio(); if (!audioCtx) return; const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator(); const g = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(900, t);
            osc.frequency.setValueAtTime(1200, t + 0.1);
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.1, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
            osc.connect(g); g.connect(audioCtx.destination);
            osc.start(t); osc.stop(t + 0.2);
        } catch(e){}
    }, 
    ting: () => {
        if (typeof isMuted !== 'undefined' && isMuted) return;
        try {
            initAudio(); if (!audioCtx) return; const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator(); const g = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, t);
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.5, t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
            osc.connect(g); g.connect(audioCtx.destination);
            osc.start(t); osc.stop(t + 0.5);
        } catch(e){}
    },
    applause: () => {
        if (typeof isMuted !== 'undefined' && isMuted) return;
        try {
            initAudio(); if (!audioCtx) return;
            const duration = 1.5;
            const bufferSize = audioCtx.sampleRate * duration;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            const bandpass = audioCtx.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.value = 1000;
            bandpass.Q.value = 0.5;
            const gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
            noise.connect(bandpass); bandpass.connect(gainNode); gainNode.connect(audioCtx.destination);
            noise.start();
        } catch(e) {}
    },
    celebrateStreak10: () => {
        if (typeof isMuted !== 'undefined' && isMuted) return;
        try {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const celebrationLines = [
                    "Wow, ten in a row! You're a Tajweed star!",
                    "Incredible streak! Ten correct answers in a row!",
                    "Ten out of ten streak! You are truly mastering Tajweed!",
                    "Unbelievable focus! That's a perfect ten streak!"
                ];
                const line = celebrationLines[Math.floor(Math.random() * celebrationLines.length)];
                const utterance = new SpeechSynthesisUtterance(line);
                utterance.lang = 'en-US';
                utterance.rate = 1.0;
                utterance.pitch = 1.1; // cheerful, friendly mascot tone
                window.speechSynthesis.speak(utterance);
            }
        } catch(e) {}
    }
};

// Universal Audio & Speech Stopper (ensures audio immediately ceases when navigating to next question)
function stopAllActiveAudio() {
    clearTimeout(window._audioPlayTimeout);
    clearTimeout(window.autoAdvanceTimer);
    if (window.currentPlayingAudio) {
        try {
            window.currentPlayingAudio.pause();
            window.currentPlayingAudio.currentTime = 0;
        } catch(e) {}
        window.currentPlayingAudio = null;
    }
    if (typeof session !== 'undefined' && session && session.playlist) {
        session.playlist.forEach(item => {
            if (item && item._audioObj) {
                try {
                    item._audioObj.pause();
                    item._audioObj.currentTime = 0;
                } catch(e) {}
            }
        });
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch(e) {}
    }
    if (typeof window !== 'undefined' && window.GC_AUDIO && typeof window.GC_AUDIO.stopRecitation === 'function') {
        try { window.GC_AUDIO.stopRecitation(); } catch(e) {}
    }
}
window.stopAllActiveAudio = stopAllActiveAudio;

        // Utilities
        
