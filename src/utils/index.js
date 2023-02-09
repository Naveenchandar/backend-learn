const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

module.exports = {
    express,
    app,
    router,
    fs,
    morgan,
    path,
    mongoose
} 