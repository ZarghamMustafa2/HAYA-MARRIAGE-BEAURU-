import hayaDB from './db.js';

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
                        <a href="https://wa.me/923134089228" target="_blank" style="color: #D4AF37; text-decoration: none; font-weight: 700;">Contact our consultant via WhatsApp</a>
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
                    <a href="https://wa.me/923134089228" target="_blank" class="btn-card" style="background: #D4AF37; color: #4d0000 !important; font-weight: 800; border-radius: 50px; padding: 12px; display: block; text-decoration: none;">Interest Shared</a>
                    <a href="profile-detail.html?id=${p.id}&gender=${p.gender}&name=${encodeURIComponent(p.name)}&age=${p.age}&city=${encodeURIComponent(p.city)}&profession=${encodeURIComponent(p.education)}&img=${p.gender.toLowerCase() === 'male' ? 'avatar_male.png' : 'avatar_female.png'}" style="color: #FFFDF5; font-size: 0.85rem; margin-top: 10px; display: block; text-decoration: underline; opacity: 0.7;">View Details</a>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    // --- Search Logic & Hardcoded Data ---
    const allProfiles = [
        { id: "M-01", name: "Ahmed Raza", gender: "Male", age: 20, city: "Multan", education: "MBBS", sect: "Sunni", tier: "Gold" },
        { id: "M-02", name: "Bilal Sheikh", gender: "Male", age: 22, city: "Lahore", education: "Software Engineer", sect: "Sunni", tier: "Diamond" },
        { id: "M-03", name: "Hamza Dar", gender: "Male", age: 24, city: "Karachi", education: "BBA", sect: "Shia", tier: "Gold" },
        { id: "M-04", name: "Usman Qureshi", gender: "Male", age: 26, city: "Islamabad", education: "Masters in Finance", sect: "Sunni", tier: "Gold" },
        { id: "M-05", name: "Zain Ali", gender: "Male", age: 28, city: "Overseas", education: "PhD Physics", sect: "Sunni", tier: "Diamond" },
        { id: "M-06", name: "Ali Murtaza", gender: "Male", age: 30, city: "Multan", education: "Civil Engineer", sect: "Sunni", tier: "Gold" },
        { id: "M-07", name: "Omer Saeed", gender: "Male", age: 32, city: "Lahore", education: "Chartered Accountant", sect: "Sunni", tier: "Gold" },
        { id: "M-08", name: "Saad Kamal", gender: "Male", age: 34, city: "Karachi", education: "ACCA", sect: "Shia", tier: "Diamond" },
        { id: "M-09", name: "Hassan Hashmi", gender: "Male", age: 36, city: "Islamabad", education: "Electrical Engineer", sect: "Sunni", tier: "Gold" },
        { id: "M-10", name: "Fawad Waseem", gender: "Male", age: 38, city: "Overseas", education: "Pilot", sect: "Sunni", tier: "Gold" },
        { id: "M-11", name: "Junaid Swati", gender: "Male", age: 40, city: "Multan", education: "M.Phil", sect: "Sunni", tier: "Gold" },
        { id: "M-12", name: "Arsalan Shah", gender: "Male", age: 42, city: "Lahore", education: "PhD Education", sect: "Sunni", tier: "Diamond" },
        { id: "M-13", name: "Danish Mir", gender: "Male", age: 44, city: "Karachi", education: "Bachelors in Arts", sect: "Sunni", tier: "Gold" },
        { id: "M-14", name: "Waqas Lodhi", gender: "Male", age: 46, city: "Islamabad", education: "Masters in HR", sect: "Shia", tier: "Gold" },
        { id: "M-15", name: "Farhan Aziz", gender: "Male", age: 48, city: "Overseas", education: "Business Management", sect: "Sunni", tier: "Gold" },
        { id: "M-16", name: "Kamran Akmal", gender: "Male", age: 50, city: "Multan", education: "M.Com", sect: "Sunni", tier: "Diamond" },
        { id: "M-17", name: "Salman Butt", gender: "Male", age: 52, city: "Lahore", education: "Textile Expert", sect: "Sunni", tier: "Gold" },
        { id: "M-18", name: "Rizwan Ahmed", gender: "Male", age: 54, city: "Karachi", education: "Export Business", sect: "Sunni", tier: "Gold" },
        { id: "M-19", name: "Imran Khan", gender: "Male", age: 56, city: "Islamabad", education: "Political Science", sect: "Shia", tier: "Gold" },
        { id: "M-20", name: "Shahzad Roy", gender: "Male", age: 58, city: "Overseas", education: "Musicology", sect: "Sunni", tier: "Diamond" },
        { id: "M-21", name: "Naveed Altaf", gender: "Male", age: 60, city: "Multan", education: "Contracting", sect: "Sunni", tier: "Gold" },
        { id: "M-22", name: "Faisal Qureshi", gender: "Male", age: 62, city: "Lahore", education: "Media Professional", sect: "Sunni", tier: "Gold" },
        { id: "M-23", name: "Atif Aslam", gender: "Male", age: 64, city: "Karachi", education: "Vocalist", sect: "Sunni", tier: "Gold" },
        { id: "M-24", name: "Shehryar Munawar", gender: "Male", age: 66, city: "Islamabad", education: "Marketing", sect: "Sunni", tier: "Diamond" },
        { id: "M-25", name: "Haris Rauf", gender: "Male", age: 68, city: "Overseas", education: "Sports Science", sect: "Sunni", tier: "Gold" },
        { id: "F-01", name: "Ayesha Malik", gender: "Female", age: 21, city: "Multan", education: "Intermediate", sect: "Sunni", tier: "Gold" },
        { id: "F-02", name: "Fatima Shah", gender: "Female", age: 23, city: "Lahore", education: "Bachelors in IT", sect: "Sunni", tier: "Diamond" },
        { id: "F-03", name: "Sara Bukhari", gender: "Female", age: 25, city: "Karachi", education: "BS (Hons) English", sect: "Shia", tier: "Gold" },
        { id: "F-04", name: "Zainab Ali", gender: "Female", age: 27, city: "Islamabad", education: "Masters in Bio", sect: "Sunni", tier: "Gold" },
        { id: "F-05", name: "Mariam Hassan", gender: "Female", age: 29, city: "Overseas", education: "PhD Psychology", sect: "Sunni", tier: "Diamond" },
        { id: "F-06", name: "Hina Siddiqui", gender: "Female", age: 31, city: "Multan", education: "MBBS", sect: "Sunni", tier: "Gold" },
        { id: "F-07", name: "Rabia Khan", gender: "Female", age: 33, city: "Lahore", education: "CA Finalist", sect: "Sunni", tier: "Gold" },
        { id: "F-08", name: "Nida Rehman", gender: "Female", age: 35, city: "Karachi", education: "ACCA", sect: "Shia", tier: "Diamond" },
        { id: "F-09", name: "Zoya Mirza", gender: "Female", age: 37, city: "Islamabad", education: "Fashion Designer", sect: "Sunni", tier: "Gold" },
        { id: "F-10", name: "Amna Ghani", gender: "Female", age: 39, city: "Overseas", education: "Lawyer (LLM)", sect: "Sunni", tier: "Gold" },
        { id: "F-11", name: "Bisma Junaid", gender: "Female", age: 41, city: "Multan", education: "Masters in Stats", sect: "Sunni", tier: "Gold" },
        { id: "F-12", name: "Sana Tariq", gender: "Female", age: 43, city: "Lahore", education: "PhD History", sect: "Sunni", tier: "Diamond" },
        { id: "F-13", name: "Kiran Waqar", gender: "Female", age: 45, city: "Karachi", education: "Bachelors (BA)", sect: "Sunni", tier: "Gold" },
        { id: "F-14", name: "Maha Lodhi", gender: "Female", age: 47, city: "Islamabad", education: "Masters in Pol-Sci", sect: "Shia", tier: "Gold" },
        { id: "F-15", name: "Noor Fatima", gender: "Female", age: 49, city: "Overseas", education: "Bachelor of Commerce", sect: "Sunni", tier: "Gold" },
        { id: "F-16", name: "Esha Aziz", gender: "Female", age: 51, city: "Multan", education: "Masters in Education", sect: "Sunni", tier: "Diamond" },
        { id: "F-17", name: "Alizeh Shah", gender: "Female", age: 53, city: "Lahore", education: "Bachelors", sect: "Sunni", tier: "Gold" },
        { id: "F-18", name: "Mahira Khan", gender: "Female", age: 55, city: "Karachi", education: "Masters", sect: "Sunni", tier: "Gold" },
        { id: "F-19", name: "Maya Ali", gender: "Female", age: 57, city: "Islamabad", education: "PhD", sect: "Shia", tier: "Gold" },
        { id: "F-20", name: "Sajal Aly", gender: "Female", age: 59, city: "Overseas", education: "Bachelors", sect: "Sunni", tier: "Diamond" },
        { id: "F-21", name: "Yumna Zaidi", gender: "Female", age: 61, city: "Multan", education: "Masters", sect: "Sunni", tier: "Gold" },
        { id: "F-22", name: "Kubra Khan", gender: "Female", age: 63, city: "Lahore", education: "Bachelors", sect: "Sunni", tier: "Gold" },
        { id: "F-23", name: "Hania Aamir", gender: "Female", age: 65, city: "Karachi", education: "Masters", sect: "Sunni", tier: "Gold" },
        { id: "F-24", name: "Iqra Aziz", gender: "Female", age: 67, city: "Islamabad", education: "Bachelors", sect: "Sunni", tier: "Diamond" },
        { id: "F-25", name: "Sarah Khan", gender: "Female", age: 69, city: "Overseas", education: "Masters", sect: "Sunni", tier: "Gold" }
    ];

    const handleSearch = (e) => {
        if (e) e.preventDefault();

        const searchGender = document.getElementById('searchGender')?.value || 'Any';
        const searchAge = document.getElementById('searchAge')?.value || 'Any';
        const searchCity = document.getElementById('searchCity')?.value || 'Any';
        const searchEducation = document.getElementById('searchEducation')?.value || 'Any';

        let filteredProfiles = allProfiles;

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
                    <a href="https://wa.me/923134089228" target="_blank" class="btn-primary" style="padding: 15px 40px; border-radius: 50px; text-decoration: none; display: inline-block; font-weight: 800;">Chat on WhatsApp</a>
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
