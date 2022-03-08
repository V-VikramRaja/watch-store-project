const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: {
    type: Boolean,
    required: true,
    default: false,
  },
});
//This will add Username and password to Schema and check they are also unique
AdminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", AdminSchema);
