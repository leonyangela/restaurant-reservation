require('dotenv').config();

var express = require("express"),
    app = express(),
    sass = require("node-sass"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Product = require("./models/product"),
    User = require("./models/user");


const PORT = 3000;

//include routes
var productRoutes = require("./routes/product"),
    indexRoutes = require("./routes/index");

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
	console.log("Connected to DB Mongo Atlas!");
}).catch(err => {
	console.log("ERROR:", err.message);
});


// handle HTTP POST req
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//passport configuration
app.use(require("express-session")({
    secret: "This is the secret key",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//currentUser
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//routes
app.use("/", indexRoutes);
app.use("/shops", productRoutes);

app.listen(3000, () => {
    console.log("Server has started!");
});