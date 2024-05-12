var express = require('express');
var router = express.Router();

const Product = require('../models/product');

const types = ['FOOTWEAR', 'APPAREL'];
const brands = ['NIKE', 'ADIDAS', 'NEWBALANCE'];

router.get('/products', async function (req, res, next) {
  try {
    const selectedTypes = req.body.type;
    const selectedBrands = req.body.brand;
    const selectedSortby = req.body.sortby;

    let filterdProducts = await Product.find({});

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

    if (filterdProducts.length == 0) {
      res.status(204).send();
    }

    //sort

    res.status(200).send(filterdProducts);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
