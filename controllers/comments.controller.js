const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { extend } = require("lodash");

const createCommentToPost = async(req, res) => {
    const { user } = req;
    const { postId } = req.params;
    const { comment } = req.body;
    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })
        const newComment = {
            user: user.userId,
            content: comment
        }
        console.log(newComment)
        post.comments.push(newComment);
        const posted = await post.save();
        res.json({
            success: true,
            posted,
            message: "Commented"
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

const deletePostedComment = async(req, res) => {
    const { user } = req;
    const { postId, commentId } = req.params;
    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })

        post.comments.splice(post.comments.indexOf(commentId), 1);
        const posts = await post.save();
        
        res.json({
            success: true,
            posts,
            message: "Commented"
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
    createCommentToPost,
    deletePostedComment
}