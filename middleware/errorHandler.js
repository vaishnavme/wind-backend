/* ERROR Handler */
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: `Error occured ${err}`
    })
}

module.exports = errorHandler;