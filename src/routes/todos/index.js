const { TodoModel } = require("../../models/todo");
const { app, router } = require("../../utils");

// FETCH ALL TODOS
router.get('/', async (req, res) => {
    try {
        const response = await TodoModel.find({});
        res.json({ status: 'ok', data: response });
    } catch (error) {
        console.log('error:', JSON.parse(JSON.stringify(error)))
        res.json({ status: 'error', message: error.message });
    }
})

// CREATE NEW TODO
router.post('/create', async (req, res) => {
    try {
        const { text, confirmed } = req.body;
        if (!text) {
            throw new Error('text is invalid');
        }
        const response = await TodoModel.create({ text, confirmed });
        if (response._id) {
            res.json({ status: 'ok', message: 'Todo created !' });
        } else {
            throw new Error('Unable to create todo, please try again')
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

// FETCH TODO BY ID
router.get('/:todoId', async (req, res) => {
    try {
        const { todoId } = req.params;
        const findTodo = await TodoModel.findOne({ _id: todoId });
        if (!findTodo._id) {
            throw new Error('Todo not found');
        }
        res.json({ status: 'ok', data: findTodo });
    } catch (error) {
        res.json({ status: 'error', message: error.message })
    }
})

// Update Todo by id
router.post('/:todoId', async (req, res) => {
    try {
        const { todoId } = req.params;
        const { text, completed } = req.body;
        const findTodo = await TodoModel.findOne({ _id: todoId });
        if (!findTodo._id) {
            throw new Error('Todo not found');
        }
        const updateTodo = await TodoModel.updateOne({ _id: findTodo._id }, {
            $set: {
                text, completed
            }
        })
        res.json({ status: 'ok', data: updateTodo });
    } catch (error) {
        res.json({ status: 'error', message: error.message })
    }
})


// Delete Todo by id
router.delete('/:todoId', async (req, res) => {
    try {
        const { todoId } = req.params;
        const findTodo = await TodoModel.findOne({ _id: todoId });
        if (!findTodo._id) {
            throw new Error('Todo not found');
        }
        const deleteTodo = await TodoModel.deleteOne({ _id: findTodo._id })
        res.json({ status: 'ok', data: 'Todo deleted' });
    } catch (error) {
        res.json({ status: 'error', message: error.message })
    }
})

// Delete mutiple Todos
router.post('/multiple/todo/remove', async (req, res) => {
    try {
        console.log('req.body:', req.body)
        const { data } = req.body;
        const response = await TodoModel.deleteMany({ _id: { $in: data } });
        if (response.acknowledged) {
            res.json({ status: 'ok', data: 'All Todos deleted' });
        } else {
            throw new Error('Error while deleting todos, Please try again');
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

module.exports = { todoRouter: router };