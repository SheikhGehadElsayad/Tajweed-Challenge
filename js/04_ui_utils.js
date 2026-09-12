function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        if (id === 'screen-splash') {
            setTimeout(() => document.getElementById('btn-enter-app')?.focus(), 50);
        } else if (id === 'screen-mode-select') {
            setTimeout(() => {
                document.getElementById('btn-mode-free')?.focus();
                const lbl = document.getElementById('daily-streak-mode-lbl');
                if (lbl && window.StudentEngine) {
                    const streak = window.StudentEngine.getDailyStreak();
                    lbl.textContent = `5 Questions • Streak: ${streak.currentStreak || 0} Day${streak.currentStreak === 1 ? '' : 's'}`;
                }
                if (window.StudentModal && window.StudentModal.updateAllHeaderBadges) {
                    window.StudentModal.updateAllHeaderBadges();
                }
            }, 50);
        } else if (id === 'screen-start') {
            setTimeout(() => document.getElementById('student-name')?.focus(), 50);
        } else if (id === 'screen-progressive') {
            setTimeout(() => document.getElementById('prog-student-name')?.focus(), 50);
        } else if (id === 'screen-homework') {
            setTimeout(() => document.getElementById('hw-student-select')?.focus(), 50);
        }
    }
}
        function announce(text) { document.getElementById('aria-announcer').textContent = text; }
        
        function escapeHtml(str) {
            if (str === null || str === undefined) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }
        window.escapeHtml = escapeHtml;

        function showAppAlert(message, title = 'Notice') {
            const existing = document.getElementById('app-custom-alert-modal');
            if (existing) existing.remove();

            const modal = document.createElement('div');
            modal.id = 'app-custom-alert-modal';
            modal.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.65); z-index:99999; display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(3px);';
            modal.innerHTML = `
                <div style="background:white; border-radius:18px; max-width:440px; width:100%; padding:24px; text-align:center; box-shadow:0 20px 40px rgba(0,0,0,0.25); border:2px solid #e2e8f0; animation:popIn 0.2s ease;">
                    <div style="font-size:2.2rem; margin-bottom:8px;">💡</div>
                    <h3 style="margin:0 0 10px 0; font-size:1.35rem; font-weight:900; color:#1e293b;">${escapeHtml(title)}</h3>
                    <p style="margin:0 0 20px 0; font-size:1rem; color:#475569; font-weight:700; line-height:1.5;">${escapeHtml(message)}</p>
                    <button type="button" id="app-alert-btn-ok" style="background:#2563eb; color:white; border:none; padding:10px 28px; border-radius:10px; font-weight:900; font-size:1rem; cursor:pointer; box-shadow:0 3px 0 #1d4ed8;">OK</button>
                </div>
            `;
            document.body.appendChild(modal);
            const okBtn = modal.querySelector('#app-alert-btn-ok');
            okBtn.focus();
            okBtn.onclick = () => modal.remove();
        }
        window.showAppAlert = showAppAlert;

        function showAppConfirm(message, title = 'Confirm Action', onConfirm = null, onCancel = null) {
            const existing = document.getElementById('app-custom-confirm-modal');
            if (existing) existing.remove();

            const modal = document.createElement('div');
            modal.id = 'app-custom-confirm-modal';
            modal.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.65); z-index:99999; display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(3px);';
            modal.innerHTML = `
                <div style="background:white; border-radius:18px; max-width:460px; width:100%; padding:26px 22px; text-align:center; box-shadow:0 20px 40px rgba(0,0,0,0.25); border:2px solid #e2e8f0; animation:popIn 0.2s ease;">
                    <div style="font-size:2.4rem; margin-bottom:8px;">⚠️</div>
                    <h3 style="margin:0 0 10px 0; font-size:1.35rem; font-weight:900; color:#0f172a;">${escapeHtml(title)}</h3>
                    <p style="margin:0 0 24px 0; font-size:1.02rem; color:#475569; font-weight:700; line-height:1.55;">${escapeHtml(message)}</p>
                    <div style="display:flex; justify-content:center; gap:12px;">
                        <button type="button" id="app-confirm-btn-cancel" style="background:#f1f5f9; color:#475569; border:1.5px solid #cbd5e1; padding:10px 22px; border-radius:10px; font-weight:800; font-size:0.95rem; cursor:pointer;">Cancel</button>
                        <button type="button" id="app-confirm-btn-ok" style="background:#ef4444; color:white; border:none; padding:10px 24px; border-radius:10px; font-weight:900; font-size:0.95rem; cursor:pointer; box-shadow:0 3px 0 #b91c1c;">Confirm</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            const cancelBtn = modal.querySelector('#app-confirm-btn-cancel');
            const okBtn = modal.querySelector('#app-confirm-btn-ok');
            cancelBtn.focus();

            cancelBtn.onclick = () => {
                modal.remove();
                if (typeof onCancel === 'function') onCancel();
            };
            okBtn.onclick = () => {
                modal.remove();
                if (typeof onConfirm === 'function') onConfirm();
            };
        }
        window.showAppConfirm = showAppConfirm;

        function showToast(txt, isError = false) { 
            const toast = document.getElementById('msg-toast'); 
            if (toast) {
                toast.textContent = txt; 
                toast.style.borderColor = isError ? 'var(--error)' : 'var(--success)';
                toast.style.color = isError ? 'var(--error)' : 'var(--success)';
                toast.classList.add('show'); 
                setTimeout(() => toast.classList.remove('show'), 1800); 
            }
            announce(txt);
        }
        function setMascot(state) { 
            const m = document.getElementById('mascot');
            if (m && typeof mascots !== 'undefined' && mascots[state]) {
                m.textContent = mascots[state];
            }
            if (typeof window.SirajMascot !== 'undefined' && window.SirajMascot.react) {
                window.SirajMascot.react(state);
            }
        }
        function shuffleArray(arr) {
            let clone = [...arr];
            for (let i = clone.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [clone[i], clone[j]] = [clone[j], clone[i]]; }
            return clone;
        }

        /* =========================================================
           SETUP UI
        ========================================================= */
        totalAvailableQuestions = 0;

        

        function showLogoPopup(qCount) {
            const overlay = document.getElementById('logo-popup-overlay');
            if(overlay) {
                document.getElementById('logo-popup-text').textContent = "Mashallah! " + qCount + " Questions!";
                if(SFX.applause) SFX.applause();
                overlay.style.display = 'flex';
                setTimeout(() => { overlay.style.display = 'none'; }, 3000);
            }
        }

        let currentStudentAvatar = null;
        function bindAvatarUploads() {
            document.querySelectorAll('.avatar-input').forEach(input => {
                input.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if(!file) return;
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        const img = new Image();
                        img.onload = function() {
                            const canvas = document.createElement('canvas');
                            const size = 128;
                            canvas.width = size; canvas.height = size;
                            const ctx = canvas.getContext('2d');
                            const minSide = Math.min(img.width, img.height);
                            const sx = (img.width - minSide) / 2;
                            const sy = (img.height - minSide) / 2;
                            ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
                            currentStudentAvatar = canvas.toDataURL('image/jpeg', 0.8);
                            document.querySelectorAll('.avatar-preview').forEach(el => {
                                el.src = currentStudentAvatar;
                                el.style.display = 'block';
                            });
                            document.querySelectorAll('.avatar-placeholder').forEach(el => {
                                el.style.display = 'none';
                            });
                        };
                        img.src = evt.target.result;
                    };
                    reader.readAsDataURL(file);
                });
            });
        }
