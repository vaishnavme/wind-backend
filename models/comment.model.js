const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    commentOn: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };