'use strict';

var mongoose  = require('mongoose');

var Trade;

var tradeSchema = mongoose.Schema({
	status: {type: String, default: 'Proposed', enum: ['Proposed', 'Accepted', 'Rejected']},
	dateProposed: {type: Date, default: Date.now},
	dateCompleted: {type: Date},
	senderItemId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Item'
	},
	receiverItemId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Item'
	},
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

tradeSchema.statics.accept = function(id,cb) {
	Trade.findById(id, function(err, trade) {
		if (err || !trade) cb(err,null);
		var receiverId = trade.receiverItemId.user;
		var senderId = trade.senderItemId.user;
		trade.senderItemId.user = receiverId;
		trade.senderItemId.save(function (err, item){
			if (err) cb(err,null);
			trade.receiverItemId.user = senderId;
			trade.receiverItemId.save(function (err, item){
				if (err) cb(err,null);
				trade.status = 'Accepted';
				trade.save(cb);
			});
		});
  }).populate('senderItemId receiverItemId');
}

// tradeSchema.methods.reject = function(cb){
// 	this.status = 'Rejected';
// 	this.save(cb);
// }


var Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;