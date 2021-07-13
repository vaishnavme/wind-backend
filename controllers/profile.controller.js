const { User } = require("../models/user.model");
const { extend } = require("lodash");

const getUserProfile = async(req, res) => {
    const { profileId } = req.params;
    try {
        const profile = await User.findById(profileId)
                            .populate({
                                path: "posts", 
                                populate: {path: "creator", select: "name username profilePhoto"}
                            }).populate({path: "following", select: "name username profilePhoto"})
                            .populate({path: "followers", select: "name username profilePhoto"});

        if(!profile) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        res.json({
            success: true,
            profile,
            message: "User found"
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

const updateProfile = async(req, res) => {
    const { user } = req;
    const { profileUpdates } = req.body;
    try {
        const userAccount = await User.findById(user.userId);
        if(!userAccount) return res.status(404).json({
            success: false,
            messsage: "No user found"
        })

        const updatedUserProfile = extend(userAccount, {
            userAccount, ...profileUpdates
        })

        await updatedUserProfile.save();

        res.json({
            success: true,
            updatedUserProfile
        })
    } catch(err) {
        console.log(err)
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

module.exports = {
    getUserProfile,
    updateProfile
}