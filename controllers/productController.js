const { StatusCodes } = require("http-status-codes");
const path = require("path");
const Product = require("../models/Product");
const User = require("../models/User");
const {
  BadFileError,
  ProductNotAvailable,
  NotFoundError,
  NotEnoughMoney,
  BadRequestError,
} = require("../errors");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const fs = require("fs");

const getAllProducts = async (req, res) => {
  const { name, category, numericFilters, sort } = req.query;
  const availableCategories = [
    "Books",
    "Toys",
    "Electronics And Computers",
    "Sports And Outdoors",
  ];
  if (category && availableCategories.indexOf(category) === -1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Provided category is not supported!",
      nbHits: 0,
      products: [],
    });
  }
  if (name) {
    req.query.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    filters = filters.split("-");
    const [price, operator, value] = filters;
    if (price == "price") {
      req.query.price = { [operator]: Number(value) };
    }
  }
  let sortList;
  if (sort) {
    sortList = sort.split(",").join(" ");
  } else {
    sortList = "createdAt";
  }
  let products = await Product.find(req.query).sort(sortList);
  return res.status(200).json({ msg: "OK", nbHits: products.length, products });
};

const getSingleProduct = async (req, res) => {
  const id = req.params.productID;
  try {
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json({ msg: "OK", product });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No product with provided ID" });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No product with provided ID" });
  }
};

const createProduct = async (req, res) => {
  if (typeof req.body?.price === "string") {
    req.body.price = Number(req.body.price);
    if (req.body.price === 0) {
      throw new BadRequestError("Please provide price for product!");
    }
  }
  const productImageFile = req.files.productImage;
  if (!productImageFile.mimetype.startsWith("image")) {
    throw new BadFileError("Please Upload Image!");
  }
  const maxSize = 20 * 1024 * 1024;
  if (productImageFile.size > maxSize) {
    throw new BadFileError(
      `Uploaded image size cannot exceed ${Number(maxSize / 1024 / 1024)}MB!`
    );
  }
  const productImage = await cloudinary.uploader.upload(
    productImageFile.tempFilePath,
    {
      original_filename: productImageFile.name,
      folder: "cool shop",
    }
  );
  fs.unlinkSync(productImageFile.tempFilePath);
  const productImageUrl = productImage.secure_url;
  const reqObject = req.body;
  reqObject.img = productImageUrl;
  reqObject.createdBy = req.user.userID;

  const product = await Product.create(reqObject);
  return res.status(200).json({ msg: "OK", product });
};

const buyProduct = async (req, res) => {
  const productID = req.params.productID;
  const user = await User.findById(req.user.userID);
  let foundProduct = null;
  try {
    foundProduct = await Product.findById(productID);
  } catch (error) {
    throw new NotFoundError(`Cannot find product with id: ${productID}`);
  }
  if (!foundProduct.available) {
    throw new ProductNotAvailable("This product is not available!");
  }
  if (!user.balance || user.balance < foundProduct.price) {
    throw new NotEnoughMoney("You have not enough money on your cash account!");
  }
  const boughtProduct = await Product.findByIdAndUpdate(productID, {
    available: false,
  });
  const seller = await User.findById(boughtProduct.createdBy);
  await User.updateOne(
    { _id: user._id },
    {
      $push: { boughtProducts: productID },
      balance: user.balance - foundProduct.price,
    }
  );
  seller.balance += boughtProduct.price;
  await seller.save();
  let newUser = await User.findById(user._id).select("-password");
  return res
    .status(200)
    .json({ msg: "OK", product: foundProduct, user: newUser });
};

const deleteProduct = async (req, res) => {
  return res.status(200).json({ msg: "OK", products: "delete single product" });
};

// in future
const updateProduct = async (req, res) => {
  return res.status(200).json({ msg: "OK", products: "update single product" });
};
module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  buyProduct,
};
