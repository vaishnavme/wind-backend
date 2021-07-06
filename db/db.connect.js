const mongoose = require("mongoose");

function dbConnection() {
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected Successfully..."))
    .catch(error => console.error("mongoose connection failed", error))
}

module.exports = { dbConnection }