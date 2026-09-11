const appContainer = document.createElement('div');
    appContainer.innerHTML = `

    <div id="aria-announcer" aria-live="polite" class="sr-only" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;"></div>
    <div class="toast" id="msg-toast" aria-live="polite"></div>

    <!-- Gateway Selection Screen (Entry Hub) -->
    <main id="screen-gateway" class="screen active">
        <section class="gc-gateway-container" aria-labelledby="gateway-title">
            <header class="gc-gateway-header">
                <span class="gc-gateway-badge">✨ TAJWEED MASTER HUB • Interactive Learning Platform ✨</span>
                <h1 id="gateway-title" class="gc-gateway-title">Tajweed Arena & Arcade</h1>
                <p class="gc-gateway-subtitle">Choose your experience: Learn through classic structured challenges or jump into 7 exciting gamified interactive arcades!</p>
            </header>

            <div class="gc-gateway-choices">
                <!-- Choice 1: Current Classic Game -->
                <div class="gc-gate-card classic" id="gate-btn-classic">
                    <div class="gc-gate-icon">🎮</div>
                    <h2>CLASSIC CHALLENGE</h2>
                    <p>The complete full-featured challenge with Progressive Journey, Free Practice, Theoretical Exams, Powerups, and Official Certificates.</p>
                    <button class="gc-gate-btn">
                        <span>▶️ Launch Classic Game</span>
                    </button>
                </div>

                <!-- Choice 2: Game Center Interactive Arcade -->
                <div class="gc-gate-card arcade" id="gate-btn-gamecenter">
                    <div class="gc-gate-icon">🎲</div>
                    <h2>GAME CENTER</h2>
                    <p>7 curated interactive games: Spin the Wheel, Open the Box, Cards Battle, Penalty Shootout, Basketball Slam, Balloons, and Bowling!</p>
                    <button class="gc-gate-btn">
                        <span>⭐ Enter Game Center</span>
                    </button>
                </div>
            </div>
        </section>
    </main>

    <!-- Splash Screen -->
    <main id="screen-splash" class="screen">
        <section class="start-container" aria-labelledby="splash-title">
            <div class="splash-layout">
                <div class="splash-left">
                    <img src="images/logo.png" alt="Sheikh Gehad Logo" style="width: clamp(150px, 25vw, 220px); height: clamp(150px, 25vw, 220px); border-radius: 50%; box-shadow: 0 6px 20px rgba(0,0,0,0.2); margin-bottom: 2vh; object-fit: cover; border: 4px solid white;">
                    <h1 id="splash-title" style="font-size: clamp(2.2rem, 4.5vw, 3.5rem); color: var(--text-main); font-weight: 900; margin-bottom: 0.5vh; line-height: 1.1;">Tajweed<br>Challenge</h1>
                    <h2 style="font-size: 1.1rem; color: #64748b; font-weight: 800; margin-bottom: 0.3vh;">Prepared by</h2>
                    <h3 style="font-size: 1.5rem; color: #0f766e; font-weight: 900;">Sheikh Gehad Elsayad</h3>
                </div>
                
                <div class="splash-right">
                    <a href="https://wa.me/201147992249" target="_blank" rel="noopener noreferrer" class="splash-link" style="background: #25D366; color: white;" aria-label="Contact via WhatsApp">
                        <span aria-hidden="true">💬</span> WhatsApp Contact
                    </a>
                    
                    <a href="https://linktr.ee/GehadNagah789" target="_blank" rel="noopener noreferrer" class="splash-link" style="background: #e2e8f0; color: #0f172a;" aria-label="Visit Linktree profile">
                        <span aria-hidden="true">🔗</span> linktr.ee/GehadNagah789
                    </a>
                    
                    <button id="btn-enter-app" class="btn-start" style="margin-top: 1vh; width: 100%; max-width: 280px;" aria-label="Enter Application" onclick="try{if(typeof SFX!=='undefined'&&SFX.click)SFX.click();}catch(e){} switchScreen('screen-mode-select');">Enter App ➡️</button>
                    <button id="btn-show-lb-splash" class="btn-secondary" style="width: 100%; max-width: 280px;">🏆 Leaderboard</button>
                    <button id="btn-goto-gamecenter" class="btn-secondary" style="width: 100%; max-width: 280px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; font-weight: 800;">🎲 Game Center (Interactive Arcade)</button>
                    <a href="review.html" target="_blank" class="btn-secondary" style="width: 100%; max-width: 280px; text-decoration: none; display: flex; align-items: center; justify-content: center; background: #0f172a; color: #38bdf8; border: 1px solid #38bdf8; font-weight: 800; font-size: 0.9rem; padding: 8px 12px; border-radius: 0.75rem; margin-top: 4px;">🔍 Recitation Audio Review</a>
                </div>
            </div>
        </section>
    </main>

        <!-- Start/Setup Screen (Enhanced with Configuration) -->
    <!-- Mode Select Screen -->
    <main id="screen-mode-select" class="screen">
        <section class="start-container">
            <h1 style="font-size: clamp(2rem, 4vw, 3rem); color: #1e293b; font-weight: 900; margin-bottom: 3vh; text-align:center;">Choose Learning Mode</h1>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:16px; width:100%; max-width:680px;">
                <button id="btn-mode-prog" class="mode-btn prog" style="width: 100%;">
                    <span style="font-size:2.5rem;">🗺️</span>
                    <span>Progressive Mode</span>
                    <span>Unlock levels one by one</span>
                </button>
                <button id="btn-mode-free" class="mode-btn free" style="width: 100%;">
                    <span style="font-size:2.5rem;">⚙️</span>
                    <span>Free Practice</span>
                    <span>Custom practical cards</span>
                </button>
                <button id="btn-mode-theory" class="mode-btn" style="width: 100%; background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border: 3px solid #38bdf8; box-shadow: 0 8px 16px rgba(2, 132, 199, 0.25);">
                    <span style="font-size:2.5rem;">📚</span>
                    <span style="font-size:1.25rem; font-weight:900;">Theoretical Quiz</span>
                    <span style="font-size:0.85rem; opacity:0.95;">8 Topics • 340 Questions (T/F & MC)</span>
                </button>
            </div>
            
            <div style="margin-top: 4vh; text-align:center;">
                <p style="color:#64748b; margin-bottom:10px; font-weight:700;">Teachers & Parents</p>
                <button id="btn-mode-hw" class="mode-btn hw" style="margin: 0 auto;">📝 Assign HW</button>
            </div>
            <button class="btn-secondary" onclick="if(typeof SFX !== 'undefined') SFX.click(); switchScreen('screen-splash');" style="margin-top:20px; width: 100px;">⬅ Back</button>
        </section>
    </main>

    <!-- Progressive Map Screen -->
    <main id="screen-progressive" class="screen">
        <section class="start-container" style="justify-content: flex-start; padding-top:2vh;">
            <div style="width:100%; max-width:680px; display:flex; justify-content:space-between; align-items:center;">
                <button class="icon-btn" onclick="if(typeof SFX !== 'undefined') SFX.click(); switchScreen('screen-mode-select');">⬅</button>
                <h1 style="font-size: 1.8rem; font-weight:900; color:#1e293b;">Tajweed Roadmap 🗺️</h1>
                <div style="width:44px;"></div>
            </div>
            
            <div style="width:100%; max-width:680px; margin-top:20px; text-align:center;">
                <div class="avatar-upload-container" style="text-align: center; margin-bottom: 10px;">
                    <label style="cursor: pointer; display: inline-block;" title="Upload your picture!">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: #e2e8f0; border: 2px dashed #94a3b8; display: flex; align-items: center; justify-content: center; overflow: hidden; margin: 0 auto; position: relative;">
                            <img class="avatar-preview" src="" style="width: 100%; height: 100%; object-fit: cover; display: none; position: absolute; inset:0;">
                            <span class="avatar-placeholder" style="font-size: 2rem;">👤</span>
                        </div>
                        <input type="file" accept="image/*" class="avatar-input" style="display: none;">
                        <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px; font-weight: bold;">+ Photo (Optional)</div>
                    </label>
                </div>
                <input type="text" id="prog-student-name" class="name-input" placeholder="Enter Your Name" autocomplete="off" maxlength="15" spellcheck="false" style="max-width:350px;">
                <p id="prog-name-error" class="name-error" role="alert" hidden></p>
            </div>

            <div class="map-container" id="map-container">
                <!-- Populated by JS -->
            </div>
        </section>
    </main>

    <!-- Dedicated Homework Assignment Screen (Widescreen Edition) -->
    <main id="screen-homework" class="screen">
        <section class="start-container" style="justify-content: flex-start; padding: 1.5vh 2vw; background: linear-gradient(135deg, #eff6ff, #f8fafc); min-height: 100vh; overflow-y: auto;">
            <div style="width: 100%; max-width: 1650px; display: flex; flex-direction: column; gap: 14px; margin: 0 auto;">
                
                <!-- Top Bar -->
                <div style="display: flex; justify-content: space-between; align-items: center; background: white; padding: 12px 20px; border-radius: 16px; border: 2px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); flex-wrap: wrap; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <button class="icon-btn" onclick="if(typeof SFX !== 'undefined') SFX.click(); switchScreen('screen-mode-select');">⬅</button>
                        <h1 style="font-size: clamp(1.4rem, 2.2vw, 2rem); font-weight: 900; color: #1e293b; margin: 0;">
                            📝 Assign Homework Dashboard
                        </h1>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                        <div style="background: #f8fafc; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 6px 14px; font-size: 0.85rem; color: #475569; font-weight: 700;">
                            👑 Developed & Supervised by <strong>Sheikh Gehad Elsayad</strong>
                        </div>
                        <div id="hw-active-teacher-badge" style="color: #2563eb; font-weight: 800; font-size: 0.85rem; background: #eff6ff; padding: 6px 12px; border-radius: 10px; border: 1.5px solid #bfdbfe;">👨‍🏫 Teacher: Sheikh Gehad Elsayad</div>
                        <button type="button" onclick="if(typeof window.StudentModal!=='undefined') window.StudentModal.open('teacher');" style="background: white; color: #2563eb; border: 1.5px solid #3b82f6; border-radius: 99px; font-weight: 800; font-size: 0.85rem; padding: 6px 14px; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            ⚙️ Teacher Profile
                        </button>
                    </div>
                </div>

                <!-- Homework Creator Root Container (Widescreen) -->
                <div id="hw-creator-root" style="width: 100%; background: white; border-radius: 1.5rem; padding: 2vh 2vw; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 2px solid #e2e8f0;">
                    <!-- Dynamically populated by renderHomeworkCreator -->
                </div>

            </div>
        </section>
    </main>

    <!-- Setup Screen (Free Play & Homework Launch - Widescreen Edition) -->
    <main id="screen-start" class="screen">
        <section class="start-container" aria-labelledby="start-title" style="background: linear-gradient(135deg, #f0fdf4, #f8fafc); padding: 1.5vh 2vw; width: 100%; min-height: 100vh; overflow-y: auto;">
            <div style="width: 100%; max-width: 1650px; display: flex; flex-direction: column; align-items: stretch; margin: 0 auto; gap: 12px;">
                
                <!-- Full-Width Header Bar -->
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; background: white; padding: 12px 20px; border-radius: 16px; border: 2px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <button class="icon-btn" onclick="if(typeof SFX !== 'undefined') SFX.click(); switchScreen('screen-mode-select');">⬅</button>
                        <div>
                            <h1 id="start-title" style="font-size: clamp(1.4rem, 2.2vw, 2.2rem); color: #1e293b; font-weight: 900; margin: 0; line-height: 1.2;">Tajweed Challenge Setup ⚙️</h1>
                            <span style="font-size: 0.82rem; color: #64748b; font-weight: 700;">Select specific realms, sub-rules & question counts to enter the arena</span>
                        </div>
                    </div>
                    
                    <!-- Compact Student Profile & Timer Quick Bar -->
                    <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 6px 12px;">
                            <span style="font-size: 1.15rem;">👤</span>
                            <input type="text" id="student-name" class="name-input" placeholder="Player Name" autocomplete="off" maxlength="20" spellcheck="false" style="width: 130px; padding: 4px 8px; font-size: 0.95rem; border: 1.5px solid #cbd5e1; border-radius: 8px; font-weight: 800; text-align: left;">
                            <button type="button" class="btn-secondary" id="btn-open-student-modal-setup" onclick="if(typeof window.StudentModal!=='undefined') window.StudentModal.open('roster');" style="padding: 4px 10px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; border-color: #3b82f6; color: #2563eb; background: #eff6ff; white-space: nowrap;">
                                Switch Profile
                            </button>
                        </div>

                        <div style="display: flex; align-items: center; gap: 6px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 6px 12px;">
                            <span style="font-size: 0.85rem; font-weight: 800; color: #475569;">⏱️ Timer:</span>
                            <select id="timer-select" style="padding: 4px 8px; font-size: 0.88rem; border-radius: 6px; border: 1.5px solid #cbd5e1; font-weight: 800; color: #334155; background: white;">
                                <option value="60">60s</option>
                                <option value="45">45s</option>
                                <option value="30">30s</option>
                                <option value="15" selected>15s</option>
                            </select>
                        </div>

                        <button type="button" class="arena-hero-btn" onclick="document.getElementById('btn-start-game').click();" style="padding: 8px 18px; font-size: 0.95rem;">
                            🚀 Start Game
                        </button>
                    </div>
                </div>
                
                <!-- Main Arena Container (Full Width) -->
                <div style="width: 100%; background: white; border-radius: 1.5rem; padding: 1.5vh 1.5vw; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 2px solid #e2e8f0; display: flex; flex-direction: column; gap: 12px;">
                    
                    <div id="hw-teacher-panel" class="hw-overlay" hidden style="background:#eff6ff; border:2px solid #3b82f6; border-radius:16px; padding:16px; margin-bottom:10px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                            <span style="font-weight:900; color:#1e40af; font-size:1.15rem;">👨‍🏫 Teacher Panel: Create & Assign Homework</span>
                            <button type="button" onclick="if(typeof window.StudentModal!=='undefined') window.StudentModal.open('teacher');" style="background:white; color:#2563eb; border:1.5px solid #3b82f6; border-radius:99px; font-weight:800; font-size:0.85rem; padding:4px 12px; cursor:pointer; display:flex; align-items:center; gap:4px;">
                                ⚙️ Teacher Settings
                            </button>
                        </div>
                        <p style="font-size:0.85rem; color:#475569; margin:6px 0 10px 0;">Select rules, question count & timer below, then generate an assignment link for your students:</p>
                        <button id="btn-generate-hw" class="btn-start" style="font-size:1rem; padding: 10px 20px; background:#2563eb; box-shadow:0 3px 0 #1d4ed8;">Generate Homework Link 🔗</button>
                        <div style="display:flex; gap:10px; align-items:center; margin-top:10px;">
                            <input type="text" id="hw-link-out" readonly style="flex:1; padding:10px; font-size:0.85rem; border-radius:8px; border:1.5px solid #94a3b8; display:none; background:white; font-weight:700;" onclick="this.select()">
                            <button id="btn-copy-hw" class="btn-start" style="display:none; padding:10px 16px; width:auto; font-size:0.95rem; background:#10b981; box-shadow:0 3px 0 #059669;">📋 Copy Link</button>
                        </div>
                        <div style="font-size:0.75rem; color:#64748b; margin-top:6px;">
                            ✨ Created & Supervised by Sheikh Gehad Elsayad
                        </div>
                    </div>

                    <p id="name-error" class="name-error" role="alert" hidden></p>

                    <div id="rules-container" style="width: 100%;">
                        <!-- Populated dynamically by RuleSelectorEngine with Arcade Stage Arena -->
                    </div>
                    <input type="hidden" id="custom-qty-input" value="0">
                    <span id="total-available-lbl" style="display:none;">0</span>

                    <p id="setup-error" class="name-error" style="text-align: center; margin: 4px 0;" hidden></p>
                    
                    <button id="btn-start-game" class="btn-start" style="width: 100%; max-width: none; padding: 14px 0; font-size: 1.35rem; background: #2563eb; box-shadow: 0 5px 0 #1d4ed8; font-weight: 900; letter-spacing: 0.5px; border-radius: 14px;">
                        Start Challenge Now 🚀
                    </button>
                </div>
            </div>
        </section>
    </main>
 
    <!-- Theoretical Challenge Setup Screen -->
    <main id="screen-theory-setup" class="screen">
        <section class="start-container" style="background: linear-gradient(135deg, #f0fdf4, #f8fafc); padding: 2vh 4vw; overflow-y: auto;">
            <div style="width:100%; max-width:850px; display:flex; flex-direction:column; align-items:center;">
                
                <div style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <button class="icon-btn" onclick="if(typeof SFX !== 'undefined') SFX.click(); switchScreen('screen-mode-select');">⬅</button>
                    <h1 style="font-size: clamp(1.8rem, 3.5vw, 2.5rem); color: #0f172a; font-weight: 900; text-align: center;">📚 Theoretical Challenge</h1>
                    <div style="width:44px;"></div>
                </div>
                <p style="color: #64748b; font-weight: 700; margin-bottom: 20px; text-align: center;">Master Tajweed Rules with 480 Pure English Questions (Hafs from Asim)</p>

                <!-- Student Info -->
                <div style="width: 100%; max-width: 450px; margin-bottom: 20px; text-align: center;">
                    <input type="text" id="theory-student-name" class="name-input" placeholder="Enter Your Name" autocomplete="off" maxlength="20" spellcheck="false" style="max-width:350px;">
                    <p id="theory-name-error" class="name-error" role="alert" hidden></p>
                </div>

                <!-- Filter Controls: Question Type & Length -->
                <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 20px;">
                    <!-- Question Type Filter -->
                    <div style="background: white; padding: 12px 18px; border-radius: 14px; border: 2px solid #e2e8f0; display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 260px;">
                        <span style="font-size: 0.95rem; font-weight: 800; color: #334155;">Question Types:</span>
                        <div style="display: flex; gap: 8px;" id="theory-type-buttons">
                            <button type="button" class="btn-secondary active theory-filter-btn" data-qtype="all" style="flex: 1; padding: 8px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer; background: #2563eb; color: white; border-color: #2563eb;">All (480)</button>
                            <button type="button" class="btn-secondary theory-filter-btn" data-qtype="tf" style="flex: 1; padding: 8px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">T/F Only</button>
                            <button type="button" class="btn-secondary theory-filter-btn" data-qtype="mc" style="flex: 1; padding: 8px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">MC Only</button>
                        </div>
                    </div>

                    <!-- Quiz Length Filter -->
                    <div style="background: white; padding: 12px 18px; border-radius: 14px; border: 2px solid #e2e8f0; display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 290px;">
                        <span style="font-size: 0.95rem; font-weight: 800; color: #334155;">Quiz Length (Number of Questions):</span>
                        <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="theory-len-buttons">
                            <button type="button" class="btn-secondary theory-len-btn" data-len="10" style="flex: 1; min-width: 45px; padding: 8px 4px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer;">10</button>
                            <button type="button" class="btn-secondary theory-len-btn" data-len="20" style="flex: 1; min-width: 45px; padding: 8px 4px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer;">20</button>
                            <button type="button" class="btn-secondary theory-len-btn" data-len="30" style="flex: 1; min-width: 45px; padding: 8px 4px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer;">30</button>
                            <button type="button" class="btn-secondary active theory-len-btn" data-len="60" style="flex: 1; min-width: 45px; padding: 8px 4px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer; background: #2563eb; color: white; border-color: #2563eb;">60</button>
                            <button type="button" class="btn-secondary theory-len-btn" data-len="all" style="flex: 1; min-width: 45px; padding: 8px 4px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer;">All</button>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 4px; padding-top: 6px; border-top: 1px dashed #e2e8f0;">
                            <span style="font-size: 0.82rem; font-weight: 700; color: #64748b;">Or Custom Count:</span>
                            <input type="number" id="theory-custom-qty" min="1" max="480" placeholder="Type any number..." style="width: 150px; padding: 6px 10px; border-radius: 8px; border: 2px solid #cbd5e1; font-weight: 800; font-size: 0.85rem; text-align: center; color: #1e293b;">
                        </div>
                    </div>
                </div>

                <!-- Select All / Deselect All Bar -->
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 0 4px;">
                    <span style="font-weight: 800; color: #1e293b; font-size: 1.1rem;">Select Topics:</span>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" id="btn-theory-select-all" class="btn-secondary" style="padding: 4px 12px; font-size: 0.85rem;">Select All</button>
                        <button type="button" id="btn-theory-deselect-all" class="btn-secondary" style="padding: 4px 12px; font-size: 0.85rem;">Deselect All</button>
                    </div>
                </div>

                <!-- Grid of 8 Topic Cards -->
                <div id="theory-topics-grid" style="width: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin-bottom: 25px;">
                    <!-- Populated dynamically from THEORETICAL_BANK -->
                </div>

                <p id="theory-setup-error" class="name-error" style="text-align: center; margin-bottom: 15px;" hidden></p>

                <!-- Total Selected Display & Start Button -->
                <div style="width: 100%; max-width: 500px; text-align: center;">
                    <div style="margin-bottom: 15px; font-size: 1.15rem; font-weight: 800; color: #1e3a8a;">
                        Selected Questions to Play: <span id="theory-selected-count-badge" style="background: #2563eb; color: white; padding: 3px 14px; border-radius: 999px;">60</span>
                    </div>
                    <button id="btn-start-theory-quiz" class="btn-start" style="width: 100%; padding: 1.8vh 0; font-size: 1.4rem; background: linear-gradient(135deg, #0284c7, #0369a1); box-shadow: 0 6px 0 #075985;">Start Theoretical Quiz 🚀</button>
                </div>

            </div>
        </section>
    </main>

    <!-- Main Game Screen -->
            <div id="pause-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center; flex-direction:column; color:white;">
            <h1 style="font-size:3rem; margin-bottom:20px;">Game Paused</h1>
            <div style="display:flex; gap:20px;">
                <button id="btn-resume" style="background:#10b981; color:white; border:none; padding:15px 30px; border-radius:10px; font-size:1.5rem; font-weight:bold; cursor:pointer;">Continue</button>
                <button id="btn-end-game" style="background:#ef4444; color:white; border:none; padding:15px 30px; border-radius:10px; font-size:1.5rem; font-weight:bold; cursor:pointer;">End Game</button>
            </div>
        </div>

    <main id="screen-game" class="screen">
        <div class="game-wrapper">
            <header class="game-top-bar" aria-label="Game Controls">
                <div class="top-icons-group">
                    <img src="images/logo.png" alt="Logo" style="width: 32px; height: 32px; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.15); margin-right: 8px;">
                    <button class="icon-btn" id="btn-home-game" aria-label="Home" title="Home">🏠</button>
                    <button class="icon-btn" id="btn-end-challenge" aria-label="End Challenge" title="End Challenge">End</button>
                    <button class="icon-btn" id="btn-mute" aria-label="Toggle Sound" title="Toggle Sound">🔊</button>
                </div>

                <!-- Free Practice Top Navigation & Reaction Controls -->
                <div class="top-nav-controls" id="top-nav-controls" style="display: none; align-items: center; gap: 10px;">
                    <button class="nav-arrow top-arrow long-nav-arrow" id="btn-prev" aria-label="Previous Question" title="Previous Question">
                        <svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                            <path d="M28 8H2M2 8L9 1.5M2 8L9 14.5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="mascot top-mascot-btn" id="mascot" aria-label="Reaction Mascot" title="Reaction Mascot">😃</button>
                    <button class="nav-arrow top-arrow long-nav-arrow" id="btn-next" aria-label="Next Question" title="Next Question">
                        <svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                            <path d="M2 8H28M28 8L21 1.5M28 8L21 14.5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div class="hud-stats" id="hud-stats" aria-label="Game Statistics">
                    <div class="hud-badge" title="Score" aria-label="Score">🏆 <span id="score-display">0</span></div>
                    <div class="hud-badge" title="Coins" aria-label="Coins">🪙 <span id="coins-display">0</span></div>
                    <div class="hud-badge" id="streak-badge" style="display:none" title="Streak" aria-label="Streak">
                        🔥 <span id="streak-display">0</span>
                        <span id="shield-indicator" style="display: none; position: absolute; right: -8px; top: -8px; font-size: 1rem;" aria-label="Shield Active">🛡️</span>
                    </div>
                </div>

                <div class="top-right-group">
                    <select class="example-selector" id="example-selector" aria-label="Select Example"></select>
                    <button id="btn-pause" aria-label="Pause Game" style="background:#f59e0b; color:white; border:none; padding:5px 10px; border-radius:6px; font-weight:bold; cursor:pointer;">Pause</button>
                    <div id="practice-badge" style="display:none; background:#8b5cf6; color:white; padding: 3px 8px; border-radius:6px; font-weight:800; font-size:0.8rem;">Practice</div>
                </div>
            </header>

            <div class="progress-bar-container" aria-hidden="true">
                <div class="progress-bar-fill" id="progress-fill"></div><div id="progress-text" style="position: absolute; width: 100%; text-align: center; top: 0; font-weight: bold; font-size: 0.9rem; color: #1e293b; line-height: 20px;"></div>
            </div>

            <section class="main-stage" aria-labelledby="q-mode-label">
                <div class="q-wrapper">
                    <div class="question-card" id="quran-box">
                        <button id="btn-play-q-audio" style="display:none; position:absolute; top:8px; left:12px; background:#f0fdf4; border:2px solid #86efac; border-radius:50%; width:36px; height:36px; font-size:1.1rem; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.08); align-items:center; justify-content:center; color:#166534; z-index:20;" title="Listen to Sheikh Al-Husary's recitation">🔊</button>
                        <div class="timer-container" aria-label="Timer">
                            <div class="timer-circle" id="timer-container">
                                <span id="timer-text">20</span>
                            </div>
                            <div style="color: #fde047; font-size: 1rem; margin-top: 2px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);" id="star-meter" aria-hidden="true">★★★</div>
                        </div>

                        <h2 class="q-label-top" id="q-mode-label" style="margin-bottom: 0.5rem; color: #334155; font-size: 1.2rem; text-align: center;">Rule Name</h2>

                        <div id="q-text">
                            <!-- Image handled by JS error fallbacks automatically -->
                            <img id="q-img-element" src="" class="q-img" alt="Quranic text example">
                            
                            <!-- Theoretical Question Card -->
                            <div id="q-theory-card" style="display:none; width: 100%; min-height: 130px; flex-direction: column; align-items: center; justify-content: center; padding: 16px 14px; background: linear-gradient(135deg, #f8fafc, #f1f5f9); border-radius: 14px; border: 2px solid #cbd5e1; box-shadow: inset 0 2px 4px rgba(0,0,0,0.03);">
                                <div id="q-theory-badge" style="display: inline-block; padding: 3px 12px; border-radius: 9999px; font-weight: 800; font-size: 0.82rem; margin-bottom: 10px; letter-spacing: 0.5px;"></div>
                                <div id="q-theory-prompt" style="font-size: clamp(1.1rem, 2.2vw, 1.45rem); font-weight: 800; line-height: 1.5; color: #0f172a; text-align: center;"></div>
                            </div>
                        </div>

                        <!-- Explanation and Feedback directly inside question card near the example -->
                        <div class="explanation-box" id="explanation-box" aria-live="polite"></div>
                    </div>
                </div>
                
                <div class="answers-row" id="choices-container" role="group" aria-label="Answer Choices">
                    <!-- Buttons injected via JS dynamically based on sub-rules -->
                </div>

                <!-- Dedicated Next Action Container right under choices -->
                <div id="next-action-container" style="display:none; width:100%; max-width:320px; margin: 4px auto 0 auto; text-align:center;">
                    <button id="btn-next-action" class="btn-start btn-next-action" style="width: 100%; padding: 8px 20px; font-size: 1.15rem; background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 4px 0 #047857; font-weight: 900; letter-spacing: 0.5px; border-radius: 0.75rem; cursor: pointer; color: white;">Next Question ➡</button>
                </div>
            </section>

            <footer class="bottom-bar">
                <div class="powerups" role="group" aria-label="Power-ups">
                    <button class="pu-btn" id="pu-hint" aria-label="Hint (Free)" title="Hint (Free)">💡<div class="pu-price free">0</div></button>
                    <button class="pu-btn" id="pu-5050" aria-label="50/50: Remove wrong answer (Cost: 5)" title="50/50 (Cost: 5)">🪄<div class="pu-price">5</div></button>
                    <button class="pu-btn" id="pu-time" aria-label="Add 5 seconds (Cost: 5)" title="Add Time (Cost: 5)">⏰<div class="pu-price">5</div></button>
                    <button class="pu-btn" id="pu-shield" aria-label="Shield: Protect streak (Cost: 10)" title="Shield (Cost: 10)">🛡️<div class="pu-price">10</div></button>
                    <button class="pu-btn" id="pu-freeze" aria-label="Freeze timer (Cost: 10)" title="Freeze (Cost: 10)">❄️<div class="pu-price">10</div></button>
                </div>
            </footer>
        </div>
    </main>

    <!-- Report Screen -->
    <main id="screen-report" class="screen">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; padding: 4vh 4vw; background: #f1f5f9; overflow-y: auto;">
            <header style="text-align: center; margin-bottom: 2vh; width: 100%; max-width: 800px; display: flex; flex-direction: column; align-items: center;">
                <img src="images/logo.png" alt="Logo" style="width: 80px; height: 80px; border-radius: 50%; box-shadow: 0 2px 10px rgba(0,0,0,0.15); margin-bottom: 10px;">
                <h1 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; color: #1e293b;" id="report-title">Challenge Complete!</h1>
                <p id="report-subtitle" style="font-size: 1.1rem; color: #64748b; font-weight: 800; margin-top: 5px;"></p>
            </header>

            <section class="report-grid" id="main-stats-grid" aria-label="Performance Statistics">
                <div class="stat-box"><div class="stat-val" id="r-score">0</div><div class="stat-lbl">Score</div></div>
                <div class="stat-box"><div class="stat-val" id="r-acc">0%</div><div class="stat-lbl">Accuracy</div></div>
                <div class="stat-box"><div class="stat-val" id="r-streak">0</div><div class="stat-lbl">Best Streak</div></div>
                <div class="stat-box"><div class="stat-val" id="r-time">0s</div><div class="stat-lbl">Avg Time</div></div>
            </section>

            <div style="width:100%; max-width:800px; margin: 15px auto 0 auto; display:flex; gap: 10px;">
                <button id="btn-submit-hw" class="btn-start" style="flex:1; font-size: 1rem; padding: 1.5vh; background: #8b5cf6; box-shadow: 0 4px 0 #7c3aed; display:none;">📤 Submit HW to Teacher</button>
            </div>

            <!-- Internal Category Calculations displayed neatly -->
            <section class="rule-stats-container" id="rule-stats-breakdown" aria-label="Category Breakdown"></section>

            <section style="display: flex; flex-direction: column; width: 100%; max-width: 800px; gap: 2vh; padding-bottom: 4vh;" aria-labelledby="mistakes-heading">
                <h3 id="mistakes-heading" style="font-size: 1.4rem; font-weight: 900; color: #334155; display: flex; justify-content: space-between; align-items: center;">
                    Mistakes Bank
                    <span id="mistake-count" style="font-size: 1rem; background: #e2e8f0; padding: 2px 8px; border-radius: 8px;">0</span>
                </h3>
                
                <div id="mistakes-list" style="display: flex; flex-direction: column; gap: 1.5vh;"></div>
                
                <div style="display: flex; gap: 15px; margin-top: 2vh; flex-wrap: wrap; justify-content: center;">
                    <button id="btn-replay" style="background: var(--primary); color: white; padding: 1.5vh 3vw; border-radius: 99px; font-weight: 900; font-size: 1.2rem; cursor: pointer; border: none; box-shadow: 0 4px 0 #2563eb;">⚙️ New Challenge</button>
                    <button id="btn-lb-report" class="btn-secondary">🏆 Leaderboard</button>
                    <button id="btn-home-report" class="btn-secondary" style="border-color: #cbd5e1; color: #64748b;">🏠 Home</button>
                </div>
            </section>
        </div>
    </main>

    <!-- Leaderboard Screen -->
    <main id="screen-leaderboard" class="screen">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; padding: 4vh 4vw; background: #f1f5f9; overflow-y: auto;">
            <div style="width:100%; max-width:600px; display:flex; justify-content:flex-start; margin-bottom:10px;">
                <button id="btn-back-lb" class="icon-btn" onclick="if(typeof SFX !== 'undefined') SFX.click(); switchScreen('screen-splash');">⬅</button>
            </div>
            <header style="text-align: center; margin-bottom: 3vh;">
                <h1 style="font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; color: var(--text-main);">🏆 Leaderboard</h1>
                <p style="color: #64748b; font-weight: 700;">Top scores saved locally on this device.</p>
            </header>

            <section class="leaderboard-list" id="lb-container" aria-label="Top Scores"></section>

            <div style="display: flex; gap: 15px; margin-top: 4vh; flex-wrap: wrap; justify-content: center;">
                <button id="btn-home-lb" style="background: var(--primary); color: white; padding: 1.2vh 3vw; border-radius: 99px; font-weight: 900; font-size: 1.1rem; cursor: pointer; border: none; box-shadow: 0 4px 0 #2563eb;">🏠 Back to Home</button>
                <button id="btn-clear-lb" class="btn-secondary" style="border-color: #fca5a5; color: #ef4444;">🗑️ Clear Data</button>
            </div>
        </div>
    </main>

    <!-- Modal for End Challenge -->
    <div id="exit-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-content">
            <h2 id="modal-title" style="font-size: 1.5rem; font-weight: 900; color: var(--text-main); margin-bottom: 10px;">End Challenge?</h2>
            <p style="color: #64748b; font-weight: 700; margin-bottom: 20px;">Are you sure you want to end early and see your score?</p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button id="btn-cancel-exit" class="btn-secondary" style="border-color: #cbd5e1; color: #64748b;">Continue Playing</button>
                <button id="btn-confirm-exit" style="background: var(--error); color: white; padding: 1vh 2vw; border-radius: 99px; font-weight: 900; border: none; cursor: pointer; box-shadow: 0 4px 0 #b91c1c;">End Now</button>
            </div>
        </div>
    </div>

    <!-- GAME CENTER SCREENS -->
    <main id="screen-gc-portal" class="screen"></main>
    <main id="screen-gc-arena" class="screen"></main>
    <main id="screen-gc-results" class="screen"></main>

    

`;
    function injectAppUI() {
        if (document.getElementById('screen-splash')) return;
        if (document.body) {
            while (appContainer.firstChild) { document.body.appendChild(appContainer.firstChild); }
        }
    }
    if (document.body) {
        injectAppUI();
    } else {
        document.addEventListener('DOMContentLoaded', injectAppUI);
    }

    // 3. Shared Game Logic
        "use strict";

        
        function initApp() {
            injectAppUI();
            renderSetupUI();
            if(typeof bindAvatarUploads === 'function') bindAvatarUploads();

            const enterBtn = document.getElementById('btn-enter-app');
            if (enterBtn) {
                enterBtn.addEventListener('click', () => { 
                    try { if(typeof SFX !== 'undefined' && SFX.click) SFX.click(); } catch(e){}
                    switchScreen('screen-mode-select'); 
                });
            }
            
            document.getElementById('btn-mode-prog').addEventListener('click', () => {
                SFX.click(); switchScreen('screen-progressive'); renderProgressiveMap();
            });
            document.getElementById('btn-mode-free').addEventListener('click', () => {
                SFX.click(); switchScreen('screen-start');
                document.getElementById('hw-teacher-panel').hidden = true;
                document.getElementById('start-title').textContent = "Challenge Setup ⚙️";
            });
            document.getElementById('btn-mode-hw').addEventListener('click', () => {
                SFX.click();
                switchScreen('screen-homework');
                if (typeof renderHomeworkCreator === 'function') renderHomeworkCreator();
            });
            
            parseURLModes();
            document.getElementById('btn-show-lb-splash').addEventListener('click', () => { SFX.click(); showLeaderboard('screen-splash'); });
            
            document.getElementById('btn-mode-theory')?.addEventListener('click', () => {
                SFX.click(); switchScreen('screen-theory-setup');
                if (typeof renderTheorySetupUI === 'function') renderTheorySetupUI();
            });
            document.getElementById('btn-start-theory-quiz')?.addEventListener('click', () => {
                if (typeof attemptStartTheoryGame === 'function') attemptStartTheoryGame();
            });
            document.getElementById('theory-student-name')?.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    if (typeof attemptStartTheoryGame === 'function') attemptStartTheoryGame();
                }
            });
            document.getElementById('btn-theory-select-all')?.addEventListener('click', () => {
                if (typeof setAllTheoryTopics === 'function') setAllTheoryTopics(true);
            });
            document.getElementById('btn-theory-deselect-all')?.addEventListener('click', () => {
                if (typeof setAllTheoryTopics === 'function') setAllTheoryTopics(false);
            });
            
            document.getElementById('btn-start-game').addEventListener('click', attemptStartGame);
            document.getElementById('student-name').addEventListener('keydown', (e) => { if(e.key === 'Enter') attemptStartGame(); });
            document.getElementById('prog-student-name')?.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    const unlockedLvl = typeof getUnlockedLevel === 'function' ? getUnlockedLevel() : 1;
                    const lvlIdx = Math.max(0, (LEVELS_CONFIG || []).findIndex(l => l.id === unlockedLvl));
                    if(typeof startProgressiveLevel === 'function') startProgressiveLevel(lvlIdx >= 0 ? lvlIdx : 0);
                }
            });

            // Global Enter key navigation
            function handleGlobalEnter(e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    const activeModal = document.querySelector('.modal-overlay.active, .modal-overlay[style*="flex"], #pause-modal[style*="flex"]');
                    if (activeModal && activeModal.style.display !== 'none' && !activeModal.hidden) return;

                    const splashScreen = document.getElementById('screen-splash');
                    const isSplashActive = splashScreen && (splashScreen.classList.contains('active') || (getComputedStyle(splashScreen).display !== 'none' && splashScreen.style.display !== 'none'));

                    if (isSplashActive) {
                        e.preventDefault();
                        try { if(typeof SFX !== 'undefined' && SFX.click) SFX.click(); } catch(err){}
                        switchScreen('screen-mode-select');
                        return;
                    }

                    const activeScreen = document.querySelector('.screen.active');
                    if (!activeScreen) return;

                    if (activeScreen.id === 'screen-mode-select') {
                        e.preventDefault();
                        try { if (typeof SFX !== 'undefined' && SFX.click) SFX.click(); } catch(err){}
                        switchScreen('screen-start');
                        const hwPanel = document.getElementById('hw-teacher-panel');
                        if (hwPanel) hwPanel.hidden = true;
                        const startTitle = document.getElementById('start-title');
                        if (startTitle) startTitle.textContent = "Challenge Setup ⚙️";
                        return;
                    } else if (activeScreen.id === 'screen-start') {
                        if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
                        e.preventDefault();
                        attemptStartGame();
                    } else if (activeScreen.id === 'screen-progressive') {
                        if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
                        e.preventDefault();
                        const unlockedLvl = typeof getUnlockedLevel === 'function' ? getUnlockedLevel() : 1;
                        const lvlIdx = Math.max(0, (LEVELS_CONFIG || []).findIndex(l => l.id === unlockedLvl));
                        if(typeof startProgressiveLevel === 'function') startProgressiveLevel(lvlIdx >= 0 ? lvlIdx : 0);
                    } else if (activeScreen.id === 'screen-game') {
                        const nextBtn = document.getElementById('btn-next-question');
                        if (nextBtn && nextBtn.style.display !== 'none' && !nextBtn.disabled) {
                            e.preventDefault();
                            nextBtn.click();
                        }
                    }
                }
            }

            window.addEventListener('keydown', handleGlobalEnter, true);

            setTimeout(() => {
                const btnEnter = document.getElementById('btn-enter-app');
                if (btnEnter) btnEnter.focus();
            }, 100);

            document.getElementById('btn-home-game').addEventListener('click', () => { SFX.click(); document.getElementById('exit-modal').classList.add('active'); });
            document.getElementById('btn-end-challenge').addEventListener('click', () => { SFX.click(); document.getElementById('exit-modal').classList.add('active'); });
            document.getElementById('btn-mute').addEventListener('click', () => {
                isMuted = !isMuted; const muteBtn = document.getElementById('btn-mute');
                muteBtn.classList.toggle('muted', isMuted); muteBtn.textContent = isMuted ? '🔇' : '🔊';
                showToast(isMuted ? 'Sound Muted' : 'Sound Enabled');
            });

                        document.getElementById('btn-pause').addEventListener('click', () => {
                if(typeof pauseGame === 'function') pauseGame();
            });
            document.getElementById('btn-resume').addEventListener('click', () => {
                if(typeof resumeGame === 'function') resumeGame();
            });
            document.getElementById('btn-end-game').addEventListener('click', () => {
                if(typeof quitGame === 'function') quitGame();
            });

            document.getElementById('example-selector').addEventListener('change', (e) => jumpToExample(e.target.value));
            document.getElementById('btn-prev').addEventListener('click', () => { SFX.click(); navQuestion(-1); });
            document.getElementById('btn-next').addEventListener('click', () => { SFX.click(); navQuestion(1); });

            ['hint', '5050', 'time', 'shield', 'freeze'].forEach(pu => {
                document.getElementById(`pu-${pu}`).addEventListener('click', () => usePowerUp(pu));
            });

            document.getElementById('btn-replay').addEventListener('click', () => { SFX.click(); switchScreen('screen-start'); });
            document.getElementById('btn-home-report').addEventListener('click', () => { SFX.click(); switchScreen('screen-start'); });
            document.getElementById('btn-lb-report').addEventListener('click', () => { SFX.click(); showLeaderboard('screen-report'); });
            document.getElementById('btn-home-lb').addEventListener('click', () => { SFX.click(); switchScreen('screen-start'); });
            document.getElementById('btn-clear-lb').addEventListener('click', () => {
                if(confirm("Are you sure you want to delete all local leaderboard data?")) {
                    writeStorage(LOCAL_STORAGE_KEY, { leaderboard: [] }); showLeaderboard('screen-start');
                }
            });

            document.getElementById('btn-cancel-exit').addEventListener('click', () => document.getElementById('exit-modal').classList.remove('active'));
            document.getElementById('btn-confirm-exit').addEventListener('click', () => {
                document.getElementById('exit-modal').classList.remove('active'); clearInterval(timerInterval); finishAndShowReport(true);
            });
            
            document.getElementById('q-img-element').onerror = function() {
                const q = session.playlist[session.playHead];
                if (q) {
                    this.onerror = null; 
                    this.src = `https://placehold.co/800x400/f8fafc/334155?text=${encodeURIComponent('Local Image Missing\n' + q.id)}`;
                }
            };

            // Gateway & Game Center Events
            const gateClassic = document.getElementById('gate-btn-classic');
            if (gateClassic) {
                gateClassic.onclick = () => {
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                    switchScreen('screen-splash');
                };
            }

            const gateGC = document.getElementById('gate-btn-gamecenter');
            if (gateGC) {
                gateGC.onclick = () => {
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                    if (window.GC_UI && typeof window.GC_UI.openPortal === 'function') {
                        window.GC_UI.openPortal();
                    }
                };
            }

            const splashGC = document.getElementById('btn-goto-gamecenter');
            if (splashGC) {
                splashGC.onclick = () => {
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
                    if (window.GC_UI && typeof window.GC_UI.openPortal === 'function') {
                        window.GC_UI.openPortal();
                    }
                };
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }







