// Script to remove the language switcher from the mobile menu in all HTML files
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
        
        // Check if the file contains the mobile language switcher
        if (content.includes('<!-- Language Switcher for Mobile -->')) {
            console.log(`Processing ${file}...`);
            
            // Remove the language switcher from the mobile menu
            // Pattern: <!-- Language Switcher for Mobile --> followed by a div with class dynamic-lang-switch
            const updatedContent = content.replace(
                /<!-- Language Switcher for Mobile -->\s*<div class="dynamic-lang-switch">[\s\S]*?<\/div>/g,
                '<!-- Language Switcher for Mobile -->'
            );
            
            // Write the updated content back to the file
            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`✅ Successfully removed mobile language switcher from ${file}`);
            } else {
                console.log(`No changes needed for ${file}`);
            }
        } else {
            console.log(`No mobile language switcher found in ${file}`);
        }
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished removing mobile language switchers from all HTML files.'); 