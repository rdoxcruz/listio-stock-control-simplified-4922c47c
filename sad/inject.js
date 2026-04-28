const fs = require('fs');
let indexText = fs.readFileSync('C:/Users/rodol/Listio-old/index.html', 'utf8');
const newSectionHtml = fs.readFileSync('C:/Users/rodol/Listio-old/extracted_15uezkw.html', 'utf8');
const newStyles = fs.readFileSync('C:/Users/rodol/Listio-old/extracted_styles.css', 'utf8');

const regex = /<!-- SOLUTION \(Reprojeto Idêntico Saasleek\) -->[\s\S]*?<!-- VALUE \(ajustado para automação\) -->/;
const replacement = `<!-- SOLUTION (framer-15uezkw) -->\n<style>\n${newStyles}\n</style>\n${newSectionHtml}\n<!-- VALUE (ajustado para automação) -->`;

if (regex.test(indexText)) {
  indexText = indexText.replace(regex, replacement);
  fs.writeFileSync('C:/Users/rodol/Listio-old/index.html', indexText);
  console.log('Regex replace successful.');
} else {
  console.log('Regex match failed.');
}
