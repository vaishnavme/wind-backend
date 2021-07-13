const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        user: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            populate: { 
                select: 'name username photo' 
            } 
        },
        content: { type: String },
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

const Post = mongoose.model("Post", postSchema);
module.exports = { Post }