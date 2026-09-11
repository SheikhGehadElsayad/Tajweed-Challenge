/* =========================================================
   PROGRESSIVE MODE & ROADMAP ENGINE
   9 Worlds • 46 Gamified Stages
========================================================= */

const PROGRESSIVE_WORLDS = [
    {
        id: 'world_1',
        catKey: 'image_bank',
        title: 'Noon & Meem Mushaddad',
        icon: '💎',
        color: '#06b6d4',
        desc: 'Master the 2-count ghunnah on Noon & Meem Mushaddadah',
        stages: [
            { id: 'stg_1_1', name: 'Noon Mushaddadah', desc: 'Identify Noon with Shaddah (2-count ghunnah)', subcat: 'Noon Mushaddad', qty: 6 },
            { id: 'stg_1_2', name: 'Meem Mushaddadah', desc: 'Identify Meem with Shaddah (2-count ghunnah)', subcat: 'Meem Mushaddad', qty: 8 },
            { id: 'stg_1_3', name: 'Mushaddad Mastery', desc: 'Combined challenge on all Noon & Meem Mushaddadah', subKey: 'Two counts of ghunna', qty: 10 }
        ]
    },
    {
        id: 'world_2',
        catKey: 'qalqalah',
        title: 'Qalqalah',
        icon: '⚡',
        color: '#f59e0b',
        desc: 'Echoing sound on the letters of Qutb Jad (ق، ط، ب، ج، د)',
        stages: [
            { id: 'stg_2_1', name: 'General Qalqalah', desc: 'Identify whether the word contains Qalqalah or not', subKey: 'General Qalqalah', qty: 10 },
            { id: 'stg_2_2', name: 'Minor Qalqalah (Sughra)', desc: 'Qalqalah letter with Sukoon in the middle of a word or sentence', subKey: 'Minor', qty: 10 },
            { id: 'stg_2_3', name: 'Medium Qalqalah (Wusta)', desc: 'Stopping on an un-doubled Qalqalah letter at the end of a word', subKey: 'Medium', qty: 10 },
            { id: 'stg_2_4', name: 'Major Qalqalah (Kubra)', desc: 'Stopping on a doubled (mushaddad) Qalqalah letter', subKey: 'Major', qty: 5 }
        ]
    },
    {
        id: 'world_3',
        catKey: 'meem_sakinah',
        title: 'Meem Sakinah',
        icon: '🌙',
        color: '#8b5cf6',
        desc: 'The three rules of Meem Saakinah: Ikhfaa, Idgham, and Izhar Shafawi',
        stages: [
            { id: 'stg_3_1', name: 'Ikhfaa Shafawi', desc: 'Meem Saakinah followed by letter Baa (ب)', subKey: 'Oral + Hiding', qty: 8 },
            { id: 'stg_3_2', name: 'Idgham Shafawi', desc: 'Meem Saakinah followed by another Meem (م)', subKey: 'Oral + Merger', qty: 8 },
            { id: 'stg_3_3', name: 'Izhar Shafawi', desc: 'Meem Saakinah followed by all other letters', subKey: 'Oral + Clarity', qty: 8 }
        ]
    },
    {
        id: 'world_4',
        catKey: 'noon_sakinah_tanween',
        title: 'Noon Sakinah & Tanween',
        icon: '📖',
        color: '#10b981',
        desc: 'The fundamental rules of Noon Saakinah and Tanween',
        stages: [
            { id: 'stg_4_1', name: 'Izhar Halqi', desc: 'Clear pronunciation with throat letters (ء، هـ، ع، ح، غ، خ)', subKey: 'Izhar', qty: 10 },
            { id: 'stg_4_2', name: 'Idgham with Ghunnah', desc: 'Merging with nasalization in letters Yanmoo (ي، ن، م، و)', subKey: 'Idgham with Ghunnah', qty: 10 },
            { id: 'stg_4_3', name: 'Idgham without Ghunnah', desc: 'Complete merging without nasal sound in Laam (ل) and Raa (ر)', subKey: 'Idgham without Ghunnah', qty: 10 },
            { id: 'stg_4_4', name: 'Iqlab', desc: 'Converting Noon or Tanween into a Meem before Baa (ب)', subKey: 'Iqlab', qty: 8 },
            { id: 'stg_4_5', name: 'Ikhfaa Haqiqi', desc: 'Concealing the Noon sound before the 15 Ikhfaa letters', subKey: 'Ikhfa', qty: 10 },
            { id: 'stg_4_6', name: 'Izhar Mutlaq', desc: 'Noon Saakinah followed by Waw or Yaa in a single word', subKey: 'Izhar Mutlaq', qty: 4 },
            { id: 'stg_4_7', name: 'Ikhfaa Ghunnah', desc: 'Distinguish between Heavy and Light Ghunnah of Ikhfaa', subKey: 'Ikhfa Ghunnah', qty: 10 }
        ]
    },
    {
        id: 'world_5',
        catKey: 'tafkheem_tarqeeq',
        title: 'Tafkheem & Tarqeeq',
        icon: '⚖️',
        color: '#ec4899',
        desc: 'Heaviness and Lightness of Arabic letters, Raa, and Laam of Allah',
        stages: [
            { id: 'stg_5_1', name: 'Always Heavy Letters', desc: 'The seven permanent heavy letters (خص ضغط قظ)', subKey: 'Always Heavy', qty: 8 },
            { id: 'stg_5_2', name: 'Heavy Raa (Tafkheem)', desc: 'Cases where letter Raa is pronounced heavy (Fathah, Dammah, etc.)', subKey: 'Heavy Ra', qty: 10 },
            { id: 'stg_5_3', name: 'Light Raa (Tarqeeq)', desc: 'Cases where letter Raa is pronounced light (Kasrah, etc.)', subKey: 'Light Ra', qty: 8 },
            { id: 'stg_5_4', name: 'Raa: Both Options', desc: 'Words where Raa can be read with either Tafkheem or Tarqeeq', subKey: 'Ra Both Options', qty: 6 },
            { id: 'stg_5_5', name: 'Laam of Allah', desc: 'Heaviness or Lightness of the Laam in the Divine Name', subKey: 'Lam of Allah', qty: 10 },
            { id: 'stg_5_6', name: 'Alif of Madd', desc: 'Alif follows the letter preceding it in heaviness and lightness', subKey: 'Alif', qty: 7 }
        ]
    },
    {
        id: 'world_6',
        catKey: 'madd_rules',
        title: 'Madd Rules',
        icon: '🌊',
        color: '#3b82f6',
        desc: 'Comprehensive rules of Natural, Secondary, and Compulsory Prolongation',
        stages: [
            { id: 'stg_6_1', name: 'Natural Madd (Tabee\'ee)', desc: 'The basic two-count prolongation on Alif, Waw, and Yaa', subKey: 'Natural Madd', qty: 10 },
            { id: 'stg_6_2', name: 'Connected Madd (Muttasil)', desc: 'Madd letter followed by Hamzah in the same word (4-5 counts)', subKey: 'Connected', qty: 10 },
            { id: 'stg_6_3', name: 'Separated Madd (Munfasil)', desc: 'Madd letter followed by Hamzah in the next word (4-5 counts)', subKey: 'Separated', qty: 10 },
            { id: 'stg_6_4', name: 'Substitute Madd (Badal)', desc: 'Hamzah precedes the Madd letter in the same word (2 counts)', subKey: 'Substitute', qty: 10 },
            { id: 'stg_6_5', name: 'Compensatory Madd (\'Iwad)', desc: 'Stopping on Tanween Fath replaced with two-count Alif', subKey: 'Compensatory Madd', qty: 10 },
            { id: 'stg_6_6', name: 'Temporary Madd (\'Aarid)', desc: 'Temporary Sukoon caused by stopping at the end of a word (2/4/6 counts)', subKey: 'Temporary Madd', qty: 10 },
            { id: 'stg_6_7', name: 'Soft Madd (Leen)', desc: 'Saakin Waw or Yaa preceded by Fathah before a stopping Sukoon', subKey: 'Soft Madd', qty: 10 },
            { id: 'stg_6_8', name: 'Minor Sila Madd', desc: 'Pronoun Haa between two vowels without following Hamzah (2 counts)', subKey: 'Minor Sila Madd', qty: 7 },
            { id: 'stg_6_9', name: 'Major Sila Madd', desc: 'Pronoun Haa followed by Hamzah in the next word (4-5 counts)', subKey: 'Major Sila Madd', qty: 8 },
            { id: 'stg_6_10', name: 'Compulsory Word Heavy', desc: 'Madd followed by Shaddah in a word (6 counts compulsory)', subKey: 'Permanent Word Based Heavy', qty: 10 },
            { id: 'stg_6_11', name: 'Compulsory Word Light', desc: 'Madd followed by un-doubled Sukoon in a word (6 counts)', subKey: 'Permanent Word Based Light', qty: 2 },
            { id: 'stg_6_12', name: 'Compulsory Letter Heavy', desc: 'Disjointed opening letters with Idgham (e.g. Laam in Alif-Laam-Meem)', subKey: 'Permanent Letter Based Heavy', qty: 4 },
            { id: 'stg_6_13', name: 'Compulsory Letter Light', desc: 'Disjointed opening letters without Idgham (e.g. Qaf, Saad, Noon)', subKey: 'Permanent Letter Based Light', qty: 10 },
            { id: 'stg_6_14', name: 'Stabilizing Madd (Tamkeen)', desc: 'Two consecutive Yaas or Waws to prevent dropping the elongation', subKey: 'Stabilizing Madd', qty: 4 }
        ]
    },
    {
        id: 'world_7',
        catKey: 'hamzat_wasl',
        title: 'Hamzat Al-Wasl',
        icon: '🔗',
        color: '#6366f1',
        desc: 'Pronunciation and vowelization rules of the connecting Hamzah',
        stages: [
            { id: 'stg_7_1', name: 'Dropped in Connection', desc: 'Dropped in speech when reading through from the preceding word', subKey: 'Dropped', qty: 8 },
            { id: 'stg_7_2', name: 'Start with Fathah', desc: 'Always begins with Fathah in the definite article (Al-)', subKey: 'Start with fatha', qty: 8 },
            { id: 'stg_7_3', name: 'Start with Dammah', desc: 'Begins with Dammah in verbs whose 3rd letter has an original Dammah', subKey: 'Start with damma', qty: 8 },
            { id: 'stg_7_4', name: 'Start with Kasrah', desc: 'Begins with Kasrah in regular verbs and irregular Quranic nouns', subKey: 'Start with kasra', qty: 10 }
        ]
    },
    {
        id: 'world_8',
        catKey: 'lam_shamsiyyah_qamariyyah',
        title: 'Lam Shamsiyyah & Qamariyyah',
        icon: '☀️',
        color: '#ea580c',
        desc: 'Solar and Lunar letters in the definite article (Al-)',
        stages: [
            { id: 'stg_8_1', name: 'Lam Shamsiyyah (Solar)', desc: 'Laam merges completely into the following solar letter (with Shaddah)', subKey: 'Lam Shamsiyyah', qty: 8 },
            { id: 'stg_8_2', name: 'Lam Qamariyyah (Lunar)', desc: 'Laam is clearly articulated before the 14 lunar letters', subKey: 'Lam Qamariyyah', qty: 8 }
        ]
    },
    {
        id: 'world_9',
        catKey: 'letter_relations',
        title: 'Relations Between Letters',
        icon: '🤝',
        color: '#14b8a6',
        desc: 'Mutamathilayn, Mutajanisayn, and Mutaqaribayn letters',
        stages: [
            { id: 'stg_9_1', name: 'Identical (Mutamathilayn)', desc: 'Two identical letters meeting (same articulation point & characteristics)', subKey: 'Identical', qty: 10 },
            { id: 'stg_9_2', name: 'Homogeneous (Mutajanisayn)', desc: 'Letters sharing the same articulation point but differing in characteristics', subKey: 'Similar', qty: 8 },
            { id: 'stg_9_3', name: 'Close (Mutaqaribayn)', desc: 'Letters close in articulation point or characteristics', subKey: 'Close', qty: 6 }
        ]
    }
];

