const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { createNewPost, deleteUserPost, updateUserPost } = require("../controllers/post.controller");
const { createCommentToPost, deletePostedComment } = require("../controllers/comments.controller");

router.use(verifyToken);
// post operations
router.post("/", createNewPost);
router.post("/update/:postId", updateUserPost);
router.delete("/:postId", deleteUserPost);

// comment operations
router.post("/comment/:postId", createCommentToPost)
router.delete("/comment/:postId/:commentId", deletePostedComment);

module.exports = router;