const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")
const { follow, unfollow } = require("../controllers/followup.controller.js");
const { likePost, unlikePost } = require("../controllers/like.controller");
const { createCommentToPost, deletePostedComment } = require("../controllers/comments.controller");
const getUserNotification = require("../controllers/notification.controller");

router.use(verifyToken);

// notification
router.get("/notify", getUserNotification);
// follow-unfollow
router.post("/follow/:profileId", follow);
router.delete("/follow/:profileId", unfollow);

// like unlike
router.post("/like/:postId", likePost);
router.delete("/like/:postId", unlikePost);

// comment operations
router.post("/comment/:postId", createCommentToPost)
router.delete("/comment/:postId/:commentId", deletePostedComment);

module.exports = router;