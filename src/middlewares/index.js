function errorHandler(error, req, res, next) {
    res.status(error.statusCode || 500).json({ status: 'ok', message: error.message });
}

module.exports = {
    errorHandler
}