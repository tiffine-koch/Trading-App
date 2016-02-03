'use strict';

var mongoose  = require('mongoose');

var Item;

var itemSchema = mongoose.Schema({
	name: String,
	description: String,
	user: { 
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	dateCreated: {type: Date, default: Date.now},
	lastTraded: Date,
	tradeability: {type: Boolean, default: true},
	iURL: String
	// comments: [{type: String}]
});

itemSchema.statics.create = function(itemObj, cb) {
	var item = new Item(itemObj);
	item.save(cb);
}

itemSchema.statics.findAll = function(cb) {
	Item.find({}, function(err, items) {
    	cb(err,items);
  	});
}

itemSchema.methods.toggleTradeability = function(cb) {
	this.tradeability = !this.tradeability;
	this.save(cb);
}

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;