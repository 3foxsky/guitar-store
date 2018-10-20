const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const mongoose = require('mongoose');
// const formidable = require('express-formidable');
// const cloudinary = require('cloudinary');
const morgan = require('morgan');

// CONFIG
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI);

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

// ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/products/brands', require('./routes/brands'));
app.use('/api/products/woods', require('./routes/woods'));
app.use('/api/products', require('./routes/products'));

app.listen(port, () => {
	console.log('Running on', port);
});

