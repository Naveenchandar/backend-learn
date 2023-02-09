const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

module.exports = {
    express,
    app,
    router,
    fs,
    morgan,
    path
} 