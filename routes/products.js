const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const products = require("../controllers/products");
const Product = require("../models/products");
const Avail = require("../models/avails");
const { isLoggedIn, isAuthor, validateProduct } = require("../middleware");

// --------------Get for new page-----------------
router.get("/new", isLoggedIn, isAuthor, catchAsync(products.renderNewForm));

// -------------get for index page ---------------------
router.get("/", catchAsync(products.index));

// ------------get for show page-----------------
router.get("/:id", catchAsync(products.showProduct));

// ------------get for edit page------------------------
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(products.renderEditForm)
);

router.get(
  "/:id/cart",
  isLoggedIn,
  catchAsync(products.renderCart)
);

// ----------------post for new --------------------
router.post(
  "/",
  isLoggedIn,
  validateProduct,
  isLoggedIn,
  catchAsync(products.createProduct)
);

// ----------------put for edit------------
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateProduct,
  catchAsync(products.editProduct)
);

// -----------------delete fot delete-----------
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(products.deleteProduct));

module.exports = router;

// Consider using router.routes
