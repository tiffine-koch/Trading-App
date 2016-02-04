
var express = require('express');
var router = express.Router();

var User = require('../models/user');

var authMW = require('../config/auth');

router.get('/', function(req, res, next) {
 	User.find({}, function(err, savedUsers) {
    	res.status(err ? 400 : 200).send(err || savedUsers);
  	});
});

router.post('/register', function(req, res, next) { //remove next
	User.register(req.body, function(err, savedUser) {
		res.status(err ? 400 : 200).send(err || savedUser);
	});
});

router.post('/login', function(req, res, next) {
	User.login(req.body, function(err, token) {
		if (err) return res.status(400).send(err);
		res.cookie('mytoken', token).send();
	});
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});




module.exports = router;
