const express = require('express')
const app = express()
const port = 3000
const postModel = require("./model/User")
const mongoose = require("mongoose")

const {registerRoute} = require("./routes/register")
const {findUser, findAll, deleteUser, updateUsers} = require("./routes/user")
const { createToken } = require("./routes/token")

require('dotenv').config()
app.use(express.urlencoded({ extended: false }))

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
app.post("/create/token", createToken)
app.post('/register',  registerRoute)
app.get("/user/:user", findUser)
app.get("/users", findAll)
app.delete("/delete/:field/:value", deleteUser)
app.post("/update", updateUsers)


app.listen(port, () => {
  console.log(`Example app listening on port hjh ${port}`)
})


