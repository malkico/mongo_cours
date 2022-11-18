const express = require('express');

exports.checkLenght = (field, lenghtMin, res, msg) => {
    if (field.length <= lenghtMin)
        return404(res, msg)
}

exports.confirmPassword = (password, confirmPassword) => {
    if (password != confirmPassword)
        return404(res, "confirmPassword_incorrect")
}

exports.createServer =() => {
	const app = express()
    app.use(express.urlencoded({ extended: false }))

	app.use(express.json())
	// app.use("/api", routes)
	return app
}
