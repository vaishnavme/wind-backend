const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const { User } = require("../models/user.model");
const { extend } = require("lodash");

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

const getUserLogin = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});

    if(!user) {
        res.json({
            success: false,
            message: "No user found for this email address"
        })
    } 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if(isPasswordCorrect) {
        const token = jwt.sign({ userId: user._id}, secret);
        return res.json({
            success: true,
            user: {_id: user._id, name: user.name, username: user.username, email: user.email},
            token,
            message: "Login successfull!"
        })
    }
}

const updateUserCredentials = async(req, res) => {
    const { user } = req;
    const { oldPassword, newPassword, newEmail } = req.body;

    const userAccount = await User.findById(user.userId);
    if(!userAccount) return res.status(404).json({
        success: false,
        messsage: "No user found"
    })

    const isPasswordCorrect = await bcrypt.compare(oldPassword, userAccount.password);
    
    if(isPasswordCorrect) {
        console.log(true)
        try {
            const newHashedPassword = await bcrypt.hash(newPassword, 10)
            const accountUpdate = {
                password: newHashedPassword,
                email: newEmail
            }

            const updateAccount = extend(userAccount, {
                userAccount, ...accountUpdate
            })
            await updateAccount.save();
            res.json({
                success: true,
                updateAccount,
                message: "Account credentials updated."
            })
        } catch(err) {
            res.status(500).json({
                success: false,
                message: `Unable to update user ERROR: ${err}`
            })
        }
    }
}

const getAllUser = async(req, res) => {
    try {
        const allUsers = await User.find({}).select("name username profilePhoto posts bio followers following");
        res.json({
            success: true,
            allUsers,
            message: "Data fetch successfully!"
        })

    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Unable to update user ERROR: ${err}`
        })
    }
}

module.exports = {
    createNewUserAccount,
    getUserLogin,
    updateUserCredentials,
    getAllUser
}