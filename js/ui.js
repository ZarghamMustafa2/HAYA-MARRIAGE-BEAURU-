import hayaDB from './db.js';

window.handleWhatsApp = (profile, action) => {
    const message = `Assalam-o-Alaikum, I am interested in this profile:
Name: ${profile.name}
ID: ${profile.id}
Gender: ${profile.gender}
Age: ${profile.age}
City: ${profile.city}
Action: ${action}`;
    
    const waUrl = `https://wa.me/923706462317?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
};


// Run immediately since this is a module script and DOMContentLoaded might have already fired
const initUI = () => {
    // --- Mobile Menu Toggle Logic ---
    const toggleBtns = document.querySelectorAll('.mobile-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const closeBtns = document.querySelectorAll('.mobile-nav-overlay .close-btn');
    const backdrops = document.querySelectorAll('.mobile-nav-backdrop');

    const openMenu = () => {
        if(overlay) {
            overlay.style.display = 'flex'; // Force display first
            // Small timeout to allow display:flex to render before transitioning
            setTimeout(() => {
                overlay.classList.add('active');
                overlay.style.transform = 'translateX(0)';
                overlay.style.pointerEvents = 'auto';
            }, 10);
        }
        backdrops.forEach(b => {
            b.style.display = 'block';
            setTimeout(() => b.classList.add('active'), 10);
        });
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        if(overlay) {
            overlay.classList.remove('active');
            overlay.style.transform = 'translateX(100%)';
            overlay.style.pointerEvents = 'none';
            // Wait for transition to finish then hide completely
            setTimeout(() => {
                if (!overlay.classList.contains('active')) {
                    overlay.style.display = 'none';
                }
            }, 350); 
        }
        backdrops.forEach(b => {
            b.classList.remove('active');
            setTimeout(() => {
                if (!b.classList.contains('active')) b.style.display = 'none';
            }, 350);
        });
        document.body.style.overflow = '';
    };

    toggleBtns.forEach(btn => btn.addEventListener('click', openMenu));
    closeBtns.forEach(btn => btn.addEventListener('click', closeMenu));
    backdrops.forEach(backdrop => backdrop.addEventListener('click', closeMenu));

    // Force hide on load just in case (optional, CSS handles this normally)
    if(overlay) {
        overlay.style.transform = 'translateX(100%)';
        overlay.style.display = 'none';
    }
    backdrops.forEach(b => {
        b.style.display = 'none';
    });
    
    // Make these globally accessible as a fallback if HTML onclicks are added
    window.openMenu = openMenu;
    window.closeMenu = closeMenu;
};

// Initialize immediately
initUI();

// --- Dynamic Profile Rendering ---
    const renderProfiles = (filters = {}) => {
        const grid = document.getElementById('profileGrid');
        if (!grid) return;

        const filteredProfiles = hayaDB.searchProfiles(filters);
        grid.innerHTML = '';

        if (filteredProfiles.length === 0) {
            grid.innerHTML = `
                <div class="no-matches-found" style="grid-column: 1 / -1; padding: 100px 20px; text-align: center;">
                    <i class="fas fa-search-minus" style="font-size: 4rem; color: #D4AF37; margin-bottom: 20px;"></i>
                    <h2 style="color: #4d0000; font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 20px;">No Exact Matches Found</h2>
                    <p style="color: #666; margin-bottom: 30px; font-size: 1.1rem;">Our elite database is updated daily. Try broadening your search or view all profiles.</p>
                    <button onclick="window.location.href='profiles.html';" class="btn-primary" style="padding: 15px 40px; border-radius: 50px;">View All Profiles</button>
                    <div style="margin-top: 20px;">
                        <a href="https://wa.me/923706462317" target="_blank" style="color: #D4AF37; text-decoration: none; font-weight: 700;">Contact our consultant via WhatsApp</a>
                    </div>
                </div>
            `;
            return;
        }

        filteredProfiles.forEach((p, index) => {
            const avatarUrl = p.gender.toLowerCase() === 'male' 
                ? 'https://avatar.iran.liara.run/public/boy' 
                : 'https://avatar.iran.liara.run/public/girl';

            const card = document.createElement('article');
            card.className = 'profile-card animate';
            card.style.animationDelay = `${(index % 8) * 0.1}s`;
            card.innerHTML = `
                <div class="profile-badge">✓ VERIFIED</div>
                <div class="profile-img-container">
                    <img src="${avatarUrl}" alt="${p.name}">
                </div>
                <h3>${p.name}</h3>
                <p style="color: #D4AF37; font-weight: 500; font-size: 0.9rem; margin-bottom: 15px; letter-spacing: 1px; text-transform: uppercase;">${p.tier.toUpperCase()} MEMBER</p>
                <ul class="card-meta" style="list-style: none; padding: 0; margin-bottom: 25px;">
                    <li><i class="fas fa-user-clock"></i> ${p.age} Years Old</li>
                    <li><i class="fas fa-map-marker-alt"></i> ${p.city}</li>
                    <li><i class="fas fa-graduation-cap"></i> ${p.education}</li>
                    <li><i class="fas fa-mosque"></i> ${p.sect}</li>
                </ul>
                <div class="card-footer" style="width: 100%; border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 20px;">
                    <button onclick='handleWhatsApp(${JSON.stringify(p).replace(/'/g, "&apos;")}, "Express Interest")' class="btn-card" style="background: #D4AF37; color: #4d0000 !important; font-weight: 800; border-radius: 50px; padding: 12px; display: block; text-decoration: none; width: 100%; border: none; cursor: pointer;">Express Interest</button>
                    <a href="profile-detail.html?id=${p.id}&gender=${p.gender}&name=${encodeURIComponent(p.name)}&age=${p.age}&city=${encodeURIComponent(p.city)}&profession=${encodeURIComponent(p.education)}&img=${p.gender.toLowerCase() === 'male' ? 'avatar_male.png' : 'avatar_female.png'}" style="color: #FFFDF5; font-size: 0.85rem; margin-top: 10px; display: block; text-decoration: underline; opacity: 0.7;">View Details</a>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();

        const searchGender = document.getElementById('searchGender')?.value || 'Any';
        const searchAge = document.getElementById('searchAge')?.value || 'Any';
        const searchCity = document.getElementById('searchCity')?.value || 'Any';
        const searchEducation = document.getElementById('searchEducation')?.value || 'Any';

        let filteredProfiles = hayaDB.getProfiles();

        // Filter Gender
        if (searchGender !== 'Any') {
            const targetGender = (searchGender === 'Bride' || searchGender === 'Female') ? 'female' : 'male';
            filteredProfiles = filteredProfiles.filter(p => p.gender.toLowerCase() === targetGender);
        }

        // Filter Age
        if (searchAge !== 'Any' && searchAge.includes('-')) {
            const [min, max] = searchAge.split('-').map(Number);
            filteredProfiles = filteredProfiles.filter(p => p.age >= min && p.age <= max);
        }

        // Filter City (Ignore if "All Cities" or "Any")
        if (searchCity !== 'Any' && searchCity !== 'All Cities') {
            filteredProfiles = filteredProfiles.filter(p => p.city.toLowerCase() === searchCity.toLowerCase());
        }

        // Filter Education (Ignore if "Any Education" or "Any")
        if (searchEducation !== 'Any' && searchEducation !== 'Any Education') {
            filteredProfiles = filteredProfiles.filter(p => p.education.toLowerCase().includes(searchEducation.toLowerCase()));
        }

        // Display the Results
        let resultsSection = document.getElementById('homeResultsSection');
        if (!resultsSection) {
            resultsSection = document.createElement('section');
            resultsSection.id = 'homeResultsSection';
            resultsSection.className = 'container';
            resultsSection.style.marginTop = '80px';
            resultsSection.style.paddingBottom = '80px';
            
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer) {
                searchContainer.insertAdjacentElement('afterend', resultsSection);
            } else {
                const resultsParent = document.getElementById('profileGrid');
                if(resultsParent) { resultsParent.innerHTML = ''; resultsParent.appendChild(resultsSection); }
            }
        }

        if (filteredProfiles.length > 0) {
            resultsSection.innerHTML = `
                <div class="section-title animate fade-in" style="margin-bottom: 50px; text-align: center;">
                    <h2 style="color: var(--primary); font-family: 'Playfair Display', serif; font-size: 3rem; margin-bottom: 10px;">Search Results</h2>
                    <p style="color: #D4AF37; font-weight: 700;">Found ${filteredProfiles.length} elite matches for you.</p>
                </div>
                <div class="profile-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; padding: 0;">
                    ${filteredProfiles.map(p => {
                        const avatarUrl = p.gender.toLowerCase() === 'male' ? 'https://avatar.iran.liara.run/public/boy' : 'https://avatar.iran.liara.run/public/girl';
                        return `
                        <article class="profile-card animate" style="background: var(--primary); border: 1px solid var(--accent); border-radius: 20px; text-align: center;">
                            <div class="profile-badge" style="background: var(--accent); color: var(--primary); padding: 5px 15px; border-radius: 50px; font-weight: bold; font-size: 12px; margin-bottom: 20px; display: inline-block;">✓ VERIFIED</div>
                            <div class="profile-img-container" style="margin: 0 auto 20px auto; width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 3px solid var(--accent);">
                                <img src="${avatarUrl}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <h3 style="color: var(--accent); font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 5px;">${p.name} (${p.age})</h3>
                            <ul class="card-meta" style="list-style: none; padding: 0; color: white; display:flex; flex-direction:column; align-items: center; gap:8px; font-size:0.9rem; margin-bottom: 25px;">
                                <li><i class="fas fa-map-marker-alt" style="color: var(--accent);"></i> ${p.city}</li>
                                <li><i class="fas fa-graduation-cap" style="color: var(--accent);"></i> ${p.education}</li>
                                <li><i class="fas fa-mosque" style="color: var(--accent);"></i> ${p.sect}</li>
                            </ul>
                            <a href="profile-detail.html?id=${p.id}&gender=${p.gender}&name=${encodeURIComponent(p.name)}&age=${p.age}&city=${encodeURIComponent(p.city)}&profession=${encodeURIComponent(p.education)}&img=${p.gender.toLowerCase() === 'male' ? 'avatar_male.png' : 'avatar_female.png'}" 
                               style="display: block; padding: 12px; background: var(--accent); color: var(--primary); font-weight: 800; text-decoration: none; border-radius: 10px; width: 90%; margin: auto;">View Full Profile</a>
                        </article>
                    `}).join('')}
                </div>
            `;
            // Add basic responsive grid styling block dynamically for inline
            const style = document.createElement('style');
            style.innerHTML = `@media (max-width: 1100px) { #homeResultsSection .profile-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 600px) { #homeResultsSection .profile-grid { grid-template-columns: 1fr !important; } }`;
            resultsSection.prepend(style);
        } else {
            resultsSection.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; background: white; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); margin-top: 40px; border: 1px solid rgba(212, 175, 55, 0.2);">
                    <i class="fas fa-search-minus" style="font-size: 4rem; color: var(--accent); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--primary); font-family: 'Playfair Display', serif; font-size: 2.2rem; margin-bottom: 15px;">No exact matches found.</h3>
                    <p style="color: #666; font-size: 1.1rem; margin-bottom: 25px;">Please contact our consultant for personalized assistance.</p>
                    <a href="https://wa.me/923706462317" target="_blank" class="btn-primary" style="padding: 15px 40px; border-radius: 50px; text-decoration: none; display: inline-block; font-weight: 800;">Chat on WhatsApp</a>
                </div>
            `;
        }

        // Visual Feedback: Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const searchBtns = document.querySelectorAll('#mainSearchBtn');
    searchBtns.forEach(btn => btn.addEventListener('click', handleSearch));

    // Initial Load for Profiles Page (Keep existing render Profiles logic safe for native profiles.html loads if they bypass home)
    if (window.location.pathname.includes('profiles.html')) {
        const params = new URLSearchParams(window.location.search);
        const filters = {
            gender: params.get('gender') || 'Any',
            age: params.get('age') || 'Any',
            city: params.get('city') || 'Any',
            education: params.get('education') || 'Any'
        };
        renderProfiles(filters);
    }

    // --- Scroll Events ---
    const headerWrapper = document.querySelector('.header-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) headerWrapper?.classList.add('scrolled');
        else headerWrapper?.classList.remove('scrolled');
    });
