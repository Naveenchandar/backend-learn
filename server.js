const os = require('os');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


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


// All above methods of fs methods are asynchronous and we don't know which will finish first.
// In order to make it really asychronous and execute in order, we need to use fspromises instead of fs module.
// require('fs').promises
const readWriteUpdateDeleteFile = async () => {
    try {
        const readFileData = await fsPromises.readFile('./sample.txt', 'utf8');
        console.log('readFileData:', readFileData)
        const writeFileData = await fsPromises.writeFile('./sample.txt', 'This is asynchronous method for writing file with fspromises module');
        console.log('writeFileData:', writeFileData)
        const appendFileData = await fsPromises.appendFile('./sample.txt', 'This is asynchronous method for appending the file with fspromises module');
        console.log('appendFileData:', appendFileData)
        const unlinkFileData = await fsPromises.unlink('./sample1.txt');
        console.log('unlinkFileData:', unlinkFileData)
    } catch (error) {
        console.log('readWriteUpdateDeleteFile error:', error)
    }
}

const readWriteUpdateDeleteFileWithFileDynamicLocation = async () => {
    try {
        const readFileData = await fsPromises.readFile(path.join(__dirname, 'sample1.txt'), 'utf8');
        console.log('readFileData:', readFileData)
        const writeFileData = await fsPromises.writeFile(path.join(__dirname, 'sample1.txt'), 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        console.log('writeFileData:', writeFileData)
        const appendFileData = await fsPromises.appendFile(path.join(__dirname, 'sample1.txt'), 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
        console.log('appendFileData:', appendFileData)
        const unlinkFileData = await fsPromises.unlink(path.join(__dirname, 'sample1.txt'));
        console.log('unlinkFileData:', unlinkFileData)
    } catch (error) {
        console.log('readWriteUpdateDeleteFile error:', error)
    }
}

readWriteUpdateDeleteFile();
readWriteUpdateDeleteFileWithFileDynamicLocation();