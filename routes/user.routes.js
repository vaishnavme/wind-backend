const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/profile.controller");
const { createNewUserAccount, getUserLogin, updateUserCredentials } = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken")

router.post("/signup", createNewUserAccount);
router.post("/login", getUserLogin);

router.post("/profile", verifyToken, updateProfile)
router.post("/account", verifyToken, updateUserCredentials);

module.exports = router;