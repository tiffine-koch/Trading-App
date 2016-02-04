var express = require('express');
var router = express.Router();

var authMW = require('../config/auth');



router.get('/', authMW, function(req, res, next) {
	if (req.user)
		res.render('userPage');
	res.render('index');
});

router.get('/secret', authMW, function(req, res, next) {
  console.log('req.user:', req.user);
  res.send('authorized user');
});

module.exports = router;