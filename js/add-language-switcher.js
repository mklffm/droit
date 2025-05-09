// Add a prominent language switcher to all pages
document.addEventListener('DOMContentLoaded', function() {
    // Create the language options - removing English
    const languages = [
        { code: 'fr', name: 'Français', class: 'lang-fr', emoji: '🇫🇷' },
        { code: 'ar', name: 'العربية', class: 'lang-ar', emoji: '🇩🇿' }
    ];
    
    // Get the current language from localStorage or default to 'fr'
    const currentLang = localStorage.getItem('preferredLanguage') || 'fr';
    
    // Function to ensure language selection is synced across UI
    const syncLanguageUI = function() {
        // Get current language from localStorage
        const selectedLang = localStorage.getItem('preferredLanguage') || 'fr';
        
        // Update all UI elements that show language selection
        document.querySelectorAll('.mobile-language-switcher a, .language-switch a, .dynamic-lang-switch a').forEach(a => {
            // Reset styles first
            a.classList.remove('active');
            if (a.style) {
                a.style.backgroundColor = '';
                a.style.color = '#333';
            }
            
            // Apply active styles where needed
            if (a.getAttribute('data-lang') === selectedLang) {
                a.classList.add('active');
                if (a.style) {
                    a.style.backgroundColor = '#3CB496';
                    a.style.color = 'white';
                }
            }
        });
        
        // Call switchLanguage if it exists to ensure page content is updated
        if (typeof window.switchLanguage === 'function') {
            // Only call if needed - avoid unnecessary page redraws
            if (document.documentElement.lang !== selectedLang) {
                window.switchLanguage(selectedLang);
            }
        }
    };
    
    // Create compact language switcher to place next to logo
    const compactSwitcher = document.createElement('div');
    compactSwitcher.className = 'compact-language-switcher';
    compactSwitcher.style.cssText = `
        display: flex;
        align-items: center;
        margin-left: 15px;
        gap: 5px;
    `;
    
    // Add language buttons for compact switcher
    languages.forEach(lang => {
        const compactButton = document.createElement('a');
        compactButton.href = '#';
        compactButton.setAttribute('data-lang', lang.code);
        compactButton.className = lang.class;
        compactButton.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            font-size: 0.85rem;
            border-radius: 50%;
            color: #333;
            text-decoration: none;
            transition: all 0.3s ease;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        `;
        
        compactButton.innerHTML = `${lang.emoji}`;
        compactButton.title = lang.name;
        
        // Add active class to the current language
        if (lang.code === currentLang) {
            compactButton.classList.add('active');
            compactButton.style.backgroundColor = '#3CB496';
        }
        
        // Add click event
        compactButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get language and save preference
            const langCode = this.getAttribute('data-lang');
            localStorage.setItem('preferredLanguage', langCode);
            
            // Special handling for French to ensure proper reset
            if (langCode === 'fr') {
                console.log("Switching back to French - ensuring proper reset");
                // Try to reset content directly if possible
                if (typeof resetToOriginal === 'function') {
                    resetToOriginal();
                    // Update UI immediately
                    document.querySelectorAll('[data-lang]').forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.style) {
                            btn.style.backgroundColor = '';
                            btn.style.color = '';
                        }
                        
                        if (btn.getAttribute('data-lang') === 'fr') {
                            btn.classList.add('active');
                            if (btn.style) {
                                btn.style.backgroundColor = '#3CB496';
                                btn.style.color = 'white';
                            }
                        }
                    });
                    return; // Skip reload if reset worked
                }
            }
            
            // Force reload the page
            window.location.reload();
        });
        
        compactSwitcher.appendChild(compactButton);
    });
    
    // Insert the compact switcher next to the logo
    setTimeout(() => {
        const logo = document.querySelector('.dynamic-logo');
        if (logo) {
            logo.parentNode.insertBefore(compactSwitcher, logo.nextSibling);
        }
    }, 100);
    
    // Run initial sync to ensure UI is consistent
    syncLanguageUI();
    
    // Add a delayed initialization to ensure translation system is fully loaded
    setTimeout(() => {
        // Force a sync check to ensure translations are applied
        const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
        
        // Apply translations
        if (typeof window.switchLanguage === 'function') {
            console.log('Forcing initial language sync to: ' + savedLang);
            window.switchLanguage(savedLang);
        }
    }, 500);
}); 