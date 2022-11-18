const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserModel = new Schema({
  lastname: String,
  firstname: String,
  email: String,
  password : String,
  phone : String
});

module.exports = mongoose.model("User", UserModel);
