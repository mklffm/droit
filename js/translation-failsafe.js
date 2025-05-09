/**
 * Translation Failsafe - Last resort method
 * This script runs after everything else and checks if translations have been applied
 */
(function() {
  // Wait until everything else has loaded
  window.addEventListener('load', function() {
    setTimeout(function() {
      console.log("Translation failsafe checking if translations applied...");
      
      // Only run on mobile devices
      const isMobile = window.innerWidth <= 576 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (!isMobile) {
        console.log("Not a mobile device - failsafe not needed");
        return;
      }
      
      // Get current language preference
      const lang = localStorage.getItem('preferredLanguage') || 'fr';
      
      // If we're already on the default language, nothing to do
      if (lang === 'fr') {
        console.log("Using default language - ensuring proper reset");
        
        // Try to use the global resetToOriginal function if available
        if (typeof window.resetToOriginal === 'function') {
          console.log("Using global resetToOriginal function");
          window.resetToOriginal();
        } else {
          // Fallback: Reset document language and direction
          document.documentElement.lang = 'fr';
          document.documentElement.dir = 'ltr';
          document.body.classList.remove('rtl');
          
          // Try to reset content from data-original attributes
          document.querySelectorAll('[data-i18n]').forEach(el => {
            const original = el.getAttribute('data-original');
            if (original) {
              el.innerHTML = original;
            }
          });
          
          console.log("Basic French reset applied");
        }
        return;
      }
      
      // Check if translations were applied by checking document language
      if (document.documentElement.lang === lang) {
        console.log("Document language already set correctly - translations likely applied");
        return;
      }
      
      console.log("FAILSAFE: Translations not properly applied! Attempting direct translation...");
      
      // Get base URL for absolute paths
      const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
      
      // Try all possible paths for translation files
      const possiblePaths = [
        `translations/${lang}.json`,                // Relative path
        `../translations/${lang}.json`,             // One level up
        `/translations/${lang}.json`,               // From root
        `${baseUrl}translations/${lang}.json`,      // Absolute path
        `${window.location.origin}/translations/${lang}.json` // Full origin path
      ];
      
      console.log("FAILSAFE: Will try these paths:", possiblePaths);
      
      // Try each path sequentially
      tryNextPath(0);
      
      // Try loading from each path in sequence
      function tryNextPath(index) {
        if (index >= possiblePaths.length) {
          console.error("FAILSAFE: All translation paths failed");
          
          // Last resort - force reload if we haven't tried already
          if (!sessionStorage.getItem('translationReloaded')) {
            console.log("FAILSAFE: Forcing page reload as last resort");
            sessionStorage.setItem('translationReloaded', 'true');
            window.location.reload();
          }
          return;
        }
        
        const path = possiblePaths[index];
        console.log(`FAILSAFE: Trying path ${index + 1}/${possiblePaths.length}: ${path}`);
        
        fetch(path)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(translations => {
            console.log(`FAILSAFE: Successfully loaded translations from path: ${path}`);
            applyFailsafeTranslations(translations, lang);
          })
          .catch(e => {
            console.error(`FAILSAFE: Path ${path} failed:`, e);
            // Try next path
            tryNextPath(index + 1);
          });
      }
    }, 2000); // Wait 2 seconds after page load
  });
  
  // Apply translations directly as a last resort
  function applyFailsafeTranslations(translations, lang) {
    if (!translations) return;
    
    console.log("FAILSAFE: Translation keys available:", Object.keys(translations).length);
    
    // Apply to elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`FAILSAFE: Found ${elements.length} elements with data-i18n attributes`);
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.innerHTML = translations[key];
        console.log(`FAILSAFE: Translated: ${key}`);
      } else {
        console.warn(`FAILSAFE: No translation found for key: ${key}`);
      }
    });
    
    // Set document direction
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    }
    
    console.log("FAILSAFE: Translations applied!");
  }
})(); 