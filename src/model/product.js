const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription:{type:String, required: true},
  productImage:{type:String, required: true},
  productType:{type:String, required: true},
  productRating:{type: Number, required: true, min: 1, max: 5}
});

const product = mongoose.model('product', productSchema);
module.exports = product;
