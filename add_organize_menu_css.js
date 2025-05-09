// Script to add organize-menu.css to all HTML files
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

// CSS link to add
const cssLinkTag = '<link rel="stylesheet" href="css/organize-menu.css">';

// Process each file
htmlFiles.forEach(file => {
    try {
        // Read the file
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log(`Processing ${file}...`);
        
        // Check if the CSS is already included
        if (content.includes('organize-menu.css')) {
            console.log(`CSS already included in ${file}, skipping...`);
            return;
        }
        
        // Add CSS link before closing head tag
        const updatedContent = content.replace('</head>', `    ${cssLinkTag}\n</head>`);
        
        // Write the updated content back to the file
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Successfully added organize-menu.css to ${file}`);
        } else {
            console.log(`No changes made to ${file}`);
        }
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished adding organize-menu.css to all HTML files.'); 