const express = require("express");
const router = express.Router();
const { createNewUserAccount, getUserLogin } = require("../controllers/user.controller");

router.post("/signup", createNewUserAccount);
router.post("/login", getUserLogin);

module.exports = router;