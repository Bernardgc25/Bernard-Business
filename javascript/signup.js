// Form switching functionality
function showLogin() {
    event.preventDefault();
    document.getElementById('signup-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
}

function showSignup() {
    event.preventDefault();
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('signup-form').classList.add('active');
}

// Password visibility toggle
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

// Success message handling
function showSuccess(message) {
    document.getElementById('successText').textContent = message;
    document.getElementById('successMessage').classList.add('active');
    document.getElementById('signup-form').classList.remove('active');
    document.getElementById('login-form').classList.remove('active');
}

function hideSuccess() {
    document.getElementById('successMessage').classList.remove('active');
    document.getElementById('signup-form').classList.add('active');
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        
        // Simulate successful signup
        console.log('Signup attempt:', { name, email, password });
        showSuccess('Account created successfully! You can now login.');
        
        // Clear form
        signupForm.reset();
    });
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Simulate login validation
        console.log('Login attempt:', { email, password, rememberMe });
        
        // For demo purposes, always show success
        showSuccess('Login successful! Welcome back.');
        
        // Clear form
        loginForm.reset();
    });
    
    // Enhanced input label handling
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        // Add placeholder for CSS to work with :not(:placeholder-shown)
        if (!input.getAttribute('placeholder')) {
            input.setAttribute('placeholder', ' ');
        }
        
        // Handle input focus/blur for better UX
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#667eea';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.querySelector('label').style.color = '#999';
            }
        });
    });
});