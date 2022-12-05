const { confirmEmailAndCreateUser } = require("../controllers/emailController");
const express = require("express");
const router = express.Router();

router.route("/:token").post(confirmEmailAndCreateUser);

module.exports = router;
