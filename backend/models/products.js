var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    image:String,
    price:Number,
});

module.exports = mongoose.model('Products',productsSchema);