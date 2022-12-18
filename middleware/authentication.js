//TODO
// 1. DIFFERENT types of errors w zależności od tego czy
// token jest, czy on nie działa, czy on nieaktualnyitp
// 2. If user email_validated = false -> throw error
const User = require("../models/User");
const { createJWT, isTokenValid } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");
const { UnAuthenticatedError } = require("../errors");
const auth = async (req, res, next) => {
  // check header
  const token = req.headers.authorization;
  console.log("From auth middleware first bruhh");
  console.log(token);
  if (!token) {
    throw new UnAuthenticatedError("No token provided!");
  }
  const payload = isTokenValid(token);

  console.log("payload:");
  console.log(payload);
  if (!payload) {
    throw new UnAuthenticatedError("No token provided!");
  }
  req.user = {
    userID: payload.userID,
    name: payload.name,
    email: payload.email,
    surname: payload.surname,
    address: payload.address,
    balance: payload.balance,
  };
  console.log(`This is from authentication middleware JS. Req.user:`);
  console.log(req.user);
  next();
};

module.exports = auth;
