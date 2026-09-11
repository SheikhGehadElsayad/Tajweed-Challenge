function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        if (id === 'screen-splash') {
            setTimeout(() => document.getElementById('btn-enter-app')?.focus(), 50);
        } else if (id === 'screen-mode-select') {
            setTimeout(() => document.getElementById('btn-mode-free')?.focus(), 50);
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
        function showToast(txt, isError = false) { 
            const toast = document.getElementById('msg-toast'); 
            toast.textContent = txt; 
            toast.style.borderColor = isError ? 'var(--error)' : 'var(--success)';
            toast.style.color = isError ? 'var(--error)' : 'var(--success)';
            toast.classList.add('show'); 
            setTimeout(() => toast.classList.remove('show'), 1500); 
            announce(txt);
        }
        function setMascot(state) { document.getElementById('mascot').textContent = mascots[state]; }
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
