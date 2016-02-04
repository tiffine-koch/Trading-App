var express = require('express');
var router = express.Router();

var authMW = require('../config/auth');

var User = require('../models/user');


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

router.get('/secret', authMW, function(req, res, next) {
  console.log('req.user:', req.user);
  res.send('authorized user');
});

module.exports = router;