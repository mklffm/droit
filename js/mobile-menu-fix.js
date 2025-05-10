// Mobile Menu Fix JS
document.addEventListener('DOMContentLoaded', function() {
    console.log("Mobile menu script loaded and running");
    
    // Get elements
    const menuToggle = document.querySelector('.dynamic-menu-toggle');
    const navMenu = document.querySelector('.dynamic-nav-menu');
    const overlay = document.querySelector('.dynamic-menu-overlay');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (!menuToggle || !navMenu || !overlay) {
        console.error("Menu elements not found!");
        return;
    }
    
    console.log("Menu elements found successfully");
    
    // Toggle the mobile menu
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Menu toggle clicked");
        
        // Toggle classes
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Accessibility
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        console.log("Overlay clicked");
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
    
    // Handle dropdown toggles on mobile
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                console.log("Dropdown toggle clicked");
                const parent = this.parentElement;
                parent.classList.toggle('dropdown-open');
            }
        });
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            
            document.querySelectorAll('.dropdown-open').forEach(function(dropdown) {
                dropdown.classList.remove('dropdown-open');
            });
        }
    });
    
    // Add an extra event listener for clicks outside the menu
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            !overlay.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    console.log("Mobile menu setup complete");
}); 