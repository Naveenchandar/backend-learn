const { app, morgan, fs, path } = require('./src/utils');
const bodyParser = require('body-parser');
const { todoRouter } = require('./src/routes/todos');
const { connectDb } = require('./src/configs/database');
const { userRouter } = require('./src/routes/users');
const { authUserRouter } = require('./src/routes/authusers');
const { tokenUserRouter } = require('./src/routes/tokenusers');
const { errorHandler } = require('./src/middlewares');

require('dotenv').config();

app.use(bodyParser.json());

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// ROUTES
app.use('/todo', todoRouter)
app.use('/user', userRouter)
app.use('/auth-user', authUserRouter)
app.use('/token-user', tokenUserRouter)

app.use(errorHandler);

app.listen(process.env.port, async () => {
    try {
        await connectDb();
        console.log(`Server started on ${process.env.port}`);
    } catch (error) {
        console.log(`APP listening Error ${error.message}`);
    }
});