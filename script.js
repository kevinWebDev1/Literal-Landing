document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlist-form');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Basic Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showMessage("Please enter your email address.", "error");
            return;
        }

        if (!emailRegex.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        // Real API Call to Formspree
        const btn = form.querySelector('.btn-primary');
        const originalText = btn.innerHTML;

        // Show Loading State
        btn.innerHTML = '<span>Joining...</span><svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            mode: 'no-cors'
        }).then(() => {
            showMessage("You're on the list! We'll notify you when we launch.", "success");
            emailInput.value = '';
        }).catch(error => {
            showMessage("Oops! There was a problem submitting your form.", "error");
        }).finally(() => {
            // Restore Original Button
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        });
    });

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;

        // Reset message after 5 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
                formMessage.style.opacity = '1';
            }, 300);
        }, 5000);
    }

    // Add subtle parallax effect to bloody blobs based on mouse movement
    // Only apply on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            const blobs = document.querySelectorAll('.blob-bg');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            blobs.forEach((blob, index) => {
                // Different speeds for different blobs to create depth
                const speed = index === 0 ? 30 : -45;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;

                // Use requestAnimationFrame for smoother performance
                requestAnimationFrame(() => {
                    blob.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.1)`;
                });
            });
        });
    }
});
