const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const mongoose = require('mongoose');
// const formidable = require('express-formidable');
// const cloudinary = require('cloudinary');
const morgan = require('morgan');

//for read dirs
const fs = require('fs');
const path = require('path');

// time
const Product = require('./models/product');

// CONFIG
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(morgan('dev'));
//* build
app.use(express.static('client/build'));

// ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/products/brands', require('./routes/brands'));
app.use('/api/products/woods', require('./routes/woods'));
app.use('/api/products', require('./routes/products'));
app.use('/api/upload', require('./routes/upload'));


if (process.env.NODE_ENV === 'production') {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client', 'public', 'index.html'));
	});
}

app.listen(port, () => {
	console.log('Running on', port);
});

