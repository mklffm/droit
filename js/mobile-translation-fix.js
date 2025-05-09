/**
 * Mobile translation fix - Reliable solution
 * This script ensures translations work correctly on mobile devices
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Enhanced mobile translation fix initialized");
  
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 576 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (!isMobile) {
    console.log("Not a mobile device - skipping mobile fix");
    return;
  }
  
  console.log("Mobile device detected - applying enhanced translation fix");
  
  // Get the saved language or default to French
  const lang = localStorage.getItem('preferredLanguage') || 'fr';
  console.log("Current language setting: " + lang);
  
  // Reset to original language (French)
  function resetToOriginal() {
    console.log("Resetting content to original French");
    
    // Reset HTML content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const original = el.getAttribute('data-original');
      if (original) {
        el.innerHTML = original;
        console.log(`Reset element with key: ${el.getAttribute('data-i18n')}`);
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
    
    // Reset direction
    document.documentElement.lang = 'fr';
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('rtl');
    
    // Update language switcher UI
    updateLanguageSwitcherUI();
    
    console.log("Reset to French completed");
  }
  
  // Make resetToOriginal function globally available
  window.resetToOriginal = resetToOriginal;
  
  // If we're already on French (default), make sure we reset properly
  if (lang === 'fr') {
    console.log("Resetting to French (default language)");
    resetToOriginal();
    return;
  }
  
  // Get base URL for absolute paths
  const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
  console.log("Base URL for translations: " + baseUrl);
  
  // Try all possible paths for translation files
  const possiblePaths = [
    `translations/${lang}.json`,                // Relative path
    `../translations/${lang}.json`,             // One level up
    `/translations/${lang}.json`,               // From root
    `${baseUrl}translations/${lang}.json`,      // Absolute path
    `${window.location.origin}/translations/${lang}.json` // Full origin path
  ];
  
  // Load translations directly from JSON files
  function loadTranslationsDirectly() {
    console.log("Directly loading translations for: " + lang);
    console.log("Will try these paths:", possiblePaths);
    
    // Try each path sequentially until one works
    tryNextPath(0);
  }
  
  // Try loading from each path in sequence
  function tryNextPath(index) {
    if (index >= possiblePaths.length) {
      console.error("All translation paths failed, trying XMLHttpRequest as fallback");
      tryXhrMethod();
      return;
    }
    
    const path = possiblePaths[index];
    console.log(`Trying path ${index + 1}/${possiblePaths.length}: ${path}`);
    
    fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(translations => {
        console.log(`Successfully loaded translations from path: ${path}`);
        applyTranslations(translations);
      })
      .catch(e => {
        console.error(`Path ${path} failed:`, e);
        // Try next path
        tryNextPath(index + 1);
      });
  }
  
  // Fallback method using XMLHttpRequest
  function tryXhrMethod() {
    console.log("Trying XMLHttpRequest method as fallback");
    
    // Try each path with XMLHttpRequest
    tryNextXhrPath(0);
  }
  
  // Try loading from each path using XMLHttpRequest
  function tryNextXhrPath(index) {
    if (index >= possiblePaths.length) {
      console.error("All XMLHttpRequest paths failed");
      
      // Last resort - hardcode the translations for critical elements
      console.log("Using hardcoded translations as last resort");
      const hardcodedTranslations = {
        // Arabic translations for critical UI elements
        "nav_home": "الرئيسية",
        "nav_about": "حول",
        "nav_news": "أخبار",
        "nav_contact": "اتصل بنا",
        "site_title": "مؤسسة تعزيز الحقوق"
      };
      
      applyTranslations(hardcodedTranslations);
      return;
    }
    
    const path = possiblePaths[index];
    console.log(`Trying XHR path ${index + 1}/${possiblePaths.length}: ${path}`);
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(`Successfully loaded translations via XHR from: ${path}`);
        const translations = xhr.response;
        applyTranslations(translations);
      } else {
        console.error(`XHR failed for path ${path}: ${xhr.statusText}`);
        tryNextXhrPath(index + 1);
      }
    };
    
    xhr.onerror = function() {
      console.error(`XHR error for path ${path}`);
      tryNextXhrPath(index + 1);
    };
    
    xhr.send();
  }
  
  // Apply translations to the page content
  function applyTranslations(translations) {
    if (!translations) {
      console.error("No translations to apply");
      return;
    }
    
    console.log("Applying translations to page content");
    console.log("Translation keys available:", Object.keys(translations).length);
    
    // Apply to all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`Found ${elements.length} elements with data-i18n attributes`);
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      
      // Save original if not already saved
      if (!el.getAttribute('data-original')) {
        el.setAttribute('data-original', el.innerHTML);
      }
      
      if (translations[key]) {
        el.innerHTML = translations[key];
        console.log(`Translated: ${key}`);
      } else {
        console.warn(`No translation found for key: ${key}`);
      }
    });
    
    // Apply translations to placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      
      if (!el.getAttribute('data-original-placeholder')) {
        el.setAttribute('data-original-placeholder', el.placeholder || '');
      }
      
      if (translations[key]) {
        el.placeholder = translations[key];
      }
    });
    
    // Apply translations to titles/tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      
      if (!el.getAttribute('data-original-title')) {
        el.setAttribute('data-original-title', el.title || '');
      }
      
      if (translations[key]) {
        el.title = translations[key];
      }
    });
    
    // Apply translations to alt texts
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      
      if (!el.getAttribute('data-original-alt')) {
        el.setAttribute('data-original-alt', el.alt || '');
      }
      
      if (translations[key]) {
        el.alt = translations[key];
      }
    });
    
    // Set document direction based on language
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
    
    console.log("Translation successfully applied to all elements");
    
    // Update language switcher UI
    updateLanguageSwitcherUI();
  }
  
  // Update the language switcher UI to match current language
  function updateLanguageSwitcherUI() {
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.classList.remove('active');
      
      if (el.style) {
        el.style.backgroundColor = '';
        el.style.color = '';
      }
      
      if (el.getAttribute('data-lang') === lang) {
        el.classList.add('active');
        
        if (el.style) {
          el.style.backgroundColor = '#3CB496';
          el.style.color = 'white';
        }
      }
    });
  }
  
  // Start the direct translation loading process with a small delay to ensure the DOM is fully loaded
  setTimeout(loadTranslationsDirectly, 500);
}); 