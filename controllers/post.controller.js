const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { extend } = require("lodash");

const populateCreator = {
    path: "creator",
    select: "name username profilePhoto"
}

const populateComment = {
    path: "comments",
    select: "comment commentBy createdAt postMedia",
    populate: {path: "commentBy", select: "name username profilePhoto"}
}

const getPostById = async(req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId).populate(populateCreator).populate(populateComment);
        res.json({
            success: true,
            post,
            message: "Single post fetched"
        })
    } catch(err) {
        console.log(err);
        res.json({
            success: false,
            message: `Error Occured: ${err}`
        })
    }
}

const createNewPost = async(req, res) => {
    const { user } = req;
    const { post } = req.body;
    try {
        console.log(post)
        const newPost = new Post({
            creator: user.userId,
            ...post
        })
        let savedPost = await newPost.save()
        savedPost = await savedPost.populate(populateCreator).execPopulate()
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

const deleteUserPost = async(req, res) => {
    const { postId } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        res.json({
            success: true,
            deletedId: deletedPost,
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
    getPostById,
    createNewPost,
    deleteUserPost,
}