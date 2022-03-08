const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    defaulf: false,
  }
});

UserSchema.plugin(passportLocalMongoose); //This will add Username and password to Schema and check they are also unique

module.exports = mongoose.model("User", UserSchema);
