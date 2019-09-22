var express = require("express"),
    router = express.Router(),
    Product = require("../models/product"),
    middleware = require("../middleware");

//product-list
router.get("/", function(req, res) {
    var perPage = 8;
	var pageQuery = parseInt(req.query.page);
	var pageNumber = pageQuery ? pageQuery : 1;
	
	Product.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err, allProduct){
		Product.count().exec(function(err, count){
		   if(err){
			   console.log(err);
		   } else {
			  res.render("shops/shop-show-products",{
				 products:allProduct,
				 current: pageNumber,
				 pages: Math.ceil(count / perPage)
			  });
			}
		});
	});
});

//view add new product
router.get("/add-product", middleware.isLoggedIn, function(req, res) {
    res.render("shops/shop-add-product");
});

//add new product to database
router.post("/add-product", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;

    var newProduct = {name: name, price: price, image: image, description: desc};

    Product.create(newProduct, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            req.flash("success", "Added new Product!");
            res.redirect("/shops");
        }
    });
});

//show detail product
router.get("/product-details/:id", function(req, res) {
    Product.findById(req.params.id).exec(function(err, foundProduct) {
        if(err) {
            console.log(err);
        } else {
            res.render("shops/shop-details", {product: foundProduct});
        }
    });
});

//show update form detail product
router.get("/product-details/:id/edit", middleware.isLoggedIn, function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct){
        if( err ) {
            console.log(err);
        } else {
            res.render("shops/shop-edit-product", {product: foundProduct});
        }
    });
});

//update detail product
router.put("/product-details/:id", middleware.isLoggedIn, function(req, res) {
	Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedCampground){
		if(err){
            console.log(err);
			res.redirect("/shops");
		} else {
            req.flash("success", "Product updated successfully!");
			res.redirect("/shops/product-details/" + req.params.id);
		}
	});
});

//delete product
router.delete("/product-details/:id", middleware.isLoggedIn, function(req, res) {
    Product.findByIdAndDelete(req.params.id, function (err, product) {
        if(err) {
            res.redirect("/shops");
        } else {
            product.remove();
            req.flash("success", "Product deleted successfully!");
            res.redirect("/shops");
        }
    });
});


module.exports = router;