const fs = require('fs');
const path = require('path');

// Dynamic menu template
const dynamicMenuHeader = `
    <header class="dynamic-header">
        <div class="container">
            <!-- Logo -->
            <a href="index.html" class="dynamic-logo">
                <img src="img/logo.png" alt="FPRA" class="logo-img">
                <div class="logo-text">
                    <span class="logo-title">FPRA</span>
                    <span class="logo-subtitle" data-i18n="site_subtitle">Fondation pour la Promotion des Droits</span>
                </div>
            </a>
            
            <!-- Navigation -->
            <nav class="dynamic-nav">
                <ul class="dynamic-menu">
                    <li><a href="index.html" data-i18n="nav_home">Accueil</a></li>
                    <li><a href="about.html" data-i18n="nav_about">À propos</a></li>
                    
                    <li class="has-dropdown">
                        <a href="#" data-i18n="nav_news">Actualités</a>
                        <ul class="dropdown">
                            <li><a href="news.html" data-i18n="nav_news_all">Toutes les actualités</a></li>
                            <li><a href="news.html#reports" data-i18n="nav_reports">Rapports</a></li>
                            <li><a href="news.html#press" data-i18n="nav_press">Communiqués</a></li>
                        </ul>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="formations.html" data-i18n="nav_trainings">Formations</a>
                        <ul class="dropdown">
                            <li><a href="formations.html#upcoming" data-i18n="nav_upcoming_trainings">Formations à venir</a></li>
                            <li><a href="formations.html#past" data-i18n="nav_past_trainings">Formations passées</a></li>
                            <li><a href="formations.html#request" data-i18n="nav_request_training">Demander une formation</a></li>
                        </ul>
                    </li>
                    
                    <li class="has-dropdown">
                        <a href="resources.html" data-i18n="nav_resources">Ressources</a>
                        <ul class="dropdown">
                            <li><a href="resources.html#publications" data-i18n="nav_publications">Publications</a></li>
                            <li><a href="revue.html" data-i18n="nav_review">Revue des droits</a></li>
                            <li><a href="resources.html#guides" data-i18n="nav_guides">Guides pratiques</a></li>
                            <li><a href="resources.html#multimedia" data-i18n="nav_multimedia">Multimédia</a></li>
                        </ul>
                    </li>
                    
                    <li><a href="testimonials.html" data-i18n="nav_testimonials">Témoignages</a></li>
                    <li><a href="civil-society.html" data-i18n="nav_civil_society">Société civile</a></li>
                    <li><a href="gallery.html" data-i18n="nav_gallery">Galerie</a></li>
                    <li><a href="contact.html" data-i18n="nav_contact">Contact</a></li>
                    
                    <!-- Language Switcher for Mobile -->
                </ul>
            </nav>
            
            <!-- Mobile Menu Toggle -->
            <div class="dynamic-menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>
    
    <!-- Menu Overlay for Mobile -->
    <div class="dynamic-menu-overlay"></div>
`;

// CSS link to add to head
const cssLinkTag = '<link rel="stylesheet" href="css/dynamic-menu.css">';

// JS script to add at the end
const jsScriptTag = '<script src="js/dynamic-menu.js"></script>';

// Process all HTML files
function processHtmlFiles() {
    try {
        // Get all HTML files
        const directory = './';
        const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
        console.log(`Found ${htmlFiles.length} HTML files to process...`);
        
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            console.log(`Processing ${file}...`);
            
            try {
                // Read file content
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Skip files that already have the dynamic menu
                if (content.includes('dynamic-header')) {
                    console.log(`Dynamic menu already exists in ${file}, skipping...`);
                    return;
                }
                
                // 1. Add CSS link to head
                if (!content.includes(cssLinkTag)) {
                    content = content.replace('</head>', `    ${cssLinkTag}\n</head>`);
                    console.log(`Added CSS link to ${file}`);
                }
                
                // 2. Add the dynamic menu after skip-link
                if (content.includes('<a href="#content" class="skip-link"')) {
                    content = content.replace(
                        /<a href="#content" class="skip-link".*?<\/a>/s, 
                        '$&\n' + dynamicMenuHeader
                    );
                    console.log(`Added dynamic menu to ${file}`);
                }
                
                // 3. Add the JS script before closing body tag
                if (!content.includes(jsScriptTag)) {
                    content = content.replace('</body>', `    ${jsScriptTag}\n</body>`);
                    console.log(`Added JS script to ${file}`);
                }
                
                // Write modified content back to file
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Successfully updated ${file}`);
                
            } catch (err) {
                console.error(`Error processing ${file}: ${err.message}`);
            }
        });
        
        console.log('Finished applying dynamic menu to all HTML files.');
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Run the processor
processHtmlFiles(); 