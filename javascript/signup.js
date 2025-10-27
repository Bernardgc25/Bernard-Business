//Header and Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.createElement('div');
    
    // Create overlay element
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Dropdown functionality for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 600) {
                e.preventDefault();
                const dropdown = this.parentElement;
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                
                // Close other open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
                    if (activeDropdown !== dropdown) {
                        activeDropdown.classList.remove('active');
                        activeDropdown.querySelector('.dropdown-menu').classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                dropdownMenu.classList.toggle('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside (desktop)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 600) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            // Reset mobile menu state on desktop
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset dropdown states
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
                menu.style.maxHeight = '';
            });
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on ESC
            if (window.innerWidth <= 600 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                menuToggle.focus();
            }
            
            // Close dropdowns on ESC
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
                if (window.innerWidth <= 600) {
                    dropdown.querySelector('.dropdown-menu').classList.remove('active');
                }
            });
        }
    });
});


// Signup Form Functionality
// Toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Show login form (placeholder function)
function showLogin() {
    alert('Login functionality would be implemented here. In a real application, this would navigate to the login page or show the login form.');
}

// Hide success message and show signup form
function hideSuccess() {
    document.getElementById('successMessage').classList.remove('active');
    document.getElementById('signup-form').classList.add('active');
    
    // Reset form
    document.getElementById('signupForm').reset();
}

// Form validation
function validateForm() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Validate name
    if (name === '') {
        showError('signupName', 'Full name is required');
        isValid = false;
    }
    
    // Validate email
    if (email === '') {
        showError('signupEmail', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('signupEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (password === '') {
        showError('signupPassword', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError('signupPassword', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    // Validate confirm password
    if (confirmPassword === '') {
        showError('confirmPassword', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }
    
    return isValid;
}

// Helper function to show error messages
function showError(inputId, message) {
    const inputGroup = document.getElementById(inputId).parentNode;
    
    // Remove existing error message if any
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    inputGroup.appendChild(errorElement);
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submission handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // In a real application, you would send the data to a server here
        // For this example, we'll just show a success message
        
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        
        // Show success message
        document.getElementById('successText').textContent = `Account created successfully for ${name} (${email}). You can now log in.`;
        document.getElementById('signup-form').classList.remove('active');
        document.getElementById('successMessage').classList.add('active');
    }
});

// Add input event listeners for real-time validation
document.querySelectorAll('#signupForm input').forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this.id);
    });
});

// Validate individual field
function validateField(fieldId) {
    const value = document.getElementById(fieldId).value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Clear previous error message
    const inputGroup = document.getElementById(fieldId).parentNode;
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    switch(fieldId) {
        case 'signupName':
            if (value === '') {
                showError(fieldId, 'Full name is required');
            }
            break;
        case 'signupEmail':
            if (value === '') {
                showError(fieldId, 'Email is required');
            } else if (!isValidEmail(value)) {
                showError(fieldId, 'Please enter a valid email address');
            }
            break;
        case 'signupPassword':
            if (value === '') {
                showError(fieldId, 'Password is required');
            } else if (value.length < 6) {
                showError(fieldId, 'Password must be at least 6 characters');
            }
            break;
        case 'confirmPassword':
            if (value === '') {
                showError(fieldId, 'Please confirm your password');
            } else if (password !== confirmPassword) {
                showError(fieldId, 'Passwords do not match');
            }
            break;
    }
}