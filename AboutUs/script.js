// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Toggle menu when hamburger is clicked
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change hamburger icon to X when menu is open
        if (navLinks.classList.contains('active')) {
            mobileMenu.innerHTML = '✕';
        } else {
            mobileMenu.innerHTML = '☰';
        }
    });

    // Close menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu.innerHTML = '☰';
        });
    });

    // Close menu when clicking outside the navigation
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            navLinks.classList.remove('active');
            mobileMenu.innerHTML = '☰';
        }
    });
});