var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  category: String,
  brand: String,
  name: String,
  description: String,
  price: Number,
  rating: Number,
  review: String,
  created_at: Date,
  updated_at: Date
});

var Item = mongoose.model('Item', itemSchema);
module.exports = Item;
