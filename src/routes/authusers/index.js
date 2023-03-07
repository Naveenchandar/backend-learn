const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
require('dotenv').config();



const { UsersModel } = require("../../models/user");
const express = require('express');
const { AuthUsersModel } = require('../../models/authusers');
const { transporter, sendMail } = require('../../utils/email');



const app = express();
const router = express.Router();

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
};
transporter.use('compile', hbs(handlebarOptions));

router.post('/signup', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email) throw new Error('email invalid');
        if (!password) throw new Error('password invalid');
        if (!username) throw new Error('username invalid');
        if (password.length < 3) throw new Error('password too short. Please enter password more than 3 characters');
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await AuthUsersModel.create({ email, username, password: hashPassword });
        if (!user._id) throw new Error('unable to create user');
        const isSuccess = await sendMail({ id: user._id, email, username });
        if (typeof isSuccess === 'boolean') {
            res.json({ status: 'ok', data: 'User has been created. Inorder to proceed further, please verify your email' });
        } else {
            await AuthUsersModel.deleteOne({ _id: user._id });
            throw new Error('email id is not valid');
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username = '', password, email = '' } = req.body;
        if (!username && !email) throw new Error('username / password is invalid');
        if (!password) throw new Error('username / password is invalid');
        let findUser;
        if (username) {
            findUser = await AuthUsersModel.findOne({ username });
        } else if (email) {
            findUser = await AuthUsersModel.findOne({ email });
        } else {
            throw new Error('email / password is invalid');
        }
        if (!findUser || !findUser._id) throw new Error('User not found');
        const verifyPassword = await bcrypt.compare(password, findUser.password);
        if (!verifyPassword) throw new Error('username / password is invalid');
        if (findUser.emailVerified) {
            const token = jwt.sign({ id: findUser._id, username }, process.env.JWT_SECRET);
            res.json({ status: 'ok', data: token });
        } else {
            res.json({ status: 'ok', data: 'Please verify email before login.' });
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const verifyToken = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
        if (!verifyToken) throw new Error('token expired');
        if (!verifyToken.id) throw new Error('invalid token');
        const user = await AuthUsersModel.findOne({ _id: verifyToken.id });
        if (!user || !user._id) throw new Error('user not found');
        const updateUser = await AuthUsersModel.updateOne({ _id: user._id }, {
            $set: {
                emailVerified: true
            }
        });
        if (!updateUser.acknowledged || !updateUser) throw new Error('unable to verify email, Please try to register with another email');
        res.send('Email verification successfull');
    } catch (error) {
        res.send(error.message);
    }
})



module.exports = { authUserRouter: router };