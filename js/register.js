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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finalizing Registration...';

        // Collect Form Data
        const userName = document.getElementById('fullName').value;
        const userPackage = document.getElementById('selectedPackage').value;
        const userPhone = document.getElementById('phone').value;
        
        // Construct WhatsApp Message
        const message = `New Membership Request:
Name: ${userName}
Selected Package: ${userPackage}
Phone: ${userPhone}
Note: Customer will share the payment screenshot/picture in this chat.`;

        // Redirect after delay for "premium" feel
        setTimeout(() => {
            const waUrl = `https://wa.me/923079661669?text=${encodeURIComponent(message)}`;
            window.location.href = waUrl;
        }, 1500);
    });
});
