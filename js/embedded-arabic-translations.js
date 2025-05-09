/**
 * Embedded Arabic Translations
 * This script contains embedded Arabic translations for critical UI elements
 * to ensure translations work even when JSON loading fails
 */
(function() {
  // Wait until page is loaded
  window.addEventListener('load', function() {
    // Only run after a delay to let other methods try first
    setTimeout(function() {
      // Only run on mobile devices with Arabic selected
      const isMobile = window.innerWidth <= 576 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const lang = localStorage.getItem('preferredLanguage');
      
      if (!isMobile || lang !== 'ar') {
        return;
      }
      
      // Check if Arabic is already applied
      if (document.documentElement.lang === 'ar' && document.documentElement.dir === 'rtl') {
        console.log("Arabic already applied, no need for embedded translations");
        return;
      }
      
      console.log("Applying embedded Arabic translations as last resort");
      
      // Embedded Arabic translations for critical UI elements
      const embeddedTranslations = {
        // Navigation
        "nav_home": "الرئيسية",
        "nav_about": "حول",
        "nav_news": "أخبار",
        "nav_review": "مراجعة",
        "nav_training": "تدريب",
        "nav_resources": "موارد",
        "nav_testimonials": "شهادات",
        "nav_civil_society": "المجتمع المدني",
        "nav_gallery": "معرض",
        "nav_contact": "اتصل بنا",
        
        // Common UI elements
        "site_title": "مؤسسة تعزيز الحقوق",
        "skip_to_content": "انتقل إلى المحتوى",
        "read_more": "اقرأ المزيد",
        
        // Footer
        "footer_rights": "جميع الحقوق محفوظة",
        "footer_contact": "اتصل بنا",
        "footer_follow": "تابعنا",
        
        // Hero section
        "hero_title": "تعزيز وحماية حقوق الإنسان",
        "hero_subtitle": "نعمل على بناء مجتمع يحترم حقوق الإنسان ويحميها"
      };
      
      // Apply embedded translations
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (embeddedTranslations[key]) {
          el.innerHTML = embeddedTranslations[key];
        }
      });
      
      // Set document direction for Arabic
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
      
      console.log("Embedded Arabic translations applied");
    }, 3000); // Wait 3 seconds to let other methods try first
  });
})(); 