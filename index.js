const mongoose = require("mongoose")

const {createServer} = require("./utils")
const app = createServer()

const {findF, createF, removeF, editF, addC} = require("./routes/foodtruck")

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
app.post('/api/createF',  createF)
app.get("/api/findF/:nom", findF)
app.delete("/api/removeF/:nom", removeF)
app.put("/api/editF/:id", editF)
app.put("/api/addC/:id", addC)
 