let currentProgressiveStageInfo = null;

function getAllProgressiveStages() {
    const list = [];
    PROGRESSIVE_WORLDS.forEach((world, worldIdx) => {
        world.stages.forEach((stage, stageIdx) => {
            list.push({
                worldIdx,
                stageIdx,
                world,
                stage,
                id: stage.id,
                globalIdx: list.length
            });
        });
    });
    return list;
}

// Backwards-compatibility alias for legacy bindings
const LEVELS_CONFIG = getAllProgressiveStages().map((s, idx) => ({
    id: idx + 1,
    title: `${s.world.title} - ${s.stage.name}`,
    desc: s.stage.desc,
    stageInfo: s
}));

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
    const allStages = getAllProgressiveStages();
    const data = getProgressionData();
    const idx = allStages.findIndex(s => s.id === data.unlockedStageId);
    return idx >= 0 ? (idx + 1) : 1;
}

function setUnlockedLevel(lvl) {
    const allStages = getAllProgressiveStages();
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
    if (confirm(`Are you sure you want to reset roadmap progress for ${name}? All stars and unlocked stages will be reset to Stage 1.`)) {
        if (typeof window.StudentEngine !== 'undefined') {
            window.StudentEngine.resetAllProgress();
        }
        localStorage.removeItem('tajweed_progressive_progress');
        localStorage.removeItem('tajweed_unlocked_level');
        if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
        renderProgressiveMap();
        if (typeof showToast === 'function') showToast(`Progress reset for ${name}! Starting from Stage 1.`);
    }
}

