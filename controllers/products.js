const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const products = require("../controllers/products");
const User = require("../models/users");
const Product = require("../models/products");
const Avail = require("../models/avails");
const { isLoggedIn, isAuthor, validateProduct } = require("../middleware");

// --------------Get for new page-----------------
module.exports.renderNewForm = async (req, res, next) => {
  const items = await Product.find({});
  const avails = await Avail.find();
  res.render("products/new", { items, avails: avails[0] });
};

// -------------get for index page ---------------------
module.exports.index = async (req, res, next) => {
  const products = await Product.find();
  res.render("products/index", { products });
};

// -----------------get for show page-----------------
module.exports.showProduct = async (req, res) => {
  const users = await User.find();
  const product = await Product.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!product) {
    req.flash("error", "Cannot find the product");
    return res.redirect("/products");
  }
  // console.log(product)
  res.render("products/show", { product, users });
};

module.exports.cartForm = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    req.flash("error", "Cannot find the product");
    return res.redirect("/products");
  }
  console.log(product);
  console.log(user);
  res.redirect(`/products/${id}`)
}

// ------------get for edit page------------------------
module.exports.renderEditForm = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  const items = await Product.find();
  const avails = await Avail.find();
  if (!product) {
    req.flash("error", "Cannot find the product");
    return res.redirect("/products");
  }
  res.render("products/edit", { product, items, avails: avails[0] });
};

// ----------------post for new --------------------
module.exports.createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body.product);
  newProduct.author = req.user._id;
  if (!newProduct) throw new ExpressError("Invalid Product");
  await newProduct.save();
  req.flash("success", "Successfully added a new product");
  res.redirect(`/products/${newProduct._id}`);
};

// ----------------put for edit------------
module.exports.editProduct = async (req, res, next) => {
  const { id } = req.params;
  // console.log(req.body)
  // const product = await Product.findById(id);
  const product = await Product.findByIdAndUpdate(id, req.body.product);
  req.flash("success", "Successfully updated the product");
  res.redirect(`/products/${product.id}`);
};

// -----------------delete fot delete-----------
module.exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    req.flash("error", "Cannot find the product");
    return res.redirect("/products");
  }
  req.flash("success", "Successfully deleted the product");
  res.redirect(`/products`);
};
