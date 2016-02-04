var express = require('express');
var router = express.Router();

var mongoose  = require('mongoose');


var Trade = require('../models/trade');
var Item = require('../models/item');
var User = require('../models/user');

router.get('/', function(req, res, next) {
	console.log
	Trade.findAll(function(err, trades) {
		res.status(err ? 400 : 200).send(err || trades);
	});
});

router.get('/:id', function(req, res, next) {
	Trade.findById(req.params.id, function(err, trade) {
    	res.status(err ? 400 : 200).send(err || trade);
  	});
});

router.put('/reject/:id', function(req, res, next) {
	Trade.findById(req.params.id, function(err, trade) {
		trade.reject(function(err, savedTrade){
    		res.status(err ? 400 : 200).send(err || savedTrade);
		})
  });
});

router.put('/accept/:id', function(req, res, next) {
		Trade.accept(req.params.id, function(err, trade){
			res.status(err ? 400 : 200).send(err || trade);
		})
});

router.post('/', function(req, res, next) {
	Trade.create(req.body, function(err, trade) {
		res.status(err ? 400 : 200).send(err || trade);
	});
});


module.exports = router;