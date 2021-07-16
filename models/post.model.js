const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    postMedia: {
        type: String
    },
    content: {
        type: String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

const Post = mongoose.model("Post", postSchema);
module.exports = { Post }