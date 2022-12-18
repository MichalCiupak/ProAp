const express = require("express");
const router = express.Router();
const {
  getProfileData,
  addBalance,
} = require("../controllers/profileController");

router.get("/", getProfileData);
router.patch("/addBalance/:value", addBalance);
module.exports = router;
