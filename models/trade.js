'use strict';

var mongoose  = require('mongoose');

var Trade;

var tradeSchema = mongoose.Schema({
	originalSenderId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Item'
	},
	originalRecieverId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Item'
	},
	status: {type: String, default: 'Proposed', enum: ['Proposed', 'Accepted', 'Declined', 'Offer Expired']},
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
				trade.save(function(err, savedTrade){

					Trade.update({
												$and:[
																{$or:
																	[
																	{'senderItemId': trade.senderItemId._id}, 
																	{'senderItemId': trade.receiverItemId._id},
																  {'receiverItemId': trade.senderItemId._id},
																  {'receiverItemId': trade.receiverItemId._id}
													  			]
													  		},
																{'status':'Proposed'}
															]
												},{status:'Offer Expired'}, {multi:true}, function(err, invalidTrades){
							cb(err,invalidTrades);
						});

				});
			});
		});
  }).populate('senderItemId receiverItemId');
}

tradeSchema.methods.reject = function(cb){
	this.status = 'Rejected';
	this.save(cb);
}


var Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;