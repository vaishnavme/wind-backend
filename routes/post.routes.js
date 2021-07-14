const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getPostById, createNewPost, deleteUserPost, updateUserPost } = require("../controllers/post.controller");
const feed = require("../controllers/feed.controller");

router.use(verifyToken);
// post operations
router.get("/single/:postId", getPostById);
router.post("/", createNewPost);
router.post("/update/:postId", updateUserPost);
router.delete("/:postId", deleteUserPost);

// feed
router.get("/feed", feed);
// bookmark post

module.exports = router;