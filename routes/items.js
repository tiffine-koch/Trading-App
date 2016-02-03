var express = require('express');
var router = express.Router();

var mongoose  = require('mongoose');


var Item = require('../models/item');

router.get('/', function(req, res, next) {
	Item.findAll(function(err, items) {
		res.status(err ? 400 : 200).send(err || items);
	});
});

router.get('/:id', function(req, res, next) {
	Item.findById(req.params.id, function(err, item) {
    	res.status(err ? 400 : 200).send(err || item);
  	});
});

router.post('/', function(req, res, next) { //remove next
	Item.create(req.body, function(err, savedItem) {
		res.status(err ? 400 : 200).send(err || savedItem);
	});
});

router.put('/changeOwner/:id', function(req, res, next) { //remove next
	Item.findByIdAndUpdate(req.params.id, { $set: { user: req.body.id}}, function (err, item) {
	  res.status((err || !item) ? 400 : 200).send(err || item);
	});
});

router.put('/removeOwner/:id', function(req, res, next) { //remove next
	Item.findByIdAndUpdate(req.params.id, { $set: { user: undefined}}, function (err, item) {
	  res.status(err ? 400 : 200).send(err || item);
	});
});

router.put('/toggleTradeability/:id', function(req, res, next) { //remove next
	Item.findById(req.params.id, function (err, item) {
		item.toggleTradeability(function(err, item) {
			res.status(err ? 400 : 200).send(err || item);
		});
	});
});

/* This if for future functionality
	router.delete('/:id', function(req, res) { //remove next
		Item.findByIdAndRemove(req.params.id, function(err,item){
			res.status(err ? 400 : 200).send(err || item);
		});
	});
*/

module.exports = router;