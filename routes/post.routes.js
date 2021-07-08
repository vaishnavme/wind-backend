const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { createNewPost, deleteUserPost, updateUserPost } = require("../controllers/post.controller");

router.use(verifyToken);
router.post("/", createNewPost);
router.post("/update/:postId", updateUserPost);
router.delete("/:postId", deleteUserPost);

module.exports = router;