const bcrypt = require('bcryptjs');

const { UsersModel } = require("../../models/user");
const express = require('express');
const app = express();
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UsersModel.find({});
        if (!users) throw new Error('Users not found')
        res.json({ status: 'ok', data: users });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username) throw new Error('username is invalid');
        if (!email) throw new Error('email is invalid');
        if (!password) throw new Error('password is invalid');
        if (password.length < 3) throw new Error('password is short, Please enter password more than 3 characters');
        const hashPassword = await bcrypt.hash(password, 10);
        const response = await UsersModel.create({ username, email, password: hashPassword });
        if (!response._id) {
            throw new Error('User not created');
        }
        res.json({ status: 'ok', data: 'User created' });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const findUser = await UsersModel.findOne({ _id: userId });
        if (!findUser._id) throw new Error('User not found');
        res.json({ status: 'ok', data: findUser });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

router.delete('/remove/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const findUser = await UsersModel.findOne({ _id: userId });
        if (!findUser._id) throw new Error('User not found');
        const deleteUser = await UsersModel.updateOne({ _id: findUser._id }, {
            $set: {
                deleted: true
            }
        })
        if (!deleteUser.acknowledged) throw new Error(`Unable to delete user ${findUser._id}`);
        res.json({ status: 'ok', data: `user ${findUser._id} deleted` });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})


router.post('/remove/multiple/users', async (req, res) => {
    try {
        const { data } = req.body;
        const users = await UsersModel.updateMany({ _id: { $in: data } }, {
            $set: {
                deleted: true
            }
        });
        if (!users.acknowledged) throw new Error('Error while deleting todos, Please try again')
        res.json({ status: 'ok', data: 'Users deleted' });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

module.exports = { userRouter: router }