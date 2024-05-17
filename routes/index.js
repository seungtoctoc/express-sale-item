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

    const sortby = req.body.sortby;
    const limit = req.body.limit;
    const current = req.body.current;

    // get sorted products
    const sortedProducts = await SortedProducts.findOne({
      sortby: sortby,
    }).populate('products');

    console.log('prev length ', sortedProducts.products.length);

    // filter
    let filterdProducts = filterProducts(
      sortedProducts.products,
      searchWord,
      selectedTypes,
      selectedBrands
    );

    console.log('after filter size: ', filterdProducts.length);

    // slice
    filterdProducts = filterdProducts.slice(
      limit * current,
      limit * (current + 1)
    );

    res.status(200).send(filterdProducts);
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
  let filteredProducts = products;

  if (searchWord) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.includes(searchWord) ||
        product.subtitle.includes(searchWord)
    );
  }

  if (selectedTypes.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedTypes.includes(product.type)
    );
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedBrands.includes(product.brand)
    );
  }

  return filteredProducts;
};

module.exports = router;
