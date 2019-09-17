var express = require("express"),
    router = express.Router(),
    Product = require("../models/product");


router.get("/", function(req, res) {
    res.render("shops/shop-product-list");
});

router.get("/product-details", function(req, res) {
    res.render("shops/shop-details");
});

module.exports = router;