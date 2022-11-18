const hash = require("../hash")

const UserModel = require("../model/User")

const return404 = (res, msg) => {
    return res.status(401).json({
        error: true,
        message: msg
    })
}

const {checkLenght, confirmPassword} = require("../utils")
exports.registerRoute = async (req, res) => {
    const body = req.body
    checkLenght(body.lastname, 1, res, "nom_incorrect")
    checkLenght(body.firstname, 1, res, "prenom_incorrect")
    checkLenght(body.email, 1, res, "email_correct")
    checkLenght(body.password, 16, res, "password_incorrect")
    checkLenght(body.phone, 9, res, "phone_incorrect")
    confirmPassword(body.password, body.confirmPassword)


    const password = await hash.hashPassword(body.password)

    const user = UserModel({
        ...body,
        password : password
    })
    await user.save()

    console.log("registred")
    
    return res.status(201).json({
        email : body.email,
        lastname : body.lastname,
        firstname : body.firstname,
        phone : body.phone,
        message : "Création du compte réussi !"
    })
}