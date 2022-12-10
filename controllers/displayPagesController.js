const { StatusCodes } = require("http-status-codes");
const path = require("path");
const displayLoginPage = (req, res) => {
  return res
    .status(StatusCodes.OK)
    .sendFile(path.join(__dirname, "../public/HTML/login.html"));
};
const displayRegisterPage = (req, res) => {
  return res
    .status(StatusCodes.OK)
    .sendFile(path.join(__dirname, "../public/HTML/registration.html"));
};
const displaySingleProductPage = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .sendFile(path.join(__dirname, "../public/HTML/singleProduct.html"));
};

const displayMainPage = async (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../public/HTML/index.html"));
};

const displayMailConfirmationPage = async (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../public/HTML/emailConfirmation.html"));
};
module.exports = {
  displayLoginPage,
  displaySingleProductPage,
  displayMainPage,
  displayRegisterPage,
  displayMailConfirmationPage,
};
