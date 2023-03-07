const { mongoose } = require('../utils');

const AuthUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, required: true },
    password: { type: String },
    createdAt: { type: String, default: Date.now },
    emailVerified: { type: Boolean, default: false }
}, { collection: 'authusers' });

const AuthUsersModel = mongoose.model('AuthUsersModel', AuthUserSchema);

module.exports = { AuthUsersModel };