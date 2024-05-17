const mongoose = require('mongoose');

const SortedProductsSchema = new mongoose.Schema(
  {
    sortedBy: {
      type: String,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

const SortedProducts = mongoose.model('SortedProducts', SortedProductsSchema);

module.exports = SortedProducts;
