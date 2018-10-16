const router = require('express').Router();
const Product = require('../models/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/',auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) res.status(500).json({success: false, error: err})

    res.status(200).json({success: true, product: doc})
  });
});

router.get('/', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.status(500).send(err)
    
    res.status(200).json(products)
  })
});

module.exports = router