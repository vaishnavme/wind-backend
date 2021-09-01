const { Post } = require("../models/post.model");
const { Notification } = require("../models/notification.model");

const createLikeNotification = async(target, source) => {
    try {
        const notification = new Notification({
            notificationType: "LIKE",
            post: target._id,
            sourceUser: source,
            targetUser: target.creator 
        })
        await notification.save();
    } catch(err) {
        console.log(err)
    }
}


const likePost = async(req, res) => {
    const { user } = req;
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })
        post.likes.push(user.userId);
        await post.save();
        const postLiked = {
            postId: postId,
            likedBy: user.userId
        }
        const postCreator = post.creator.toString();
        const userID = user.userId.toString()
        if(postCreator !== userID) {
            createLikeNotification(post, user.userId)
        }
        res.json({
            success: true,
            postLiked,
            message: "Post liked"
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

const unlikePost = async(req, res) => {
    const { user } = req;
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })
        post.likes.pull(user.userId);
        await post.save();

        const postUnLiked = {
            postId: postId,
            unlikedBy: user.userId
        }

        res.json({
            success: true,
            postUnLiked,
            message: "Post liked"
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
    likePost,
    unlikePost
}