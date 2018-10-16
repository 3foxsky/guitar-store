const mognoose = require('mongoose');

const BrandSchema = mognoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
    unique: 1,
  }
});

module.exports = mognoose.model('brands', BrandSchema);
