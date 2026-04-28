const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const excludeDirs = ['node_modules', 'old', 'scratch', '.git', '.github'];

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!excludeDirs.includes(f)) {
        walk(dirPath, callback);
      }
    } else {
      callback(path.join(dir, f));
    }
  });
}

const htmlExtensions = ['.html', '.htm'];

walk(rootDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!htmlExtensions.includes(ext) && ext !== '.js' && ext !== '.css') return;
  if (filePath.includes('components.js')) return; // handled manually

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Pattern for <img ... src="..." ...>
  // We look for img/listio.png
  
  // Rule 1: Light version for Footer, Drawer or elements with invert filter
  // Rule 2: Dark version for the rest
  
  const imgRegex = /<img[^>]+src=["']([^"']*?img\/listio\.png)["'][^>]*>/gi;
  
  content = content.replace(imgRegex, (match) => {
    changed = true;
    let newSrc = '';
    
    // Check context within the match itself (like style/class)
    const isDarkContext = /footer|drawer|invert\(1\)|brightness\(0\)/i.test(match);
    
    // We also check a bit of context around the match if possible, but let's start with the match itself
    if (isDarkContext) {
      newSrc = match.replace(/img\/listio\.png/i, 'img/logo-listio-light.png');
      // Remove invert filters if possible
      newSrc = newSrc.replace(/filter:\s*[^;"]*(?:invert\(1\)|brightness\(0\))[^;"]*;?/gi, '');
      // Clean up empty style attributes
      newSrc = newSrc.replace(/style=["']\s*["']/gi, '');
      console.log(`Updated to LIGHT in ${filePath}`);
    } else {
      newSrc = match.replace(/img\/listio\.png/i, 'img/logo-listio-dark.png');
      console.log(`Updated to DARK in ${filePath}`);
    }
    return newSrc;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
