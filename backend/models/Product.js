const mongoose = require('mongoose');

// This defines what each product looks like in database
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true  // must have a name
  },
  price: {
    type: Number,
    required: true  // must have a price
  },
  image: {
    type: String,
    required: true  // must have an image URL
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true  // Electronics, Fashion etc.
  },
  stock: {
    type: Number,
    default: 10     // how many items available
  }
}, { timestamps: true }); // automatically adds createdAt and updatedAt

module.exports = mongoose.model('Product', productSchema);