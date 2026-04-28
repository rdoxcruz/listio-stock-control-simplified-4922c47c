const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            // Skip old and scratch directories
            if (file.includes('old') || file.includes('scratch')) return;
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

    // 1. Update logo in Header/Nav (brand class)
    // <span class="brand__name">Listio</span> -> <img src="/img/listio.png" alt="Listio" style="height: 28px; width: auto;">
    content = content.replace(/<span class="brand__name">Listio<\/span>/gi, '<img src="/img/listio.png" alt="Listio" style="height: 28px; width: auto; display: block;">');
    
    // 2. Update footer logo
    // <div class="listio-footer__logo">Listio</div>
    content = content.replace(/<div class="listio-footer__logo">Listio<\/div>/gi, '<div class="listio-footer__logo"><img src="/img/listio.png" alt="Listio" style="height: 30px; width: auto; filter: brightness(0) invert(1);"></div>');

    // 3. Update floating nav logo in any hardcoded instances
    // <a href="/" class="floating-nav__logo">Listio</a>
    content = content.replace(/<a href="\/" class="floating-nav__logo">Listio<\/a>/gi, '<a href="/" class="floating-nav__logo"><img src="/img/listio.png" alt="Listio" style="height: 24px; width: auto; display: block;"></a>');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated logos in: ${file}`);
    }
});
