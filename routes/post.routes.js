const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { createNewPost, deleteUserPost, updateUserPost } = require("../controllers/post.controller");
const feed = require("../controllers/feed.controller");

router.use(verifyToken);
// post operations
router.post("/", createNewPost);
router.post("/update/:postId", updateUserPost);
router.delete("/:postId", deleteUserPost);

// feed
router.get("/feed", feed);

module.exports = router;