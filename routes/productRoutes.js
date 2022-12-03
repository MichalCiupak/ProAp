const express = require("express");
const authenticateMiddleware = require("../middleware/authentication");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  displaySingleProductPage,
  displayMainPage,
} = require("../controlers/productController");
const router = express.Router();

router.route("/:productID").get(displaySingleProductPage);
router.route("/").get(displayMainPage);
router
  .route("/api/")
  .get(getAllProducts)
  .post(authenticateMiddleware, createProduct);

router
  .route("/api/:productID")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

module.exports = router;
