const User = require("../models/users");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password, isAdmin } = req.body;
    const user = new User({ email, username, isAdmin });
    const registeredUser = await User.register(user, password); //Password should be here for hashing
    // console.log(registeredUser);
    // to make the user login after registeration
    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });
    req.flash("success", "Registered successfully");
    res.redirect("/products");
    console.log(req.body);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.loginUser = (req, res) => {
  req.flash("success", "Login Success");
  const redirectUrl = req.session.returnTo || "/products";
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash("success", "Logout Success");
  const redirectUrl = req.session.returnTo || "/products";
  res.redirect(redirectUrl);
};
