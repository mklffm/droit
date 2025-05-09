// Script to add the mobile translation fix to all HTML files
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
        
        // Check if the mobile fix is already added
        if (content.includes('mobile-translation-fix.js')) {
            console.log(`${file} already has the mobile translation fix.`);
            return;
        }
        
        // Replace the translations.js script with both scripts
        const updatedContent = content.replace(
            '<script src="js/translations.js"></script>',
            '<script src="js/translations.js"></script>\n    <script src="js/mobile-translation-fix.js"></script>'
        );
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated ${file} with mobile translation fix.`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished adding mobile translation fix to all HTML files.'); 