const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserModel = new Schema({
  nom: String,
  prenom: String,
  email: String,
  password : String
});

module.exports = mongoose.model("User", UserModel);
