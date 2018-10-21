const router = require('express').Router();
const Brand = require('../models/brand');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/',auth, admin, (req, res) => {
	const brand = new Brand(req.body);

	brand.save((err, doc) => {
		if (err) res.status(500).json({success: false, error: err});

		res.status(200).json({success: true, brand: doc});
	});
});

router.get('/', (req, res) => {
	Brand.find({}, (err, brands) => {
		if (err) res.status(500).send(err);
    
		res.status(200).json(brands);
	});
});

module.exports = router;