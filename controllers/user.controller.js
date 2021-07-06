const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const { User } = require("../models/user.model");

const createNewUserAccount = async(req, res) => {
    try {
        const {name, username, email, password} = req.body;

        const isUserAlredayExist = await User.findOne({email: email});

        if(isUserAlredayExist) return res.json({
            success: false,
            message: "Email address alredy exist, Try Login"
        })

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({name, username, email, password: hashedPassword});
            const savedUser = await newUser.save();
            
            const token = jwt.sign({ userId: savedUser._id}, secret);
            res.json({
                success: true,
                user: {_id: savedUser._id, name: savedUser.name, username: savedUser.username, email: savedUser.email},
                token,
                message: "Account Created Successfully!"
            })
        } catch(err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong!"
            })
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Unable to create user ERROR: ${err}`
        })
    }
}

module.exports = {
    createNewUserAccount
}