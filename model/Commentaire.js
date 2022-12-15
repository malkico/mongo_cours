const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Commentaire = new Schema({
  date: { type: String, default : new Date() },
  author: { type: String, required: true },
  contenu : { type : String , required : true}
  });

module.exports = mongoose.model("Commentaire", Commentaire);
