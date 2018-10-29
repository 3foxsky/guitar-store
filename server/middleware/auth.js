const User = require('../models/user');
const R = require('ramda');

module.exports = (req, res, next) => {
	const token  = req.cookies.w_auth;
  
	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user) return res.json({
			isAuth: false,
			error: err
		});
    
		// req.token = token;
		// console.log(R.omit(['password', 'role'], user));
		req.user = user;
		next();
	});
};
