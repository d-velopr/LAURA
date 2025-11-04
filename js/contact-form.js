// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const originalButtonText = submitButton.innerHTML;

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        // Send data to Google Apps Script
        sendToGoogleSheet(formData);
    });

    // Form validation
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Reset previous error states
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });

        let isValid = true;

        // Name validation
        if (name === '') {
            showError('name', 'Please enter your full name');
            isValid = false;
        }

        // Email validation
        if (email === '') {
            showError('email', 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation
        if (phone === '') {
            showError('phone', 'Please enter your phone number');
            isValid = false;
        }

        // Message validation
        if (message === '') {
            showError('message', 'Please enter your message');
            isValid = false;
        }

        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('is-invalid');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '5px';

        field.parentNode.appendChild(errorDiv);
    }

    // Send data to Google Sheets
    function sendToGoogleSheet(formData) {
        // Replace with your Google Apps Script Web App URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwrCWb12klTgHBPox1VLJmBzGA6b_Ke_ZHyKOhIWxshMHnrH_tkD8pdtsPSbQ6lLRII/exec';
        
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            // Success - show confirmation
            showSuccessMessage();
            contactForm.reset();
        })
        .catch((error) => {
            // Error handling
            showErrorMessage();
            console.error('Error:', error);
        })
        .finally(() => {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
    }

    // Show success message
    function showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success mt-3';
        successDiv.innerHTML = `
            <strong>Thank you!</strong> Your message has been sent successfully. 
            We'll get back to you soon.
        `;
        successDiv.style.backgroundColor = '#d4edda';
        successDiv.style.color = '#155724';
        successDiv.style.border = '1px solid #c3e6cb';
        successDiv.style.padding = '12px';
        successDiv.style.borderRadius = '4px';

        // Insert after the form
        contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);

        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Show error message
    function showErrorMessage() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3';
        errorDiv.innerHTML = `
            <strong>Sorry!</strong> There was an error sending your message. 
            Please try again later.
        `;
        errorDiv.style.backgroundColor = '#f8d7da';
        errorDiv.style.color = '#721c24';
        errorDiv.style.border = '1px solid #f5c6cb';
        errorDiv.style.padding = '12px';
        errorDiv.style.borderRadius = '4px';

        // Insert after the form
        contactForm.parentNode.insertBefore(errorDiv, contactForm.nextSibling);

        // Remove message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Real-time validation
    document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('is-invalid');
                const errorMessage = this.parentNode.querySelector('.invalid-feedback');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
});
