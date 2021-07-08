const mongoose = require("mongoose");
const{ Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: "Account name is required"
    },
    username: {
        type: String,
        required: "Username is required"
    },
    email: {
        type: String,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please Enter valied Email"],
        unique:[true, "Email address alredy exist with other account."],
        required: "Email address is required"
    },
    password: {
        type: String,
        minLength: [8, "Password is too short"],
        required: "Password is required"
    },
    profilePhoto: {
        type: String,
    },
    bio: {
        type: String,
        maxLength: 250
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
})

const User = mongoose.model("User", userSchema);
module.exports = { User }