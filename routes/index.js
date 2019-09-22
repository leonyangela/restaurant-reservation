var express = require("express"),
    router  = express.Router(),
    passport = require("passport");
    User = require("../models/user");

router.get("/", function(req, res) {
    res.render("home");
});

//register
router.get("/register", function(req, res) {
    res.render("register");
});

//handle register logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });

    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register", {error: err.message});
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
                res.redirect("/"); 
            });
        }
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Please sign up first."
    }), function(req, res) {
        req.flash("success", "Welcome to CoffeeShop " + req.user.username);
		res.redirect("/");
});

//logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out");
    res.redirect("/");
 });

module.exports = router;