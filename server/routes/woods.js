const router = require('express').Router();
const Wood = require('../models/wood');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/',auth, admin, (req, res) => {
	const wood = new Wood(req.body);

	wood.save((err, doc) => {
		if (err) res.status(500).json({success: false, error: err});

		res.status(200).json({success: true, wood: doc});
	});
});

router.get('/', (req, res) => {
	Wood.find({}, (err, woods) => {
		if (err) res.status(500).send(err);
    
		res.status(200).json(woods);
	});
});

module.exports = router;