/**
 * Power-ups Management
 * Gameplay Layer: 50/50, Hint, Time, Shield, Freeze
 */

(function(window) {
    'use strict';

    function usePowerUp(type) {
        if (window.isAnswering || window.session.isPracticeMode) return;
        const q = window.session.playlist[window.session.playHead];
        if (!q) return;
        
        if (type === 'hint') { 
            if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click(); 
            const expBox = document.getElementById('explanation-box');
            if (expBox) {
                expBox.textContent = `💡 Hint: Pay close attention to the highlighted letter and what comes immediately after it.`; 
                expBox.classList.add('show');
                if (typeof window.announce === 'function') window.announce(expBox.textContent);
            }
            const hintBtn = document.getElementById('pu-hint');
            if (hintBtn) hintBtn.disabled = true;
            return; 
        }
        
        const costs = { '5050': 5, 'time': 5, 'shield': 10, 'freeze': 10 }; 
        if (window.session.coins < costs[type]) return;
        
        window.session.coins -= costs[type]; 
        const targetBtn = document.getElementById(`pu-${type}`);
        if (targetBtn) targetBtn.disabled = true;
        if (typeof window.updateHUD === 'function') window.updateHUD();
        if (typeof window.SFX !== 'undefined' && window.SFX.click) window.SFX.click();
        
        if (type === '5050') { 
            const btns = document.querySelectorAll('.ans-card'); 
            const wrongBtns = Array.from(btns).filter(b => b.dataset.answer !== q.ans && !b.disabled);
            const toRemove = Math.max(1, Math.floor(wrongBtns.length / 2));
            
            const shuffled = (typeof window.shuffleArray === 'function') ? window.shuffleArray(wrongBtns) : wrongBtns;
            shuffled.slice(0, toRemove).forEach(b => {
                b.disabled = true;
                b.classList.add('dimmed');
            });
            if (typeof window.showToast === 'function') {
                window.showToast(`${toRemove} Wrong ${toRemove > 1 ? 'Answers' : 'Answer'} Removed!`, false);
            }
        } 
        else if (type === 'time') {
            window.timeLeft += 5;
            if (typeof window.updateTimerUI === 'function') window.updateTimerUI();
            if (typeof window.showToast === 'function') window.showToast("+5 Seconds!", false);
        } 
        else if (type === 'shield') {
            window.hasShield = true;
            const shieldInd = document.getElementById('shield-indicator');
            if (shieldInd) shieldInd.style.display = 'inline';
            if (typeof window.showToast === 'function') window.showToast("Shield Active! 🛡️", false);
        } 
        else if (type === 'freeze') { 
            window.isFrozen = true;
            const timerBox = document.getElementById('timer-container');
            if (timerBox) timerBox.classList.add('frozen');
            if (typeof window.setMascot === 'function') window.setMascot('frozen');
            setTimeout(() => {
                window.isFrozen = false;
                if (timerBox) timerBox.classList.remove('frozen');
                if (typeof window.setMascot === 'function') window.setMascot('idle');
            }, 5000); 
        }
    }

    window.usePowerUp = usePowerUp;

})(typeof window !== 'undefined' ? window : this);
