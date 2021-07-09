const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { createNewPost, deleteUserPost, updateUserPost } = require("../controllers/post.controller");
const { createCommentToPost, deletePostedComment } = require("../controllers/comments.controller");
const { likePost, unlikePost } = require("../controllers/like.controller");

router.use(verifyToken);
// post operations
router.post("/", createNewPost);
router.post("/update/:postId", updateUserPost);
router.delete("/:postId", deleteUserPost);

// comment operations
router.post("/comment/:postId", createCommentToPost)
router.delete("/comment/:postId/:commentId", deletePostedComment);

// like operation
router.post("/like/:postId", likePost);
router.delete("/like/:postId", unlikePost);

module.exports = router;