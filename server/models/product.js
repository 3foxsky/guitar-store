const mognoose = require('mongoose');

// const Brand = require('./brand');

const ProductSchema = mognoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
    unique: 1,
  },
  description: {
    type: String,
    maxLength: 1000,
  },
  price: {
    required: true,
    type: Number,
    maxLength: 255
  },
  brand: {
    type: mognoose.Schema.Types.ObjectId,
    ref: 'brands',
    required: true,
  },
  shipping: {
    required: true,
    type: Boolean,
  },
  available: {
    required: true,
    type: Boolean,
  },
  wood: {
    type: mognoose.Schema.Types.ObjectId,
    ref: 'woods',
    required: true
  },
  frets: {
    required: true,
    type: Number
  },
  sold: {
    type: Number,
    maxLength: 10,
  },
  publish: {
    required: true,
    type: Boolean,
  },
  images: {
    type: Array,
    default: []
  } 
}, {timestamps: true});

module.exports = mognoose.model('products', ProductSchema);
