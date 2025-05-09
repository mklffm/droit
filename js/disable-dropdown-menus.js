// Script to disable dropdown menus
document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown toggle elements
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Convert dropdown toggles to regular links
    dropdownToggles.forEach(toggle => {
        // Remove dropdown toggle class
        toggle.classList.remove('dropdown-toggle');
        
        // Remove click event listeners by cloning and replacing the element
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // Make parent element a regular list item
        const parentLi = newToggle.closest('li');
        if (parentLi) {
            parentLi.classList.remove('dropdown');
            parentLi.classList.remove('dropdown-open');
        }
    });
    
    // Remove all dropdown menus
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.remove();
    });
    
    console.log('Dropdown menus disabled successfully');
}); 