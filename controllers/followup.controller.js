const { User } = require("../models/user.model");
const { Notification } = require("../models/notification.model");

const createFollowerNotification = async(target, source) => {
    try {
        const notification = new Notification({
            notificationType: "NEW FOLLOWER",
            time: new Date(),
            sourceUser: source,
            targetUser: target
        })
        await notification.save();
    } catch(err) {
        console.log(err)
    }
}

const follow = async(req, res) => {
    const { user } = req;
    const { profileId } = req.params;
    try {
        const followerAccount = await User.findById(user.userId);
        const followingAccount = await User.findById(profileId);

        followerAccount.following.push(profileId)
        followingAccount.followers.push(user.userId);

        await followerAccount.save();
        await followingAccount.save();

        createFollowerNotification(followingAccount._id, followerAccount._id);

        res.json({
            success: true,
            followedId: profileId,
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
        const followerAccount = await User.findById(user.userId);
        const followingAccount = await User.findById(profileId);

        followerAccount.following.splice(followerAccount.following.indexOf(profileId), 1);
        followingAccount.followers.splice(followerAccount.followers.indexOf(user.userId), 1);

        await followerAccount.save();
        await followingAccount.save();

        res.json({
            success: true,
            unfollowedId: profileId,
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