/**
 * License Manager Component - تجويد تشالنج
 * يدير نظام التراخيص وأكواد التفعيل للمعلمين
 */
const LicenseManager = (function() {
    'use strict';

    const STORAGE_KEY = 'tajweed_challenge_license';

    // قائمة الأكواد التجريبية المعتمدة (سيتم ربطها لاحقاً بالسحابة Firebase)
    const VALID_TEST_KEYS = {
        'TAJ-VIP-2026': { plan: 'ترخيص معلّم VIP (دائم)', maxDevices: 3 },
        'TAJ-DEMO-777': { plan: 'نسخة تجريبية معتمدة', maxDevices: 1 },
        'TAJ-GEHAD-VIP': { plan: 'رخصة خاصة بالشيخ جهاد', maxDevices: 5 }
    };

    let onActivationSuccess = null;

    function getLicenseInfo() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error('Failed to read license info', e);
            return null;
        }
    }

    function isActivated() {
        const info = getLicenseInfo();
        return !!(info && info.code && info.activated);
    }

    function init() {
        injectModalDOM();
        updateBadgeUI();
        const info = getLicenseInfo();
        if (info && info.code && typeof FirebaseSync !== 'undefined') {
            setTimeout(() => FirebaseSync.pullRosterFromCloud(info.code), 500);
        } else if (!isActivated()) {
            // إظهار نافذة قفل الترخيص فوراً فور فتح الموقع
            setTimeout(() => {
                showModal();
            }, 300);
        }
    }

    function injectModalDOM() {
        if (document.getElementById('license-modal-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'license-modal-overlay';
        overlay.className = 'license-overlay';
        overlay.innerHTML = `
            <div class="license-card" role="dialog" aria-labelledby="license-title-text" aria-modal="true">
                <div class="license-badge-icon" aria-hidden="true">🔑</div>
                
                <h2 id="license-title-text" class="license-title">تفعيل ترخيص المنصة</h2>
                <p class="license-desc">
                    مرحباً بك في <strong>تجويد تشالنج</strong>! للوصول إلى كافة مستويات اللعبة وبنك الأسئلة، يُرجى إدخال كود التفعيل الخاص بك.
                </p>

                <form id="form-license-activation" class="license-form" onsubmit="return false;">
                    <div class="license-input-group">
                        <label for="input-teacher-name">اسم المعلم أو المقرأة:</label>
                        <input type="text" id="input-teacher-name" class="license-input" placeholder="مثال: الشيخ أحمد / مقرأة النور" required autocomplete="name">
                    </div>

                    <div class="license-input-group">
                        <label for="input-license-code">كود الترخيص (License Key):</label>
                        <input type="text" id="input-license-code" class="license-input code-input" placeholder="TAJ-XXXX-XXXX" required maxlength="25" autocomplete="off" spellcheck="false">
                    </div>

                    <div id="license-error-box" class="license-msg error" role="alert"></div>
                    <div id="license-success-box" class="license-msg success" role="status"></div>

                    <button type="button" id="btn-submit-license" class="license-submit-btn">
                        <span>تفعيل وتشغيل اللعبة</span>
                        <span aria-hidden="true">✨</span>
                    </button>
                </form>

                <div class="license-footer">
                    <span>ليس لديك كود ترخيص؟</span>
                    <a href="https://wa.me/201147992249?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B4%D8%B1%D8%A7%D8%A1%20%D9%83%D9%88%D8%AF%20%D8%AA%D8%B1%D8%AE%D9%8A%D8%B5%20%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%20%D8%AA%D8%AC%D9%88%D9%8A%D8%AF%20%D8%AA%D8%B4%D8%A7%D9%84%D9%86%D8%AC" target="_blank" rel="noopener noreferrer" class="license-help-btn">
                        <span>طلب كود عبر واتساب</span> 💬
                    </a>
                </div>

                <div style="margin-top: 14px; font-size: 0.8rem; color: #94a3b8; background: #f8fafc; padding: 6px 12px; border-radius: 8px;">
                    💡 كود تجريبي للاختبار: <strong>TAJ-VIP-2026</strong>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Bind events
        const btnSubmit = overlay.querySelector('#btn-submit-license');
        const inputCode = overlay.querySelector('#input-license-code');
        const inputName = overlay.querySelector('#input-teacher-name');

        if (btnSubmit) {
            btnSubmit.addEventListener('click', handleActivation);
        }

        if (inputCode) {
            inputCode.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleActivation();
            });
            inputCode.addEventListener('input', () => {
                inputCode.value = inputCode.value.toUpperCase();
            });
        }
    }

    async function handleActivation() {
        const overlay = document.getElementById('license-modal-overlay');
        if (!overlay) return;

        const inputName = overlay.querySelector('#input-teacher-name');
        const inputCode = overlay.querySelector('#input-license-code');
        const errBox = overlay.querySelector('#license-error-box');
        const successBox = overlay.querySelector('#license-success-box');
        const btnSubmit = overlay.querySelector('#btn-submit-license');

        errBox.style.display = 'none';
        successBox.style.display = 'none';

        const name = (inputName.value || '').trim();
        const code = (inputCode.value || '').trim().toUpperCase();

        if (!name) {
            errBox.textContent = '⚠️ يرجى كتابة اسم المعلم أو المقرأة.';
            errBox.style.display = 'block';
            inputName.focus();
            return;
        }

        if (!code) {
            errBox.textContent = '⚠️ يرجى إدخال كود الترخيص.';
            errBox.style.display = 'block';
            inputCode.focus();
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<span>جاري التحقق سحابياً...</span> ⏳`;

        try {
            let res = null;
            if (typeof FirebaseSync !== 'undefined') {
                res = await FirebaseSync.verifyAndRegisterLicense(code, name);
            }

            btnSubmit.disabled = false;
            btnSubmit.innerHTML = `<span>تفعيل وتشغيل اللعبة</span> <span aria-hidden="true">✨</span>`;

            if (res && res.success) {
                const licenseData = {
                    code: code,
                    teacherName: res.teacherName || name,
                    plan: res.plan || 'ترخيص معلّم VIP',
                    slot: res.slot || 1,
                    maxDevices: res.max || 2,
                    activated: true,
                    activatedAt: new Date().toISOString()
                };

                localStorage.setItem(STORAGE_KEY, JSON.stringify(licenseData));

                successBox.innerHTML = `🎉 تم التفعيل بنجاح سحابياً!<br>أهلاً بك يا <strong>${licenseData.teacherName}</strong><br><small style="color: #0f766e; font-weight: 800;">الجهاز المسجل (${licenseData.slot} من ${licenseData.maxDevices})</small>`;
                successBox.style.display = 'block';

                try {
                    if (typeof SFX !== 'undefined' && SFX.correct) SFX.correct();
                    if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 80 });
                    if (typeof FirebaseSync !== 'undefined') FirebaseSync.pullRosterFromCloud(code);
                } catch(e) {}

                setTimeout(() => {
                    hideModal();
                    updateBadgeUI();
                    if (typeof onActivationSuccess === 'function') {
                        onActivationSuccess();
                    }
                }, 1300);

            } else {
                try { if (typeof SFX !== 'undefined' && SFX.wrong) SFX.wrong(); } catch(e) {}
                const msg = res ? res.message : `❌ عذراً، كود الترخيص (${code}) غير صالح.`;
                errBox.innerHTML = `${msg}<br><small style="color: #64748b;">تواصل مع الشيخ جهاد للدعم أو شراء ترخيص جديد.</small>`;
                errBox.style.display = 'block';
            }
        } catch (err) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = `<span>تفعيل وتشغيل اللعبة</span> <span aria-hidden="true">✨</span>`;
            errBox.textContent = 'حدث خطأ أثناء الاتصال: ' + err.message;
            errBox.style.display = 'block';
        }
    }

    function showModal(onSuccess) {
        injectModalDOM();
        onActivationSuccess = onSuccess;
        const overlay = document.getElementById('license-modal-overlay');
        if (overlay) {
            overlay.classList.add('active');
            const inputName = overlay.querySelector('#input-teacher-name');
            if (inputName) setTimeout(() => inputName.focus(), 150);
        }
    }

    function hideModal() {
        const overlay = document.getElementById('license-modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    function deactivate() {
        if (confirm('هل تريد بالتأكيد إلغاء تفعيل هذا الترخيص وقفل التطبيق للتجربة مجدداً؟')) {
            localStorage.removeItem(STORAGE_KEY);
            updateBadgeUI();
            alert('تم إلغاء التفعيل وقفل التطبيق بنجاح. يمكنك الآن تجربة الدخول بكود جديد.');
            // العودة لشاشة البداية
            if (typeof switchScreen === 'function') {
                switchScreen('screen-splash');
            }
        }
    }

    function updateBadgeUI() {
        const info = getLicenseInfo();
        let badgeContainer = document.getElementById('license-badge-container');

        if (!badgeContainer) {
            const splashLeft = document.querySelector('.splash-left');
            if (splashLeft) {
                badgeContainer = document.createElement('div');
                badgeContainer.id = 'license-badge-container';
                splashLeft.appendChild(badgeContainer);
            }
        }

        if (!badgeContainer) return;

        if (info && info.activated) {
            badgeContainer.innerHTML = `
                <div class="license-status-badge" title="${info.plan} - انقر لإلغاء التفعيل للتجربة">
                    <span class="license-dot"></span>
                    <span>نسخة مرخّصة: <strong>${info.teacherName}</strong></span>
                    <button type="button" class="btn-deactivate-license" onclick="LicenseManager.deactivate()" title="إلغاء التفعيل للتجربة">إلغاء التفعيل 🔄</button>
                </div>
            `;
        } else {
            badgeContainer.innerHTML = `
                <div class="license-status-badge" style="background: rgba(239, 68, 68, 0.1); color: #dc2626; border-color: rgba(239, 68, 68, 0.25);" onclick="LicenseManager.showModal()">
                    <span class="license-dot" style="background: #ef4444; box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);"></span>
                    <span>النسخة غير مفعّلة (انقر للتفعيل 🔑)</span>
                </div>
            `;
        }
    }

    // Auto-init on script load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        init: init,
        isActivated: isActivated,
        getLicenseInfo: getLicenseInfo,
        showModal: showModal,
        hideModal: hideModal,
        deactivate: deactivate,
        updateBadgeUI: updateBadgeUI
    };
})();
