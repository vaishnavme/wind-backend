const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { extend } = require("lodash");

const populateFeed = {
    path: "creator",
    select: "name username profilePhoto"
}

const feed = async(req, res) => {
    const { user } = req;
    try {
        const userAccount = await User.findById(user.userId)

        const userPosts = await Post.find({creator: user.userId}).populate(populateFeed);
        const followingPost = await Post.find({creator: {$in: userAccount.following}}).populate(populateFeed)

        let userFeed = [...userPosts, ...followingPost];
        userFeed = userFeed.sort((post1, post2) => post2.createdAt - post1.createdAt)

        res.json({
            success: true,
            userFeed,
            message: "feed fetched"
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

module.exports = feed;