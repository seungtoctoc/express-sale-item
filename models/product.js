const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
    },
    type: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    price: {
      currentPrice: {
        type: Number,
      },
      fullPrice: {
        type: Number,
      },
      discountRate: {
        type: Number,
      },
    },
    imageUrl: {
      type: String,
    },
    link: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
