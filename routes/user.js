const UserModel = require("../model/User")

const {checkLenght, confirmPassword} = require("../utils")


exports.findUser = async (req, res) => {

    console.log(` nom: ${req.params.email}`)
    UserModel.findOne({ email: req.params.email }, (err, result) => {
        if (err)
            res.status(400).json("user_notfound")

        res.status(201).json({
            email : result.email,
            lastname : result.lastname,
            firstname : result.firstname,
            phone : result.phone
        })
    })
}

exports.findAll = async (req, res) => {

    UserModel.find({}, (err, result) => {
        if (err)
            res.status(400).json("user_notfound")

        res.status(201).json(result)
    })
}

exports.deleteUser = async (req, res) => {
    UserModel.deleteOne({ [req.params.field]: req.params.value }, (err) => {
        if (err)
            res.status(400).json("cant_delete_user")

        console.log("deleted")
        res.status(201).json("delete_succesful")
    })
}

exports.updateUsers = async (req, res) => {
    const body = req.body;

    checkLenght(body.newValue)
    console.log("updating...")
    UserModel.updateOne(
        { [body.field]: body.oldValue },
        { [body.field]: body.newValue },
        {},
        (err) => {
            if (err)
                res.status(400).json("cant_update_users")

            res.status(201).json({
                [body.field]: body.newValue,
                message: "Modification du compte réussie !"

            })
        })
}

exports.updatePassword = async (req, res) => {
    const body = req.body

    checkLenght(body.password)
    confirmPassword(body.password, body.confirmPassword)

    UserModel.updateOne(
        { password: body.email },
        { password: body.password },
        {},
        (err) => {
            if (err)
                res.status(400).json("cant_update_password")

            res.status(201).json({
                [body.field]: body.newValue,
                message: "Modification du compte réussie !"

            })
        })

    res.status(201).json({
        [body.field]: body.newValue,
        message: "Mot de passe modifié !"

    })

    
}
