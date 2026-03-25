/**
 * Haya Marriage Bureau - Multi-Step Registration Logic
 */

import hayaDB from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('luxuryForm');
    if (!form) return;

    const steps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progressBar');
    const stepLabels = document.querySelectorAll('.step-label');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    let currentStep = 1;
    const totalSteps = steps.length;

    const updateUI = () => {
        // Update steps visibility with smooth fade
        steps.forEach((step, idx) => {
            if (idx === currentStep - 1) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update Progress Bar
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;

        // Update Labels
        stepLabels.forEach((label, idx) => {
            label.classList.toggle('active', idx < currentStep);
        });

        // Update Buttons
        prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
        
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }

        // Scroll to top of card for better UX on mobile
        document.querySelector('.luxury-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const validateStep = (step) => {
        const currentStepEl = document.getElementById(`step${step}`);
        const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
        let valid = true;
        
        inputs.forEach(input => {
            if (!input.value) {
                input.style.borderColor = 'var(--primary-maroon)';
                valid = false;
            } else {
                input.style.borderColor = 'var(--accent-gold)';
            }
        });
        
        return valid;
    };

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateUI();
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finalizing Registration...';

        // Collect Form Data
        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            cnic: document.getElementById('cnic').value,
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value.toLowerCase(),
            city: document.getElementById('city').value,
            sect: document.getElementById('sect').value,
            education: document.getElementById('education').value,
            profession: document.getElementById('profession').value,
            income: document.getElementById('income').value,
            password: 'user123' // Mock password for simulation
        };

        try {
            // Register as User
            const user = hayaDB.signup({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            // Create Profile in Pending State
            hayaDB.addProfile({
                ...formData,
                status: 'pending',
                joined: new Date().toISOString().split('T')[0],
                image: 'images/profiles/avatar_placeholder.png'
            });

            console.log('Registration Successful:', user);
            
            // Redirect after delay for "premium" feel
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);

        } catch (error) {
            console.error('Registration failed:', error);
            submitBtn.innerHTML = 'Error. Try Again';
            submitBtn.disabled = false;
        }
    });
});
