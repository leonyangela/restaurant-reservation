var mongoose = require("mongoose");


var productSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    createdAt: {type: date, default: Date.now }
});


module.exports = mongoose.model("Product", productSchema);