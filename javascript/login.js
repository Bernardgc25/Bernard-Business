class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.loginBtn = document.getElementById('loginBtn');
        this.spinner = document.getElementById('spinner');
        this.btnText = document.querySelector('.btn-text');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupInputValidation();
    }
    
    setupInputValidation() {
        // Real-time validation
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        
        // Clear errors on input
        this.emailInput.addEventListener('input', () => this.clearError('emailError'));
        this.passwordInput.addEventListener('input', () => this.clearError('passwordError'));
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        
        if (!email) {
            this.showError('emailError', 'Email is required');
            this.emailInput.classList.add('error');
            return false;
        }
        
        if (!this.isValidEmail(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            this.emailInput.classList.add('error');
            return false;
        }
        
        this.clearError('emailError');
        this.emailInput.classList.remove('error');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        const passwordError = document.getElementById('passwordError');
        
        if (!password) {
            this.showError('passwordError', 'Password is required');
            this.passwordInput.classList.add('error');
            return false;
        }
        
        if (password.length < 6) {
            this.showError('passwordError', 'Password must be at least 6 characters');
            this.passwordInput.classList.add('error');
            return false;
        }
        
        this.clearError('passwordError');
        this.passwordInput.classList.remove('error');
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
    }
    
    showLoading() {
        this.loginBtn.disabled = true;
        this.btnText.style.opacity = '0';
        this.spinner.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loginBtn.disabled = false;
        this.btnText.style.opacity = '1';
        this.spinner.classList.add('hidden');
    }
    
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notificationMessage');
        
        notificationMessage.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }
        
        // Get form data
        const formData = {
            email: this.emailInput.value.trim(),
            password: this.passwordInput.value,
            rememberMe: document.getElementById('rememberMe').checked
        };
        
        // Simulate API call
        this.showLoading();
        
        try {
            // In a real application, you would make an API call here
            await this.simulateLogin(formData);
            
            this.showNotification('Login successful! Redirecting...', 'success');
            
            // Reset form
            this.form.reset();
            
            // In a real application, you would redirect the user
            // setTimeout(() => {
            //     window.location.href = '/dashboard';
            // }, 2000);
            
        } catch (error) {
            this.showNotification('Login failed. Please check your credentials.', 'error');
        } finally {
            this.hideLoading();
        }
    }
    
    simulateLogin(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate successful login for demo@example.com / password123
                if (formData.email === 'demo@example.com' && formData.password === 'password123') {
                    resolve({ success: true, message: 'Login successful' });
                } else {
                    reject({ success: false, message: 'Invalid credentials' });
                }
            }, 1500);
        });
    }
}

// Initialize the login form when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});

// Additional utility functions
function togglePasswordVisibility(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoginForm;
}