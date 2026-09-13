/**
 * Central Application Configuration
- Tajweed Challenge - Student Edition
 */

(function(window) {
    'use strict';

    const APP_CONFIG = {
        APP_NAME: 'Tajweed Challenge - Student Edition',
        VERSION: '44',

        DEFAULT_TEACHER: {
            name: 'Sheikh Gehad Elsayad',
            whatsapp: '+201099684126',
            email: 'gehadnagah789@gmail.com',
            title: 'Sheikh Gehad Elsayad'
        },

        getDefaultTeacher() {
            return Object.assign({}, this.DEFAULT_TEACHER);
        },

        cleanPhone(phone) {
            return (phone || this.DEFAULT_TEACHER.whatsapp).replace(/[^\d+]/g, '');
        }
    };

    window.APP_CONFIG = APP_CONFIG;

})(window);