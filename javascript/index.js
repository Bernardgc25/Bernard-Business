// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Scroll to the target section with smooth behavior
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveLink(this);
            }
        });
    });
    
    // Function to update the active navigation link
    function updateActiveLink(activeLink) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the clicked link
        activeLink.classList.add('active');
    }
    
    // Add event listener to the appointment button in the banner
    const appointmentButton = document.getElementById('appointment-button');
    if (appointmentButton) {
        appointmentButton.addEventListener('click', function() {
            const appointmentSection = document.getElementById('appointment-section');
            if (appointmentSection) {
                appointmentSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active link to "Book Appointment"
                const appointmentLink = document.querySelector('a[href="#appointment-section"]');
                if (appointmentLink) {
                    updateActiveLink(appointmentLink);
                }
            }
        });
    }
    
    // Update active link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});