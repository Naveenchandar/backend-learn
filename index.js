const { app, morgan, fs, path } = require('./src/utils');
const bodyParser = require('body-parser');
const { todoRouter } = require('./src/routes/todos');
const { connectDb } = require('./src/configs/database');

require('dotenv').config();

app.use(bodyParser.json());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// ROUTES
app.use('/todo', todoRouter)

app.listen(process.env.port, async () => {
    try {
        await connectDb();
        console.log(`Server started on ${process.env.port}`);
    } catch (error) {
        console.log(`APP listening Error ${error.message}`);
    }
});