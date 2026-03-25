/**
 * Haya Marriage Bureau - User Dashboard Logic
 */

import hayaDB from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = hayaDB.getCurrentUser();
    if (!user) {
        window.location.href = 'register.html';
        return;
    }

    // Update Profile Info
    const userNameEls = document.querySelectorAll('#userName, #welcomeName');
    userNameEls.forEach(el => {
        el.textContent = el.id === 'userName' ? user.name.split(' ')[0] : user.name;
    });

    // Handle User Profile Status
    const userProfile = hayaDB.getProfiles(false).find(p => p.email === user.email);
    const statusText = document.querySelector('.badge-pending');
    const statusDetail = document.querySelector('main p');

    if (userProfile && statusText && statusDetail) {
        if (userProfile.status === 'approved') {
            statusText.innerHTML = '<i class="fas fa-check-circle"></i> Profile Verified';
            statusText.style.background = '#D4EDDA';
            statusText.style.color = '#155724';
            statusDetail.textContent = 'Your profile is live! Families can now discover your essence.';
        } else {
            statusText.innerHTML = '<i class="fas fa-clock"></i> Verification Pending';
            statusDetail.textContent = 'Our directors are manually verifying your heritage. This usually takes 2-4 hours.';
        }
    }

    // Dynamic Matches Selection
    const renderMatches = () => {
        const matchContainer = document.querySelector('main');
        const matchesHeader = document.querySelector('h3[style*="margin-bottom: 20px"]');
        if (!matchContainer || !matchesHeader) return;

        // Fetch 3 random profiles of opposite gender
        const oppositeGender = (userProfile?.gender || 'male') === 'male' ? 'female' : 'male';
        const allMatches = hayaDB.getProfiles(true).filter(p => p.gender === oppositeGender);
        
        // Remove static cards if they exist
        const staticCards = document.querySelectorAll('.match-card');
        staticCards.forEach(c => c.remove());

        const topMatches = allMatches.slice(0, 3);
        
        topMatches.forEach(m => {
            const masked = hayaDB.maskData(m);
            const card = document.createElement('div');
            card.className = 'match-card animate-slide-up';
            card.innerHTML = `
                <div class="match-img" style="background-image: url('${m.image}'); background-size: cover; background-position: center;">
                    ${masked.isMasked ? '<i class="fas fa-lock" style="font-size: 1rem; color: white;"></i>' : ''}
                </div>
                <div style="flex: 1;">
                    <h4 style="color: var(--primary);">${masked.name} (${m.age})</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">${m.profession} • ${m.city} • ${m.education}</p>
                </div>
                <a href="profile-detail.html?id=${m.id}" class="btn-premium" style="padding: 8px 15px; font-size: 0.8rem; text-decoration: none; text-align: center;">View</a>
            `;
            matchContainer.insertBefore(card, document.querySelector('div[style*="background: white; padding: 30px"]'));
        });
    };

    renderMatches();
});
