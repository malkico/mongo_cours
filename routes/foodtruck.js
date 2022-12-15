const FoodtruckModel = require("../model/Foodtruck");
const Commentaire = require("../model/Commentaire");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createF = async (req, res) => {
  const foodtruck = FoodtruckModel(req.body);
  await foodtruck.save((err, result) => {
    if (err) throw new Error("can't create Foodtruck" + err);

    return res.status(201).json({
      message: "Food truck created ! ",
      result: result._doc,
    });
  });
};

exports.findF = async (req, res) => {
  FoodtruckModel.findOne({ nom: req.params.nom }, (err, result) => {
    if (err || !result) throw new Error("foodtruck_notfound" + err);
    res.status(201).json({ result: result._doc });
  });
};

exports.removeF = async (req, res) => {
  FoodtruckModel.deleteOne({ nom: req.params.nom }, (err, result) => {
    if (err) throw new Error("can't delete Foodtruck :" + err);
    res.status(201).json({
      message: "delete_succesful",
      count_deleted: result.deletedCount,
    });
  });
};

exports.editF = async (req, res) => {
  FoodtruckModel.updateOne(
    { _id: ObjectId(req.params.id) },
    req.body,
    {},
    (err) => {
      if (err) throw new Error("cant_update_foodtruck:" + err);
      else
        res.status(201).json({
          message: "update_succesful",
        });
    }
  );
};

exports.addC = async (req, res) => {
  const comment = Commentaire(req.body);
  await comment.save((err, result) => {
    if (err) throw new Error("can't create coment" + err);
    const myComment = result._doc;

    FoodtruckModel.updateOne(
      { _id: ObjectId(req.params.id) },
      { $push: { commentaires: myComment } },
      {},
      (err) => {
        if (err) throw new Error("cant_add_comment:" + err);
        res.status(201).json({
          message: "comment_added_succesfuly",
        });
      }
    );
  });
};
