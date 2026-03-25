import hayaDB from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- State & Constants ---
    const user = hayaDB.getCurrentUser();
    const isMember = !!user;

    // --- Mobile Menu Toggle Logic ---
    const toggleBtn = document.querySelector('.mobile-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.mobile-nav-overlay .close-btn');

    if (toggleBtn && overlay) {
        toggleBtn.addEventListener('click', () => overlay.classList.add('active'));
    }
    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    }

    // --- Dynamic Profile Rendering ---
    const renderProfiles = (filters = {}) => {
        const grid = document.getElementById('profileGrid');
        const noResults = document.getElementById('noResults');
        if (!grid) return;

        const filteredProfiles = hayaDB.searchProfiles(filters);
        grid.innerHTML = '';

        if (filteredProfiles.length === 0) {
            if (noResults) {
                noResults.innerHTML = `
                    <div class="no-matches-found animate-fade-in" style="margin: 40px auto; max-width: 650px; padding: 50px 40px; border: 1px solid rgba(128,0,0,0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-radius: 20px; background: #FFFDF5; text-align: center;">
                        <i class="fas fa-search" style="font-size: 3rem; color: #D4AF37; margin-bottom: 20px;"></i>
                        <h2 style="color: #D4AF37; font-family: 'Playfair Display', serif; font-size: 2.2rem; margin-bottom: 20px; font-weight: 700;">No Exact Matches Found at the Moment.</h2>
                        <p style="color: #4A0404; font-weight: 500; margin: 0 auto 30px; max-width: 550px; line-height: 1.7; font-size: 1.05rem;">
                            Don't worry! Our Elite database is updated daily. Please try broadening your search or contact our consultant on WhatsApp for personalized matching.
                        </p>
                        <button onclick="window.location.href='profiles.html';" class="btn-primary btn-minimal" style="padding: 14px 40px; border-radius: 50px; background: linear-gradient(135deg, #D4AF37, #F2D480, #D4AF37); color: #4A0404 !important; font-weight: 800; border: none; cursor: pointer; font-size: 1rem; box-shadow: 0 8px 20px rgba(212,175,55,0.3); transition: all 0.3s ease;">
                            Show All Profiles
                        </button>
                    </div>
                `;
                noResults.style.display = 'block';
            }
            return;
        }

        if (noResults) noResults.style.display = 'none';

        filteredProfiles.forEach((p, index) => {
            const masked = hayaDB.maskData(p);
            
            // Dynamic Gender-based Dummy Images (CRITICAL)
            let avatarUrl;
            if (p.gender === 'Male') {
                avatarUrl = 'https://avatar.iran.liara.run/public/boy';
            } else if (p.gender === 'Female') {
                avatarUrl = 'https://avatar.iran.liara.run/public/girl';
            } else {
                avatarUrl = 'https://avatar.iran.liara.run/public/boy'; // Default
            }
            
            const card = document.createElement('article');
            card.className = 'profile-card animate';
            // Smooth reveal stagger for 50 items
            card.style.animationDelay = `${(index % 12) * 0.05}s`;
            card.innerHTML = `
                <div class="profile-badge">${p.tier.toUpperCase()}</div>
                <div class="profile-img-container ${masked.isMasked ? 'profile-img-masked' : ''}">
                    <img src="${avatarUrl}" alt="${masked.name}">
                    ${masked.isMasked ? '<div class="mask-overlay"><i class="fas fa-lock"></i><p>Gold Only</p></div>' : ''}
                </div>
                <div class="profile-info">
                    <h3 style="color: var(--accent-gold); margin-bottom: 10px;">${masked.name}</h3>
                    <p class="meta" style="color: var(--white); font-weight: 700; opacity: 0.9;">${p.age} yrs • ${p.city} • ${p.sect}</p>
                    <p class="edu" style="font-size: 0.9rem; margin-top: 8px; color: var(--accent-gold);"><i class="fas fa-graduation-cap"></i> ${p.education}</p>
                    <div class="card-footer" style="border-top: 1px solid rgba(212, 175, 55, 0.3); margin-top: 20px; padding-top: 15px;">
                        <span class="contact-preview" style="color: var(--white);"><i class="fas fa-phone"></i> ${masked.contact}</span>
                        <a href="profile-detail.html?id=${p.id}" class="btn-join-elite" style="width: 100%; border-radius: 5px; margin-top: 10px; font-size: 0.85rem; padding: 10px; background: var(--accent-gold); color: var(--primary) !important;">View Details</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
            revealObserver.observe(card);
        });
    };

    // --- Navigation Auth State ---
    const updateNavState = () => {
        const joinBtn = document.querySelector('.btn-join-elite');
        const headerRight = document.querySelector('.header-right');
        if (!headerRight) return;

        if (user) {
            if (joinBtn) joinBtn.remove();
            
            // Add Dashboard/Admin Link
            const dashboardUrl = user.role === 'admin' ? 'admin.html' : 'dashboard.html';
            const dashboardBtn = document.createElement('a');
            dashboardBtn.href = dashboardUrl;
            dashboardBtn.className = 'btn-join-elite';
            dashboardBtn.textContent = user.role === 'admin' ? 'Executive Panel' : 'My Dashboard';
            
            // Add Logout Button
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'btn-minimal';
            logoutBtn.style.marginLeft = '15px';
            logoutBtn.style.color = 'var(--white)';
            logoutBtn.style.cursor = 'pointer';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
            logoutBtn.onclick = () => hayaDB.logout();

            headerRight.appendChild(dashboardBtn);
            headerRight.appendChild(logoutBtn);
        }
    };

    updateNavState();
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.visibility = 'visible';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate').forEach(el => {
        el.style.visibility = 'hidden';
        revealObserver.observe(el);
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 100;
                const offsetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
    // --- 1. Capture Input State Manager ---
    const searchState = {
        age: '20-50',
        city: 'Any'
    };

    const searchAgeEl = document.getElementById('searchAge');
    const searchCityEl = document.getElementById('searchCity');

    if (searchAgeEl) {
        searchState.age = searchAgeEl.value; // Initial fetch
        searchAgeEl.addEventListener('change', (e) => {
            searchState.age = e.target.value;
        });
    }

    if (searchCityEl) {
        searchState.city = searchCityEl.value; // Initial fetch
        searchCityEl.addEventListener('change', (e) => {
            searchState.city = e.target.value;
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();

        // 3. Add a Console Debugger
        const selectedAge = searchState.age;
        const selectedCity = searchState.city;
        console.log("Searching for:", selectedAge, selectedCity);

        // 4. Visual Feedback
        const targetBtn = e.currentTarget;
        const btnText = targetBtn.querySelector('.btn-text');
        const btnSpinner = targetBtn.querySelector('.btn-spinner');
        
        if (btnText) btnText.textContent = "Finding Matches...";
        if (btnSpinner) btnSpinner.style.display = 'inline-block';
        targetBtn.classList.add('btn-loading');

        // 2. Execution Logic & Navigation Fix
        const isSamePage = window.location.pathname.includes('profiles.html');

        if (isSamePage) {
            // Option A: Same page - update instantly
            setTimeout(() => {
                // Remove loading state
                if (btnText) btnText.textContent = "Search Rishta";
                if (btnSpinner) btnSpinner.style.display = 'none';
                targetBtn.classList.remove('btn-loading');

                // Map to profiles side-bar filters
                if (selectedAge.includes('-')) {
                    const [minAge, maxAge] = selectedAge.split('-');
                    const minEl = document.getElementById('filterMinAge');
                    const maxEl = document.getElementById('filterMaxAge');
                    if (minEl) minEl.value = minAge;
                    if (maxEl) maxEl.value = maxAge;
                }
                const cityEl = document.getElementById('filterCity');
                if (cityEl) cityEl.value = selectedCity;
                
                // Immediately trigger the filter engine from ui.js
                if (typeof handleFilterUpdate === 'function') {
                    handleFilterUpdate();
                }

                // Scroll down to the results section smoothly
                const gridSection = document.getElementById('profileGrid');
                if (gridSection) {
                    const offsetPosition = gridSection.offsetTop - 120;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }, 800); // Show loading effect before acting
            
        } else {
            // Option B: Different page - redirect via URL
            const params = new URLSearchParams();
            if (selectedAge) params.append('age', selectedAge);
            if (selectedCity !== 'Any') params.append('city', selectedCity);

            const targetUrl = `profiles.html?${params.toString()}`;
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 800);
        }
    };

    // 2. Fix the "onClick" Event (Direct Attach)
    const mainSearchBtn = document.getElementById('mainSearchBtn');
    if (mainSearchBtn) {
        mainSearchBtn.addEventListener('click', handleSearch);
    }

    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    // --- Reactive Filtering Logic ---
    const getActiveFilters = () => {
        return {
            gender: document.getElementById('filterGender')?.value || 'Any',
            minAge: document.getElementById('filterMinAge')?.value || '18',
            maxAge: document.getElementById('filterMaxAge')?.value || '65',
            city: document.getElementById('filterCity')?.value || 'Any',
            education: document.getElementById('filterEducation')?.value || 'Any'
        };
    };

    const handleFilterUpdate = () => {
        const filters = getActiveFilters();
        renderProfiles(filters);
    };

    // Attach real-time listeners to all inputs
    ['filterGender', 'filterMinAge', 'filterMaxAge', 'filterCity', 'filterEducation'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', handleFilterUpdate);
            el.addEventListener('input', handleFilterUpdate);
        }
    });

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleFilterUpdate();
        });
    }

    // Handle Clear Filters
    const clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
            renderProfiles();
        });
    }

    // Initial Load from URL Params
    const params = new URLSearchParams(window.location.search);
    if (window.location.pathname.includes('profiles.html') && window.location.search) {
        console.log("Applying URL filters:", Object.fromEntries(params));
        
        if (document.getElementById('filterGender')) document.getElementById('filterGender').value = params.get('gender') || 'Bride';
        
        const ageParam = params.get('age');
        if (ageParam && ageParam.includes('-')) {
            const [minAge, maxAge] = ageParam.split('-');
            if (document.getElementById('filterMinAge')) document.getElementById('filterMinAge').value = minAge || '20';
            if (document.getElementById('filterMaxAge')) document.getElementById('filterMaxAge').value = maxAge || '50';
        } else {
            if (document.getElementById('filterMinAge')) document.getElementById('filterMinAge').value = params.get('minAge') || '20';
            if (document.getElementById('filterMaxAge')) document.getElementById('filterMaxAge').value = params.get('maxAge') || '50';
        }
        
        if (document.getElementById('filterCity')) document.getElementById('filterCity').value = params.get('city') || 'Any';
        if (document.getElementById('filterEducation')) document.getElementById('filterEducation').value = params.get('education') || 'Any';
        
        // Ensure sect parameter is correctly assigned to filterReligion if exists (matching typical id)
        if (params.get('sect') && document.getElementById('filterReligion')) {
            document.getElementById('filterReligion').value = params.get('sect');
        }
        
        handleFilterUpdate();
    } else if (window.location.pathname.includes('profiles.html')) {
        renderProfiles();
    }

    // --- Premium Success Stories Carousel ---
    const ssTrack = document.getElementById('ssTrack');
    const ssPrev  = document.getElementById('ssPrev');
    const ssNext  = document.getElementById('ssNext');
    const ssDotsContainer = document.getElementById('ssDots');

    if (ssTrack && ssPrev && ssNext && ssDotsContainer) {
        const cards = ssTrack.querySelectorAll('.ss-card');
        const totalCards = cards.length;
        let currentIndex = 0;
        let autoTimer;

        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('ss-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            ssDotsContainer.appendChild(dot);
        });

        function getVisibleCount() {
            if (window.innerWidth <= 768)  return 1;
            if (window.innerWidth <= 1100) return 2;
            return 3;
        }

        function updateDots() {
            ssDotsContainer.querySelectorAll('.ss-dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
        }

        function goTo(index) {
            const visible = getVisibleCount();
            const maxIndex = Math.max(0, totalCards - visible);
            currentIndex = Math.min(Math.max(index, 0), maxIndex);
            const cardWidth = (cards[0]?.offsetWidth || 0) + 28;
            ssTrack.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
            updateDots();
        }

        ssPrev.addEventListener('click', () => { goTo(currentIndex - 1); resetAuto(); });
        ssNext.addEventListener('click', () => { goTo(currentIndex + 1); resetAuto(); });

        function startAuto() {
            autoTimer = setInterval(() => {
                const visible = getVisibleCount();
                const maxIndex = Math.max(0, totalCards - visible);
                goTo(currentIndex < maxIndex ? currentIndex + 1 : 0);
            }, 5000);
        }

        function resetAuto() { clearInterval(autoTimer); startAuto(); }
        startAuto();
        window.addEventListener('resize', () => goTo(currentIndex));
    }

    // --- General Interactivity ---
    const header = document.querySelector('.luxury-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header?.classList.add('scrolled');
        else header?.classList.remove('scrolled');
    });
});

