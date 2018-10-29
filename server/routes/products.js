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

	if (!req.query.id) {
		return res.json([]);
	}

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
			if (err) res.status(500).send([]);
      
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

/**
 * * SHOP ROUTES
 */

router.post('/shop', (req, res) => {
	let order = req.body.order || 'desc';
	let sortBy = req.body.sortBy || '_id';
	let limit = parseInt(req.body.limit) || 100; 
	let skip = parseInt(req.body.skip);
	let findArgs = {};

	for(let key in req.body.filters){
		if(req.body.filters[key].length > 0){
			if(key === 'price'){
				findArgs[key] = {
					$gte: req.body.filters[key][0],
					$lte: req.body.filters[key][1]
				};
			}else{
				findArgs[key] = req.body.filters[key];
			}
		}
	}

	findArgs['publish'] = true;

	Product.
		find(findArgs).
		populate('brand').
		populate('wood').
		sort([[sortBy,order]]).
		skip(skip).
		limit(limit).
		exec((err,articles)=>{
			if(err) return res.status(400).send(err);
			res.status(200).json({
				size: articles.length,
				articles
			});
		});
});

module.exports = router;
