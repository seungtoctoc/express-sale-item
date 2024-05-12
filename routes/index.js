var express = require('express');
var router = express.Router();

const Product = require('../models/product');

const types = ['FOOTWEAR', 'APPAREL'];
const brands = ['NIKE', 'ADIDAS', 'NEWBALANCE'];

router.post('/products', async function (req, res, next) {
  try {
    const selectedTypes = req.body.type;
    const selectedBrands = req.body.brand;
    const selectedSortby = req.body.sortby;

    let filterdProducts = await Product.find({ depth: 0 });

    if (selectedTypes) {
      filterdProducts = filterdProducts.filter((product) =>
        selectedTypes.includes(product.type)
      );
    }
    if (selectedBrands) {
      filterdProducts = filterdProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (filterdProducts.size == 0) {
      res.status(204).send();
    }

    //sort

    res.status(200).send(filterdProducts);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
