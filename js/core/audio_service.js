/**
 * Audio Synthesis & Sound Effects Service
 * Core Layer: Pure Audio Management
 */

(function(window) {
    'use strict';

    let audioCtx = null;

    function initAudio() {
        try {
            if (!audioCtx) {
                audioCtx = window.audioCtx || new (window.AudioContext || window.webkitAudioContext)();
                window.audioCtx = audioCtx;
            }
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume().catch(() => {});
            }
            return audioCtx;
        } catch(e) {
            return null;
        }
    }

    function playTone(freqs, type = 'sine', dur = 0.25, vol = 0.3) {
        if (typeof window.isMuted !== 'undefined' && window.isMuted) return;
        try {
            const ctx = initAudio();
            if (!ctx) return;
            const t = ctx.currentTime;

            freqs.forEach((f, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.type = type;
                o.frequency.value = f;
                g.gain.setValueAtTime(0, t + i * 0.05);
                g.gain.linearRampToValueAtTime(vol, t + i * 0.05 + 0.05);
                g.gain.exponentialRampToValueAtTime(0.01, t + dur);
                o.connect(g);
                g.connect(ctx.destination);
                o.start(t + i * 0.05);
                o.stop(t + dur);
            });
        } catch(e) {}
    }

    const SFX = {
        click: () => { try { playTone([600], 'sine', 0.1, 0.1); } catch(e){} },
        wrong: () => { try { playTone([200, 150], 'sawtooth', 0.4, 0.2); } catch(e){} },
        tick: () => { try { playTone([800], 'sine', 0.05, 0.05); } catch(e){} },
        tickTock: () => {
            if (typeof window.isMuted !== 'undefined' && window.isMuted) return;
            try {
                const ctx = initAudio();
                if (!ctx) return;
                const t = ctx.currentTime;
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime((typeof window.timeLeft !== 'undefined' && window.timeLeft % 2 === 0) ? 800 : 600, t);
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.05, t + 0.01);
                g.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
                osc.connect(g);
                g.connect(ctx.destination);
                osc.start(t);
                osc.stop(t + 0.1);
            } catch(e){}
        },
        alarm: () => {
            if (typeof window.isMuted !== 'undefined' && window.isMuted) return;
            try {
                const ctx = initAudio();
                if (!ctx) return;
                const t = ctx.currentTime;
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(900, t);
                osc.frequency.setValueAtTime(1200, t + 0.1);
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.1, t + 0.02);
                g.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
                osc.connect(g);
                g.connect(ctx.destination);
                osc.start(t);
                osc.stop(t + 0.2);
            } catch(e){}
        },
        ting: () => {
            if (typeof window.isMuted !== 'undefined' && window.isMuted) return;
            try {
                const ctx = initAudio();
                if (!ctx) return;
                const t = ctx.currentTime;
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, t);
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.5, t + 0.01);
                g.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
                osc.connect(g);
                g.connect(ctx.destination);
                osc.start(t);
                osc.stop(t + 0.5);
            } catch(e){}
        },
        applause: () => {
            if (typeof window.isMuted !== 'undefined' && window.isMuted) return;
            try {
                const ctx = initAudio();
                if (!ctx) return;
                const duration = 1.5;
                const bufferSize = ctx.sampleRate * duration;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const bandpass = ctx.createBiquadFilter();
                bandpass.type = 'bandpass';
                bandpass.frequency.value = 1000;
                bandpass.Q.value = 0.5;
                const gainNode = ctx.createGain();
                gainNode.gain.setValueAtTime(0, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
                noise.connect(bandpass);
                bandpass.connect(gainNode);
                gainNode.connect(ctx.destination);
                noise.start();
            } catch(e) {}
        },
        celebrateStreak10: () => {
            if (typeof window.isMuted !== 'undefined' && window.isMuted) return;
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
                    utterance.pitch = 1.1;
                    window.speechSynthesis.speak(utterance);
                }
            } catch(e) {}
        }
    };

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
        if (typeof window.session !== 'undefined' && window.session && window.session.playlist) {
            window.session.playlist.forEach(item => {
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

    window.initAudio = initAudio;
    window.playTone = playTone;
    window.SFX = SFX;
    window.stopAllActiveAudio = stopAllActiveAudio;

})(typeof window !== 'undefined' ? window : this);
