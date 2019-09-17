require('dotenv').config();

var express = require("express"),
    app = express(),
    sass = require("node-sass"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


const PORT = 3000;

//routes
var productRoutes = require("./routes/product"),
    indexRoutes = require("./routes/index");

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB Mongo Atlas!");
}).catch(err => {
	console.log("ERROR:", err.message);
});


// handle HTTP POST req
// app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);
app.use("/shops", productRoutes);

app.listen(3000, () => {
    console.log("Server has started!");
});