const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TokenUserModel } = require('../../models/tokenUsers');
const { signAccessToken, signRefreshToken } = require('../../utils');

router.post('/signup', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username) throw new Error('username is invalid');
        if (!password) throw new Error('password is invalid');
        if (!email) throw new Error('email is invalid');
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await TokenUserModel.create({ username, email, password: hashPassword });
        if (user._id) {
            res.send({ status: 'ok', message: 'user created' });
        }
    } catch (error) {
        next();
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // const token = req.headers?.authorization?.split(' ')[1];
        if (!username) throw new Error('username is invalid');
        if (!password) throw new Error('password is invalid');
        const findUser = await TokenUserModel.findOne({ username });
        if (!findUser || !findUser._id) {
            res.status(406).json({
                message: 'Invalid credentials'
            })
        };
        const verifyPassword = await bcrypt.compare(password, findUser.password);
        if (!verifyPassword) {
            res.status(406).json({ message: 'Invalid credentials' });
        }
        const accessToken = signAccessToken({ username, email: findUser.email });
        const refreshToken = signRefreshToken({ username, email: findUser.email });
        res.json({ status: 'ok', data: { accessToken, refreshToken } });
    } catch (error) {
        next(error);
    }
})

router.get('/users', authentiCateUser(), async (req, res, next) => {
    try {
        const allUsers = await TokenUserModel.find({});
        res.json({ status: 'ok', data: allUsers });
    } catch (error) {
        next(error);
    }
})

function authenticateRefreshToken(req, res, next) {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No credentials provided!' });
        }
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        let customeError = { ...error };
        if (error instanceof jwt.TokenExpiredError) {
            next({ ...customeError, message: 'Token has expired, Please login again' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.error('Invalid token');
            next({ ...customeError, message: 'Invalid token' });
        } else {
            next({ ...customeError });
            console.error(error);
        }
    }
}


function authentiCateUser() {
    return app.use(function (req, res, next) {
        try {
            const token = req.headers?.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'No credentials provided!' });
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            console.log('error:', JSON.parse(JSON.stringify(error)))
            let customeError = { ...error };
            if (error instanceof jwt.TokenExpiredError) {
                next({ ...customeError, message: 'Token has expired, Please login again' });
            } else if (error instanceof jwt.JsonWebTokenError) {
                console.error('Invalid token');
                authenticateRefreshToken(req, res, next);
            } else {
                next({ ...customeError });
                console.error(error);
            }
        }
        next();
    });
}

module.exports = { tokenUserRouter: router };