/**
 * Interactive Talking Companion: "Farida"
 * Tajweed Challenge - Educational Companion
 *
 * Provides contextual pedagogical encouragement, English Tajweed tips,
 * feedback on correct/incorrect answers, and celebrations on streaks.
 */

(function(window) {
    'use strict';

    const PHRASES = {
        happy: [
            'Brilliant! Accurate Tajweed application! 🌟',
            'Well done! Masha\'Allah, excellent recitation! 👏',
            'Spot on! That is the correct Tajweed rule! ✨',
            'Keep going! Your pronunciation is sharp! 🎯',
            'Masha\'Allah! Perfect understanding! 💡'
        ],
        sad: [
            'Good try! Pay close attention to the letter and vowel! 💪',
            'Mistakes help us master Quranic rules. Review and retry! 📖',
            'Focus on the letter\'s articulation point (Makhraj)! 🌱',
            'Take your time! Accuracy comes with calm reflection! 🤲',
            'Almost there! Check the Sakinah or Tanween carefully! 🌟'
        ],
        streak: [
            'Unstoppable streak! Masha\'Allah, golden accuracy! 🔥',
            'Superb focus and consecutive correct answers! ⚡',
            'Your momentum is outstanding today! Keep it up! 🚀'
        ],
        frozen: [
            'Time is frozen! Take a breath, read calmly and choose! ❄️'
        ],
        shield: [
            'Shield active! Answer with complete confidence! 🛡️'
        ],
        hint: [
            'Check the golden hint: focus on letters right after the Noon! 💡'
        ],
        clear: [
            'Congratulations! Masha\'Allah, stage cleared with excellence! 🏆',
            'Fantastic achievement! Honoring the Quran with every rule! 👑'
        ],
        idle: [
            'Welcome! I\'m Farida, your Tajweed learning companion! 📖',
            'Read the verse carefully and identify the Tajweed rule! 🤲',
            'Tajweed beautifies your recitation. Let\'s master it together! ✨'
        ]
    };

    const SVG_FACES = {
        idle: `
            <svg viewBox="0 0 100 100" class="farida-svg">
                <defs>
                    <radialGradient id="faridaGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#fed7aa" stop-opacity="0.9"/>
                        <stop offset="70%" stop-color="#f472b6" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#ec4899" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <!-- Soft Aura -->
                <circle cx="50" cy="50" r="46" fill="url(#faridaGlow)"/>
                <!-- Cheerful Face Base -->
                <circle cx="50" cy="50" r="38" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5"/>
                <!-- Hair / Headscarf Accent -->
                <path d="M 20 45 C 20 22, 80 22, 80 45 C 80 32, 68 18, 50 18 C 32 18, 20 32, 20 45 Z" fill="#0284c7"/>
                <circle cx="50" cy="18" r="4" fill="#38bdf8"/>
                <!-- Friendly Warm Eyes -->
                <circle cx="39" cy="48" r="4" fill="#1e293b"/>
                <circle cx="61" cy="48" r="4" fill="#1e293b"/>
                <circle cx="37.5" cy="46.5" r="1.5" fill="#ffffff"/>
                <circle cx="59.5" cy="46.5" r="1.5" fill="#ffffff"/>
                <!-- Cute Rosy Cheeks -->
                <ellipse cx="31" cy="55" rx="4.5" ry="2.8" fill="#f43f5e" opacity="0.65"/>
                <ellipse cx="69" cy="55" rx="4.5" ry="2.8" fill="#f43f5e" opacity="0.65"/>
                <!-- Gentle Smile -->
                <path d="M 43 56 Q 50 64 57 56" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                <!-- Bookmark / Pin -->
                <path d="M 68 28 L 74 18 L 80 28 L 74 25 Z" fill="#f59e0b"/>
            </svg>
        `,
        happy: `
            <svg viewBox="0 0 100 100" class="farida-svg">
                <circle cx="50" cy="50" r="48" fill="#fef08a" opacity="0.9"/>
                <circle cx="50" cy="50" r="38" fill="#fef3c7" stroke="#10b981" stroke-width="2.5"/>
                <path d="M 20 45 C 20 22, 80 22, 80 45 C 80 32, 68 18, 50 18 C 32 18, 20 32, 20 45 Z" fill="#059669"/>
                <!-- Joyful Curved Eyes -->
                <path d="M 34 49 Q 39 42 44 49" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M 56 49 Q 61 42 66 49" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
                <!-- Happy Open Smile -->
                <path d="M 41 55 Q 50 68 59 55 Z" fill="#e11d48" stroke="#1e293b" stroke-width="1.8"/>
                <ellipse cx="50" cy="62" rx="4.5" ry="2.5" fill="#fda4af"/>
                <!-- Cheeks -->
                <circle cx="30" cy="54" r="4.5" fill="#f43f5e" opacity="0.75"/>
                <circle cx="70" cy="54" r="4.5" fill="#f43f5e" opacity="0.75"/>
                <text x="14" y="28" font-size="14">✨</text>
                <text x="74" y="28" font-size="14">✨</text>
            </svg>
        `,
        sad: `
            <svg viewBox="0 0 100 100" class="farida-svg">
                <circle cx="50" cy="50" r="46" fill="#fed7aa" opacity="0.8"/>
                <circle cx="50" cy="50" r="38" fill="#fef3c7" stroke="#94a3b8" stroke-width="2.5"/>
                <path d="M 20 45 C 20 22, 80 22, 80 45 C 80 32, 68 18, 50 18 C 32 18, 20 32, 20 45 Z" fill="#64748b"/>
                <!-- Concerned/Reflective Eyes -->
                <circle cx="39" cy="50" r="3.8" fill="#1e293b"/>
                <circle cx="61" cy="50" r="3.8" fill="#1e293b"/>
                <path d="M 34 43 L 43 46" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M 66 43 L 57 46" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                <!-- Gentle Encouraging Small Curve -->
                <path d="M 44 61 Q 50 56 56 61" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="71" cy="52" r="2.5" fill="#38bdf8"/>
            </svg>
        `,
        frozen: `
            <svg viewBox="0 0 100 100" class="farida-svg">
                <circle cx="50" cy="50" r="48" fill="#bae6fd" opacity="0.9"/>
                <circle cx="50" cy="50" r="38" fill="#f0f9ff" stroke="#0284c7" stroke-width="2.5"/>
                <path d="M 20 45 C 20 22, 80 22, 80 45 C 80 32, 68 18, 50 18 C 32 18, 20 32, 20 45 Z" fill="#0284c7"/>
                <circle cx="39" cy="48" r="4.5" fill="#0369a1"/>
                <circle cx="61" cy="48" r="4.5" fill="#0369a1"/>
                <circle cx="38" cy="46.5" r="1.5" fill="#ffffff"/>
                <circle cx="60" cy="46.5" r="1.5" fill="#ffffff"/>
                <circle cx="50" cy="60" r="4" fill="#0284c7"/>
                <text x="14" y="28" font-size="14">❄️</text>
                <text x="74" y="28" font-size="14">❄️</text>
            </svg>
        `
    };

    class FaridaMascotController {
        constructor() {
            this.container = null;
            this.faceEl = null;
            this.bubbleEl = null;
            this.textEl = null;
            this.currentState = 'idle';
            this.hideTimeout = null;
            this.isEnabled = localStorage.getItem('tajweed_farida_enabled') !== 'false';
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.injectUI());
            } else {
                this.injectUI();
            }
        }

        injectUI() {
            if (document.getElementById('farida-mascot-widget')) return;

            const widget = document.createElement('aside');
            widget.id = 'farida-mascot-widget';
            widget.className = 'farida-mascot-container';
            widget.setAttribute('aria-label', 'Farida - Tajweed Study Companion');

            widget.innerHTML = `
                <button type="button" class="farida-avatar-btn" id="farida-avatar-btn" title="Farida - Tajweed Study Companion (Click for tips!)" aria-label="Farida Tajweed Companion">
                    <div id="farida-face-wrapper" class="farida-face-wrapper">
                        ${SVG_FACES.idle}
                    </div>
                </button>
                <div class="farida-speech-bubble" id="farida-speech-bubble" dir="ltr">
                    <span class="farida-mascot-name">Farida 💡</span>
                    <p id="farida-speech-text" class="farida-text">Welcome! I'm Farida, your Tajweed learning companion! 📖</p>
                </div>
            `;

            document.body.appendChild(widget);

            this.container = widget;
            this.faceEl = widget.querySelector('#farida-face-wrapper');
            this.bubbleEl = widget.querySelector('#farida-speech-bubble');
            this.textEl = widget.querySelector('#farida-speech-text');

            const btn = widget.querySelector('#farida-avatar-btn');
            if (btn) {
                btn.onclick = () => {
                    this.onAvatarClick();
                };
            }

            if (!this.isEnabled) {
                widget.style.display = 'none';
            }

            this.injectStyles();
        }

        injectStyles() {
            if (document.getElementById('farida-mascot-styles')) return;
            const style = document.createElement('style');
            style.id = 'farida-mascot-styles';
            style.textContent = `
                .farida-mascot-container {
                    position: fixed;
                    bottom: 24px;
                    left: 24px;
                    display: flex;
                    align-items: flex-end;
                    gap: 12px;
                    z-index: 9999;
                    pointer-events: none;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }
                .farida-avatar-btn {
                    pointer-events: auto;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: #ffffff;
                    border: 3px solid #0284c7;
                    box-shadow: 0 8px 24px rgba(2, 132, 199, 0.35);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                    outline: none;
                }
                .farida-avatar-btn:hover {
                    transform: scale(1.08) rotate(3deg);
                }
                .farida-avatar-btn:active {
                    transform: scale(0.95);
                }
                .farida-face-wrapper {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .farida-svg {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                .farida-speech-bubble {
                    pointer-events: auto;
                    background: #ffffff;
                    border: 2px solid #0284c7;
                    border-radius: 18px 18px 18px 4px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
                    padding: 10px 14px;
                    max-width: 290px;
                    font-size: 0.88rem;
                    line-height: 1.45;
                    font-weight: 800;
                    color: #1e293b;
                    transform: scale(0.8);
                    opacity: 0;
                    transform-origin: bottom left;
                    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                    display: none;
                    position: relative;
                    direction: ltr;
                    text-align: left;
                }
                .farida-speech-bubble.active {
                    display: block;
                    opacity: 1;
                    transform: scale(1);
                }
                .farida-mascot-name {
                    display: block;
                    font-size: 0.74rem;
                    color: #0284c7;
                    font-weight: 900;
                    margin-bottom: 2px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                .farida-text {
                    margin: 0;
                    font-family: inherit;
                }
                @media (max-width: 768px) {
                    .farida-mascot-container {
                        bottom: 16px;
                        left: 12px;
                    }
                    .farida-avatar-btn {
                        width: 54px;
                        height: 54px;
                    }
                    .farida-speech-bubble {
                        max-width: 220px;
                        font-size: 0.8rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        react(state = 'idle', customText = null) {
            if (!this.isEnabled) return;
            if (!this.container) this.injectUI();

            this.currentState = state;

            const faceSvg = SVG_FACES[state] || SVG_FACES.idle;
            if (this.faceEl) {
                this.faceEl.innerHTML = faceSvg;
            }

            let phrase = customText;
            if (!phrase) {
                const list = PHRASES[state] || PHRASES.idle;
                phrase = list[Math.floor(Math.random() * list.length)];
            }

            this.speak(phrase, state === 'happy' || state === 'streak' || state === 'clear' ? 3800 : 3200);
        }

        speak(text, duration = 3000) {
            if (!this.textEl || !this.bubbleEl) return;

            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }

            this.textEl.textContent = text;
            this.bubbleEl.classList.add('active');

            this.hideTimeout = setTimeout(() => {
                this.bubbleEl.classList.remove('active');
                if (this.faceEl && this.currentState !== 'idle') {
                    this.faceEl.innerHTML = SVG_FACES.idle;
                }
            }, duration);
        }

        onAvatarClick() {
            const tips = [
                '💡 Tajweed Tip: Noon Sakinah & Tanween have 4 core rules: Izhar, Idgham, Iqlab, and Ikhfa!',
                '💡 Tajweed Tip: Throat letters of Izhar Halqi: Hamzah, Ha, \'Ayn, Haa, Ghayn, Khaa!',
                '💡 Tajweed Tip: The 6 letters of Idgham are united in (Yarmaloon)!',
                '💡 Tajweed Tip: Qalqalah letters are five: Qaaf, Taa, Baa, Jeem, Daal (Qutb Jad)!',
                '💡 Tajweed Tip: Ghunnah is a sweet nasal tone held for exactly 2 counts (Harakatan)!',
                '🌟 Prophet Muhammad (ﷺ) said: "The best of you are those who learn the Quran and teach it"!'
            ];
            const tip = tips[Math.floor(Math.random() * tips.length)];
            this.react('happy', tip);
        }

        toggle(enabled) {
            this.isEnabled = typeof enabled === 'boolean' ? enabled : !this.isEnabled;
            localStorage.setItem('tajweed_farida_enabled', this.isEnabled ? 'true' : 'false');
            if (this.container) {
                this.container.style.display = this.isEnabled ? 'flex' : 'none';
            }
            return this.isEnabled;
        }
    }

    // Initialize Farida globally with backward-compatible alias
    window.FaridaMascot = new FaridaMascotController();
    window.SirajMascot = window.FaridaMascot;

})(window);
