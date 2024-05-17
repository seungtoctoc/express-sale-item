var express = require('express');
var router = express.Router();

const Product = require('../models/Product');
const SortedProducts = require('../models/sortedProducts');

const brands = ['NIKE', 'ADIDAS', 'NEWBALANCE'];
const types = ['FOOTWEAR', 'APPAREL'];

router.post('/products', async function (req, res, next) {
  try {
    const searchWord = req.body.searchWord;
    const selectedBrands = req.body.brand;
    const selectedTypes = req.body.type;
    const selectedSortby = req.body.sortby;

    const limit = req.body.limit;
    const current = req.body.current;

    // get sorted products
    let products = await SortedProducts.find({
      sortedBy: selectedSortby,
    }).populate('products');

    // filter
    products = filterProducts(
      products,
      searchWord,
      selectedTypes,
      selectedBrands
    );

    // validate
    if (products.size == 0) {
      res.status(204).send();
    }

    // slice
    products = products.slice(limit * current, limit * (current + 1));

    res.status(200).send(products);
  } catch (err) {
    res.send(err);
  }
});

// test
router.get('/products/all', async function (req, res, next) {
  const products = await Product.find({});

  res.send(products);
});

const filterProducts = (
  products,
  searchWord,
  selectedTypes,
  selectedBrands
) => {
  if (searchWord) {
    products = products.filter(
      (product) =>
        product.title.includes(searchWord) ||
        product.subtitle.includes(searchWord)
    );
  }
  if (selectedTypes) {
    products = products.filter((product) =>
      selectedTypes.includes(product.type)
    );
  }
  if (selectedBrands) {
    products = products.filter((product) =>
      selectedBrands.includes(product.brand)
    );
  }

  return products;
};

module.exports = router;
