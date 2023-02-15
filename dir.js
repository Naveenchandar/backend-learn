const fs = require('fs');


// check if folder doesn't exists
if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('===================FS MKDIR CREATED==================');
    })
}



// check if folder existsm true -> remove dir, any err -> throw err
if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('===================FS MKDIR REMOVED==================');
    })
}