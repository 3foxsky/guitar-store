const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

module.exports = {
  comparePassword : function (newPass, oldPass, cb) {
    bcrypt.compare(password, oldPass, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch)
    })
  },
  generateToken : function (cb) {;
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save((err, user) => {
      if (err) return cb(err);
      return cb(null, user);
    })
  }
}
