// Script to add the translation failsafe to all HTML files
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
        
        // Check if the failsafe is already added
        if (content.includes('translation-failsafe.js')) {
            console.log(`${file} already has the translation failsafe.`);
            return;
        }
        
        // Find the position right before the closing body tag
        const bodyClosePos = content.lastIndexOf('</body>');
        
        if (bodyClosePos === -1) {
            console.error(`Could not find </body> tag in ${file}`);
            return;
        }
        
        // Insert the failsafe script right before the body closing tag
        const updatedContent = content.slice(0, bodyClosePos) +
            '    <script src="js/translation-failsafe.js"></script>\n' +
            content.slice(bodyClosePos);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated ${file} with translation failsafe.`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished adding translation failsafe to all HTML files.'); 