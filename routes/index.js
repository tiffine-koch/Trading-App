var express = require('express');
var router = express.Router();

var authMW = require('../config/auth');

var User = require('../models/user');
var Item = require('../models/item');



router.get('/', authMW, function(req, res, next) {
	if (req.user) {
		User.findById(req.user._id, function(err, user){
	      if (err) return res.status(400).send(err);
	      res.render('userPage', {user: user, admin: true});
	    })
	}
	else
		res.render('index');
});

router.get('/myGoods', authMW, function(req, res, next) {
	if (req.user) {
		Item.find({user:req.user._id}, function(err, items){
	      if (err) return res.status(400).send(err);
	      res.render('myGoods');
	    })
	}
	else
		res.render('index');
});

module.exports = router;