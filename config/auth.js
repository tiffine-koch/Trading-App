'use strict';


var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var authMW  = function(req, res, next) {
	var payload;
	try {
		payload  = jwt.decode(req.cookies.mytoken, JWT_SECRET);
	} catch(err) {
		// return res.status(401).send('Authentication failed.');
	}
	req.user = payload;
	next();
}



module.exports = authMW;