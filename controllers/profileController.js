const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");
const getProfileData = async (req, res) => {
  if (!req.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  const user = await User.findById(req.user.userID);
  res.status(StatusCodes.OK).json({
    userID: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    address: user.address,
    balance: user.balance,
    boughtProducts: user.boughtProducts,
  });
};

const addBalance = async (req, res) => {
  const additionalBalance = +req.params.value;
  // check if value is number
  if (isNaN(additionalBalance)) {
    throw new BadRequestError("Should be number not string!");
  }
  if (additionalBalance < 0) {
    throw new BadRequestError("Value can not be negative!");
  }
  let user = await User.findById(req.user.userID);
  const newBalance = user.balance + additionalBalance;
  user = await User.findByIdAndUpdate(
    req.user.userID,
    {
      balance: newBalance,
    },
    {
      new: true,
    }
  ).select("-password");
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully replenished balance", user });
};

module.exports = { getProfileData, addBalance };
