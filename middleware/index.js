var middlewareObj = {},
    User = require("../models/user"),
    Product = require("../models/product");

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // key, message value
    // insert before redirect
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;