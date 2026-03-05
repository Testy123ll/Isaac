const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function replaceInDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            // Replace purple tailwind classes with corresponding blue classes
            content = content.replace(/purple-50/g, 'blue-50');
            content = content.replace(/purple-100/g, 'blue-100');
            content = content.replace(/purple-200/g, 'blue-200');
            content = content.replace(/purple-300/g, 'blue-300');
            content = content.replace(/purple-400/g, 'blue-400');
            content = content.replace(/purple-500/g, 'blue-500');
            content = content.replace(/purple-600/g, 'blue-600');
            content = content.replace(/purple-700/g, 'blue-700');
            content = content.replace(/purple-800/g, 'blue-800');
            content = content.replace(/purple-900/g, 'blue-900');
            
            // Also replace hover:purple to hover:blue just in case
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

replaceInDir(directoryPath);
console.log('Done replacing purple with blue.');
