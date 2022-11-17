const hash = require("../hash")

const UserModel = require("../model/User")

const return404 = (res, msg) => {
    return res.status(401).json({
        error: true,
        message: msg
    })
}

const checkLenght = (field, lenghtMin, res, msg) => {
    if (field.length <= lenghtMin)
        return404(res, msg)
}

exports.registerRoute = async (req, res) => {
    const body = req.body
    checkLenght(body.nom, 1, res, "nom_incorrect")
    checkLenght(body.prenom, 1, res, "prenom_incorrect")
    checkLenght(body.email, 1, res, "email_correct")
    checkLenght(body.password, 16, res, "password_incorrect")

    if(body.password != body.password2)
        return404(res,"password2_incorrect")

    const password = await hash.hashPassword(body.password)

    const user = UserModel({
        ...body,
        password : password
    })
    user.save()

    console.log("registred")

    return res.status(200).json({
        message : password
    })
}