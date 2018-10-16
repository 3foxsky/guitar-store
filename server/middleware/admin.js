module.exports = (req, res, next) => {
  if (req.user.role === 0){
    res.send('no permission')
  } else {
    next()
  }
}