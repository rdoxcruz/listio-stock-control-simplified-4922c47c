const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
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
    let changed = false;

    // Replace the favicon block
    // Looking for common patterns
    const faviconPattern = /<!-- Favicon -->[\s\S]*?(?=<link [^>]*?fonts)/i;
    const newFavicon = `<!-- Favicon -->\n  <link rel="icon" type="image/png" href="/img/icone.png" />\n  <link rel="apple-touch-icon" href="/img/icone.png" />\n  <meta content="#BFF542" name="theme-color" />\n\n  `;

    if (faviconPattern.test(content)) {
        content = content.replace(faviconPattern, newFavicon);
        changed = true;
    } else {
        // Fallback for files without "<!-- Favicon -->" comment
        const simpleFavicon = /<link[^>]*?href="\/favicon\.ico"[^>]*?>/i;
        if (simpleFavicon.test(content)) {
            content = content.replace(simpleFavicon, `<link rel="icon" type="image/png" href="/img/icone.png" /><link rel="apple-touch-icon" href="/img/icone.png" />`);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated: ${file}`);
    }
});
