/**
 * Interactive Talking Islamic Mascot: "سراج" (Siraj)
 * Tajweed Challenge - Educational Mascot
 *
 * Provides contextual pedagogical encouragement, feedback on correct/incorrect
 * answers, celebrations on streaks, and friendly Islamic remarks.
 */

(function(window) {
    'use strict';

    const PHRASES = {
        happy: [
            'ما شاء الله! إجابة صحيحة ومتقنة! 🌟',
            'أحسنت، بارك الله في علمك وفهمك! 👏',
            'تبارك الله! قراءة موفقة وحكم سليم! ✨',
            'ممتاز يا بطل! واصل على هذا المستوى! 🎯',
            'فتح الله عليك! إجابة في الصميم! 💡'
        ],
        sad: [
            'لا بأس يا بطل! ركّز في الحرف وحاول مجدداً! 💪',
            'الخطأ أول خطوة للإتقان، استعن بالله! 📖',
            'تأنَّ في القراءة.. التدقيق مفتاح التجويد! 🌱',
            'راجع الحكم بهدوء، أنت قادر على تصحيحه! 🤲',
            'خير إن شاء الله، كل قارئ يتعلم من أخطائه! 🌟'
        ],
        streak: [
            'ما شاء الله لا قوة إلا بالله! سلسلة إجابات نارية! 🔥',
            'إتقان مبهر وتركيز عالٍ! استمر هكذا! ⚡',
            'همتك عالية جداً اليوم، تبارك الرحمن! 🚀'
        ],
        frozen: [
            'يا سلام! تجمد الوقت.. فكّر براحتك واقرأ بتأنٍ! ❄️'
        ],
        shield: [
            'الدرع يحميك الآن، امضِ بثقة وإتقان! 🛡️'
        ],
        hint: [
            'استعن بالملاحظة الذهبية وركّز في مخارج الحروف! 💡'
        ],
        clear: [
            'مبارك هذا الإنجاز الرائع! نفع الله بك وبما تعلمت! 🏆',
            'ألف مبروك! تاج الوقار يزدان بإتقانك لأحكام التلاوة! 👑'
        ],
        idle: [
            'أهلاً بك! ركّز في الآية الكريمة والحكم التجويدي 📖',
            'بسم الله نبدأ، استعن بالله واقرأ بتدبر! 🤲',
            'التجويد حلية التلاوة وزينة الأداء! ✨'
        ]
    };

    const SVG_FACES = {
        idle: `
            <svg viewBox="0 0 100 100" class="siraj-svg">
                <defs>
                    <radialGradient id="sirajGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#fef08a" stop-opacity="1"/>
                        <stop offset="70%" stop-color="#f59e0b" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="url(#sirajGlow)" opacity="0.85"/>
                <path d="M 30 75 C 30 85, 70 85, 70 75 C 70 65, 80 50, 80 38 C 80 22, 67 14, 50 14 C 33 14, 20 22, 20 38 C 20 50, 30 65, 30 75 Z" fill="#fbbf24" stroke="#b45309" stroke-width="2.5"/>
                <ellipse cx="50" cy="18" rx="22" ry="7" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
                <circle cx="50" cy="12" r="3.5" fill="#f59e0b"/>
                <circle cx="40" cy="42" r="4.5" fill="#1e293b"/>
                <circle cx="60" cy="42" r="4.5" fill="#1e293b"/>
                <circle cx="38.5" cy="40.5" r="1.5" fill="#ffffff"/>
                <circle cx="58.5" cy="40.5" r="1.5" fill="#ffffff"/>
                <ellipse cx="32" cy="49" rx="4" ry="2.5" fill="#f87171" opacity="0.6"/>
                <ellipse cx="68" cy="49" rx="4" ry="2.5" fill="#f87171" opacity="0.6"/>
                <path d="M 42 52 Q 50 60 58 52" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                <rect x="36" y="80" width="28" height="6" rx="3" fill="#92400e"/>
            </svg>
        `,
        happy: `
            <svg viewBox="0 0 100 100" class="siraj-svg">
                <circle cx="50" cy="50" r="48" fill="#fef08a" opacity="0.95"/>
                <path d="M 30 75 C 30 85, 70 85, 70 75 C 70 65, 80 50, 80 38 C 80 22, 67 14, 50 14 C 33 14, 20 22, 20 38 C 20 50, 30 65, 30 75 Z" fill="#fcd34d" stroke="#b45309" stroke-width="2.5"/>
                <ellipse cx="50" cy="18" rx="22" ry="7" fill="#10b981" stroke="#047857" stroke-width="2"/>
                <circle cx="50" cy="12" r="4" fill="#fbbf24"/>
                <path d="M 35 44 Q 40 37 45 44" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M 55 44 Q 60 37 65 44" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M 39 52 Q 50 67 61 52 Z" fill="#b91c1c" stroke="#1e293b" stroke-width="2"/>
                <ellipse cx="50" cy="58" rx="5" ry="3" fill="#f87171"/>
                <circle cx="31" cy="48" r="4" fill="#ef4444" opacity="0.7"/>
                <circle cx="69" cy="48" r="4" fill="#ef4444" opacity="0.7"/>
                <text x="14" y="28" font-size="14">✨</text>
                <text x="74" y="28" font-size="14">✨</text>
                <rect x="36" y="80" width="28" height="6" rx="3" fill="#92400e"/>
            </svg>
        `,
        sad: `
            <svg viewBox="0 0 100 100" class="siraj-svg">
                <circle cx="50" cy="50" r="45" fill="#fed7aa" opacity="0.8"/>
                <path d="M 30 75 C 30 85, 70 85, 70 75 C 70 65, 80 50, 80 38 C 80 22, 67 14, 50 14 C 33 14, 20 22, 20 38 C 20 50, 30 65, 30 75 Z" fill="#fcd34d" stroke="#b45309" stroke-width="2.5"/>
                <ellipse cx="50" cy="18" rx="22" ry="7" fill="#64748b" stroke="#334155" stroke-width="2"/>
                <circle cx="50" cy="12" r="3.5" fill="#f59e0b"/>
                <circle cx="40" cy="44" r="4" fill="#1e293b"/>
                <circle cx="60" cy="44" r="4" fill="#1e293b"/>
                <path d="M 35 37 L 44 40" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M 65 37 L 56 40" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M 44 58 Q 50 53 56 58" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="70" cy="48" r="2.5" fill="#38bdf8"/>
                <rect x="36" y="80" width="28" height="6" rx="3" fill="#92400e"/>
            </svg>
        `,
        frozen: `
            <svg viewBox="0 0 100 100" class="siraj-svg">
                <circle cx="50" cy="50" r="46" fill="#bae6fd" opacity="0.95"/>
                <path d="M 30 75 C 30 85, 70 85, 70 75 C 70 65, 80 50, 80 38 C 80 22, 67 14, 50 14 C 33 14, 20 22, 20 38 C 20 50, 30 65, 30 75 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
                <ellipse cx="50" cy="18" rx="22" ry="7" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
                <circle cx="50" cy="12" r="3.5" fill="#7dd3fc"/>
                <circle cx="40" cy="42" r="5" fill="#0369a1"/>
                <circle cx="60" cy="42" r="5" fill="#0369a1"/>
                <circle cx="39" cy="41" r="1.5" fill="#ffffff"/>
                <circle cx="59" cy="41" r="1.5" fill="#ffffff"/>
                <circle cx="50" cy="56" r="4" fill="#0284c7"/>
                <text x="14" y="28" font-size="14">❄️</text>
                <text x="74" y="28" font-size="14">❄️</text>
                <rect x="36" y="80" width="28" height="6" rx="3" fill="#0369a1"/>
            </svg>
        `
    };

    class SirajMascotController {
        constructor() {
            this.container = null;
            this.faceEl = null;
            this.bubbleEl = null;
            this.textEl = null;
            this.currentState = 'idle';
            this.hideTimeout = null;
            this.isEnabled = localStorage.getItem('tajweed_siraj_enabled') !== 'false';
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
            if (document.getElementById('siraj-mascot-widget')) return;

            const widget = document.createElement('aside');
            widget.id = 'siraj-mascot-widget';
            widget.className = 'siraj-mascot-container';
            widget.setAttribute('aria-label', 'المساعد الذكي سراج');

            widget.innerHTML = `
                <div class="siraj-speech-bubble" id="siraj-speech-bubble" dir="rtl">
                    <span class="siraj-mascot-name">سِـرَاج 💡</span>
                    <p id="siraj-speech-text" class="siraj-text">أهلاً بك يا بطل! ركّز في الآية والحكم التجويدي 📖</p>
                </div>
                <button type="button" class="siraj-avatar-btn" id="siraj-avatar-btn" title="سراج رفيقك في التجويد (اضغط للنصيحة)" aria-label="سراج رفيق التجويد">
                    <div id="siraj-face-wrapper" class="siraj-face-wrapper">
                        ${SVG_FACES.idle}
                    </div>
                </button>
            `;

            document.body.appendChild(widget);

            this.container = widget;
            this.faceEl = widget.querySelector('#siraj-face-wrapper');
            this.bubbleEl = widget.querySelector('#siraj-speech-bubble');
            this.textEl = widget.querySelector('#siraj-speech-text');

            const btn = widget.querySelector('#siraj-avatar-btn');
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
            if (document.getElementById('siraj-mascot-styles')) return;
            const style = document.createElement('style');
            style.id = 'siraj-mascot-styles';
            style.textContent = `
                .siraj-mascot-container {
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
                .siraj-avatar-btn {
                    pointer-events: auto;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: #ffffff;
                    border: 3px solid #f59e0b;
                    box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                    outline: none;
                }
                .siraj-avatar-btn:hover {
                    transform: scale(1.08) rotate(4deg);
                }
                .siraj-avatar-btn:active {
                    transform: scale(0.95);
                }
                .siraj-face-wrapper {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .siraj-svg {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                .siraj-speech-bubble {
                    pointer-events: auto;
                    background: #ffffff;
                    border: 2px solid #f59e0b;
                    border-radius: 18px 18px 18px 4px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
                    padding: 10px 14px;
                    max-width: 280px;
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
                }
                .siraj-speech-bubble.active {
                    display: block;
                    opacity: 1;
                    transform: scale(1);
                }
                .siraj-mascot-name {
                    display: block;
                    font-size: 0.72rem;
                    color: #d97706;
                    font-weight: 900;
                    margin-bottom: 2px;
                    text-transform: uppercase;
                }
                .siraj-text {
                    margin: 0;
                    font-family: inherit;
                }
                @media (max-width: 768px) {
                    .siraj-mascot-container {
                        bottom: 16px;
                        left: 12px;
                    }
                    .siraj-avatar-btn {
                        width: 54px;
                        height: 54px;
                    }
                    .siraj-speech-bubble {
                        max-width: 210px;
                        font-size: 0.78rem;
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
            const adviceList = [
                '💡 نصيحة: النون الساكنة والتنوين لها 4 أحكام: الإظهار، الإدغام، الإقلاب، والإخفاء!',
                '💡 نصيحة: حروف الإظهار الحلقي مجموعة في: أخي هاك علماً حازه غير خاسر!',
                '💡 نصيحة: حروف الإدغام ستة مجموعة في كلمة (يَرْمَلُون)!',
                '💡 نصيحة: حروف القلقلة خمسة مجموعة في (قُطْبُ جَدّ)!',
                '💡 نصيحة: الغنة صوت رخيم يخرج من الخيشوم مقداره حركتان!',
                '🌟 ما شاء الله على حرصك! استمر في التعلم والممارسة فـ"خيركم من تعلم القرآن وعلمه"!'
            ];
            const advice = adviceList[Math.floor(Math.random() * adviceList.length)];
            this.react('happy', advice);
        }

        toggle(enabled) {
            this.isEnabled = typeof enabled === 'boolean' ? enabled : !this.isEnabled;
            localStorage.setItem('tajweed_siraj_enabled', this.isEnabled ? 'true' : 'false');
            if (this.container) {
                this.container.style.display = this.isEnabled ? 'flex' : 'none';
            }
            return this.isEnabled;
        }
    }

    window.SirajMascot = new SirajMascotController();

})(window);
