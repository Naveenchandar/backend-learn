const { mongoose } = require('../utils');

const TokenUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, required: true },
    password: { type: String },
    token: { type: String, default: '' },
    createdAt: { type: String, default: Date.now },
    emailVerified: { type: Boolean, default: false }
}, { collection: 'tokenusers' })

const TokenUserModel = mongoose.model('TokenUserSchema', TokenUserSchema);

module.exports = { TokenUserModel };