const User = require("../models/User");
const { createJWT, isTokenValid } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");
const { UnAuthenticatedError } = require("../errors");
const auth = async (req, res, next) => {
  // check header
  const token = req.headers.authorization;
  if (!token) {
    throw new UnAuthenticatedError("No token provided!");
  }
  const payload = isTokenValid(token);

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
  next();
};

module.exports = auth;
