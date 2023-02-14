const os = require('os');


console.log('HELLO WORLD');

console.log(`My OS is ${os.type}`);
console.log(`My OS version is ${os.version}`);
console.log(`My OS Home directory is ${os.homedir}`);
console.log(`My System Admin name is ${os.userInfo().username}`);