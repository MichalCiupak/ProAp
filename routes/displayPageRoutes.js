const {
  displayLoginPage,
  // displaySingleProductPage,
  displayMainPage,
  displayRegisterPage,
} = require("../controllers/displayPagesController");

const express = require("express");
const router = express.Router();

router.get("/login", displayLoginPage);
router.get("/register", displayRegisterPage);
router.get("/", displayMainPage);
module.exports = router;
