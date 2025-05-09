// Script to remove all language switchers from HTML files
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
        
        console.log(`Processing ${file}...`);
        
        // 1. Remove language switcher from mobile menu
        let updatedContent = content.replace(
            /<!-- Language Switcher for Mobile -->\s*<div class="dynamic-lang-switch">[\s\S]*?<\/div>/g,
            '<!-- Language Switcher for Mobile -->'
        );
        
        // 2. Remove desktop language switcher
        updatedContent = updatedContent.replace(
            /<!-- Desktop Language Switcher -->\s*<div class="dynamic-lang-switch">[\s\S]*?<\/div>/g,
            ''
        );
        
        // 3. Remove any other language switchers with class language-switch
        updatedContent = updatedContent.replace(
            /<div class="language-switch">[\s\S]*?<\/div>/g,
            ''
        );
        
        // Write the updated content back to the file if changes were made
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Successfully removed language switchers from ${file}`);
        } else {
            console.log(`No language switchers found in ${file}`);
        }
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished removing language switchers from all HTML files.'); 