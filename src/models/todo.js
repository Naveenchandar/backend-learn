const { mongoose } = require('../utils');

const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: String, default: Date.now }
}, { collection: 'todos' })

const TodoModel = mongoose.model('TodoModel', TodoSchema);

module.exports = { TodoModel };