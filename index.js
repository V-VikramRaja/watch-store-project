const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const sessions = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users");
const userRoutes = require("./routes/users");
const Product = require("./models/products");
const { isLoggedIn, isAuthor, validateProduct } = require("./middleware");

// Connecting database
mongoose.connect("mongodb://localhost:27017/watch-store", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// printing connection status
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connections error"));
db.once("open", () => {
  console.log("Database Connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  // This should be a actual secret here in production
  secret: "needtogrowupquick",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, //if there is any flaw in the website and the user accidently opens cookie will not be send to websites.
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(sessions(sessionConfig));
app.use(flash());

// Required utils for passport
app.use(passport.initialize());
app.use(passport.session());
// Hey Passport! we would like to use localstrategy that we have downloaded and required
// for that localstrategy the authenticate method id located on User model.
// We have not made that method its is coming from passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));

// This will serialize the User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Assigning a middleware
// Whatever in the flash under success will be available under res.locals.success
app.use((req, res, next) => {
  // console.log(req.session)
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/reviews", reviewRoutes);

// Its here because its not startswith products
//------------- Home page-----------------
app.get(
  "/",
  catchAsync(async (req, res) => {
    res.render("partials/home");
  })
);

app.get("/admin-panel",isLoggedIn,isAuthor,catchAsync(async (req, res) => {
  res.render("products/admin_panel")
}))

app.get("/auth",catchAsync(async (req, res) => {
  res.render("partials/auth")
}))

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Port Opened, Listening at 3000");
});
