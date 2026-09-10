/* =========================================================
   GAME CENTER AUDIO ENGINE (Web Audio API Synthesizer)
   100% Zero-Dependency Interactive Sound Effects
========================================================= */

const GC_AUDIO = {
    audioCtx: null,
    isMuted: false,
    volume: 1.0,
    currentQuestionAudio: null,

    getAudioContext() {
        try {
            if (!this.audioCtx) {
                this.audioCtx = window.audioCtx || new (window.AudioContext || window.webkitAudioContext)();
                window.audioCtx = this.audioCtx;
            }
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume().catch(() => {});
            }
            return this.audioCtx;
        } catch(e) {
            return null;
        }
    },

    init() {
        this.getAudioContext();
    },

    resume() {
        try {
            const ctx = this.getAudioContext();
            if (ctx && ctx.state === 'suspended') {
                ctx.resume().catch(() => {});
            }
        } catch(e) {}
    },

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.currentQuestionAudio && this.isMuted) {
            this.currentQuestionAudio.pause();
        }
        return this.isMuted;
    },

    playTone(freqs, type = 'sine', dur = 0.25, vol = 0.35) {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const t = ctx.currentTime;
            const actualVol = Math.max(vol * this.volume, 0.05);

            freqs.forEach((f, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type;

                const startT = t + i * 0.05;
                const endT = startT + dur;
                osc.frequency.setValueAtTime(f, startT);

                gain.gain.setValueAtTime(0.0001, startT);
                gain.gain.linearRampToValueAtTime(actualVol, startT + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, endT);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startT);
                osc.stop(endT + 0.05);
            });
        } catch(e) {}
    },

    playNoise(dur = 0.15, vol = 0.35, filterFreq = 2500) {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const bufferSize = Math.max(Math.floor(ctx.sampleRate * dur), 256);
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = filterFreq;

            const gain = ctx.createGain();
            const t = ctx.currentTime;
            const actualVol = Math.max(vol * this.volume, 0.05);
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(actualVol, t + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(t);
            noise.stop(t + dur + 0.02);
        } catch(e) {}
    },

    // Specific Sound FX definitions
    sfx: {
        click() { GC_AUDIO.playTone([620, 840], 'sine', 0.09, 0.35); },
        cardFlip() { GC_AUDIO.playNoise(0.12, 0.35, 4000); GC_AUDIO.playTone([480, 680], 'sine', 0.14, 0.25); },
        correct() { GC_AUDIO.playTone([523, 659, 784, 1046], 'sine', 0.45, 0.45); },
        wrong() { GC_AUDIO.playTone([260, 200, 140], 'sawtooth', 0.35, 0.35); },
        
        // Basketball
        basketballBounce() {
            GC_AUDIO.playTone([160, 90], 'sine', 0.18, 0.35);
            GC_AUDIO.playNoise(0.08, 0.2, 800);
        },
        basketballSwish() {
            GC_AUDIO.playNoise(0.35, 0.3, 4000);
            GC_AUDIO.playTone([800, 1200], 'sine', 0.2, 0.15);
        },

        // Bowling
        bowlingRoll() {
            GC_AUDIO.playNoise(0.8, 0.18, 500);
        },
        bowlingPins() {
            GC_AUDIO.playNoise(0.4, 0.4, 3500);
            GC_AUDIO.playTone([300, 500, 750, 420], 'square', 0.3, 0.2);
        },
        strike() {
            GC_AUDIO.playNoise(0.5, 0.5, 4000);
            GC_AUDIO.playTone([523, 659, 784, 1046, 1318], 'sine', 0.6, 0.3);
        },

        // Soccer
        soccerKick() {
            GC_AUDIO.playTone([180, 120], 'sine', 0.15, 0.4);
            GC_AUDIO.playNoise(0.1, 0.25, 1200);
        },
        soccerGoal() {
            GC_AUDIO.playTone([880, 1100, 880, 1100], 'sine', 0.4, 0.3);
            setTimeout(() => {
                GC_AUDIO.playNoise(0.8, 0.3, 2000);
                GC_AUDIO.playTone([523, 659, 784, 1046], 'triangle', 0.6, 0.25);
            }, 250);
        },

        // Snakes & Ladders
        diceRoll() {
            for (let i = 0; i < 4; i++) {
                setTimeout(() => GC_AUDIO.playNoise(0.06, 0.2, 2500), i * 70);
            }
        },
        diceStep() {
            GC_AUDIO.playTone([700, 900], 'sine', 0.1, 0.15);
        },
        ladderClimb() {
            [400, 500, 600, 700, 800, 900].forEach((f, i) => {
                setTimeout(() => GC_AUDIO.playTone([f], 'sine', 0.12, 0.2), i * 60);
            });
        },
        snakeSlide() {
            [800, 700, 600, 500, 400, 300].forEach((f, i) => {
                setTimeout(() => GC_AUDIO.playTone([f], 'sawtooth', 0.12, 0.15), i * 70);
            });
        },

        // Balloons
        balloonPump() {
            GC_AUDIO.playNoise(0.15, 0.18, 1500);
            GC_AUDIO.playTone([350, 480], 'sine', 0.15, 0.15);
        },
        balloonPop() {
            GC_AUDIO.playNoise(0.2, 0.45, 5000);
            GC_AUDIO.playTone([280, 100], 'sine', 0.15, 0.3);
        },

        // Memory Match
        cardMatch() {
            GC_AUDIO.playTone([600, 800, 1000], 'sine', 0.35, 0.25);
        },

        // Treasure Hunt
        chestOpen() {
            GC_AUDIO.playTone([523, 659, 784, 1046, 1318, 1568], 'sine', 0.7, 0.3);
        },
        gemCollect() {
            GC_AUDIO.playTone([1200, 1500], 'sine', 0.2, 0.25);
        },

        // Racing
        engineRev() {
            GC_AUDIO.playTone([140, 220, 320], 'sawtooth', 0.4, 0.25);
        },
        turboBoost() {
            GC_AUDIO.playNoise(0.4, 0.3, 3000);
            GC_AUDIO.playTone([300, 600, 1200], 'sine', 0.4, 0.25);
        },

        // Universal Rewards
        coin() {
            GC_AUDIO.playTone([987, 1318], 'sine', 0.25, 0.25);
        },
        powerup() {
            [440, 554, 659, 880, 1108].forEach((f, i) => {
                setTimeout(() => GC_AUDIO.playTone([f], 'sine', 0.15, 0.2), i * 50);
            });
        },
        celebration() {
            [523, 659, 784, 1046, 1318].forEach((f, i) => {
                setTimeout(() => GC_AUDIO.playTone([f], 'sine', 0.3, 0.3), i * 80);
            });
        }
    },

    // Convenient direct shortcut methods called throughout games
    playClick() { try { this.sfx.click(); } catch(e){} },
    playCardFlip() { try { this.sfx.cardFlip(); } catch(e){} },
    playCorrect() { try { this.sfx.correct(); } catch(e){} },
    playWrong() { try { this.sfx.wrong(); } catch(e){} },
    playBounce() { try { this.sfx.basketballBounce(); } catch(e){} },
    playSwish() { try { this.sfx.basketballSwish(); } catch(e){} },
    playPinsHit() { try { this.sfx.bowlingPins(); } catch(e){} },
    playStrike() { try { this.sfx.strike(); } catch(e){} },
    playKick() { try { this.sfx.soccerKick(); } catch(e){} },
    playGoal() { try { this.sfx.soccerGoal(); } catch(e){} },
    playDiceRoll() { try { this.sfx.diceRoll(); } catch(e){} },
    playDiceStep() { try { this.sfx.diceStep(); } catch(e){} },
    playLadder() { try { this.sfx.ladderClimb(); } catch(e){} },
    playSnake() { try { this.sfx.snakeSlide(); } catch(e){} },
    playBalloonPump() { try { this.sfx.balloonPump(); } catch(e){} },
    playBalloonPop() { try { this.sfx.balloonPop(); } catch(e){} },
    playCardMatch() { try { this.sfx.cardMatch(); } catch(e){} },
    playChestOpen() { try { this.sfx.chestOpen(); } catch(e){} },
    playGemCollect() { try { this.sfx.gemCollect(); } catch(e){} },
    playEngineRev() { try { this.sfx.engineRev(); } catch(e){} },
    playTurbo() { try { this.sfx.turboBoost(); } catch(e){} },
    playCoins() { try { this.sfx.coin(); } catch(e){} },
    playPowerup() { try { this.sfx.powerup(); } catch(e){} },
    playFanfare() { try { this.sfx.celebration(); } catch(e){} },
    playTick() { try { this.playTone([800], 'sine', 0.05, 0.1); } catch(e){} },

    // Play Quranic recitation pronunciation from existing audio bank
    playRecitation(src) {
        if (this.isMuted || !src) return;
        try {
            if (this.currentQuestionAudio) {
                this.currentQuestionAudio.pause();
                this.currentQuestionAudio = null;
            }

            const parts = src.split('/');
            const fullName = parts[parts.length - 1];
            const baseName = fullName.substring(0, fullName.lastIndexOf('.')) || fullName;

            const exts = ['mp3', 'webm', 'wav', 'm4a', 'ogg'];
            let found = false;
            const self = this;

            function tryExt(idx) {
                if (idx >= exts.length || found) return;
                const ext = exts[idx];
                const audio = new Audio(`audio/${baseName}.${ext}`);
                audio.preload = 'auto';
                audio.onloadeddata = () => {
                    if (found || self.isMuted) return;
                    found = true;
                    self.currentQuestionAudio = audio;
                    audio.play().catch(() => {});
                };
                audio.onerror = () => tryExt(idx + 1);
                audio.load();
            }
            tryExt(0);
        } catch(e) {}
    },

    // Stop recitation audio immediately
    stopRecitation() {
        try {
            if (this.currentQuestionAudio) {
                this.currentQuestionAudio.pause();
                this.currentQuestionAudio.currentTime = 0;
                this.currentQuestionAudio = null;
            }
        } catch(e) {}
    }
};

// Expose globally on window for all scripts
if (typeof window !== 'undefined') {
    window.GC_AUDIO = GC_AUDIO;
    const unlockAudio = () => {
        try {
            GC_AUDIO.resume();
        } catch(e) {}
    };
    ['click', 'pointerdown', 'touchstart', 'keydown'].forEach(evt => {
        window.addEventListener(evt, unlockAudio, { passive: true });
    });
}
