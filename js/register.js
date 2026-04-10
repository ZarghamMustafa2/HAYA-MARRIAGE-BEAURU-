/**
 * Haya Marriage Bureau - Simplified Registration Logic
 */

import hayaDB from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profileForm');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Collect Personal Data
        const profile = {
            id: `REG-${Math.floor(1000 + Math.random() * 9000)}`,
            name: document.getElementById('fullName').value,
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            city: document.getElementById('city').value,
            caste: document.getElementById('caste').value,
            education: document.getElementById('education').value,
            profession: document.getElementById('profession').value,
            tier: "Gold", // Default for new registrations
            sect: document.getElementById('caste').value // Map caste to sect for UI consistency
        };

        // 2. Collect Preference Data
        const preferences = {
            pAge: document.getElementById('pAge').value,
            pCity: document.getElementById('pCity').value,
            pEducation: document.getElementById('pEducation').value
        };

        // 3. Save to Local Database (Immediate Update)
        hayaDB.addProfile(profile);

        // 4. Update Button State
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finalizing Registration...';

        // 5. Construct WhatsApp Message
        const message = `*New Profile Registration - Haya Marriage Bureau*

*PERSONAL DETAILS:*
Name: ${profile.name}
Age: ${profile.age}
Gender: ${profile.gender}
City: ${profile.city}
Caste/Sect: ${profile.caste}
Education: ${profile.education}
Profession: ${profile.profession}

*PARTNER PREFERENCES:*
Required Age: ${preferences.pAge}
Preferred City: ${preferences.pCity}
Required Education: ${preferences.pEducation}

_Profile created successfully on the website._`;

        // 6. Redirect to WhatsApp after a brief delay
        setTimeout(() => {
            const waUrl = `https://wa.me/923706462317?text=${encodeURIComponent(message)}`;
            window.location.href = waUrl;
        }, 1500);
    });
});
