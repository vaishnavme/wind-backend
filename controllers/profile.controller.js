const { User } = require("../models/user.model");
const { extend } = require("lodash");

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
        res.json({
            success: false
        })
    }
}

module.exports = {
    updateProfile
}