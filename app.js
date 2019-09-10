require('dotenv').config();

var express = require("express"),
    app = express(),
    sass = require("node-sass"),
    router = express.Router();


const PORT = 3000;

// handle HTTP POST req
// app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
    res.render('restaurant-reservation');
});


app.listen(3000, () => {
    console.log("Server has started!");
});