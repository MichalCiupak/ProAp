const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const getProfileData = async (req, res) => {
  if (!req.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
  }
  const user = await User.findById(req.user.userID);
  console.log(user);
  res.status(StatusCodes.OK).json({
    userID: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    address: user.address,
    balance: user.balance,
  });
};

module.exports = { getProfileData };
