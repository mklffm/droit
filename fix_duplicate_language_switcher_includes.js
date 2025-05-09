// Script to remove duplicate language switcher script includes
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
        
        // Count occurrences of the script tag
        const scriptRegex = /<script src="js\/add-language-switcher\.js"><\/script>/g;
        const matches = content.match(scriptRegex);
        
        if (matches && matches.length > 1) {
            console.log(`Found ${matches.length} occurrences of language switcher script in ${file}`);
            
            // Keep only the first occurrence
            let firstOccurrence = true;
            const updatedContent = content.replace(scriptRegex, match => {
                if (firstOccurrence) {
                    firstOccurrence = false;
                    return match;
                }
                return ''; // Remove subsequent occurrences
            });
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Successfully removed duplicate language switcher scripts from ${file}`);
        } else {
            console.log(`No duplicate language switcher scripts found in ${file}`);
        }
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
});

console.log('Finished removing duplicate language switcher scripts from all HTML files.'); 