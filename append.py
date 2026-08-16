import os

js = """
// Phase 11: Browser Notifications
document.addEventListener('DOMContentLoaded', () => {
    const contactCard = document.querySelector('.contact-card');
    if (contactCard && 'Notification' in window) {
        const notifBtn = document.createElement('button');
        notifBtn.className = 'btn btn-outline';
        notifBtn.innerHTML = "<i class='fas fa-bell'></i> Enable site notifications";
        notifBtn.style.marginTop = '1rem';
        
        const ctaRow = contactCard.querySelector('.cta-row');
        if(ctaRow) ctaRow.appendChild(notifBtn);

        notifBtn.addEventListener('click', () => {
            if (Notification.permission === 'granted') {
                alert('Notifications are already enabled!');
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification("Welcome to Kalicharan's Portfolio!", {
                            body: 'Thank you for enabling notifications.',
                            icon: './assets/images/profile.jpeg'
                        });
                        localStorage.setItem('site_notifications', 'enabled');
                    } else {
                        alert("Notifications permission denied. That's totally fine!");
                    }
                });
            } else {
                alert('Notifications have been disabled in your browser settings.');
            }
        });
    }
});
"""
with open('script.js', 'a', encoding='utf-8') as f:
    f.write(js)
