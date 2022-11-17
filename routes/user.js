const UserModel = require("../model/User")


exports.findUser = async (req, res) => {

    console.log(` nom: ${req.params.user}`)
    UserModel.findOne({ nom: req.params.user }, (err, result) => {
        if (err)
            res.status(400).json("users_notfound")

        res.status(200).json(result)
    })
}

exports.findAll = async (req, res) => {

    UserModel.find({}, (err, result) => {
        if (err)
            res.status(400).json("user_notfound")

        res.status(200).json(result)
    })
}

exports.deleteUser = async (req, res) => {
    UserModel.deleteOne({ [req.params.field]: req.params.value }, (err) => {
        if (err)
            res.status(400).json("cant_delete_user")

        res.status(200).json("delete_succesful")
    })
}

exports.updateUsers = async (req, res) => {
    const body = req.body;

    console.log("updating...")
    UserModel.updateMany(
        { [body.field]: body.oldValue },
        { [body.field]: body.newValue },
        {},
        (err) => {
            if (err)
                res.status(400).json("cant_update_users")

            res.status(200).json("update_succesful")
        })
}
