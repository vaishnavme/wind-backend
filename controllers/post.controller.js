const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { extend } = require("lodash");

const createNewPost = async(req, res) => {
    const { user } = req;
    const { post } = req.body;
    try {
        const userAccount = await User.findById(user.userId);

        const newPost = new Post({
            creator: user.userId,
            content: post
        })
        const savedPost = await newPost.save();
        // update user post collection
        if(!userAccount) return res.status(404).json({
            success: false,
            message: "User not found"
        })
        userAccount.posts.push(savedPost._id)
        await userAccount.save();
        res.json({
            success: true,
            savedPost,
            message: "Posted Successfully!"
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

const updateUserPost = async(req, res) => {
    const { user } = req;
    const { postId } = req.params;
    const { postUpdate } = req.body;
    try {
        const post = await Post.findById(postId);
        const userAccount = await User.findById(user.userId);
        // check for post and user 
        if(!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })
        if(!userAccount) return res.status(404).json({
            success: false,
            message: "User not found"
        })
    
        const updated = extend(post, {
            post, content: postUpdate
        })
        const updatedPost = await updated.save();
        res.json({
            success: true,
            updatedPost,
            message: "Post successfully updated!"
        })

    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Ocuured: ${err}`
        })
    }
}

const deleteUserPost = async(req, res) => {
    const { user } = req;
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        const userAccount = await User.findById(user.userId);

        if(!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })
        if(!userAccount) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        const userId = user.userId.toString();
        const creatorId = post.creator.toString();
        if(userId === creatorId) {
            const deletedPost = await Post.findByIdAndDelete(postId);
            userAccount.posts.splice(userAccount.posts.indexOf(deletedPost), 1);
            await userAccount.save();
        }
        res.json({
            success: true,
            message: "Post successfully deleted!"
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
    createNewPost,
    updateUserPost,
    deleteUserPost,
}