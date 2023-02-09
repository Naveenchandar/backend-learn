const { app, morgan, fs, path } = require('./src/utils');

require('dotenv').config();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.listen(process.env.port, () => {
    console.log(`Server started on ${process.env.port}`);
});