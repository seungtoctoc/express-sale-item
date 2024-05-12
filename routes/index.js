var express = require('express');
var router = express.Router();

const Product = require('../models/product');

router.get('/products', async function (req, res, next) {
  try {
    const category = req.query.category;
    const type = req.query.type;
    const brand = req.query.brand;

    let products = await Product.find({});

    res.status(200).send(products);
  } catch (err) {}
});

module.exports = router;
