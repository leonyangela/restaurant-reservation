var express = require("express"),
    router  = express.Router(),
    passport = require("passport");
    User = require("../models/user");

router.get("/", function(req, res) {
    res.render("restaurant-reservation");
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
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
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
    }), function(req, res) {
		res.redirect("/");
});


module.exports = router;