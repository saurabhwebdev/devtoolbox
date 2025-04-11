const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to replace unescaped entities in a file
function fixUnescapedEntities(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace unescaped single quotes
    content = content.replace(/(\s|>)'(\w|\\|\/|,|\.|\s|:|;|\(|\)|@|#|\$|%|\^|&|\*|\[|\]|{|}|_|-|=|\+|\?|!|<|>|"|~|`)(.*?)'/g, (match, p1, p2, p3) => {
      return `${p1}&apos;${p2}${p3}&apos;`;
    });
    
    // Replace unescaped double quotes
    content = content.replace(/(\s|>)"(\w|\\|\/|,|\.|\s|:|;|\(|\)|@|#|\$|%|\^|&|\*|\[|\]|{|}|_|-|=|\+|\?|!|<|>|'|~|`)(.*?)"/g, (match, p1, p2, p3) => {
      return `${p1}&quot;${p2}${p3}&quot;`;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
    return false;
  }
}

// Find all React component files
const files = glob.sync('src/app/**/*.tsx');
let fixedCount = 0;

files.forEach(file => {
  const fullPath = path.resolve(file);
  if (fixUnescapedEntities(fullPath)) {
    fixedCount++;
  }
});

console.log(`Fixed ${fixedCount} files`); 