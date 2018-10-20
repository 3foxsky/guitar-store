const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/',auth, admin, (req, res) => {
	const product = new Product(req.body);

	product.save((err, doc) => {
		if (err) res.status(500).json({success: false, error: err});

		res.status(200).json({success: true, product: doc});
	});
});


//? COMMON GUITARS DOCUMENTS
// api/products/acrticles?id=SADFG235562,asdgHUJG536,fasd67ghF6gh&type=array/single
router.get('/acrticles-by-id', (req, res) => {
	const type = req.query.type;
	let items = req.query.id;

	if (type === 'array') {
		const ids = items.split(',');
		items = [];
		items = ids.map(i => mongoose.Types.ObjectId(i));   
	}

	Product
	//? HERE SEARCH FOR SINGLE OR ARRAY 
		.find({'_id': {$in: items} })
	//* must be a name of field, not name of model
		.populate('brand')
		.populate('wood')
		.exec((err, products) => {
			if (err) res.status(500).send(err);
      
			res.status(200).json(products);
		});
});

//? HOMEPAGE ARTICLES WITH BEST GUITARS
//  api/products/articles?sortBy=sold/craetedAt&order=asc/desc&limit=20&skip=10 
router.get('/articles', (req, res) => {
	const order = req.query.order || 'asc';
	const sortBy = req.query.sortBy || 'id';
	const limit = parseInt(req.query.limit) || 100;
	const skip = parseInt(req.query.skip) || 0;
	Product
		.find()
		.populate('brand')
		.populate('wood')
		.sort([[sortBy, order]])
		.skip(skip)
		.limit(limit)
		.exec((err, products) => {
			if (err) res.status(500).send(err);
      
			res.status(200).json(products);
		});
});

module.exports = router;
