const { User } = require("../models/user.model");

const follow = async(req, res) => {
    const { user } = req;
    const { profileId } = req.params;
    try {
        const userAccount = await User.findById(user.userId);

        userAccount.following.push(profileId)
        const newResponse = await userAccount.save();

        res.json({
            success: true,
            newResponse,
            message: "Followed successfully!"
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

const unfollow = async(req, res) => {
    const { user } = req;
    const { profileId } = req.params;
    try {
        const userAccount = await User.findById(user.userId);
        userAccount.following.splice(userAccount.following.indexOf(profileId), 1);
        const newResponse = await userAccount.save();

        res.json({
            success: true,
            newResponse,
            message: "Unfollowed successfully!"
        })

    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

module.exports = {
    follow,
    unfollow
}