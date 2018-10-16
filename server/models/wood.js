const mongoose = require('mongoose');

const WoodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxLength: 100,
  }
});

module.exports = mongoose.model('woods', WoodSchema)