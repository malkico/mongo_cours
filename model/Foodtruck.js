const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodtruckModel = new Schema({
  nom: String,
  type_nourriture: { type: String, enum: ["sandwitchs", "glaces", "crépes"] },
  emplacement: String,
  commentaires : [{type : Schema.Types.ObjectId, ref : 'Commentaire'}]
});

module.exports = mongoose.model("Foodtruck", FoodtruckModel);
