/**
 * Progressive Mode Engine
 * Modes Layer: Worlds Roadmap, Stage Progression, Launch Dialog
 */

(function(window) {
    'use strict';

    let currentProgressiveStageInfo = null;

    function getProgressionData() {
        if (typeof window.StudentEngine !== 'undefined') {
            const prog = window.StudentEngine.getStudentProgress();
            return {
                completedStages: prog.completedStages || {},
                unlockedStageId: prog.unlockedStageId || 'stg_1_1'
            };
        }
        try {
            const raw = localStorage.getItem('tajweed_progressive_progress');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object') {
                    return {
                        completedStages: parsed.completedStages || {},
                        unlockedStageId: parsed.unlockedStageId || 'stg_1_1'
                    };
                }
            }
        } catch(e) {}
        return {
            completedStages: {},
            unlockedStageId: 'stg_1_1'
        };
    }

    function saveProgressionData(data) {
        if (typeof window.StudentEngine !== 'undefined') {
            const active = window.StudentEngine.getActiveStudent();
            if (active) {
                if (!active.progress) active.progress = {};
                active.progress.completedStages = data.completedStages || {};
                active.progress.unlockedStageId = data.unlockedStageId || 'stg_1_1';
                window.StudentEngine.save();
            }
        }
        try {
            localStorage.setItem('tajweed_progressive_progress', JSON.stringify(data));
        } catch(e) {}
    }

    function getUnlockedLevel() {
        const allStages = (typeof window.getAllProgressiveStages === 'function') 
            ? window.getAllProgressiveStages() 
            : [];
        const data = getProgressionData();
        const idx = allStages.findIndex(s => s.id === data.unlockedStageId);
        return idx >= 0 ? (idx + 1) : 1;
    }

    function setUnlockedLevel(lvl) {
        const allStages = (typeof window.getAllProgressiveStages === 'function') 
            ? window.getAllProgressiveStages() 
            : [];
        const target = allStages[lvl - 1];
        if (target) {
            const data = getProgressionData();
            data.unlockedStageId = target.id;
            saveProgressionData(data);
        }
    }

    function resetProgressiveData() {
        const active = typeof window.StudentEngine !== 'undefined' ? window.StudentEngine.getActiveStudent() : null;
        const name = active ? active.name : 'Student';
        const confirmMsg = `Are you sure you want to reset roadmap progress for ${name}? All stars and unlocked stages will be reset to Stage 1.`;
        const doReset = () => {
            if (typeof window.StudentEngine !== 'undefined') {
                window.StudentEngine.resetAllProgress();
            }
            localStorage.removeItem('tajweed_progressive_progress');
            localStorage.removeItem('tajweed_unlocked_level');
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
            renderProgressiveMap();
            if (typeof window.showToast === 'function') window.showToast(`Progress reset for ${name}! Starting from Stage 1.`);
        };

        if (typeof window.showAppConfirm === 'function') {
            window.showAppConfirm(confirmMsg, 'Reset Roadmap Progress', doReset);
        } else if (confirm(confirmMsg)) {
            doReset();
        }
    }

    function getProgressiveStagePool(world, stage) {
        const sub = stage.subcat || stage.subKey || null;
        let list = [];
        if (typeof window.QuestionRepository !== 'undefined') {
            list = window.QuestionRepository.getBySubRule(world.catKey, sub);
        } else {
            const cat = typeof window.TAJWEED_BANK !== 'undefined' ? window.TAJWEED_BANK[world.catKey] : null;
            list = cat?.questions || [];
            if (sub && typeof window.getSubQuestions === 'function') {
                list = window.getSubQuestions(world.catKey, sub, list);
            }
        }
        return list.map(q => ({
            ...q,
            categoryId: world.catKey,
            categoryTitle: world.title
        }));
    }

    function renderProgressiveMap() {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;
        mapContainer.innerHTML = '';

        const progData = getProgressionData();
        const allStages = (typeof window.getAllProgressiveStages === 'function') 
            ? window.getAllProgressiveStages() 
            : [];
        const activeStudent = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;

        // Auto-fill student name from active student
        const nameInput = document.getElementById('prog-student-name');
        if (nameInput && activeStudent) {
            nameInput.value = activeStudent.name;
            nameInput.oninput = () => {
                if (typeof window.StudentEngine !== 'undefined') {
                    window.StudentEngine.updateStudent(activeStudent.id, { name: nameInput.value.trim() });
                }
                const nameErr = document.getElementById('prog-name-error');
                if (nameErr) nameErr.hidden = true;
            };
        }

        // Calculate totals
        let totalStars = 0;
        let completedCount = 0;
        Object.values(progData.completedStages).forEach(info => {
            if (info.stars) totalStars += info.stars;
            if (info.stars >= 1) completedCount++;
        });

        const maxStars = allStages.length * 3;
        const progressPercent = Math.round((completedCount / allStages.length) * 100);

        // Current unlocked global index
        let currentUnlockedIdx = allStages.findIndex(s => s.id === progData.unlockedStageId);
        if (currentUnlockedIdx < 0) currentUnlockedIdx = 0;

        // Top Active Student Profile & Dashboard Card
        const dashboard = document.createElement('div');
        dashboard.className = 'prog-dashboard';
        dashboard.innerHTML = `
            <div class="prog-student-banner" style="display:flex; justify-content:space-between; align-items:center; background:white; padding:12px 18px; border-radius:16px; margin-bottom:15px; border:2px solid ${activeStudent?.color || '#2563eb'}; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:48px; height:48px; border-radius:50%; background:${activeStudent?.color || '#2563eb'}22; border:2px solid ${activeStudent?.color || '#2563eb'}; display:flex; align-items:center; justify-content:center; font-size:1.6rem;">
                        ${activeStudent?.avatar || '🦁'}
                    </div>
                    <div>
                        <div style="font-size:0.8rem; font-weight:800; color:#64748b; text-transform:uppercase;">Active Student</div>
                        <div style="font-size:1.25rem; font-weight:900; color:#0f172a;">${activeStudent?.name || 'Student'}</div>
                    </div>
                </div>
                <button type="button" class="btn-secondary" id="btn-switch-student-prog" style="padding:6px 14px; font-size:0.9rem; font-weight:800; border-radius:10px; display:flex; align-items:center; gap:6px;">
                    <span>👥</span> Switch Student
                </button>
            </div>

            <div class="prog-dash-stats">
                <div class="dash-stat-item stars" title="Total Stars Earned">
                    <span class="dash-icon">⭐</span>
                    <div class="dash-stat-val"><strong>${totalStars}</strong> <span class="stat-max">/ ${maxStars}</span></div>
                    <div class="dash-stat-lbl">Stars Earned</div>
                </div>
                <div class="dash-stat-item progress" title="Stages Completed">
                    <span class="dash-icon">🏆</span>
                    <div class="dash-stat-val"><strong>${completedCount}</strong> <span class="stat-max">/ ${allStages.length}</span></div>
                    <div class="dash-stat-lbl">Stages Cleared</div>
                </div>
            </div>
            <div class="prog-bar-container" title="Overall Roadmap Progress: ${progressPercent}%">
                <div class="prog-bar-track">
                    <div class="prog-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <div class="prog-bar-label">${progressPercent}% Completed (${completedCount}/${allStages.length} Stages)</div>
            </div>
            <div class="prog-dash-actions">
                <button class="btn-reset-prog" onclick="resetProgressiveData()">🔄 Reset Progress</button>
            </div>
        `;
        mapContainer.appendChild(dashboard);

        // Bind switch student button
        dashboard.querySelector('#btn-switch-student-prog')?.addEventListener('click', () => {
            if (typeof window.StudentModal !== 'undefined') {
                window.StudentModal.open('roster');
            }
        });

        // Render Worlds Roadmap
        const worlds = window.PROGRESSIVE_WORLDS || [];
        worlds.forEach((world, wIdx) => {
            const worldCard = document.createElement('section');
            worldCard.className = 'world-card';
            worldCard.style.setProperty('--world-accent', world.color);

            // Compute world completion
            let worldCompletedStages = 0;
            world.stages.forEach(stg => {
                if (progData.completedStages[stg.id] && progData.completedStages[stg.id].stars >= 1) {
                    worldCompletedStages++;
                }
            });

            const isWorldComplete = worldCompletedStages === world.stages.length;
            const worldStatusBadge = isWorldComplete ?
                `<span class="world-status-badge completed">✓ World Cleared (${worldCompletedStages}/${world.stages.length})</span>` :
                `<span class="world-status-badge in-progress">${worldCompletedStages}/${world.stages.length} Cleared</span>`;

            worldCard.innerHTML = `
                <div class="world-header">
                    <div class="world-meta">
                        <div class="world-icon-box" style="background: ${world.color}18; border-color: ${world.color};">
                            <span class="world-icon">${world.icon}</span>
                        </div>
                        <div class="world-titles">
                            <div class="world-tag" style="color:${world.color};">WORLD ${wIdx + 1}</div>
                            <h2 class="world-title">${world.title}</h2>
                            <p class="world-desc">${world.desc}</p>
                        </div>
                    </div>
                    <div class="world-badge-wrap">${worldStatusBadge}</div>
                </div>
                <div class="stage-track-wrap">
                    <div class="stage-track" id="track-${world.id}"></div>
                </div>
            `;

            const track = worldCard.querySelector(`#track-${world.id}`);

            world.stages.forEach((stg, sIdx) => {
                const gIdx = allStages.findIndex(s => s.id === stg.id);
                const isCompleted = progData.completedStages[stg.id] && progData.completedStages[stg.id].stars >= 1;
                const isCurrent = gIdx === currentUnlockedIdx;
                const isLocked = gIdx > currentUnlockedIdx;

                const stgData = progData.completedStages[stg.id] || { stars: 0, score: 0 };
                const stars = stgData.stars || 0;

                const node = document.createElement('div');
                node.className = `stage-node ${isLocked ? 'locked' : isCompleted ? 'completed' : 'unlocked'}${isCurrent ? ' current-focus' : ''}`;
                node.setAttribute('data-stage-id', stg.id);

                let starString = '';
                for (let i = 1; i <= 3; i++) {
                    starString += `<span class="star-icon ${i <= stars ? 'earned' : 'empty'}">★</span>`;
                }

                const nodeIcon = isLocked ? '🔒' : isCompleted ? '✅' : '▶';
                const actionText = isLocked ? 'Locked' : isCompleted ? 'Replay 🔄' : 'PLAY ▶';

                node.innerHTML = `
                    <div class="stage-node-left">
                        <div class="stage-pill">${wIdx + 1}.${sIdx + 1}</div>
                        <div class="stage-indicator">${nodeIcon}</div>
                    </div>
                    <div class="stage-node-center">
                        <div class="stage-name">${stg.name}</div>
                        <div class="stage-subdesc">${stg.desc}</div>
                        <div class="stage-stars-row">${starString}</div>
                    </div>
                    <div class="stage-node-right">
                        <button class="stage-action-btn" ${isLocked ? 'disabled' : ''}>${actionText}</button>
                    </div>
                `;

                if (!isLocked) {
                    node.onclick = () => {
                        if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
                        openStageLaunchModal(wIdx, sIdx);
                    };
                }

                track.appendChild(node);
            });

            mapContainer.appendChild(worldCard);
        });

        // Auto scroll to current active stage
        setTimeout(() => {
            const currentEl = document.querySelector('.stage-node.current-focus');
            if (currentEl) {
                currentEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }

    function openStageLaunchModal(worldIdx, stageIdx) {
        const worlds = window.PROGRESSIVE_WORLDS || [];
        const world = worlds[worldIdx];
        if (!world) return;
        const stage = world.stages[stageIdx];
        if (!stage) return;

        const pool = getProgressiveStagePool(world, stage);
        if (!pool || pool.length === 0) {
            if (typeof window.showToast === 'function') window.showToast("Stage questions could not be loaded.", true);
            else if (typeof window.showAppAlert === 'function') window.showAppAlert("Stage questions could not be loaded.", "Error");
            else alert("Stage questions could not be loaded.");
            return;
        }

        const defaultQty = stage.qty || Math.min(pool.length, 6);
        let chosenQty = defaultQty;

        const baseOptions = [6, 10, 15, 20, 25, 30];
        const availableOptions = [];

        if (!baseOptions.includes(defaultQty) && defaultQty <= pool.length) {
            availableOptions.push(defaultQty);
        }
        baseOptions.forEach(opt => {
            if (opt <= pool.length && !availableOptions.includes(opt)) {
                availableOptions.push(opt);
            }
        });
        availableOptions.sort((a, b) => a - b);

        const existing = document.getElementById('stage-launch-modal');
        if (existing) existing.remove();

        const dialog = document.createElement('div');
        dialog.id = 'stage-launch-modal';
        dialog.className = 'modal-overlay';
        dialog.style.display = 'flex';
        dialog.style.zIndex = '10000';

        dialog.innerHTML = `
            <div class="modal-content animate-pop" style="max-width: 480px; text-align: center; padding: 24px; border-radius: 20px; border: 3px solid ${world.color};">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">${world.icon}</div>
                <div style="font-size: 0.85rem; font-weight: 800; color: ${world.color}; text-transform: uppercase;">World ${worldIdx + 1}: ${world.title}</div>
                <h2 style="font-size: 1.6rem; font-weight: 900; color: #1e293b; margin: 4px 0 8px 0;">${stage.name}</h2>
                <p style="font-size: 0.95rem; color: #64748b; font-weight: 700; margin-bottom: 16px;">${stage.desc}</p>

                <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 14px; margin-bottom: 20px;">
                    <div style="font-size: 0.95rem; font-weight: 800; color: #334155; margin-bottom: 10px;">
                        Available Examples in Pool: <span style="color: #2563eb; background: #dbeafe; padding: 2px 10px; border-radius: 999px;">${pool.length} Examples</span>
                    </div>
                    <div style="font-size: 0.85rem; color: #64748b; font-weight: 700; margin-bottom: 10px;">Select number of examples to practice:</div>
                    <div class="stage-qty-chips" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;" id="stage-chips-wrap">
                        ${availableOptions.map(opt => `
                            <button type="button" class="stage-chip-btn ${opt === chosenQty ? 'active' : ''}" data-qty="${opt}" style="padding: 8px 14px; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; border: 2px solid ${opt === chosenQty ? '#2563eb' : '#cbd5e1'}; background: ${opt === chosenQty ? '#2563eb' : 'white'}; color: ${opt === chosenQty ? 'white' : '#334155'};">
                                ${opt} Examples ${opt === defaultQty ? '⭐ (Default)' : ''}
                            </button>
                        `).join('')}
                        ${pool.length > 0 ? `
                            <button type="button" class="stage-chip-btn ${chosenQty === pool.length && !availableOptions.includes(pool.length) ? 'active' : ''}" data-qty="${pool.length}" style="padding: 8px 14px; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; border: 2px solid #cbd5e1; background: white; color: #334155;">
                                All (${pool.length}) 🔥
                            </button>
                        ` : ''}
                    </div>
                </div>

                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button type="button" class="btn-secondary" id="btn-cancel-stage-launch" style="flex: 1; padding: 12px; border-radius: 12px; font-weight: 800;">Cancel</button>
                    <button type="button" class="btn-start" id="btn-confirm-stage-launch" style="flex: 2; padding: 12px; font-size: 1.15rem; border-radius: 12px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; font-weight: 900; box-shadow: 0 4px 0 #1e40af; cursor: pointer;">
                        Start Lesson 🚀
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        dialog.querySelectorAll('.stage-chip-btn').forEach(chip => {
            chip.onclick = () => {
                dialog.querySelectorAll('.stage-chip-btn').forEach(c => {
                    c.style.background = 'white';
                    c.style.color = '#334155';
                    c.style.borderColor = '#cbd5e1';
                    c.classList.remove('active');
                });
                chip.style.background = '#2563eb';
                chip.style.color = 'white';
                chip.style.borderColor = '#2563eb';
                chip.classList.add('active');
                chosenQty = parseInt(chip.dataset.qty);
            };
        });

        dialog.querySelector('#btn-cancel-stage-launch').onclick = () => dialog.remove();
        dialog.querySelector('#btn-confirm-stage-launch').onclick = () => {
            dialog.remove();
            startProgressiveStage(worldIdx, stageIdx, chosenQty);
        };
    }

    function startProgressiveStage(worldIdx, stageIdx, overrideQty = null) {
        const worlds = window.PROGRESSIVE_WORLDS || [];
        const world = worlds[worldIdx];
        if (!world) return;
        const stage = world.stages[stageIdx];
        if (!stage) return;

        const activeStudent = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;
        let name = activeStudent ? activeStudent.name : (localStorage.getItem('tajweed_player_name') || 'Student');
        name = name.replace(/\s+/g, ' ');

        const pool = getProgressiveStagePool(world, stage);
        if (pool.length === 0) {
            if (typeof window.showToast === 'function') window.showToast("Stage questions could not be loaded.", true);
            else if (typeof window.showAppAlert === 'function') window.showAppAlert("Stage questions could not be loaded.", "Error");
            else alert("Stage questions could not be loaded.");
            return;
        }

        window.isProgressiveMode = true;
        window.isHomeworkMode = false;
        currentProgressiveStageInfo = {
            worldIdx,
            stageIdx,
            world,
            stage,
            stageId: stage.id
        };

        window.session.studentName = name;
        window.session.studentAvatar = activeStudent ? activeStudent.avatar : (typeof window.currentStudentAvatar !== 'undefined' ? window.currentStudentAvatar : null);
        window.TIME_LIMIT = 30;
        window.hasShield = false;

        const questionCount = overrideQty ? Math.min(overrideQty, pool.length) : (stage.qty || pool.length);
        let mixed = (typeof window.smartMix === 'function') ? window.smartMix(pool) : pool;
        let finalPlaylist = mixed.slice(0, questionCount);
        if (typeof window.initGameSession === 'function') {
            window.initGameSession(false, finalPlaylist);
        }
    }

    function startProgressiveLevel(index) {
        const allStages = (typeof window.getAllProgressiveStages === 'function') ? window.getAllProgressiveStages() : [];
        const stg = allStages[index] || allStages[0];
        if (stg) {
            openStageLaunchModal(stg.worldIdx, stg.stageIdx);
        }
    }

    window.getProgressionData = getProgressionData;
    window.saveProgressionData = saveProgressionData;
    window.getUnlockedLevel = getUnlockedLevel;
    window.setUnlockedLevel = setUnlockedLevel;
    window.resetProgressiveData = resetProgressiveData;
    window.getProgressiveStagePool = getProgressiveStagePool;
    window.renderProgressiveMap = renderProgressiveMap;
    window.openStageLaunchModal = openStageLaunchModal;
    window.startProgressiveStage = startProgressiveStage;
    window.startProgressiveLevel = startProgressiveLevel;

})(typeof window !== 'undefined' ? window : this);
