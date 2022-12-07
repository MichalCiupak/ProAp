const {
  displayLoginPage,
  displaySingleProductPage,
  displayMainPage,
  displayRegisterPage,
  displayMailConfirmationPage,
} = require("../controllers/displayPagesController");

const express = require("express");
const router = express.Router();

router.get("/login", displayLoginPage);
router.get("/register", displayRegisterPage);
router.get("/", displayMainPage);
router.get("/singleProduct/:productID", displaySingleProductPage);
router.get("/confirmation/:token", displayMailConfirmationPage);
module.exports = router;
