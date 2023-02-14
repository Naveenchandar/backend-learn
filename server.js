const os = require('os');
const path = require('path');
const fs = require('fs');


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




console.log('=========================================FILE SYSTEM MODULE==============================');


// read the file
fs.readFile('./sample.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('============= readfile data ====================', data);
})

// write the file
fs.writeFile('./samplewrite.txt', 'This is sample file with writing', (err) => {
    if (err) throw err;
    console.log('==================Write file operation complete====================');
})


// if file exists, append the existing text with file.
// if file doesn't exists, it will create a new file.
fs.appendFile('./sample1.txt', 'This is sample text for appending the file', (err, data) => {
    if (err) throw err;
    console.log('==================Append file operation complete====================');
})



// for catching uncaught errors. In fs readfile we are throwing error. to handle those, we are using this.
process.on('uncaughtException', (err) => {
    console.log('Process uncaught error', err);
    if (err) {
        process.exit(1)
    }
})