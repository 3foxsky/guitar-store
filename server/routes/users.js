const router = require('express').Router();
const R = require('ramda');

const User = require('../models/user');
const auth = require('../middleware/auth');

router.get('/', (req, res)=> {
	res.json({ok: 'ok'});
});

router.post('/register', (req, res)=> {
	const user = new User(req.body);
	user.save((err, doc)=>{
		if(err) return res.status(200).json({success:false, error: 'Can\'t register with this data'});

		return res.status(200).json({
			success: true,
			error: null,
		});
	});
});

router.post('/login', (req, res)=> {
	User.findOne({'email': req.body.email}, (err, user) => {
		if (!user) return res.status(404).json({success: false, error: 'User not found'});

		user.comparePassword(req.body.password, (err, match) => {
			if (!match) return res.status(404).json({success: false, error: 'Password is not correct'});

			user.generateToken((err, user) => {
				if (err) return res.status(500).json({success: false, error: 'Internal server error'});

				res.cookie('w_auth', user.token).status(200).json({
					success: true
				});
			});
		});
	});
});

router.get('/auth', auth, (req, res) => {
	res.json(
		{
			isAdmin: req.user.role === 1 ? true : false,
			isAuth: true,
			email: req.user.email,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			cart: req.user.cart,
			history: req.user.history,
		}
	);		
});

router.post('/logout', auth, (req, res) => {
	User.findOneAndUpdate(
		{_id: req.user._id},
		{ token: ''},
		(err, user) => {
			if (err) return res.status(500).json({success: false, error: true});
			res.status(200).json({success: true, error: false});
		}
	);
});


/**
 * CART ROUTES
 */

// DELETE OR ADD PRODUCT ON SAME ROUTE
//? FUTURE FEATURE
router.put('/updateCart', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ cart: req.body },
		{ new: true },
		(err, user) => {
			if (err) return res.status(500).json({error: true});
			res.status(200).json({error: false, cart: user.cart});
		}
	);
});
//? FUTURE FEATURE

router.put('/updateProfile', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
		} },
		{ new: true },
		(err, user) => {
			if (err) return res.status(500).json({error: true});
			res.status(200).json({error: false, user});
		}
	);
});


// router.put('/addToCart', auth, (req, res) => {

// });

//! addToCart, removeFromCart, updateProfile
//? successBuy

module.exports = router;
