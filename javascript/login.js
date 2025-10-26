// Toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.nextElementSibling.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Show signup form (placeholder function)
function showSignup() {
    alert('Sign up functionality would be implemented here');
    // In a real application, this would switch to a signup form
}

// Show success message
function showSuccess(message) {
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    
    successText.textContent = message;
    successMessage.style.display = 'block';
}

// Hide success message
function hideSuccess() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';
}

// Form validation and submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Password validation (at least 6 characters)
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Simulate login process
    // In a real application, this would make an API call
    console.log('Login attempt:', { email, password, rememberMe });
    
    // Show success message
    showSuccess('You have successfully logged in!');
    
    // Reset form
    this.reset();
    
    // Reset labels position
    const labels = document.querySelectorAll('.input-group label');
    labels.forEach(label => {
        label.style.top = '15px';
        label.style.fontSize = '16px';
        label.style.color = '#777';
    });
});

// Add focus/blur events to inputs to handle label animation
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.color = '#6a11cb';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.querySelector('label').style.color = '#777';
        }
    });
});