/**
 * Universal Student Management Modal & Header Widget
 * Provides complete student roster, profile card, add/edit/delete,
 * avatar & color customization, backup/restore, and scoring policy settings.
 */

(function(window) {
    'use strict';

    const AVATARS = ['🦁', '🐯', '🦅', '🐬', '🌟', '🚀', '🎓', '👑', '🌸', '⚡', '🏹', '💎', '🦄', '🐼', '🦊', '🎨'];
    const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#ea580c', '#6366f1', '#14b8a6', '#f43f5e'];
    const THEMES = [
        { id: 'ocean', name: 'Ocean Blue', color: '#2563eb', requiredStages: 0, icon: '🌊' },
        { id: 'emerald', name: 'Emerald Oasis', color: '#059669', requiredStages: 3, icon: '🍃' },
        { id: 'amber', name: 'Desert Amber', color: '#d97706', requiredStages: 8, icon: '🍯' },
        { id: 'amethyst', name: 'Royal Amethyst', color: '#7c3aed', requiredStages: 15, icon: '🔮' },
        { id: 'ruby', name: 'Imperial Ruby', color: '#e11d48', requiredStages: 25, icon: '💎' }
    ];

    class StudentModalComponent {
        constructor() {
            this.modalEl = null;
            this.activeTab = 'roster'; // 'roster' | 'form' | 'backup'
            this.editingStudentId = null;
            this.selectedAvatar = '🦁';
            this.selectedColor = '#2563eb';
            this.selectedTheme = 'ocean';
            this.accuracyChart = null;
            this.weaknessChart = null;
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.injectUI());
            } else {
                this.injectUI();
            }

            // Listen to student changes to update topbar widgets
            window.addEventListener('studentChanged', () => {
                this.updateAllHeaderBadges();
            });
        }

        injectUI() {
            if (document.getElementById('student-hub-modal')) return;

            const modal = document.createElement('div');
            modal.id = 'student-hub-modal';
            modal.className = 'student-modal-overlay';
            modal.style.display = 'none';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');

            modal.innerHTML = `
                <div class="student-modal-dialog animate-pop">
                    <header class="student-modal-header">
                        <div class="student-modal-title">
                            <span class="sm-icon">👥</span>
                            <div>
                                <h2>Student Hub & Profiles</h2>
                                <p class="sm-subtitle">Manage students, switch active profile & track progress</p>
                            </div>
                        </div>
                        <button type="button" class="sm-close-btn" id="sm-close-btn" aria-label="Close">✕</button>
                    </header>

                    <nav class="student-modal-tabs">
                        <button type="button" class="sm-tab active" data-tab="roster">
                            <span>📋</span> Roster (${(window.StudentEngine && window.StudentEngine.getAllStudents().length) || 1})
                        </button>
                        <button type="button" class="sm-tab" data-tab="form" id="sm-tab-form">
                            <span>➕</span> Add / Edit Student
                        </button>
                        <button type="button" class="sm-tab" data-tab="teacher" id="sm-tab-teacher">
                            <span>👨‍🏫</span> Teacher & Homework Settings
                        </button>
                        <button type="button" class="sm-tab" data-tab="analytics" id="sm-tab-analytics">
                            <span>📊</span> Analytics
                        </button>
                        <button type="button" class="sm-tab" data-tab="backup">
                            <span>💾</span> Backup
                        </button>
                    </nav>

                    <div class="student-modal-body" id="sm-modal-body">
                        <!-- Rendered dynamically based on active tab -->
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            this.modalEl = modal;

            // Close actions
            modal.querySelector('#sm-close-btn').onclick = () => this.close();
            modal.onclick = (e) => {
                if (e.target === modal) this.close();
            };

            // Tab switching
            modal.querySelectorAll('.sm-tab').forEach(tab => {
                tab.onclick = () => {
                    this.activeTab = tab.dataset.tab;
                    modal.querySelectorAll('.sm-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    this.renderBody();
                };
            });

            this.updateAllHeaderBadges();
        }

        open(targetTab = 'roster', editStudentId = null) {
            this.injectUI();
            this.activeTab = targetTab;
            this.editingStudentId = editStudentId;

            if (editStudentId && window.StudentEngine) {
                const std = window.StudentEngine.getStudent(editStudentId);
                if (std) {
                    this.selectedAvatar = std.avatar || '🦁';
                    this.selectedColor = std.color || '#2563eb';
                    this.selectedTheme = std.theme || 'ocean';
                }
            } else {
                this.selectedAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
                this.selectedColor = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.selectedTheme = 'ocean';
            }

            if (this.modalEl) {
                this.modalEl.querySelectorAll('.sm-tab').forEach(t => {
                    t.classList.toggle('active', t.dataset.tab === this.activeTab);
                });
                this.renderBody();
                this.modalEl.style.display = 'flex';
                document.body.classList.add('student-modal-open');
            }
        }

        close() {
            if (this.modalEl) {
                this.modalEl.style.display = 'none';
                document.body.classList.remove('student-modal-open');
            }
        }

        renderBody() {
            const body = this.modalEl.querySelector('#sm-modal-body');
            if (!body || !window.StudentEngine) return;

            if (this.activeTab === 'roster') {
                this.renderRosterTab(body);
            } else if (this.activeTab === 'form') {
                this.renderFormTab(body);
            } else if (this.activeTab === 'analytics') {
                this.renderAnalyticsTab(body);
            } else if (this.activeTab === 'teacher') {
                this.renderTeacherTab(body);
            } else if (this.activeTab === 'backup') {
                this.renderBackupTab(body);
            }
        }

        // TAB 1: ROSTER
        renderRosterTab(container) {
            const active = window.StudentEngine.getActiveStudent();
            const students = window.StudentEngine.getAllStudents();

            // Calculate active student stats
            let totalStars = 0;
            let completedCount = 0;
            if (active && active.progress && active.progress.completedStages) {
                Object.values(active.progress.completedStages).forEach(s => {
                    if (s.stars) totalStars += s.stars;
                    if (s.stars >= 1) completedCount++;
                });
            }

            const activeHws = (active && Array.isArray(active.homeworks)) ? active.homeworks : [];

            container.innerHTML = `
                <!-- Active Student Highlight Card -->
                <div class="sm-active-card" style="border-color: ${active?.color || '#2563eb'};">
                    <div class="sm-active-left">
                        <div class="sm-avatar-circle" style="background: ${active?.color || '#2563eb'}22; border-color: ${active?.color || '#2563eb'};">
                            <span class="sm-avatar-emoji">${active?.avatar || '🦁'}</span>
                        </div>
                        <div class="sm-active-info">
                            <div class="sm-active-tag">Active Student 🎯</div>
                            <h3 class="sm-active-name">${active?.name || 'Student'}</h3>
                            <div class="sm-active-meta">
                                <span>⭐ ${totalStars} Stars</span>
                                <span>•</span>
                                <span>🏆 ${completedCount} Stages Cleared</span>
                                <span>•</span>
                                <span>📝 ${activeHws.length} Homeworks</span>
                            </div>
                        </div>
                    </div>
                    <div class="sm-active-actions">
                        <button type="button" class="sm-btn-edit-active" id="sm-btn-edit-active">✏️ Edit Profile</button>
                    </div>
                </div>

                <!-- Active Student Homework History -->
                <div class="sm-homework-section" style="margin: 15px 0; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 14px; padding: 14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <h4 style="margin:0; font-weight:900; color:#1e293b; font-size:1rem; display:flex; align-items:center; gap:6px;">
                            <span>📝</span> Homework History (${activeHws.length})
                        </h4>
                        <span style="font-size:0.75rem; color:#64748b; font-weight:700;">Synced via WhatsApp / Gmail</span>
                    </div>

                    ${activeHws.length > 0 ? `
                        <div style="display:flex; flex-direction:column; gap:10px; max-height:220px; overflow-y:auto; padding-right:4px;">
                            ${activeHws.map((hw, idx) => `
                                <div style="background:white; border:1px solid #cbd5e1; border-radius:10px; padding:10px; box-shadow:0 2px 4px rgba(0,0,0,0.03);">
                                    <div style="display:flex; justify-content:space-between; align-items:center; font-weight:800; font-size:0.9rem;">
                                        <span style="color:#2563eb;">📅 ${hw.date}</span>
                                        <span style="background:${hw.accuracy >= 80 ? '#dcfce7; color:#15803d' : hw.accuracy >= 50 ? '#fef3c7; color:#b45309' : '#fee2e2; color:#b91c1c'}; padding:2px 8px; border-radius:6px;">
                                            🎯 ${hw.score}/${hw.total} (${hw.accuracy}%)
                                        </span>
                                    </div>
                                    <div style="font-size:0.8rem; color:#64748b; margin-top:4px;">
                                        ⏱️ Time: ${hw.timeSpent}s | Teacher: ${hw.teacherName || 'Sheikh Gehad'}
                                    </div>
                                    ${hw.mistakes && hw.mistakes.length > 0 ? `
                                        <details style="margin-top:6px; font-size:0.8rem; border-top:1px dashed #e2e8f0; padding-top:6px;">
                                            <summary style="cursor:pointer; font-weight:800; color:#ef4444;">
                                                ❌ Review Mistakes (${hw.mistakes.length} questions)
                                            </summary>
                                            <div style="display:flex; flex-direction:column; gap:6px; margin-top:6px;">
                                                ${hw.mistakes.map((m) => `
                                                    <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:6px;">
                                                        <div style="font-weight:800; color:#9f1239;">[${m.rule || 'Rule'}] ${m.prompt || ''} ${m.text || ''}</div>
                                                        <div style="color:#b91c1c;">Student's Choice: <strong>${m.userAns} ❌</strong></div>
                                                        <div style="color:#15803d;">Correct Answer: <strong>${m.correctAns} ✅</strong></div>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </details>
                                    ` : `
                                        <div style="margin-top:4px; font-size:0.75rem; color:#10b981; font-weight:800;">🌟 Perfect assignment with zero mistakes!</div>
                                    `}
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div style="text-align:center; padding:12px; color:#64748b; font-size:0.85rem; font-weight:700;">
                            No homework records for this student yet.<br>
                            <span style="font-size:0.75rem; color:#94a3b8;">Once the student submits homework and you click the sync link, it will appear here automatically.</span>
                        </div>
                    `}

                    ${(active?.mistakes && active.mistakes.length > 0) ? `
                        <div style="margin-top:10px; display:flex; gap:8px; justify-content:flex-end;">
                            <button type="button" id="sm-btn-practice-mistakes" style="background:#8b5cf6; color:white; border:none; padding:8px 14px; border-radius:10px; font-weight:800; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 3px 0 #7c3aed;">
                                <span>🎮</span> Practice Student Mistakes (${active.mistakes.length}) in Game Center
                            </button>
                        </div>
                    ` : ''}
                </div>

                <div class="sm-roster-header">
                    <h4>All Students (${students.length})</h4>
                    <button type="button" class="sm-btn-quick-add" id="sm-btn-quick-add">➕ New Student</button>
                </div>

                <div class="sm-students-grid">
                    ${students.map(std => {
                        const isActive = std.id === active?.id;
                        let stars = 0;
                        let stages = 0;
                        if (std.progress && std.progress.completedStages) {
                            Object.values(std.progress.completedStages).forEach(s => {
                                if (s.stars) stars += s.stars;
                                if (s.stars >= 1) stages++;
                            });
                        }
                        return `
                            <div class="sm-student-card ${isActive ? 'is-active' : ''}" style="border-top-color: ${std.color || '#2563eb'};">
                                <div class="sm-card-top">
                                    <div class="sm-avatar-circle small" style="background: ${std.color || '#2563eb'}22; border-color: ${std.color || '#2563eb'};">
                                        <span class="sm-avatar-emoji">${std.avatar || '👤'}</span>
                                    </div>
                                    <div class="sm-card-details">
                                        <div class="sm-card-name" dir="auto">${typeof escapeHtml === 'function' ? escapeHtml(std.name) : std.name}</div>
                                        <div class="sm-card-stats">⭐ ${stars} Stars • 🏆 ${stages} Cleared</div>
                                    </div>
                                </div>
                                <div class="sm-card-actions">
                                    ${isActive ? `
                                        <span class="sm-active-badge">✓ Active Now</span>
                                    ` : `
                                        <button type="button" class="sm-btn-select-std" data-id="${std.id}">Select</button>
                                    `}
                                    <button type="button" class="sm-icon-action edit" data-id="${std.id}" title="Edit Student">✏️</button>
                                    ${students.length > 1 ? `
                                        <button type="button" class="sm-icon-action delete" data-id="${std.id}" data-name="${typeof escapeHtml === 'function' ? escapeHtml(std.name) : std.name}" title="Delete Student">🗑️</button>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            // Bindings
            container.querySelector('#sm-btn-edit-active')?.addEventListener('click', () => {
                this.open('form', active.id);
            });
            container.querySelector('#sm-btn-quick-add')?.addEventListener('click', () => {
                this.open('form', null);
            });

            container.querySelector('#sm-btn-practice-mistakes')?.addEventListener('click', () => {
                this.close();
                if (typeof switchScreen === 'function') switchScreen('screen-game-center');
                if (typeof window.GC_UI !== 'undefined') {
                    window.GC_UI.openSetupModal('cards', true);
                }
            });

            container.querySelectorAll('.sm-btn-select-std').forEach(btn => {
                btn.onclick = () => {
                    window.StudentEngine.setActiveStudent(btn.dataset.id);
                    if (typeof showToast === 'function') {
                        const std = window.StudentEngine.getStudent(btn.dataset.id);
                        showToast(`Switched active student to: ${std.name} 🎯`);
                    }
                    this.renderBody();
                };
            });

            container.querySelectorAll('.sm-icon-action.edit').forEach(btn => {
                btn.onclick = () => {
                    this.open('form', btn.dataset.id);
                };
            });

            container.querySelectorAll('.sm-icon-action.delete').forEach(btn => {
                btn.onclick = () => {
                    const stdName = btn.dataset.name;
                    const confirmMsg = `Are you sure you want to delete student "${stdName}"? This action cannot be undone.`;
                    const doDelete = () => {
                        window.StudentEngine.deleteStudent(btn.dataset.id);
                        this.renderBody();
                        if (typeof showToast === 'function') showToast(`Deleted student "${stdName}".`);
                    };

                    if (typeof showAppConfirm === 'function') {
                        showAppConfirm(confirmMsg, 'Delete Student', doDelete);
                    } else if (confirm(confirmMsg)) {
                        doDelete();
                    }
                };
            });
        }

        // TAB 2: ADD / EDIT FORM
        renderFormTab(container) {
            const isEditing = !!this.editingStudentId;
            const student = isEditing ? window.StudentEngine.getStudent(this.editingStudentId) : null;
            const currentName = student ? student.name : '';
            const currentPolicy = student ? (student.scoringPolicy || 'best') : 'best';

            container.innerHTML = `
                <div class="sm-form-container">
                    <h3 class="sm-form-heading">${isEditing ? '✏️ Edit Student Profile' : '➕ Add New Student'}</h3>

                    <div class="sm-form-group">
                        <label class="sm-label" for="sm-input-name">Student Name:</label>
                        <input type="text" id="sm-input-name" class="sm-input-text" placeholder="Enter student name (e.g. Ahmed, Mariam)" value="${currentName}" maxlength="25" autocomplete="off" />
                        <span class="sm-hint">Max 25 letters</span>
                    </div>

                    <div class="sm-form-group">
                        <label class="sm-label">Choose Avatar Emoji:</label>
                        <div class="sm-avatar-grid">
                            ${AVATARS.map(emoji => `
                                <button type="button" class="sm-avatar-pick ${this.selectedAvatar === emoji ? 'selected' : ''}" data-emoji="${emoji}">${emoji}</button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="sm-form-group">
                        <label class="sm-label">Choose Distinct Color:</label>
                        <div class="sm-color-grid">
                            ${COLORS.map(color => `
                                <button type="button" class="sm-color-pick ${this.selectedColor === color ? 'selected' : ''}" data-color="${color}" style="background-color: ${color};"></button>
                            `).join('')}
                        </div>
                    </div>

                    
                    <div class="sm-form-group">
                        <label class="sm-label">🎨 Color Theme (Progression Unlocked):</label>
                        <div class="sm-theme-grid" style="display:flex; gap:10px; flex-wrap:wrap;">
                            ${THEMES.map(theme => {
                                const unlocked = window.StudentEngine ? window.StudentEngine.getUnlockedRewards(this.editingStudentId) : { unlockedThemes: ['ocean'] };
                                const isUnlocked = unlocked.unlockedThemes.includes(theme.id);
                                return `
                                    <button type="button" class="sm-theme-pick ${this.selectedTheme === theme.id ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}" 
                                        data-theme="${theme.id}" 
                                        ${!isUnlocked ? 'disabled' : ''}
                                        style="display:flex; align-items:center; gap:6px; padding:8px 12px; border-radius:10px; border:2px solid ${this.selectedTheme === theme.id ? theme.color : '#cbd5e1'}; background:${this.selectedTheme === theme.id ? '#eff6ff' : 'white'}; cursor:${isUnlocked ? 'pointer' : 'not-allowed'}; opacity:${isUnlocked ? 1 : 0.6}; font-weight:800; font-size:0.85rem;">
                                        <span>${theme.icon}</span>
                                        <span>${theme.name}</span>
                                        ${!isUnlocked ? `<span style="font-size:0.75rem; color:#ef4444;">🔒 (${theme.requiredStages} Stages)</span>` : ''}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <div class="sm-form-group">
                        <label class="sm-label">Scoring Policy for Repeated Attempts:</label>
                        <div class="sm-policy-options">
                            <label class="sm-policy-lbl ${currentPolicy === 'best' ? 'checked' : ''}">
                                <input type="radio" name="sm_policy" value="best" ${currentPolicy === 'best' ? 'checked' : ''} />
                                <div>
                                    <strong>⭐ Best Score (Recommended)</strong>
                                    <p>Keep the student's highest score, stars and accuracy.</p>
                                </div>
                            </label>
                            <label class="sm-policy-lbl ${currentPolicy === 'latest' ? 'checked' : ''}">
                                <input type="radio" name="sm_policy" value="latest" ${currentPolicy === 'latest' ? 'checked' : ''} />
                                <div>
                                    <strong>🕒 Latest Attempt</strong>
                                    <p>Overwrite score with the most recent attempt.</p>
                                </div>
                            </label>
                            <label class="sm-policy-lbl ${currentPolicy === 'cumulative' ? 'checked' : ''}">
                                <input type="radio" name="sm_policy" value="cumulative" ${currentPolicy === 'cumulative' ? 'checked' : ''} />
                                <div>
                                    <strong>➕ Cumulative Points</strong>
                                    <p>Sum all points earned across every attempt.</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="sm-form-actions">
                        <button type="button" class="sm-btn-save" id="sm-btn-save-std">
                            ${isEditing ? '💾 Save Changes' : '🚀 Add Student & Activate'}
                        </button>
                        <button type="button" class="sm-btn-cancel" id="sm-btn-cancel-std">Cancel</button>
                    </div>
                </div>
            `;

            // Bindings
            
            container.querySelectorAll('.sm-theme-pick').forEach(btn => {
                btn.onclick = () => {
                    const themeId = btn.dataset.theme;
                    this.selectedTheme = themeId;
                    container.querySelectorAll('.sm-theme-pick').forEach(b => {
                        b.classList.remove('selected');
                        b.style.borderColor = '#cbd5e1';
                        b.style.background = 'white';
                    });
                    btn.classList.add('selected');
                    const thObj = THEMES.find(t => t.id === themeId);
                    if (thObj) {
                        btn.style.borderColor = thObj.color;
                        btn.style.background = '#eff6ff';
                    }
                    if (window.StudentEngine && window.StudentEngine.applyTheme) {
                        window.StudentEngine.applyTheme(themeId);
                    }
                };
            });

            container.querySelectorAll('.sm-avatar-pick').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.sm-avatar-pick').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    this.selectedAvatar = btn.dataset.emoji;
                };
            });

            container.querySelectorAll('.sm-color-pick').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.sm-color-pick').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    this.selectedColor = btn.dataset.color;
                };
            });

            container.querySelectorAll('.sm-policy-lbl input').forEach(radio => {
                radio.onchange = () => {
                    container.querySelectorAll('.sm-policy-lbl').forEach(l => l.classList.remove('checked'));
                    radio.closest('.sm-policy-lbl').classList.add('checked');
                };
            });

            container.querySelector('#sm-btn-cancel-std').onclick = () => {
                this.activeTab = 'roster';
                this.modalEl.querySelectorAll('.sm-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'roster'));
                this.renderBody();
            };

            container.querySelector('#sm-btn-save-std').onclick = () => {
                const nameInput = container.querySelector('#sm-input-name');
                const name = (nameInput.value || '').trim();
                if (!name) {
                    if (typeof showToast === 'function') showToast('Please enter a valid student name.', true);
                    else if (typeof showAppAlert === 'function') showAppAlert('Please enter a valid student name.', 'Validation Error');
                    else alert('Please enter a valid student name.');
                    nameInput.focus();
                    return;
                }

                const policy = container.querySelector('input[name="sm_policy"]:checked')?.value || 'best';

                if (isEditing) {
                    window.StudentEngine.updateStudent(this.editingStudentId, {
                        name: name,
                        avatar: this.selectedAvatar,
                        color: this.selectedColor,
                        scoringPolicy: policy, theme: this.selectedTheme
                    });
                    if (typeof showToast === 'function') showToast(`Student "${name}" updated successfully!`);
                } else {
                    const newStd = window.StudentEngine.addStudent(name, this.selectedAvatar, this.selectedColor, policy);
                    if (typeof showToast === 'function') showToast(`New student "${name}" added and activated! 🎯`);
                }

                this.editingStudentId = null;
                this.activeTab = 'roster';
                this.modalEl.querySelectorAll('.sm-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'roster'));
                this.renderBody();
            };
        }

        // TAB 3: BACKUP & SETTINGS
        renderBackupTab(container) {
            const active = window.StudentEngine.getActiveStudent();
            const mistakes = window.StudentEngine.getMistakes();

            container.innerHTML = `
                <div class="sm-backup-container">
                    <!-- Section 1: Active Student Mistakes Bank -->
                    <div class="sm-settings-section">
                        <div class="sm-section-top">
                            <h4>🎯 Mistake Bank for ${active?.name} (${mistakes.length} items)</h4>
                            ${mistakes.length > 0 ? `
                                <button type="button" class="sm-btn-danger-sm" id="sm-btn-clear-mistakes">Clear Mistakes Bank</button>
                            ` : ''}
                        </div>
                        <p class="sm-hint-text">Mistakes made during lessons are saved here so the student can remediate them anytime.</p>
                        ${mistakes.length === 0 ? `
                            <div class="sm-empty-box">🎉 No active mistakes logged! Perfect performance!</div>
                        ` : `
                            <div class="sm-mistakes-mini-list">
                                ${mistakes.slice(0, 10).map((m, idx) => `
                                    <div class="sm-mistake-row">
                                        <div class="sm-mistake-text">
                                            <strong>${m.correctRule || m.rule || 'Rule'}</strong>: ${m.prompt || m.text || 'Example'}
                                        </div>
                                        <button type="button" class="sm-btn-mastered" data-idx="${idx}">✓ Mastered</button>
                                    </div>
                                `).join('')}
                                ${mistakes.length > 10 ? `<div style="font-size:0.85rem; color:#64748b; text-align:center; padding:4px;">...and ${mistakes.length - 10} more</div>` : ''}
                            </div>
                        `}
                    </div>

                    <!-- Section 2: Reset Progress -->
                    <div class="sm-settings-section">
                        <h4>🔄 Reset Progression for ${active?.name}</h4>
                        <p class="sm-hint-text">Clears completed stages and stars for ${active?.name} only, resetting them back to Stage 1.</p>
                        <button type="button" class="sm-btn-reset-std" id="sm-btn-reset-std-prog">🔄 Reset ${active?.name}'s Progress</button>
                    </div>

                    <!-- Section 3: Data Backup & Restore -->
                    <div class="sm-settings-section">
                        <h4>💾 Export & Restore All Student Data</h4>
                        <p class="sm-hint-text">Export full student roster, scores, stars, and progress as a JSON file to transfer between devices.</p>
                        <div class="sm-backup-actions">
                            <button type="button" class="sm-btn-export" id="sm-btn-export-data">⬇️ Download Backup File</button>
                            <label class="sm-btn-import-lbl">
                                ⬆️ Restore Backup File
                                <input type="file" id="sm-import-file" accept=".json" style="display:none;" />
                            </label>
                        </div>
                    </div>
                </div>
            `;

            // Bindings
            container.querySelector('#sm-btn-clear-mistakes')?.addEventListener('click', () => {
                const actName = active?.name || 'Student';
                const msg = `Are you sure you want to clear all logged mistakes for ${actName}?`;
                const doClear = () => {
                    window.StudentEngine.clearMistakes();
                    this.renderBody();
                    if (typeof showToast === 'function') showToast(`Mistakes cleared for ${actName}.`);
                };

                if (typeof showAppConfirm === 'function') {
                    showAppConfirm(msg, 'Clear Mistakes', doClear);
                } else if (confirm(msg)) {
                    doClear();
                }
            });

            container.querySelectorAll('.sm-btn-mastered').forEach(btn => {
                btn.onclick = () => {
                    const idx = parseInt(btn.dataset.idx);
                    window.StudentEngine.markMistakeMastered(idx);
                    this.renderBody();
                };
            });

            container.querySelector('#sm-btn-reset-std-prog')?.addEventListener('click', () => {
                const actName = active?.name || 'Student';
                const msg = `Are you sure you want to reset all roadmap progress for ${actName}? Stars and stage unlocks will start over from Stage 1.`;
                const doReset = () => {
                    window.StudentEngine.resetAllProgress();
                    if (typeof showToast === 'function') showToast(`Progress reset for ${actName}!`);
                    this.renderBody();
                };

                if (typeof showAppConfirm === 'function') {
                    showAppConfirm(msg, 'Reset Roadmap Progress', doReset);
                } else if (confirm(msg)) {
                    doReset();
                }
            });

            container.querySelector('#sm-btn-export-data')?.addEventListener('click', () => {
                const data = window.StudentEngine.exportData();
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `tajweed_students_backup_${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
            });

            container.querySelector('#sm-import-file')?.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                    const res = window.StudentEngine.importData(event.target.result);
                    if (res.success) {
                        if (typeof showToast === 'function') showToast(`Successfully imported ${res.count} students!`);
                        else if (typeof showAppAlert === 'function') showAppAlert(`Successfully imported ${res.count} students!`, 'Import Successful');
                        else alert(`Successfully imported ${res.count} students!`);
                        this.renderBody();
                    } else {
                        if (typeof showToast === 'function') showToast('Failed to import backup: ' + res.error, true);
                        else if (typeof showAppAlert === 'function') showAppAlert('Failed to import backup: ' + res.error, 'Import Failed');
                        else alert('Failed to import backup: ' + res.error);
                    }
                };
                reader.readAsText(file);
            });
        }

        
        // TAB 5: TEACHER ANALYTICS & INSIGHTS
        renderAnalyticsTab(container) {
            const active = window.StudentEngine.getActiveStudent();
            const allStudents = window.StudentEngine.getAllStudents();
            const streakInfo = window.StudentEngine.getDailyStreak();

            let totalAttempts = 0;
            let totalAccuracySum = 0;
            let totalMistakesCount = 0;
            const ruleMistakes = {};
            const recentTrendData = [];

            // Aggregate homeworks & attempts
            allStudents.forEach(std => {
                if (Array.isArray(std.homeworks)) {
                    std.homeworks.forEach(hw => {
                        totalAttempts++;
                        totalAccuracySum += (hw.accuracy || 0);
                        if (std.id === (active && active.id)) {
                            recentTrendData.push({
                                label: hw.date || 'HW',
                                acc: hw.accuracy || 0
                            });
                        }
                        if (Array.isArray(hw.mistakes)) {
                            hw.mistakes.forEach(m => {
                                totalMistakesCount++;
                                const r = m.rule || m.categoryId || 'General Rules';
                                ruleMistakes[r] = (ruleMistakes[r] || 0) + 1;
                            });
                        }
                    });
                }
                if (Array.isArray(std.mistakes)) {
                    std.mistakes.forEach(m => {
                        totalMistakesCount++;
                        const r = m.rule || m.categoryTitle || m.categoryId || 'General Rules';
                        ruleMistakes[r] = (ruleMistakes[r] || 0) + 1;
                    });
                }
            });

            if (active && active.progress && active.progress.completedStages) {
                Object.entries(active.progress.completedStages).forEach(([stgId, stg]) => {
                    if (stg.accuracy) {
                        recentTrendData.push({
                            label: stgId.replace('w', 'W').replace('_s', ' S'),
                            acc: stg.accuracy
                        });
                    }
                });
            }

            const avgAcc = totalAttempts > 0 ? Math.round(totalAccuracySum / totalAttempts) : (active ? 88 : 0);
            const sortedRules = Object.entries(ruleMistakes).sort((a, b) => b[1] - a[1]).slice(0, 6);

            container.innerHTML = `
                <div class="sm-analytics-container" style="display:flex; flex-direction:column; gap:16px;">
                    <!-- Top KPI Summary Cards -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
                        <div style="background:white; border:1.5px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
                            <div style="font-size:0.8rem; color:#64748b; font-weight:800;">Average Accuracy</div>
                            <div style="font-size:1.6rem; font-weight:900; color:#10b981;">${avgAcc}%</div>
                        </div>
                        <div style="background:white; border:1.5px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
                            <div style="font-size:0.8rem; color:#64748b; font-weight:800;">Daily Streak</div>
                            <div style="font-size:1.6rem; font-weight:900; color:#f59e0b;">🔥 ${streakInfo.currentStreak || 0}d</div>
                        </div>
                        <div style="background:white; border:1.5px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
                            <div style="font-size:0.8rem; color:#64748b; font-weight:800;">Total Mistakes</div>
                            <div style="font-size:1.6rem; font-weight:900; color:#ef4444;">${totalMistakesCount}</div>
                        </div>
                        <div style="background:white; border:1.5px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
                            <div style="font-size:0.8rem; color:#64748b; font-weight:800;">Total Students</div>
                            <div style="font-size:1.6rem; font-weight:900; color:#2563eb;">👥 ${allStudents.length}</div>
                        </div>
                    </div>

                    <!-- Chart 1: Accuracy Trend -->
                    <div style="background:white; border:1.5px solid #e2e8f0; border-radius:14px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; font-weight:900; color:#1e293b; font-size:0.95rem; display:flex; align-items:center; gap:6px;">
                            <span>📈</span> Student Accuracy Trend Over Time (%)
                        </h4>
                        <div style="position:relative; width:100%; height:200px;">
                            <canvas id="chart-accuracy-trend"></canvas>
                        </div>
                    </div>

                    <!-- Chart 2: Weakest Tajweed Rules -->
                    <div style="background:white; border:1.5px solid #e2e8f0; border-radius:14px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; font-weight:900; color:#1e293b; font-size:0.95rem; display:flex; align-items:center; gap:6px;">
                            <span>⚠️</span> Most Frequent Mistake Rules (Requires Remediation)
                        </h4>
                        ${sortedRules.length > 0 ? `
                            <div style="position:relative; width:100%; height:200px;">
                                <canvas id="chart-rule-weaknesses"></canvas>
                            </div>
                        ` : `
                            <div style="text-align:center; padding:20px; color:#10b981; font-weight:800; font-size:0.9rem;">
                                🌟 Excellent! No frequent mistake patterns detected. High mastery across all rules!
                            </div>
                        `}
                    </div>
                </div>
            `;

            setTimeout(() => {
                if (typeof Chart === 'undefined') return;

                const ctxTrend = document.getElementById('chart-accuracy-trend');
                if (ctxTrend) {
                    if (this.accuracyChart) {
                        try { this.accuracyChart.destroy(); } catch(e){}
                    }

                    const labels = recentTrendData.length > 0 
                        ? recentTrendData.map(d => d.label) 
                        : ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Recent'];
                    const dataPoints = recentTrendData.length > 0 
                        ? recentTrendData.map(d => d.acc) 
                        : [75, 80, 85, 90, 95];

                    this.accuracyChart = new Chart(ctxTrend, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Accuracy %',
                                data: dataPoints,
                                borderColor: '#2563eb',
                                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                                fill: true,
                                tension: 0.35,
                                borderWidth: 3,
                                pointBackgroundColor: '#2563eb',
                                pointRadius: 5
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    min: 0,
                                    max: 100,
                                    ticks: { callback: v => v + '%' }
                                }
                            },
                            plugins: {
                                legend: { display: false }
                            }
                        }
                    });
                }

                const ctxWeakness = document.getElementById('chart-rule-weaknesses');
                if (ctxWeakness && sortedRules.length > 0) {
                    if (this.weaknessChart) {
                        try { this.weaknessChart.destroy(); } catch(e){}
                    }

                    this.weaknessChart = new Chart(ctxWeakness, {
                        type: 'bar',
                        data: {
                            labels: sortedRules.map(r => r[0]),
                            datasets: [{
                                label: 'Mistakes Count',
                                data: sortedRules.map(r => r[1]),
                                backgroundColor: [
                                    '#ef4444', '#f97316', '#f59e0b', '#8b5cf6', '#3b82f6', '#06b6d4'
                                ],
                                borderRadius: 8
                            }]
                        },
                        options: {
                            indexAxis: 'y',
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            }
                        }
                    });
                }
            }, 50);
        }

        // TAB 4: TEACHER & HOMEWORK SETTINGS
        renderTeacherTab(container) {
            const teacher = window.StudentEngine.getTeacherInfo();
            const creator = window.StudentEngine.getCreatorInfo();

            const safeTeacherName = typeof escapeHtml === 'function' ? escapeHtml(teacher.name || '') : (teacher.name || '');
            const safeTeacherWa = typeof escapeHtml === 'function' ? escapeHtml(teacher.whatsapp || '') : (teacher.whatsapp || '');
            const safeTeacherEmail = typeof escapeHtml === 'function' ? escapeHtml(teacher.email || '') : (teacher.email || '');

            container.innerHTML = `
                <div class="sm-teacher-container" style="display:flex; flex-direction:column; gap:16px;">
                    <!-- Creator Ownership & Verified Badge -->
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color:white; border-radius:14px; padding:16px; box-shadow:0 4px 12px rgba(37,99,235,0.2);">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span style="font-size:2rem;">👑</span>
                            <div>
                                <div style="font-weight:900; font-size:1.15rem;">Tajweed Challenge Platform</div>
                                <div style="font-weight:700; font-size:0.95rem; opacity:0.95;">Supervised & Developed by: ${creator.name} (Sheikh Gehad Elsayad)</div>
                            </div>
                        </div>
                        <div style="font-size:0.8rem; margin-top:8px; opacity:0.85; line-height:1.4;">
                            Designed for Quran teachers and students worldwide. Customize your teacher profile below to receive homework submissions directly on your personal WhatsApp and Gmail, while preserving Sheikh Gehad Elsayad's original creator attribution.
                        </div>
                    </div>

                    <!-- Teacher Customization Form -->
                    <div style="background:white; border:2px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <h4 style="margin:0 0 12px 0; color:#1e293b; font-size:1.05rem; font-weight:900; display:flex; align-items:center; gap:8px;">
                            <span>⚙️</span> Teacher Profile & Homework Delivery Settings
                        </h4>

                        <div style="display:flex; flex-direction:column; gap:12px;">
                            <div>
                                <label style="display:block; font-weight:800; color:#475569; font-size:0.85rem; margin-bottom:4px;">Teacher Name (displayed to students in homework):</label>
                                <input type="text" id="sm-teacher-name" value="${safeTeacherName}" style="width:100%; padding:10px; border-radius:8px; border:1.5px solid #cbd5e1; font-weight:700;">
                            </div>

                            <div>
                                <label style="display:block; font-weight:800; color:#475569; font-size:0.85rem; margin-bottom:4px;">Teacher WhatsApp Number (with country code, e.g. +2010...):</label>
                                <input type="text" id="sm-teacher-wa" value="${safeTeacherWa}" placeholder="+201012345678" style="width:100%; padding:10px; border-radius:8px; border:1.5px solid #cbd5e1; font-weight:700;">
                                <span style="font-size:0.75rem; color:#64748b;">Homework results and student mistake reports will be delivered to this WhatsApp number when students click Submit via WhatsApp.</span>
                            </div>

                            <div>
                                <label style="display:block; font-weight:800; color:#475569; font-size:0.85rem; margin-bottom:4px;">Teacher Gmail / Email Address:</label>
                                <input type="email" id="sm-teacher-gm" value="${safeTeacherEmail}" placeholder="teacher@gmail.com" style="width:100%; padding:10px; border-radius:8px; border:1.5px solid #cbd5e1; font-weight:700;">
                            </div>

                            <button type="button" id="sm-btn-save-teacher" style="margin-top:8px; background:#2563eb; color:white; font-weight:800; font-size:1rem; padding:12px; border-radius:10px; border:none; cursor:pointer; box-shadow:0 3px 0 #1d4ed8;">
                                💾 Save Teacher Settings
                            </button>
                        </div>
                    </div>
                </div>
            `;

            container.querySelector('#sm-btn-save-teacher')?.addEventListener('click', () => {
                const name = container.querySelector('#sm-teacher-name')?.value;
                const whatsapp = container.querySelector('#sm-teacher-wa')?.value;
                const email = container.querySelector('#sm-teacher-gm')?.value;

                window.StudentEngine.saveTeacherInfo({ name, whatsapp, email });
                if (typeof showToast === 'function') {
                    showToast('✅ Teacher profile saved successfully!');
                } else if (typeof showAppAlert === 'function') {
                    showAppAlert('Teacher profile saved successfully! These details will be included in all future homework assignment links.', 'Profile Saved');
                } else {
                    alert('✅ Teacher profile saved successfully! These details will be included in all future homework assignment links.');
                }
            });
        }

        // ================= HEADER BADGE WIDGET =================

        /**
         * Updates or injects the active student pill across headers
         */
        updateAllHeaderBadges() {
            if (!window.StudentEngine) return;
            const active = window.StudentEngine.getActiveStudent();
            if (!active) return;

            // Update inputs across screens if present
            ['student-name', 'prog-student-name', 'theory-student-name', 'gc-student-name-input'].forEach(id => {
                const inp = document.getElementById(id);
                if (inp && inp.value !== active.name) {
                    inp.value = active.name;
                }
            });

            // Target headers where student selector should appear:
            // 1. Gateway Screen
            // 2. Start / Setup Screen
            // 3. Progressive Map Top Header
            // 4. Game Center Arena & Portal
            // 5. Quiz Top Bar
            const targets = [
                { containerId: 'screen-gateway', selector: '.gc-gateway-header', prepend: false },
                { containerId: 'screen-start', selector: '.start-container', prepend: true },
                { containerId: 'screen-progressive', selector: '.start-container', prepend: true },
                { containerId: 'screen-game', selector: '.top-icons-group', prepend: false }
            ];

            // Render/Update unified pills
            document.querySelectorAll('.student-header-badge').forEach(el => el.remove());

            const createBadge = (extraClass = '') => {
                const badge = document.createElement('button');
                badge.type = 'button';
                badge.className = `student-header-badge ${extraClass}`;
                badge.style.setProperty('--student-color', active.color || '#2563eb');
                badge.innerHTML = `
                    <span class="shb-avatar">${active.avatar || '🦁'}</span>
                    <span class="shb-name">${active.name}</span>
                    <span class="shb-streak" style="background:#fff7ed; color:#ea580c; font-weight:900; font-size:0.75rem; padding:1px 6px; border-radius:6px; border:1px solid #fdba74;">🔥 ${(window.StudentEngine && window.StudentEngine.getDailyStreak ? window.StudentEngine.getDailyStreak().currentStreak : 0)}</span>
                    <span class="shb-tag">Active</span>
                    <span class="shb-caret">▼</span>
                `;
                badge.onclick = (e) => {
                    e.stopPropagation();
                    this.open('roster');
                };
                return badge;
            };

            // In Gateway header
            const gatewayHeader = document.querySelector('.gc-gateway-header');
            if (gatewayHeader && !gatewayHeader.querySelector('.student-header-badge')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'shb-wrapper-gateway';
                wrapper.style.margin = '10px auto 15px auto';
                wrapper.appendChild(createBadge());
                gatewayHeader.appendChild(wrapper);
            }

            // In Quiz Top Bar
            const quizTopIcons = document.querySelector('.top-icons-group');
            if (quizTopIcons && !quizTopIcons.querySelector('.student-header-badge')) {
                const badge = createBadge('compact');
                quizTopIcons.insertBefore(badge, quizTopIcons.children[1] || null);
            }
        }
    }

    window.StudentModal = new StudentModalComponent();

})(typeof window !== 'undefined' ? window : global);
