function usePowerUp(type) {
            if(isAnswering || session.isPracticeMode) return;
            const q = session.playlist[session.playHead];
            
            if(type === 'hint') { 
                SFX.click(); 
                const expBox = document.getElementById('explanation-box');
                expBox.textContent = `💡 Hint: Pay close attention to the highlighted letter and what comes immediately after it.`; 
                expBox.classList.add('show');
                announce(expBox.textContent);
                document.getElementById('pu-hint').disabled = true;
                return; 
            }
            
            const costs = { '5050': 5, 'time': 5, 'shield': 10, 'freeze': 10 }; 
            if(session.coins < costs[type]) return;
            
            session.coins -= costs[type]; 
            document.getElementById(`pu-${type}`).disabled = true;
            updateHUD(); SFX.click();
            
            if(type === '5050') { 
                const btns = document.querySelectorAll('.ans-card'); 
                const wrongBtns = Array.from(btns).filter(b => b.dataset.answer !== q.ans && !b.disabled);
                const toRemove = Math.max(1, Math.floor(wrongBtns.length / 2));
                
                shuffleArray(wrongBtns).slice(0, toRemove).forEach(b => {
                    b.disabled = true; b.classList.add('dimmed');
                });
                showToast(`${toRemove} Wrong ${toRemove > 1 ? 'Answers' : 'Answer'} Removed!`, false);
            } 
            else if (type === 'time') { timeLeft += 5; updateTimerUI(); showToast("+5 Seconds!", false); } 
            else if (type === 'shield') { hasShield = true; document.getElementById('shield-indicator').style.display = 'inline'; showToast("Shield Active! 🛡️", false); } 
            else if (type === 'freeze') { 
                isFrozen = true; document.getElementById('timer-container').classList.add('frozen'); setMascot('frozen'); 
                setTimeout(() => { isFrozen = false; document.getElementById('timer-container').classList.remove('frozen'); setMascot('idle'); }, 5000); 
            }
        }

        /* =========================================================
           REPORT & MISTAKES BANK
        ========================================================= */
        
