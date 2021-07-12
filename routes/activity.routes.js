const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")
const { follow, unfollow } = require("../controllers/following");

router.use(verifyToken);
router.post("/follow/:profileId", follow);
router.delete("/follow/:profileId", unfollow);

module.exports = router;