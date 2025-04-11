const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Common patterns for unused variables in the error logs
const unusedVarsPatterns = [
  /\'(\w+)\' is defined but never used/,
  /\'(\w+)\' is assigned a value but never used/
];

// Function to extract unused variables from error logs
function extractUnusedVarsFromLogs(logs) {
  const unusedVars = [];
  const lines = logs.split('\n');
  
  lines.forEach(line => {
    if (line.includes('is defined but never used') || line.includes('is assigned a value but never used')) {
      unusedVarsPatterns.forEach(pattern => {
        const match = line.match(pattern);
        if (match && match[1]) {
          const filePath = line.split(' ')[0];
          const lineNumber = parseInt(line.split(':')[1]);
          unusedVars.push({
            file: filePath,
            line: lineNumber,
            varName: match[1]
          });
        }
      });
    }
  });
  
  return unusedVars;
}

// Function to comment out unused variables in a file
function commentUnusedVars(filePath, unusedVars) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File does not exist: ${filePath}`);
      return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    unusedVars.forEach(({line, varName}) => {
      if (line > 0 && line <= lines.length) {
        const lineContent = lines[line - 1];
        
        // Skip already commented lines
        if (lineContent.trim().startsWith('//')) {
          return;
        }
        
        // Simple replacement for import statements
        if (lineContent.includes('import') && lineContent.includes(varName)) {
          lines[line - 1] = lineContent.replace(
            new RegExp(`(\\s|,|{)${varName}(\\s|,|})`, 'g'), 
            `$1/* ${varName} */$2`
          );
        } 
        // For variable declarations
        else if (lineContent.includes(varName) && 
                (lineContent.includes('const') || lineContent.includes('let') || lineContent.includes('var'))) {
          lines[line - 1] = `// ${lineContent} // unused`;
        }
      }
    });
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Fixed unused vars in: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
    return false;
  }
}

// Usage example with error logs
// You would replace this with the actual error logs from the build
const errorLogs = `
./src/app/blog/css-gradient-generator/page.tsx
3:10  Error: 'Card' is defined but never used.  @typescript-eslint/no-unused-vars
./src/app/tools/base64-tool/page.tsx
11:25  Error: 'Check' is defined but never used.  @typescript-eslint/no-unused-vars
11:32  Error: 'AlertCircle' is defined but never used.  @typescript-eslint/no-unused-vars
11:69  Error: 'Image' is defined but never used.  @typescript-eslint/no-unused-vars
`;

const unusedVars = extractUnusedVarsFromLogs(errorLogs);

// Group by file
const fileGroups = {};
unusedVars.forEach(item => {
  if (!fileGroups[item.file]) {
    fileGroups[item.file] = [];
  }
  fileGroups[item.file].push(item);
});

// Fix each file
Object.entries(fileGroups).forEach(([file, vars]) => {
  const fullPath = path.resolve(file.replace(/^\.\//, ''));
  commentUnusedVars(fullPath, vars);
});

console.log('Finished processing unused variables'); 