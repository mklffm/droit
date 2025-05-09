// Script to add disable-dropdown-menus.js to all HTML files
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

// JS script to add
const jsScriptTag = '<script src="js/disable-dropdown-menus.js"></script>';

// Process each file
htmlFiles.forEach(file => {
    try {
        // Read the file
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log(`Processing ${file}...`);
        
        // Check if the script is already included
        if (content.includes('disable-dropdown-menus.js')) {
            console.log(`Script already included in ${file}, skipping...`);
            return;
        }
        
        // Add script before closing body tag
        const updatedContent = content.replace('</body>', `    ${jsScriptTag}\n</body>`);
        
        // Write the updated content back to the file
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Successfully added disable-dropdown-menus.js to ${file}`);
        } else {
            console.log(`No changes made to ${file}`);
        }
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished adding disable-dropdown-menus.js to all HTML files.'); 