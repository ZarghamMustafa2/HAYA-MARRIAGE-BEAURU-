document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    let currentStep = 1;
    function showStep(s) {
        steps.forEach((step, i) => step.classList.toggle('active', i === s - 1));
        stepIndicators.forEach((ind, i) => { ind.classList.toggle('active', i === s - 1); ind.classList.toggle('completed', i < s - 1); });
        prevBtn.style.visibility = s === 1 ? 'hidden' : 'visible';
        if (s === steps.length) { nextBtn.style.display = 'none'; submitBtn.style.display = 'inline-block'; } 
        else { nextBtn.style.display = 'inline-block'; submitBtn.style.display = 'none'; }
        document.querySelector('.registration-container').scrollIntoView({ behavior: 'smooth' });
    }
    nextBtn.addEventListener('click', () => { if (validateStep(currentStep)) { currentStep++; showStep(currentStep); } });
    prevBtn.addEventListener('click', () => { if (currentStep > 1) { currentStep--; showStep(currentStep); } });
    function validateStep(s) {
        const inputs = document.getElementById(`step${s}`).querySelectorAll('input[required], select[required]');
        let ok = true;
        inputs.forEach(i => { if (!i.value.trim()) { i.style.borderColor = 'red'; ok = false; } else { i.style.borderColor = '#DDD'; } });
        if (!ok) alert('Please fill in all required fields.');
        return ok;
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('haya_user_profile', JSON.stringify(Object.fromEntries(new FormData(form).entries())));
        alert('Thank you! Your registration is complete. Verification within 24-48 hours.');
        window.location.href = 'index.html';
    });
});
