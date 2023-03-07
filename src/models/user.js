const { mongoose } = require('../utils');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String },
    createdAt: { type: String, default: Date.now },
    deleted: { type: Boolean, default: false }
}, { collection: 'users' })

const UsersModel = mongoose.model('UsersModel', UserSchema);

module.exports = { UsersModel };