// Script to remove language switchers from the header only
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
        
        // 1. Remove desktop language switcher
        let updatedContent = content.replace(
            /<!-- Desktop Language Switcher -->\s*<div class="dynamic-lang-switch">[\s\S]*?<\/div>/g,
            ''
        );
        
        // 2. Remove any other language switchers in the header/top area
        // This targets the language-switch class that might be in the header
        updatedContent = updatedContent.replace(
            /<div class="language-switch">[\s\S]*?<\/div>/g,
            ''
        );
        
        // 3. Remove any dynamic-lang-switch that might be in the header
        updatedContent = updatedContent.replace(
            /<div class="dynamic-lang-switch">[\s\S]*?<\/div>/g,
            ''
        );
        
        // Write the updated content back to the file if changes were made
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Successfully removed header language switchers from ${file}`);
        } else {
            console.log(`No header language switchers found in ${file}`);
        }
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished removing header language switchers from all HTML files.'); 