/**
 * French Reset Fix
 * This script ensures that switching back to French works correctly
 * by properly resetting content to original values
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("French reset fix initialized");
    
    // Check if we need to run (only for French language)
    const lang = localStorage.getItem('preferredLanguage') || 'fr';
    if (lang !== 'fr') {
      console.log("Not using French - reset fix not needed");
      return;
    }
    
    console.log("French language detected - ensuring proper reset");
    
    // Function to reset content to original French
    function resetToFrench() {
      console.log("Applying French reset");
      
      // Set document language and direction
      document.documentElement.lang = 'fr';
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
      
      // Reset HTML content from data-original attributes
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const original = el.getAttribute('data-original');
        if (original) {
          el.innerHTML = original;
        }
      });
      
      // Reset placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const original = el.getAttribute('data-original-placeholder');
        if (original) {
          el.placeholder = original;
        }
      });
      
      // Reset titles
      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const original = el.getAttribute('data-original-title');
        if (original) {
          el.title = original;
        }
      });
      
      // Reset alt texts
      document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const original = el.getAttribute('data-original-alt');
        if (original) {
          el.alt = original;
        }
      });
      
      // Update language switcher UI
      document.querySelectorAll('[data-lang]').forEach(el => {
        el.classList.remove('active');
        
        if (el.style) {
          el.style.backgroundColor = '';
          el.style.color = '';
        }
        
        if (el.getAttribute('data-lang') === 'fr') {
          el.classList.add('active');
          
          if (el.style) {
            el.style.backgroundColor = '#3CB496';
            el.style.color = 'white';
          }
        }
      });
      
      console.log("French reset completed");
    }
    
    // Expose function globally
    window.resetToFrench = resetToFrench;
    
    // Try to reset immediately
    setTimeout(resetToFrench, 100);
    
    // Also try again after a delay to catch any late-loading elements
    setTimeout(resetToFrench, 1000);
  });
})(); 