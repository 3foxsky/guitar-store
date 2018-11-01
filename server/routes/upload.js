const router = require('express').Router();
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
require('dotenv').config();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const s3 = new AWS.S3({
	accessKeyId: process.env.S3_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_KEY,
});

// rgb233/fas8g9UYGF&.jpeg
router.get('/',
//  auth, admin, 
	(req, res) => {
		const key = `${'prodId14346'}/${uuid()}.jpg`;
		// const key = `${req.product.id}/${uuid()}.jpeg`;

		s3.getSignedUrl('putObject', {
			Bucket: 'guitar-store-bucket',
			ContentType: 'jpeg',
			Key: key
		},
		(err, url) => res.json({key, url})
		);

	});

module.exports = router;

