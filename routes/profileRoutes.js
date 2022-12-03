const express = require("express");
const router = express.Router();
const { getProfileData } = require("../controllers/profileController");

router.get("/", getProfileData);
module.exports = router;
