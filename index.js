const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const postModel = require("./model/User")
const mongoose = require("mongoose")

require('dotenv').config()

mongoose.connect("mongodb://0.0.0.0:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true

})

const hash = require("./hash")

const TOKEN_KEY = process.env.TOKEN_KEY



var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});



postModel.find({ title: "hello" })

app.use(express.urlencoded({ extended: false }))


app.post("/create/token", (req, res) => {

  var jwt = require('jsonwebtoken');
var token = jwt.sign(
  {
    mail: req.body.mail,
    name: req.body.name
  }, TOKEN_KEY,
  {
    expiresIn: "2h"
  }
);


  res.status(200).json({
    msg: "msssg",
    token : token
  })
})

app.get('/', (req, res) => {
  res.send('Hello World jkj !')
})

app.post('/', async (req, res) => {

  const myObj = { ...req.body }

  console.log(` nom :: ${req.body.nom}`)

  const post = postModel({
    title: req.body.nom,
    body: "abd",
    date: new Date(),
    pass: await hash.hashPassword(req.body.pass)
  })

  post.save()

  res.status(200).json({ msg: "success" })
})

app.listen(port, () => {
  console.log(`Example app listening on port hjh ${port}`)
})

