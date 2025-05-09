// Script to organize the menu bar
document.addEventListener('DOMContentLoaded', function() {
    // Add a small icon to each menu item for better visual organization
    const menuIcons = {
        'nav_home': 'fa-home',
        'nav_about': 'fa-info-circle',
        'nav_news': 'fa-newspaper',
        'nav_review': 'fa-book',
        'nav_training': 'fa-graduation-cap',
        'nav_resources': 'fa-folder-open',
        'nav_testimonials': 'fa-quote-right',
        'nav_civil_society': 'fa-users',
        'nav_gallery': 'fa-images',
        'nav_contact': 'fa-envelope'
    };
    
    // Get all menu items
    const menuItems = document.querySelectorAll('.dynamic-nav-menu > li > a');
    
    // Add icons to menu items
    menuItems.forEach(item => {
        const i18nKey = item.getAttribute('data-i18n');
        if (i18nKey && menuIcons[i18nKey]) {
            // Create icon element
            const icon = document.createElement('i');
            icon.className = `fas ${menuIcons[i18nKey]}`;
            icon.style.marginRight = '8px';
            icon.style.fontSize = '0.9em';
            
            // Add icon before text
            item.insertBefore(icon, item.firstChild);
        }
    });
    
    // Function to highlight the active menu item based on current page
    const highlightActivePage = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
            }
        });
    };
    
    // Call the function to highlight active page
    highlightActivePage();
    
    // Make the menu responsive to window size
    const adjustMenuLayout = () => {
        const header = document.querySelector('.dynamic-header');
        if (!header) return;
        
        if (window.innerWidth <= 991) {
            header.classList.add('mobile-view');
        } else {
            header.classList.remove('mobile-view');
        }
    };
    
    // Call initially and on resize
    adjustMenuLayout();
    window.addEventListener('resize', adjustMenuLayout);
}); 