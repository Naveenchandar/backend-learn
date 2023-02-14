const os = require('os');
const path = require('path');


console.log('HELLO WORLD');

console.log(`My OS is ${os.type}`);
console.log(`My OS version is ${os.version}`);
console.log(`My OS Home directory is ${os.homedir}`);
console.log(`My System Admin name is ${os.userInfo().username}`);



console.log('Current directory name', __dirname);
console.log('Current directory with file name', __filename);


console.log('MY Current file path', path.dirname(__filename));
console.log('MY Current file name', path.basename(__filename));
console.log('MY Current file extension', path.extname(__filename));
console.log('MY Current file with complete information', path.parse(__filename)); // door, dir, base, ext, name