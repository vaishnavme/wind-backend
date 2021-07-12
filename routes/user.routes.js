const express = require("express");
const router = express.Router();
const { updateProfile, getUserProfile } = require("../controllers/profile.controller");
const { createNewUserAccount, getUserLogin, updateUserCredentials, getAllUser } = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken")

router.post("/signup", createNewUserAccount);
router.post("/login", getUserLogin);

router.get("/profiles", getAllUser);
router.get("/profile/:profileId", verifyToken, getUserProfile);
router.post("/profile", verifyToken, updateProfile);
router.post("/account", verifyToken, updateUserCredentials);

module.exports = router;