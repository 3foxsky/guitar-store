const router = require('express').Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.get('/', (req, res)=> {
  res.json({ok: "ok"});
});

router.post('/register', (req, res)=> {
  const user = new User(req.body);
  user.save((err, data) => {
    if (!err) {
      res.status(200).json({
        success: true,
        data
      })
    } else {
      res.status(409).json({
        success: false,
        error: err,
      })
    }
  })
});

router.post('/login', (req, res)=> {
  User.findOne({'email': req.body.email}, (err, user) => {
    if (!user) return res.status(404).json({success: false, error: 'User not found'});

    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log(isMatch)
      if (!isMatch) return res.status(404).json({success: false, error: 'User or password is not correct'});

        user.generateToken((err, user) => {
          if (err) return res.status(500).json({success: false, error: 'Internal server error'});

          res.cookie('w_auth', user.token).status(200).json({
            loginSuccess: true
          })
        })
    })
  });
});

router.get('/auth', auth, (req, res) => {
  res.json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.email,
    firstName: req.firstName,
    lastName: req.lastName,
    cart: req.cart,
    history: req.history,
  })
});

router.put('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    {_id: req.user.id},
    { token: ''},
    (err, user) => {
      if (err) return res.status(500).json({success: false, error: true});
      res.status(200).json({success: true, error: false})
    }
  )
})

module.exports = router
