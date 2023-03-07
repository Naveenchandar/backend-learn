const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function signToken({ payload, secretKey, expiresIn }) {
    console.log('expiresIn:', expiresIn);
    console.log('secretKey:', secretKey);
    console.log('payload:', payload);
    console.log('================payload:============', { ...payload });
    return jwt.sign({ ...payload }, secretKey, { expiresIn });
}

function signAccessToken(payload) {
    return signToken({ payload, secretKey: process.env.ACCESS_TOKEN_SECRET, expiresIn: '5m' });
}

function signRefreshToken(payload) {
    return signToken({ payload, secretKey: process.env.REFRESH_TOKEN_SECRET, expiresIn: '10m' });
}

module.exports = {
    express,
    app,
    router,
    fs,
    morgan,
    path,
    mongoose,
    signAccessToken,
    signRefreshToken
} 