const express = require("express");
const authenticateMiddleware = require("../middleware/authentication");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  buyProduct,

  updateProduct,
} = require("../controllers/productController");
const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(authenticateMiddleware, createProduct);

router
  .route("/:productID")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

router.route("/buy/:productID").post(authenticateMiddleware, buyProduct);
module.exports = router;
