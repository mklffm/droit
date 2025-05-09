// Script to add the embedded Arabic translations to all HTML files
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
        
        // Check if the embedded translations are already added
        if (content.includes('embedded-arabic-translations.js')) {
            console.log(`${file} already has the embedded translations.`);
            return;
        }
        
        // Find the position right before the closing body tag
        const bodyClosePos = content.lastIndexOf('</body>');
        
        if (bodyClosePos === -1) {
            console.error(`Could not find </body> tag in ${file}`);
            return;
        }
        
        // Insert the embedded translations script right before the translation failsafe
        if (content.includes('translation-failsafe.js')) {
            // Insert before the failsafe script
            const failsafePos = content.lastIndexOf('<script src="js/translation-failsafe.js"></script>');
            if (failsafePos !== -1) {
                const updatedContent = content.slice(0, failsafePos) +
                    '    <script src="js/embedded-arabic-translations.js"></script>\n' +
                    content.slice(failsafePos);
                
                // Write the updated content back to the file
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Updated ${file} with embedded translations.`);
                return;
            }
        }
        
        // If no failsafe script found, insert before body closing tag
        const updatedContent = content.slice(0, bodyClosePos) +
            '    <script src="js/embedded-arabic-translations.js"></script>\n' +
            content.slice(bodyClosePos);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated ${file} with embedded translations.`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished adding embedded translations to all HTML files.'); 