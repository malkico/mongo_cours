const express = require('express')
const postModel = require("./model/User")
const mongoose = require("mongoose")

const {createServer} = require("./utils")
const app = createServer()

const {registerRoute} = require("./routes/register")
const {findUser, findAll, deleteUser, updateUsers, updatePassword} = require("./routes/user")
const { createToken } = require("./routes/token")

require('dotenv').config()

// connexion base de donnée
mongoose.connect("mongodb://0.0.0.0:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successful!");
});


// routes
app.post('/api/auth/register',  registerRoute)
app.post("/api/create/token", createToken)
app.get("/api/user/profile/:email", findUser)
app.get("/api/users", findAll)
app.delete("/api/user/delete/:field/:value", deleteUser)
app.put("/api/user/edit", updateUsers)
app.put("/api/user/edit-password", updatePassword)


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port hjh ${port}`)
})
