const express = require("express");
const router = express.Router();
const { createNewUserAccount } = require("../controllers/user.controller");

router.post("/signup", createNewUserAccount);

module.exports = router;