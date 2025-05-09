// Script to add the French reset fix to all HTML files
const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
    'index.html',
    'about.html',
    'civil-society.html',
    'contact.html',
    'formations.html',
    'gallery.html',
    'news.html',
    'resources.html',
    'revue.html',
    'societe-civile.html',
    'temoignages.html',
    'testimonials.html'
];

// Process each file
htmlFiles.forEach(file => {
    try {
        // Read the file
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if the French reset fix is already added
        if (content.includes('french-reset-fix.js')) {
            console.log(`${file} already has the French reset fix.`);
            return;
        }
        
        // Find the position right after the mobile-translation-fix.js script
        const mobileFixPos = content.indexOf('<script src="js/mobile-translation-fix.js"></script>');
        
        if (mobileFixPos !== -1) {
            // Find the end of this script tag
            const endScriptPos = content.indexOf('</script>', mobileFixPos) + 9;
            
            // Insert the French reset fix right after the mobile translation fix
            const updatedContent = content.slice(0, endScriptPos) +
                '\n    <script src="js/french-reset-fix.js"></script>' +
                content.slice(endScriptPos);
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Updated ${file} with French reset fix.`);
        } else {
            // If mobile-translation-fix.js not found, insert before closing head tag
            const headClosePos = content.indexOf('</head>');
            if (headClosePos !== -1) {
                const updatedContent = content.slice(0, headClosePos) +
                    '    <script src="js/french-reset-fix.js"></script>\n' +
                    content.slice(headClosePos);
                
                // Write the updated content back to the file
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Updated ${file} with French reset fix (in head).`);
            } else {
                console.error(`Could not find suitable insertion point in ${file}`);
            }
        }
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished adding French reset fix to all HTML files.'); 