function getProgressiveStagePool(world, stage) {
    const cat = TAJWEED_BANK[world.catKey];
    if (!cat || !cat.questions) return [];
    if (stage.subcat) {
        return cat.questions.filter(q => q.subcat === stage.subcat).map(q => ({
            ...q,
            categoryId: world.catKey,
            categoryTitle: world.title
        }));
    }
    if (stage.subKey) {
        return getSubQuestions(world.catKey, stage.subKey, cat.questions).map(q => ({
            ...q,
            categoryId: world.catKey,
            categoryTitle: world.title
        }));
    }
    return cat.questions.map(q => ({
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
    const allStages = getAllProgressiveStages();
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
    PROGRESSIVE_WORLDS.forEach((world, wIdx) => {
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
                    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
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

/**
 * Modern Stage Launch Dialog allowing dynamic choice of question quantity
 */
function openStageLaunchModal(worldIdx, stageIdx) {
    const world = PROGRESSIVE_WORLDS[worldIdx];
    if (!world) return;
    const stage = world.stages[stageIdx];
    if (!stage) return;

    const pool = getProgressiveStagePool(world, stage);
    if (!pool || pool.length === 0) {
        alert("Stage questions could not be loaded.");
        return;
    }

    // Default stage quantity
    const defaultQty = stage.qty || Math.min(pool.length, 6);
    let chosenQty = defaultQty;

    // Available quantities: [6, 10, 15, 20, 25, 30, 'all'] filtered by <= pool.length
    const baseOptions = [6, 10, 15, 20, 25, 30];
    const availableOptions = [];

    // Ensure defaultQty is present
    if (!baseOptions.includes(defaultQty) && defaultQty <= pool.length) {
        availableOptions.push(defaultQty);
    }
    baseOptions.forEach(opt => {
        if (opt <= pool.length && !availableOptions.includes(opt)) {
            availableOptions.push(opt);
        }
    });
    availableOptions.sort((a, b) => a - b);

    // Remove any existing launch dialog
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

    // Chip click handling
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
    const world = PROGRESSIVE_WORLDS[worldIdx];
    if (!world) return;
    const stage = world.stages[stageIdx];
    if (!stage) return;

    const activeStudent = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;
    let name = activeStudent ? activeStudent.name : (localStorage.getItem('tajweed_player_name') || 'Student');
    name = name.replace(/\s+/g, ' ');

    const pool = getProgressiveStagePool(world, stage);
    if (pool.length === 0) {
        alert("Stage questions could not be loaded.");
        return;
    }

    isProgressiveMode = true;
    isHomeworkMode = false;
    currentProgressiveStageInfo = {
        worldIdx,
        stageIdx,
        world,
        stage,
        stageId: stage.id
    };

    session.studentName = name;
    session.studentAvatar = activeStudent ? activeStudent.avatar : (typeof currentStudentAvatar !== 'undefined' ? currentStudentAvatar : null);
    TIME_LIMIT = 30;
    hasShield = false;

    const questionCount = overrideQty ? Math.min(overrideQty, pool.length) : (stage.qty || pool.length);
    let mixed = smartMix(pool);
    let finalPlaylist = mixed.slice(0, questionCount);
    initGameSession(false, finalPlaylist);
}

// Legacy alias
function startProgressiveLevel(index) {
    const allStages = getAllProgressiveStages();
    const stg = allStages[index] || allStages[0];
    if (stg) {
        openStageLaunchModal(stg.worldIdx, stg.stageIdx);
    }
}

// Short rule code mapping for ultra-compact homework links
const HW_RULE_CODES = {
    'im': 'image_bank',
    'ql': 'qalqalah',
    'ms': 'meem_sakinah',
    'ns': 'noon_sakinah_tanween',
    'tt': 'tafkheem_tarqeeq',
    'md': 'madd_rules',
    'hw': 'hamzat_wasl',
    'lq': 'lam_shamsiyyah_qamariyyah',
    'lr': 'letter_relations'
};
const HW_CODES_REVERSE = Object.fromEntries(Object.entries(HW_RULE_CODES).map(([k, v]) => [v, k]));

function getPublicAppBaseUrl() {
    if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'https://sheikhgehadelsayad.github.io/Tajweed-Challenge/';
    }
    return window.location.origin + window.location.pathname;
}

function renderHomeworkCreator() {
    const root = document.getElementById('hw-creator-root');
    if (!root) return;

    const teacherInfo = (typeof window.StudentEngine !== 'undefined') 
        ? window.StudentEngine.getTeacherInfo() 
        : { name: 'Sheikh Gehad Elsayad', whatsapp: '+201099684126', email: 'gehadnagah789@gmail.com' };

    let teacherDisplayName = teacherInfo.name || 'Sheikh Gehad Elsayad';
    if (teacherDisplayName.includes('جهاد') || teacherDisplayName.includes('الصياد')) {
        teacherDisplayName = 'Sheikh Gehad Elsayad';
    }

    const badgeEl = document.getElementById('hw-active-teacher-badge');
    if (badgeEl) {
        badgeEl.innerHTML = `👨‍🏫 Teacher: <strong>${teacherDisplayName}</strong>`;
    }

    const students = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getAllStudents() : [];
    const activeStudent = (typeof window.StudentEngine !== 'undefined') ? window.StudentEngine.getActiveStudent() : null;

    const categoriesDef = (typeof window.RuleSelectorEngine !== 'undefined' && window.RuleSelectorEngine.definitions) 
        ? window.RuleSelectorEngine.definitions 
        : [];

    root.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 20px;">
            
            <!-- Step 1: Select Student -->
            <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <label for="hw-student-select" style="font-size: 1.05rem; font-weight: 900; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                        <span>👤</span> 1. Select Target Student:
                    </label>
                    <button type="button" onclick="if(typeof window.StudentModal!=='undefined') window.StudentModal.open('roster');" style="background: white; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 3px 10px; font-size: 0.8rem; font-weight: 800; color: #2563eb; cursor: pointer;">
                        👥 Manage Profiles
                    </button>
                </div>

                <select id="hw-student-select" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-weight: 800; font-size: 1rem; color: #1e293b; background: white; cursor: pointer;">
                    ${students.length > 0 ? students.map(s => `
                        <option value="${s.name}" ${activeStudent && activeStudent.id === s.id ? 'selected' : ''}>
                            ${s.avatar || '👤'} ${s.name} (${s.mistakes?.length || 0} mistakes • ${s.homeworks?.length || 0} HWs)
                        </option>
                    `).join('') : `
                        <option value="Student">👤 Student</option>
                    `}
                    <option value="__NEW__">➕ [ Add / Enter New Student Name ]</option>
                </select>

                <div id="hw-custom-student-container" style="display: none; margin-top: 10px;">
                    <input type="text" id="hw-custom-student-input" placeholder="Type student full name..." maxlength="30" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 2px solid #3b82f6; font-weight: 800; font-size: 0.95rem;">
                </div>
            </div>

            <!-- Step 2: Tajweed Rules & Sub-Rules Selection -->
            <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                    <div>
                        <label style="font-size: 1.05rem; font-weight: 900; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                            <span>📜</span> 2. Choose Tajweed Rules & Sub-Rules:
                        </label>
                        <span style="font-size: 0.8rem; color: #64748b; font-weight: 700;">Expand any rule to assign specific sub-topics instead of all questions</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" id="hw-btn-rules-all" style="background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 6px; padding: 4px 12px; font-size: 0.82rem; font-weight: 800; cursor: pointer;">Select All</button>
                        <button type="button" id="hw-btn-rules-clear" style="background: white; color: #64748b; border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px 12px; font-size: 0.82rem; font-weight: 800; cursor: pointer;">Clear All</button>
                    </div>
                </div>

                <div id="hw-rules-container" style="display: flex; flex-direction: column; gap: 10px; max-height: 480px; overflow-y: auto; padding-right: 4px;">
                    ${categoriesDef.map((cat, catIdx) => {
                        const count = (typeof TAJWEED_BANK !== 'undefined' && TAJWEED_BANK[cat.id]?.questions?.length) || 0;
                        const isDefault = (cat.id === 'qalqalah' || cat.id === 'noon_sakinah_tanween');
                        const catCode = HW_CODES_REVERSE[cat.id] || cat.id;

                        return `
                            <div class="hw-category-block" data-cat="${cat.id}" data-code="${catCode}" style="background: white; border: 1.5px solid ${isDefault ? '#3b82f6' : '#cbd5e1'}; border-radius: 12px; padding: 12px; transition: all 0.15s ease;">
                                <!-- Category Main Row -->
                                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1; user-select: none;">
                                        <input type="checkbox" class="hw-main-cat-cb" value="${catCode}" ${isDefault ? 'checked' : ''} style="width: 19px; height: 19px; cursor: pointer; accent-color: #2563eb;">
                                        <div>
                                            <span style="font-weight: 900; font-size: 0.95rem; color: #1e293b;">${cat.icon || '📖'} ${cat.title}</span>
                                            <span style="font-size: 0.78rem; color: #64748b; font-weight: 700; margin-left: 6px;">(${count} Questions)</span>
                                        </div>
                                    </label>
                                    ${cat.subrules && cat.subrules.length > 0 ? `
                                        <button type="button" class="hw-toggle-subrules" style="background: #f1f5f9; color: #3b82f6; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 8px; font-size: 0.78rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                                            <span>Sub-rules (${cat.subrules.length})</span> <span class="hw-arrow">▼</span>
                                        </button>
                                    ` : ''}
                                </div>

                                <!-- Sub-rules Drawer -->
                                ${cat.subrules && cat.subrules.length > 0 ? `
                                    <div class="hw-subrules-drawer" style="display: none; margin-top: 10px; padding-top: 10px; border-top: 1px solid #f1f5f9; padding-left: 28px;">
                                        <div style="font-size: 0.75rem; color: #64748b; font-weight: 800; margin-bottom: 6px;">Choose specific sub-topics:</div>
                                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 6px;">
                                            ${cat.subrules.map((sub, subIdx) => {
                                                let subCount = 0;
                                                if (typeof window.RuleSelectorEngine !== 'undefined') {
                                                    const qList = (typeof TAJWEED_BANK !== 'undefined' && TAJWEED_BANK[cat.id]?.questions) || [];
                                                    subCount = window.RuleSelectorEngine.filterSubQuestions(cat.id, sub.key, qList).length;
                                                }
                                                return `
                                                    <label style="display: flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 700; color: #334155; cursor: pointer; background: #f8fafc; padding: 5px 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                                        <input type="checkbox" class="hw-sub-cb" data-cat="${cat.id}" data-idx="${subIdx}" data-sub="${sub.key}" ${isDefault ? 'checked' : ''} style="width: 15px; height: 15px; cursor: pointer; accent-color: #2563eb;">
                                                        <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${sub.label}">
                                                            ${sub.label} <span style="color: #94a3b8; font-size: 0.72rem;">(${subCount})</span>
                                                        </span>
                                                    </label>
                                                `;
                                            }).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>

                <div id="hw-rules-count-msg" style="margin-top: 12px; font-size: 0.9rem; font-weight: 800; color: #2563eb; text-align: right;"></div>
            </div>

            <!-- Step 3: Question Count & Timer -->
            <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                <label style="font-size: 1.05rem; font-weight: 900; color: #1e293b; display: block; margin-bottom: 10px;">
                    <span>🔢</span> 3. Number of Questions & Timer:
                </label>

                <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: space-between;">
                    <div style="flex: 1; min-width: 220px;">
                        <span style="display: block; font-size: 0.85rem; font-weight: 800; color: #475569; margin-bottom: 6px;">Questions Count:</span>
                        <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="hw-qty-chips">
                            ${[5, 10, 15, 20].map(n => `
                                <button type="button" class="hw-chip-btn ${n === 10 ? 'active' : ''}" data-qty="${n}" style="padding: 6px 14px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer; border: 1.5px solid ${n === 10 ? '#2563eb' : '#cbd5e1'}; background: ${n === 10 ? '#2563eb' : 'white'}; color: ${n === 10 ? 'white' : '#334155'};">
                                    ${n} Qs
                                </button>
                            `).join('')}
                            <input type="number" id="hw-custom-qty" value="10" min="1" max="100" style="width: 75px; padding: 6px 8px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-weight: 800; font-size: 0.85rem; text-align: center;" title="Custom question count">
                        </div>
                    </div>

                    <div style="flex: 1; min-width: 200px;">
                        <span style="display: block; font-size: 0.85rem; font-weight: 800; color: #475569; margin-bottom: 6px;">Timer per Question:</span>
                        <select id="hw-timer-select" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-weight: 800; font-size: 0.9rem; background: white;">
                            <option value="15" selected>⏱️ 15 Seconds (Standard)</option>
                            <option value="20">⏱️ 20 Seconds (Comfortable)</option>
                            <option value="30">⏱️ 30 Seconds (Relaxed)</option>
                            <option value="0">⏳ No Timer (Unlimited)</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Generate Action -->
            <button type="button" id="hw-btn-generate" class="btn-start" style="font-size: 1.2rem; padding: 15px; background: #2563eb; box-shadow: 0 4px 0 #1d4ed8; font-weight: 900; border-radius: 12px; cursor: pointer; width: 100%;">
                Generate Student Homework Link 🔗
            </button>

            <!-- Result Box -->
            <div id="hw-result-card" style="display: none; background: #ecfdf5; border: 2px solid #10b981; border-radius: 14px; padding: 18px; text-align: center;">
                <div style="font-size: 1.2rem; font-weight: 900; color: #065f46; margin-bottom: 6px;">
                    🎉 Link Generated Successfully!
                </div>
                <div id="hw-result-target" style="font-size: 0.95rem; font-weight: 800; color: #047857; margin-bottom: 12px;"></div>

                <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                    <input type="text" id="hw-result-url" readonly style="flex: 1; padding: 10px 14px; border-radius: 8px; border: 1.5px solid #6ee7b7; font-weight: 800; font-size: 0.85rem; background: white; color: #065f46;" onclick="this.select()">
                    <button type="button" id="hw-btn-copy-result" style="padding: 10px 18px; border-radius: 8px; background: #10b981; color: white; border: none; font-weight: 900; font-size: 0.95rem; cursor: pointer; box-shadow: 0 3px 0 #059669; white-space: nowrap;">
                        📋 Copy Link
                    </button>
                </div>

                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button type="button" id="hw-btn-wa-share" style="background: #25d366; color: white; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 800; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 3px 0 #1da851;">
                        <span>📲</span> Share on WhatsApp
                    </button>
                </div>

                <div style="margin-top: 14px; font-size: 0.8rem; color: #065f46; line-height: 1.45; text-align: left; background: white; border-radius: 8px; padding: 12px; border: 1px dashed #6ee7b7;">
                    💡 <strong>Ready to send:</strong> This link points to the live online challenge. When the student clicks it in WhatsApp, Zoom, or anywhere, they will immediately be greeted by name and start the assigned questions. When done, their score and mistakes will be sent directly to your WhatsApp/Gmail and recorded in their platform profile.
                </div>
            </div>

        </div>
    `;

    // Connect Events
    const studentSelect = root.querySelector('#hw-student-select');
    const customContainer = root.querySelector('#hw-custom-student-container');
    const customInput = root.querySelector('#hw-custom-student-input');

    studentSelect.onchange = () => {
        if (studentSelect.value === '__NEW__') {
            customContainer.style.display = 'block';
            customInput.focus();
        } else {
            customContainer.style.display = 'none';
        }
    };

    // Sub-rules Toggle Drawer
    root.querySelectorAll('.hw-toggle-subrules').forEach(btn => {
        btn.onclick = () => {
            const block = btn.closest('.hw-category-block');
            const drawer = block.querySelector('.hw-subrules-drawer');
            const arrow = btn.querySelector('.hw-arrow');
            if (drawer.style.display === 'none') {
                drawer.style.display = 'block';
                if (arrow) arrow.textContent = '▲';
            } else {
                drawer.style.display = 'none';
                if (arrow) arrow.textContent = '▼';
            }
        };
    });

    // Helper: calculate selected pool
    function getSelectedPoolMap() {
        const selMap = {};
        root.querySelectorAll('.hw-category-block').forEach(block => {
            const catId = block.dataset.cat;
            const mainCb = block.querySelector('.hw-main-cat-cb');
            const subCbs = Array.from(block.querySelectorAll('.hw-sub-cb'));
            const checkedSubs = subCbs.filter(s => s.checked);

            if (subCbs.length === 0) {
                if (mainCb && mainCb.checked) selMap[catId] = ['ALL'];
            } else {
                if (checkedSubs.length === subCbs.length && mainCb.checked) {
                    selMap[catId] = ['ALL'];
                } else if (checkedSubs.length > 0) {
                    selMap[catId] = checkedSubs.map(s => s.dataset.sub);
                }
            }
        });
        return selMap;
    }

    function updateCount() {
        const selMap = getSelectedPoolMap();
        let total = 0;
        if (typeof window.RuleSelectorEngine !== 'undefined') {
            total = window.RuleSelectorEngine.countAvailable(selMap);
        }
        const msg = root.querySelector('#hw-rules-count-msg');
        if (msg) {
            msg.textContent = `Total Questions in Selection: ${total} questions`;
        }
    }

    // Main Category Checkbox change
    root.querySelectorAll('.hw-main-cat-cb').forEach(mainCb => {
        mainCb.onchange = () => {
            const block = mainCb.closest('.hw-category-block');
            block.querySelectorAll('.hw-sub-cb').forEach(scb => {
                scb.checked = mainCb.checked;
            });
            block.style.borderColor = mainCb.checked ? '#3b82f6' : '#cbd5e1';
            updateCount();
        };
    });

    // Sub-rule Checkbox change
    root.querySelectorAll('.hw-sub-cb').forEach(subCb => {
        subCb.onchange = () => {
            const block = subCb.closest('.hw-category-block');
            const mainCb = block.querySelector('.hw-main-cat-cb');
            const allSubs = Array.from(block.querySelectorAll('.hw-sub-cb'));
            const checkedSubs = allSubs.filter(s => s.checked);

            if (checkedSubs.length === 0) {
                mainCb.checked = false;
                mainCb.indeterminate = false;
                block.style.borderColor = '#cbd5e1';
            } else if (checkedSubs.length === allSubs.length) {
                mainCb.checked = true;
                mainCb.indeterminate = false;
                block.style.borderColor = '#3b82f6';
            } else {
                mainCb.checked = true;
                mainCb.indeterminate = true;
                block.style.borderColor = '#3b82f6';
            }
            updateCount();
        };
    });

    // Select All
    root.querySelector('#hw-btn-rules-all').onclick = () => {
        root.querySelectorAll('.hw-category-block').forEach(block => {
            const mainCb = block.querySelector('.hw-main-cat-cb');
            if (mainCb) mainCb.checked = true;
            block.querySelectorAll('.hw-sub-cb').forEach(s => s.checked = true);
            block.style.borderColor = '#3b82f6';
        });
        updateCount();
    };

    // Clear All
    root.querySelector('#hw-btn-rules-clear').onclick = () => {
        root.querySelectorAll('.hw-category-block').forEach(block => {
            const mainCb = block.querySelector('.hw-main-cat-cb');
            if (mainCb) {
                mainCb.checked = false;
                mainCb.indeterminate = false;
            }
            block.querySelectorAll('.hw-sub-cb').forEach(s => s.checked = false);
            block.style.borderColor = '#cbd5e1';
        });
        updateCount();
    };

    updateCount();

    // Quantity Chips
    const qtyChips = root.querySelectorAll('.hw-chip-btn');
    const customQty = root.querySelector('#hw-custom-qty');

    qtyChips.forEach(btn => {
        btn.onclick = () => {
            qtyChips.forEach(b => {
                b.style.background = 'white';
                b.style.color = '#334155';
                b.style.borderColor = '#cbd5e1';
                b.classList.remove('active');
            });
            btn.style.background = '#2563eb';
            btn.style.color = 'white';
            btn.style.borderColor = '#2563eb';
            btn.classList.add('active');
            customQty.value = btn.dataset.qty;
        };
    });

    customQty.oninput = () => {
        const val = parseInt(customQty.value);
        qtyChips.forEach(b => {
            const isActive = parseInt(b.dataset.qty) === val;
            b.style.background = isActive ? '#2563eb' : 'white';
            b.style.color = isActive ? 'white' : '#334155';
            b.style.borderColor = isActive ? '#2563eb' : '#cbd5e1';
        });
    };

    // Generate Button Click
    root.querySelector('#hw-btn-generate').onclick = () => {
        let studentName = studentSelect.value;
        if (studentName === '__NEW__') {
            studentName = customInput.value.trim();
        }
        if (!studentName) {
            alert("Please select or type a student name!");
            if (studentSelect.value === '__NEW__') customInput.focus();
            return;
        }

        // Build compact codes with sub-rules support
        const codeTokens = [];
        root.querySelectorAll('.hw-category-block').forEach(block => {
            const catCode = block.dataset.code;
            const mainCb = block.querySelector('.hw-main-cat-cb');
            const subCbs = Array.from(block.querySelectorAll('.hw-sub-cb'));
            const checkedSubs = subCbs.filter(s => s.checked);

            if (subCbs.length === 0) {
                if (mainCb && mainCb.checked) codeTokens.push(catCode);
            } else {
                if (checkedSubs.length === subCbs.length && mainCb.checked && !mainCb.indeterminate) {
                    codeTokens.push(catCode); // All sub-rules
                } else if (checkedSubs.length > 0) {
                    // Specific sub-rule indices (e.g. md:0 or md:0.1)
                    const indices = checkedSubs.map(s => s.dataset.idx).join('.');
                    codeTokens.push(`${catCode}:${indices}`);
                }
            }
        });

        if (codeTokens.length === 0) {
            alert("Please select at least one Tajweed rule or sub-rule!");
            return;
        }

        const qty = parseInt(customQty.value) || 10;
        const timer = parseInt(root.querySelector('#hw-timer-select').value) || 15;

        // Build URL using robust public base URL
        const base = getPublicAppBaseUrl();
        const url = new URL(base);
        url.searchParams.set('hw', codeTokens.join(','));
        url.searchParams.set('st', studentName);
        url.searchParams.set('q', qty);
        url.searchParams.set('t', timer);

        const isDefaultTeacher = (!teacherInfo.name || teacherInfo.name.includes('جهاد') || teacherInfo.name.toLowerCase().includes('gehad'))
            && (!teacherInfo.whatsapp || teacherInfo.whatsapp.includes('1099684126'));

        if (!isDefaultTeacher) {
            if (teacherInfo.name) url.searchParams.set('tc', teacherInfo.name);
            if (teacherInfo.whatsapp) url.searchParams.set('wa', teacherInfo.whatsapp.replace(/[^\d+]/g, ''));
            if (teacherInfo.email) url.searchParams.set('gm', teacherInfo.email);
        }

        const linkStr = url.toString();

        const resultCard = root.querySelector('#hw-result-card');
        const targetEl = root.querySelector('#hw-result-target');
        const urlInput = root.querySelector('#hw-result-url');
        const copyBtn = root.querySelector('#hw-btn-copy-result');
        const waBtn = root.querySelector('#hw-btn-wa-share');

        resultCard.style.display = 'block';
        targetEl.innerHTML = `🎯 Target Student: <strong>${studentName}</strong> (${qty} Questions • ${timer > 0 ? timer + 's per Q' : 'No timer'})`;
        urlInput.value = linkStr;

        copyBtn.onclick = () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(linkStr);
            } else {
                urlInput.select();
                document.execCommand('copy');
            }
            copyBtn.innerHTML = '✅ Link Copied!';
            setTimeout(() => { copyBtn.innerHTML = '📋 Copy Link'; }, 2500);
        };

        const waText = `Assalamu Alaikum ${studentName}!\nHere is your Tajweed Homework assignment from teacher ${teacherDisplayName}:\n\n${linkStr}\n\nPlease complete it at home! 📖`;
        waBtn.onclick = () => {
            window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
        };

        resultCard.scrollIntoView({ behavior: 'smooth' });
    };
}

// Backward compatible legacy stub
function generateHWLink() {
    renderHomeworkCreator();
}

function launchHomeworkGame() {
    if (typeof SFX !== 'undefined' && SFX.click) SFX.click();
    const cfg = window.CURRENT_HW_CONFIG || {};
    const pool = window.CURRENT_HW_POOL || [];
    if (pool.length === 0) {
        alert("Homework questions could not be loaded. Please check your link.");
        return;
    }

    const studentName = cfg.studentName || 'Student';
    const qty = cfg.qty || 10;
    const timer = cfg.timer !== undefined ? cfg.timer : 15;

    isHomeworkMode = true;
    isProgressiveMode = false;

    session.studentName = studentName;
    session.studentAvatar = '🎓';
    TIME_LIMIT = timer;

    let finalPlaylist = smartMix(pool);
    if (qty > 0 && qty < finalPlaylist.length) {
        finalPlaylist = finalPlaylist.slice(0, qty);
    }

    initGameSession(false, finalPlaylist);
}
window.launchHomeworkGame = launchHomeworkGame;

function decodeHwToSelection(hwStr) {
    const selMap = {};
    if (!hwStr) return selMap;

    // Check if legacy base64
    if (hwStr.startsWith('ey') || hwStr.length > 30) {
        try {
            const legacy = JSON.parse(atob(hwStr));
            (legacy.c || []).forEach(c => selMap[c] = ['ALL']);
            return selMap;
        } catch(e) {}
    }

    const parts = hwStr.split(',');
    const definitions = (typeof window.RuleSelectorEngine !== 'undefined' && window.RuleSelectorEngine.definitions) 
        ? window.RuleSelectorEngine.definitions 
        : [];

    parts.forEach(part => {
        if (!part) return;
        if (part.includes(':')) {
            const [cCode, idxStr] = part.split(':');
            const catId = HW_RULE_CODES[cCode] || cCode;
            const def = definitions.find(d => d.id === catId);
            if (def && def.subrules) {
                const indices = idxStr.split('.').map(x => parseInt(x, 10)).filter(n => !isNaN(n));
                const subKeys = indices.map(i => def.subrules[i]?.key).filter(Boolean);
                if (subKeys.length > 0) selMap[catId] = subKeys;
            } else {
                selMap[catId] = ['ALL'];
            }
        } else {
            const catId = HW_RULE_CODES[part] || part;
            selMap[catId] = ['ALL'];
        }
    });
    return selMap;
}

function parseURLModes() {
    const params = new URLSearchParams(window.location.search);

    // 1. Handling Homework Assignment Link
    if (params.has('hw')) {
        try {
            const rawHw = params.get('hw');
            const selectionMap = decodeHwToSelection(rawHw);

            const studentName = params.get('st') || params.get('name') || 'Student';
            const qty = parseInt(params.get('q') || '10', 10);
            const timer = parseInt(params.get('t') || '15', 10);
            const teacherName = params.get('tc') || 'Sheikh Gehad Elsayad';
            const teacherWa = params.get('wa') || '+201099684126';
            const teacherGm = params.get('gm') || 'gehadnagah789@gmail.com';

            // Direct robust pool creation from RuleSelectorEngine or TAJWEED_BANK
            let pool = [];
            if (typeof window.RuleSelectorEngine !== 'undefined' && window.RuleSelectorEngine.buildPool) {
                pool = window.RuleSelectorEngine.buildPool(selectionMap);
            }

            // Fallback if empty
            if (pool.length === 0 && typeof window.RuleSelectorEngine !== 'undefined') {
                pool = window.RuleSelectorEngine.buildPool({ 'qalqalah': ['ALL'] });
            }

            // Summarize topic names in English
            const definitions = (typeof window.RuleSelectorEngine !== 'undefined') ? window.RuleSelectorEngine.definitions : [];
            const topicLabels = [];
            Object.entries(selectionMap).forEach(([catId, subKeys]) => {
                const def = definitions.find(d => d.id === catId);
                if (!def) return;
                if (subKeys.includes('ALL') || subKeys.length === def.subrules?.length) {
                    topicLabels.push(def.title);
                } else {
                    const subLabels = subKeys.map(k => {
                        const s = def.subrules?.find(sub => sub.key === k);
                        return s ? s.label : k;
                    });
                    topicLabels.push(`${def.title} (${subLabels.join(', ')})`);
                }
            });

            window.CURRENT_HW_POOL = pool;
            window.CURRENT_HW_CONFIG = {
                studentName: studentName,
                selectionMap: selectionMap,
                qty: qty,
                timer: timer,
                teacher: {
                    name: teacherName,
                    whatsapp: teacherWa,
                    email: teacherGm
                }
            };

            isHomeworkMode = true;
            isProgressiveMode = false;

            // Switch to screen-start and render dedicated Student Launch Card
            switchScreen('screen-start');

            const titleEl = document.getElementById('start-title');
            if (titleEl) {
                titleEl.innerHTML = `📝 Homework for <span style="color:#2563eb;">${studentName}</span>`;
            }

            // Hide standard selection elements so student has clean view
            const rulesBox = document.getElementById('cb-all-rules')?.closest('fieldset') 
                || document.getElementById('cb-all-rules')?.parentElement?.parentElement?.parentElement;
            if (rulesBox) rulesBox.style.display = 'none';

            const nameInput = document.getElementById('student-name');
            if (nameInput) {
                nameInput.value = studentName;
                const nameContainer = nameInput.closest('div[style*="text-align: center"]');
                if (nameContainer) nameContainer.style.display = 'none';
            }

            const hwTeacherPanel = document.getElementById('hw-teacher-panel');
            if (hwTeacherPanel) hwTeacherPanel.style.display = 'none';

            const setupOuterCard = document.querySelector('#screen-start div[style*="border-radius:1.5rem"]');
            let launchCard = document.getElementById('hw-student-launch-card');
            if (!launchCard && setupOuterCard) {
                launchCard = document.createElement('div');
                launchCard.id = 'hw-student-launch-card';
                setupOuterCard.prepend(launchCard);
            }

            if (launchCard) {
                launchCard.innerHTML = `
                    <div style="background: linear-gradient(135deg, #eff6ff, #f8fafc); border: 2.5px solid #3b82f6; border-radius: 18px; padding: 26px 20px; text-align: center; margin-bottom: 20px; box-shadow: 0 10px 25px rgba(59,130,246,0.12);">
                        <div style="font-size: 3rem; margin-bottom: 8px;">🌟</div>
                        <h2 style="font-size: 1.8rem; font-weight: 900; color: #1e293b; margin: 0 0 6px 0;">Welcome, ${studentName}!</h2>
                        <div style="font-size: 1.05rem; font-weight: 800; color: #2563eb; margin-bottom: 4px;">👨‍🏫 Teacher: ${teacherName}</div>
                        <div style="font-size: 0.8rem; font-weight: 700; color: #64748b; margin-bottom: 16px;">Supervised & Developed by Sheikh Gehad Elsayad 📖</div>

                        <div style="background: white; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 14px 18px; max-width: 440px; margin: 0 auto 20px auto; text-align: left; font-size: 0.9rem; color: #334155; font-weight: 700; line-height: 1.5;">
                            <div style="margin-bottom: 6px;">🎯 <strong>Questions:</strong> ${qty} Questions</div>
                            <div style="margin-bottom: 6px;">⏱️ <strong>Timer:</strong> ${timer > 0 ? timer + ' seconds per question' : 'Unlimited time'}</div>
                            <div>📜 <strong>Assigned Topics:</strong> ${topicLabels.join(' • ') || 'Selected Rules'}</div>
                        </div>

                        <button type="button" id="btn-hw-start-direct" class="btn-start" style="font-size: 1.35rem; padding: 14px 32px; width: 100%; max-width: 320px; margin: 0 auto; background: #2563eb; box-shadow: 0 5px 0 #1d4ed8; font-weight: 900; cursor: pointer; border-radius: 12px;">
                            Start Homework 🚀
                        </button>
                    </div>
                `;

                document.getElementById('btn-hw-start-direct')?.addEventListener('click', launchHomeworkGame);
            }

            const startBtn = document.getElementById('btn-start-game');
            if (startBtn) {
                startBtn.textContent = "Start Homework 🚀";
                startBtn.onclick = launchHomeworkGame;
            }

        } catch (e) {
            console.error("Error loading homework mode:", e);
        }
    } 
    // 2. Handling Magic Sync Import Link for Teachers
    else if (params.has('import_hw')) {
        try {
            const rawData = params.get('import_hw');
            const data = JSON.parse(decodeURIComponent(atob(rawData)));

            if (data && data.n && typeof window.StudentEngine !== 'undefined') {
                const result = window.StudentEngine.addHomeworkRecord(data.n, {
                    score: data.s || 0,
                    total: data.tot || (data.s + (data.m ? data.m.length : 0)),
                    accuracy: data.a || 0,
                    timeSpent: data.t || 0,
                    teacherName: data.tc || 'Sheikh Gehad Elsayad',
                    rules: data.r || [],
                    mistakes: data.m || []
                });

                // Clear url query to avoid re-importing on page refresh
                window.history.replaceState({}, document.title, window.location.pathname);

                // Open Student Hub modal directly on roster with confirmation
                setTimeout(() => {
                    if (typeof window.StudentModal !== 'undefined') {
                        window.StudentModal.open('roster');
                    }
                    if (typeof confetti !== 'undefined') {
                        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
                    }
                    alert(`🎉 Successfully saved homework for student [${data.n}]! Profile & mistake bank updated.`);
                }, 400);
            }
        } catch(e) {
            console.error("Failed to import homework record:", e);
        }
    }
    // 3. Backward compatible legacy result
    else if (params.has('result')) {
        try {
            const data = JSON.parse(decodeURIComponent(atob(params.get('result'))));
            document.getElementById('screen-splash')?.classList.remove('active');
            const rep = document.getElementById('screen-report');
            if (rep) rep.classList.add('active');

            const title = document.getElementById('report-title');
            if (title) title.innerHTML = `📝 Student Report: <span style="color:#3b82f6">${data.n}</span>`;

            let html = `<div style="text-align:center; padding:15px; font-size:1.2rem;">
                <strong>Score:</strong> ${data.s} | <strong>Accuracy:</strong> ${data.a}%<br>
                <strong>Correct:</strong> ${data.c} | <strong>Incorrect:</strong> ${data.m?.length || 0}
            </div>`;
            const grid = document.getElementById('main-stats-grid');
            if (grid) {
                grid.innerHTML = html;
                grid.style.display = 'block';
            }
        } catch(e) {}
    }
}

        

