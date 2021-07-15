const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
    read: {
        type: Boolean,
        default: false
    },
    notificationType: {
        type: String,
        enum:["LIKE", "COMMENT", "NEW POST", "NEW FOLLOWER"]
    },
    time: { 
        type: Date, 
        default: Date.now 
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    sourceUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    targetUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = { Notification }