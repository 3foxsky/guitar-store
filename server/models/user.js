const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	firstName: {
		type: String,
		required: true,
		maxLength: 100,
	},
	lastName : {
		type: String,
		required: true,
		maxLength: 100,
	},
	cart: {
		type: Array,
		default: [],
	},
	history: {
		type: Array,
		default: [],
	},
	role: {
		type: Number,
		enum: [0 , 1],
		default: 0,
	},
	token: {
		type: String,
	},
});

UserSchema.pre('save', function (next) {
	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

UserSchema.methods.comparePassword = function(pw, cb) {
	bcrypt.compare(pw, this.password, function(err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

// UserSchema.pre('save', function(next) {
//   const user = this;
//     bcrypt.hash(user.password, 10, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next()
//     });
// });

// UserSchema.methods.comparePassword = function(candidatePassword,cb){
//   const user = this;
//   if (bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//     console.log(err, isMatch);
//     return isMatch
//   })){
//     return cb(null, true)
//   }
//   cb(false)
// };

UserSchema.methods.generateToken = function(cb){
	var user = this;
	var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

	user.token = token;
	user.save(function(err,user){
		if(err) return cb(err);
		cb(null,user);
	});
};

UserSchema.statics.findByToken = function(token, cb) {
	const user = this;
	// decode is equal user _id
	jwt.verify(token, process.env.SECRET, (err, decode) => {
		if (err) console.log(err);

		user.findOne({'_id': decode, 'token': token}, (err, user) => {
			if (err) return cb(err);
			cb(null, user);
		});
	});
};

const User = mongoose.model('users', UserSchema);
module.exports = User;
