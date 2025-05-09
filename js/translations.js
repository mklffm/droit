// Enhanced Translation system for all pages - supports French, English, and Arabic
function initTranslation() {
  console.log("Translation system initialized");
  
  // Cache for translations to avoid repeated fetching
  const translationCache = {};
  
  // Default language
  const DEFAULT_LANGUAGE = 'fr';
  
  // Set website direction based on language
  function setDirection(lang) {
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
      // Add RTL support for elements with direction-sensitive styles
      const directionSensitiveElements = document.querySelectorAll('.direction-sensitive');
      directionSensitiveElements.forEach(el => {
        el.classList.add('rtl-adjusted');
      });
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
      // Remove RTL specific classes
      const directionSensitiveElements = document.querySelectorAll('.direction-sensitive');
      directionSensitiveElements.forEach(el => {
        el.classList.remove('rtl-adjusted');
      });
    }
    console.log(`Document direction changed to: ${document.dir}`);
  }
  
  // Load the appropriate JSON file based on language
  async function loadTranslations(lang) {
    // Return cached translations if available
    if (translationCache[lang]) {
      console.log(`Using cached translations for ${lang}`);
      return translationCache[lang];
    }
    
    console.log(`Attempting to load translations for: ${lang}`);
    
    const urls = [
      `translations/${lang}.json`,  // Try direct path first
      `../translations/${lang}.json` // Try relative path as fallback
    ];
    
    for (const url of urls) {
      try {
        console.log(`Trying to load from: ${url}`);
        const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
        console.log(`Successfully loaded translations for ${lang}`);
        
        // Cache the translations
        translationCache[lang] = data;
      return data;
    } catch (e) {
        console.error(`Failed to load ${lang} translations from ${url}`, e);
        // Continue to next URL
      }
    }
    
    // If we reach here, all attempts failed
    console.error(`All attempts to load ${lang} translations failed`);
    return null;
  }

  // Apply translations to the page
  async function applyTranslation(lang) {
    console.log(`Applying translation for: ${lang}`);
    
    // For default language (French), we can reset to original text
    if (lang === DEFAULT_LANGUAGE) {
      resetToOriginal();
      return;
    }
    
    const translations = await loadTranslations(lang);
    if (!translations) {
      console.error("No translations loaded, cannot proceed");
      return;
    }
    
    // Apply to all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`Found ${elements.length} elements with data-i18n attributes`);
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      
        // Save original content if not already saved
        if (!el.getAttribute('data-original')) {
          el.setAttribute('data-original', el.innerHTML);
        }
      
      if (translations[key]) {
        el.innerHTML = translations[key];
      } else {
        console.warn(`No translation found for key: ${key}`);
      }
    });
    
    // Apply translations to placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      
      // Save original placeholder if not already saved
      if (!el.getAttribute('data-original-placeholder')) {
        el.setAttribute('data-original-placeholder', el.placeholder || '');
      }
      
      if (translations[key]) {
        el.placeholder = translations[key];
      } else {
        console.warn(`No translation found for placeholder key: ${key}`);
      }
    });
    
    // Apply translations to titles/tooltips
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      
      // Save original title if not already saved
      if (!el.getAttribute('data-original-title')) {
        el.setAttribute('data-original-title', el.title || '');
      }
      
      if (translations[key]) {
        el.title = translations[key];
      } else {
        console.warn(`No translation found for title key: ${key}`);
      }
    });
    
    // Apply translations to alt texts
    const altElements = document.querySelectorAll('[data-i18n-alt]');
    altElements.forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      
      // Save original alt if not already saved
      if (!el.getAttribute('data-original-alt')) {
        el.setAttribute('data-original-alt', el.alt || '');
      }
      
      if (translations[key]) {
        el.alt = translations[key];
      } else {
        console.warn(`No translation found for alt key: ${key}`);
      }
    });
    
    // Change document direction for RTL languages
    setDirection(lang);
    
    // Update active state in language switcher
    document.querySelectorAll('.language-switch a, .dynamic-lang-switch a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('data-lang') === lang) {
        a.classList.add('active');
      }
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    console.log(`Language preference saved: ${lang}`);
  }
  
  // Reset to original language
  function resetToOriginal() {
    // Reset HTML content
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
    
    // Reset direction
    setDirection(DEFAULT_LANGUAGE);
    
    // Update language switcher
    document.querySelectorAll('.language-switch a, .dynamic-lang-switch a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('data-lang') === DEFAULT_LANGUAGE) {
        a.classList.add('active');
      }
    });
    
    localStorage.setItem('preferredLanguage', DEFAULT_LANGUAGE);
  }
  
  // Public function to switch language - exported to global scope
  window.switchLanguage = function(lang) {
    console.log(`switchLanguage called with: ${lang}`);
    
    // Always save the preference immediately (this helps with mobile)
    localStorage.setItem('preferredLanguage', lang);
    
    // Add a small delay to ensure UI updates properly
    setTimeout(() => {
      // Call the implementation function
      applyTranslation(lang);
      
      // Update any mobile language switchers
      document.querySelectorAll('.mobile-language-switcher a').forEach(a => {
        a.classList.remove('active');
        if (a.style) {
          a.style.backgroundColor = '';
          a.style.color = '#333';
        }
        
        if (a.getAttribute('data-lang') === lang) {
          a.classList.add('active');
          if (a.style) {
            a.style.backgroundColor = '#3CB496';
            a.style.color = 'white';
          }
        }
      });
      
      // Display notification of language change
      const langNames = {
        'fr': 'Français',
        'en': 'English',
        'ar': 'العربية'
      };
      
      // Create notification div
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(60, 180, 150, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      notification.textContent = `${langNames[lang] || lang.toUpperCase()}`;
      document.body.appendChild(notification);
      
      // Fade in
      setTimeout(() => {
        notification.style.opacity = '1';
        // Fade out after 2 seconds
        setTimeout(() => {
          notification.style.opacity = '0';
          // Remove from DOM after fade out
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 2000);
      }, 100);
    }, 50);
    
    return true;
  };
  
  // Add event listeners to language switcher
  function setupLanguageSwitchers() {
  document.querySelectorAll('.language-switch a, .dynamic-lang-switch a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = a.getAttribute('data-lang');
        window.switchLanguage(lang);
      });
    });
  }
  
  // Scan the DOM for elements without data-i18n attributes but with text content
  function scanForUntranslatedElements() {
    // Target headings, paragraphs, buttons, links, and spans with text content
    const potentialElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, span');
    let untranslatedCount = 0;
    
    potentialElements.forEach(el => {
      // Skip elements that already have a translation attribute or are empty
      if (el.hasAttribute('data-i18n') || !el.textContent.trim()) {
        return;
      }
      
      // Skip elements that are inside form controls or script tags
      if (el.closest('script') || el.closest('style')) {
        return;
      }
      
      // Skip elements with only whitespace or numbers
      const text = el.textContent.trim();
      if (!text || /^\d+$/.test(text)) {
        return;
      }
      
      console.warn(`Found potential untranslated element: ${el.tagName}`, text.substring(0, 50) + (text.length > 50 ? '...' : ''));
      untranslatedCount++;
    });
    
    if (untranslatedCount > 0) {
      console.warn(`Found ${untranslatedCount} potential untranslated elements. Consider adding data-i18n attributes.`);
    }
  }
  
  // Initialize everything when DOM is ready
  function initialize() {
    console.log("Translation system: initializing...");
    
    // Check if we're on a mobile device 
    const isMobile = window.innerWidth <= 576 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Expose applyTranslation for direct access (helps with mobile)
    window.applyTranslation = applyTranslation;
    
    setupLanguageSwitchers();
    
    // Add specific listeners for mobile language switchers
    document.querySelectorAll('.mobile-language-switcher a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lang = a.getAttribute('data-lang');
        console.log(`Mobile language switcher clicked: ${lang}`);
        
        // Special handling for mobile devices - always force reload
        if (isMobile) {
          console.log("Mobile device detected - forcing reload approach");
          localStorage.setItem('preferredLanguage', lang);
          window.location.reload();
          return;
        }
        
        // Regular approach for non-mobile
        localStorage.setItem('preferredLanguage', lang);
        applyTranslation(lang);
        
        // Update UI to show active state
        document.querySelectorAll('.mobile-language-switcher a, .language-switcher a').forEach(btn => {
          btn.classList.remove('active');
          if (btn.style) {
            btn.style.backgroundColor = '';
            btn.style.color = '#333';
          }
          
          if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
            if (btn.style) {
              btn.style.backgroundColor = '#3CB496';
              btn.style.color = 'white';
            }
          }
        });
      });
      
      // Also add touchend event for better mobile support
      a.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lang = a.getAttribute('data-lang');
        console.log(`Mobile language switcher touched: ${lang}`);
        
        // Special handling for mobile devices - always force reload
        if (isMobile) {
          console.log("Mobile device detected (touch) - forcing reload approach");
          localStorage.setItem('preferredLanguage', lang);
          window.location.reload();
          return;
        }
        
        // Regular approach for non-mobile
        localStorage.setItem('preferredLanguage', lang);
        applyTranslation(lang);
        
        // Update UI to show active state
        document.querySelectorAll('.mobile-language-switcher a, .language-switcher a').forEach(btn => {
          btn.classList.remove('active');
          if (btn.style) {
            btn.style.backgroundColor = '';
            btn.style.color = '#333';
          }
          
          if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
            if (btn.style) {
              btn.style.backgroundColor = '#3CB496';
              btn.style.color = 'white';
            }
          }
        });
      }, false);
  });
  
  // Check for saved language preference
  const savedLang = localStorage.getItem('preferredLanguage');
    
    if (savedLang) {
      console.log(`Translation system: found saved language preference: ${savedLang}`);
    applyTranslation(savedLang);
    } else {
      // No saved preference, check browser language
      const browserLang = navigator.language.split('-')[0]; // Get the language code without region
      console.log(`Translation system: detected browser language: ${browserLang}`);
      
      if (['fr', 'en', 'ar'].includes(browserLang)) {
        applyTranslation(browserLang);
      } else {
        // Fallback to default language
        console.log(`Translation system: using default language: ${DEFAULT_LANGUAGE}`);
        applyTranslation(DEFAULT_LANGUAGE);
      }
    }
    
    // Only run in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      scanForUntranslatedElements();
    }
    
    // Make sure the switchLanguage function is globally available
    if (!window.switchLanguage) {
      console.error("Translation system: Failed to expose switchLanguage to window object. Attempting fix...");
      window.switchLanguage = function(lang) {
        console.log(`Global fallback switchLanguage called with: ${lang}`);
        localStorage.setItem('preferredLanguage', lang);
        
        // Try to update UI without reloading if possible
        document.querySelectorAll('.language-switcher a, .mobile-language-switcher a').forEach(btn => {
          btn.classList.remove('active');
          if (btn.style) {
            btn.style.backgroundColor = '';
            btn.style.color = '#333';
          }
          
          if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
            if (btn.style) {
              btn.style.backgroundColor = '#3CB496';
              btn.style.color = 'white';
            }
          }
        });
        
        // Only reload if absolutely necessary
        if (document.documentElement.lang !== lang) {
          console.log("Reloading page to apply language change");
          window.location.reload();
        }
        return true;
      };
    }
    
    console.log("Translation system: initialization complete");
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
}

// Initialize the translation system
initTranslation();

// Ensure switchLanguage is globally available as a fallback
if (typeof window.switchLanguage !== 'function') {
  console.warn("Translation system: Setting up global fallback for switchLanguage");
  window.switchLanguage = function(lang) {
    console.log(`Global fallback switchLanguage called with: ${lang}`);
    localStorage.setItem('preferredLanguage', lang);
    console.log("Reloading page to apply language change");
    window.location.reload();
    return true;
  };
} 