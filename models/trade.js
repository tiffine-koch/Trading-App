'use strict';

var mongoose  = require('mongoose');

var Trade;

var tradeSchema = mongoose.Schema({
	senderId: { 
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	receiverId: { 
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	status: {type: String, default: 'Proposed', enum: ['Proposed', 'Accepted', 'Rejected']},
	dateProposed: {type: Date, default: Date.now},
	dateCompleted: {type: Date},
	senderItemsIds: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Item'
	}],
	receiverItemsIds: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Item'
	}],
});

tradeSchema.statics.create = function(tradeObj, cb) {
	var trade = new Trade(tradeObj);
	trade.save(cb);
}

tradeSchema.statics.findAll = function(cb) {
	Trade.find({}, function(err, trades) {
    	cb(err,trades);
  	});
}

tradeSchema.methods.reject = function(cb){
	this.status = 'Rejected';
	this.save(cb);
}

tradeSchema.methods.accept = function(cb){
	this.status = 'Accepted';
	this.save(cb);
}


var Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;