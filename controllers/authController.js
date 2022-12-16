const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { createJWT, isTokenValid } = require("../utils/jwt");
const login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  // console.log(userFound);
  // console.log("----------");
  if (!userFound || userFound.password != req.body.password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "User with provided credentials does not exist" });
  }
  const token = createJWT({
    name: userFound.name,
    surname: userFound.surname,
    email: userFound.email,
    userID: userFound._id,
    address: userFound.address,
    balance: userFound.balance,
  });
  console.log(token);
  console.log("-----");
  console.log(isTokenValid(token));
  res.status(StatusCodes.OK).json({ msg: "OK", token });
};

const register = async (req, res) => {
  console.log("reg");
  const newUser = await User.create(req.body);

  const token = createJWT({
    name: newUser.name,
    surname: newUser.surname,
    email: newUser.email,
    userID: newUser._id,
    address: newUser.address,
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ msg: "User was successfully created", token });
};

module.exports = {
  login,
  register,
};
