const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getPostById, createNewPost, deleteUserPost } = require("../controllers/post.controller");
const feed = require("../controllers/feed.controller");

router.use(verifyToken);
// post operations
router.get("/single/:postId", getPostById);
router.post("/", createNewPost);
router.delete("/:postId", deleteUserPost);

// feed
router.get("/feed", feed);
// bookmark post

module.exports = router;