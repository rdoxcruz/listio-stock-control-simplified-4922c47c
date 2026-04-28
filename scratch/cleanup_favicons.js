const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
             if (file.includes('old') || file.includes('scratch') || file.includes('_project')) return;
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const files = walk('.');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Clean up multiple favicon links and standardize to icone.png
    // This regex looks for any link rel="icon" or "apple-touch-icon"
    content = content.replace(/<link[^>]*?rel="icon"[^>]*?>/gi, '');
    content = content.replace(/<link[^>]*?rel="apple-touch-icon"[^>]*?>/gi, '');
    content = content.replace(/<link[^>]*?rel="mask-icon"[^>]*?>/gi, '');
    content = content.replace(/<link[^>]*?rel="manifest"[^>]*?>/gi, '');

    // Re-insert standard favicon block before fonts or head end
    const headEnd = '  <!-- Favicon -->\n  <link rel="icon" type="image/png" href="/img/icone.png" />\n  <link rel="apple-touch-icon" href="/img/icone.png" />';
    
    if (content.includes('<!-- Favicon -->')) {
        content = content.replace(/<!-- Favicon -->[\s\S]*?(?=<link [^>]*?fonts|<link [^>]*?preconnect|<script|<style)/i, headEnd + '\n');
    } else {
        // Just insert it before preconnects if possible
        if (content.includes('<link rel="preconnect"')) {
            content = content.replace(/<link rel="preconnect"/, headEnd + '\n  <link rel="preconnect"');
        }
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Cleaned up favicons in: ${file}`);
    }
});
