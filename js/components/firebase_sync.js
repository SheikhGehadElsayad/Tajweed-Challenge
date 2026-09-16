/**
 * Firebase Cloud Sync & 2-Device License Enforcer - تجويد تشالنج
 * يدير الربط السحابي، التحقق من حد الجهازين، ومزامنة بيانات الطلاب بين المتصفحات
 */
const FirebaseSync = (function() {
    'use strict';

    // مفاتيح مشروع Firebase الخاص بالشيخ جهاد
    const firebaseConfig = {
        apiKey: "AIzaSyA9CsIWSMgW25_Rd4v8lBCUuU7EB_mohCs",
        authDomain: "tajweed-challenge.firebaseapp.com",
        projectId: "tajweed-challenge",
        storageBucket: "tajweed-challenge.firebasestorage.app",
        messagingSenderId: "288919315122",
        appId: "1:288919315122:web:bddbafc56de45e482f5fab",
        measurementId: "G-Q4QX4FCVKS"
    };

    let db = null;
    let isInitialized = false;

    // الحصول على معرّف فريد دائم لهذا الجهاز / المتصفح
    function getOrCreateDeviceId() {
        const KEY = 'tajweed_unique_device_id';
        let id = localStorage.getItem(KEY);
        if (!id) {
            id = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
            localStorage.setItem(KEY, id);
        }
        return id;
    }

    // اسم وصفي للمتصفح والجهاز (مثال: Chrome على Windows)
    function getDeviceLabel() {
        const ua = navigator.userAgent;
        let browser = "متصفح غير معروف";
        if (ua.indexOf("Firefox") > -1) browser = "Firefox";
        else if (ua.indexOf("Edg") > -1) browser = "Microsoft Edge";
        else if (ua.indexOf("Chrome") > -1) browser = "Google Chrome";
        else if (ua.indexOf("Safari") > -1) browser = "Safari";

        let os = "جهاز";
        if (ua.indexOf("Win") > -1) os = "Windows PC";
        else if (ua.indexOf("Android") > -1) os = "Android";
        else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) os = "iOS";
        else if (ua.indexOf("Mac") > -1) os = "Mac";

        return `${browser} على ${os}`;
    }

    function initFirebase() {
        if (isInitialized) return true;
        try {
            if (typeof firebase !== 'undefined' && firebase.apps) {
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
                db = firebase.firestore();
                isInitialized = true;
                console.log('✅ تم الاتصال بسحابة Firebase بنجاح!');
                return true;
            }
        } catch (e) {
            console.warn('تعذر تهيئة Firebase حالياً:', e);
        }
        return false;
    }

    /**
     * فحص وتسجيل الكود في السحابة وتطبيق شرط (جهازين فقط)
     */
    async function verifyAndRegisterLicense(code, teacherName) {
        const cleanCode = (code || '').trim().toUpperCase();
        const deviceId = getOrCreateDeviceId();
        const deviceLabel = getDeviceLabel();

        if (!initFirebase() || !db) {
            console.warn('العمل في وضع الأوفلاين / المحلي');
            return { success: false, fallback: true, message: 'تعذر الاتصال بالسحابة، تأكد من اتصال الإنترنت.' };
        }

        try {
            const licenseRef = db.collection('licenses').doc(cleanCode);
            const doc = await licenseRef.get();

            // 1. إذا كان الكود يُستخدم لأول مرة على الإطلاق
            if (!doc.exists) {
                // التأكد من أن الكود ضمن قائمة الأكواد المعتمدة الـ 100
                const isApprovedKey = (Array.isArray(window.TAJWEED_VALID_KEYS) && window.TAJWEED_VALID_KEYS.includes(cleanCode)) ||
                                      ['TAJ-VIP-2026', 'TAJ-DEMO-777', 'TAJ-GEHAD-VIP'].includes(cleanCode);

                if (!isApprovedKey) {
                    return {
                        success: false,
                        reason: 'INVALID_CODE',
                        message: `عذراً، كود الترخيص (${cleanCode}) غير صالح أو غير مسجل في النظام.`
                    };
                }

                // تسجيل الكود لأول مرة مع الجهاز الأول (1 من 2)
                const newLicenseData = {
                    code: cleanCode,
                    teacherName: teacherName || 'معلم قرآن',
                    maxDevices: 2,
                    status: 'active',
                    plan: 'ترخيص معلّم VIP (دائم)',
                    devices: [
                        {
                            id: deviceId,
                            label: deviceLabel,
                            registeredAt: new Date().toISOString()
                        }
                    ],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                await licenseRef.set(newLicenseData);

                return {
                    success: true,
                    slot: 1,
                    max: 2,
                    plan: newLicenseData.plan,
                    message: `تم تفعيل الكود بنجاح! تم تسجيل هذا الجهاز (الجهاز 1 من 2).`
                };
            }

            // 2. إذا كان الكود مسجلاً بالفعل في قاعدة البيانات
            const data = doc.data();

            if (data.status === 'blocked') {
                return {
                    success: false,
                    reason: 'BLOCKED',
                    message: 'عذراً، هذا الترخيص تم إيقافه من قبل الإدارة.'
                };
            }

            const devices = Array.isArray(data.devices) ? data.devices : [];
            const maxAllowed = data.maxDevices || 2;

            // هل هذا الجهاز مسجل بالفعل مسبقاً؟
            const existingIndex = devices.findIndex(d => d.id === deviceId);
            if (existingIndex > -1) {
                return {
                    success: true,
                    alreadyRegistered: true,
                    slot: existingIndex + 1,
                    max: maxAllowed,
                    plan: data.plan || 'ترخيص معلّم VIP',
                    teacherName: data.teacherName,
                    message: `أهلاً بك مجدداً! هذا الجهاز مسجل بالفعل لهذا الترخيص (${existingIndex + 1} من ${maxAllowed}).`
                };
            }

            // جهاز جديد: هل ما زال هناك متسع (أقل من جهازين)؟
            if (devices.length < maxAllowed) {
                const newSlotNumber = devices.length + 1;
                devices.push({
                    id: deviceId,
                    label: deviceLabel,
                    registeredAt: new Date().toISOString()
                });

                await licenseRef.update({
                    devices: devices,
                    lastUsedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                return {
                    success: true,
                    slot: newSlotNumber,
                    max: maxAllowed,
                    plan: data.plan || 'ترخيص معلّم VIP',
                    teacherName: data.teacherName,
                    message: `تم تسجيل الجهاز الجديد بنجاح! (الجهاز ${newSlotNumber} من ${maxAllowed}).`
                };
            }

            // إذا استنفد الجهازين: رَفْض الدخول منعاً للمشاركة!
            return {
                success: false,
                reason: 'MAX_DEVICES_REACHED',
                message: `⛔ عذراً! هذا الكود مفعّل بالفعل على الحد الأقصى المسموح به (${maxAllowed} أجهزة). لا يمكن استخدامه على أجهزة أخرى.`
            };

        } catch (error) {
            console.error('Firebase License Check Error:', error);
            return {
                success: false,
                fallback: true,
                message: 'حدث خطأ أثناء فحص الكود سحابياً: ' + error.message
            };
        }
    }

    /**
     * مزامنة بيانات ودرجات الطلاب سحابياً
     */
    async function syncRosterToCloud(code) {
        if (!initFirebase() || !db || !code) return;
        try {
            const raw = localStorage.getItem('tajweed_students_roster');
            if (!raw) return;
            const rosterData = JSON.parse(raw);

            await db.collection('licenses').doc(code).collection('cloud_data').doc('roster').set({
                data: rosterData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedBy: getDeviceLabel()
            }, { merge: true });

            console.log('☁️ تم رفع وتحديث بيانات الطلاب في السحابة بنجاح!');
        } catch (e) {
            console.warn('تعذر رفع بيانات الطلاب للسحابة:', e);
        }
    }

    async function pullRosterFromCloud(code) {
        if (!initFirebase() || !db || !code) return;
        try {
            const doc = await db.collection('licenses').doc(code).collection('cloud_data').doc('roster').get();
            if (doc.exists) {
                const cloud = doc.data();
                if (cloud && cloud.data) {
                    const localRaw = localStorage.getItem('tajweed_students_roster');
                    // دمج ذكي أو تحديث الذاكرة المحلية
                    localStorage.setItem('tajweed_students_roster', JSON.stringify(cloud.data));
                    if (window.StudentEngine && typeof window.StudentEngine.loadWorkspaces === 'function') {
                        window.StudentEngine.init();
                    }
                    console.log('☁️ تم سحب ومزامنة بيانات الطلاب من السحابة بنجاح!');
                }
            }
        } catch (e) {
            console.warn('تعذر سحب بيانات الطلاب من السحابة:', e);
        }
    }

    return {
        init: initFirebase,
        verifyAndRegisterLicense: verifyAndRegisterLicense,
        syncRosterToCloud: syncRosterToCloud,
        pullRosterFromCloud: pullRosterFromCloud,
        getDeviceId: getOrCreateDeviceId
    };
})();
