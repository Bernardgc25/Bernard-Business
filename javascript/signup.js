// Form switching functionality
function showLogin() {
    document.getElementById('signup-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
}

function showSignup() {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('signup-form').classList.add('active');
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Utility functions
function showError(input, message) {
    const inputGroup = input.parentElement;
    input.classList.add('error');
    
    // Remove existing error message
    let errorMessage = inputGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        inputGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

function clearError(input) {
    input.classList.remove('error');
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccess(message) {
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    successText.textContent = message;
    successMessage.style.display = 'block';
}

function hideSuccess() {
    document.getElementById('successMessage').style.display = 'none';
}

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateName(name) {
    return name.trim().length >= 2;
}

// Sign Up Form Handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    let isValid = true;
    
    // Clear previous errors
    [name, email, password, confirmPassword].forEach(input => clearError(input));
    
    // Validate name
    if (!validateName(name.value)) {
        showError(name, 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    // Validate password confirmation
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate API call
        setTimeout(() => {
            showSuccess(`Account created successfully! Welcome, ${name.value}`);
            this.reset();
            showLogin(); // Switch to login form after successful signup
        }, 1000);
    }
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    
    let isValid = true;
    
    // Clear previous errors
    [email, password].forEach(input => clearError(input));
    
    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate API call
        setTimeout(() => {
            showSuccess('Login successful! Redirecting to dashboard...');
            this.reset();
        }, 1000);
    }
});

// Real-time validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        clearError(this);
    });
});

// Remember me functionality
document.getElementById('rememberMe').addEventListener('change', function() {
    if (this.checked) {
        console.log('Remember me enabled');
        // In a real app, you would set a cookie or use localStorage
    }
});

// Forgot password functionality
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    const email = prompt('Please enter your email address:');
    if (email && validateEmail(email)) {
        showSuccess('Password reset instructions have been sent to your email.');
    } else if (email) {
        alert('Please enter a valid email address.');
    }
});

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth form initialized');
});