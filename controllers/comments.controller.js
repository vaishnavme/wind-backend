const { Comment } = require("../models/comment.model");
const { Post } = require("../models/post.model");

const populateOpetions = {
    path: "commentBy",
    select: "name username profilePhoto"
}

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
        const newComment = new Comment({
            commentOn: postId,
            commentBy: user.userId,
            comment: comment
        })
        let commented = await newComment.save(); 
        post.comments.push(commented._id);
        await post.save();
        commented = await commented.populate(populateOpetions).execPopulate()
        res.json({
            success: true,
            commented,
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
        await Comment.findByIdAndDelete(commentId);
        await Comment.save();
        post.comments.splice(post.comments.indexOf(commentId), 1);
        const posts = await post.save();
        
        res.json({
            success: true,
            commentId,
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