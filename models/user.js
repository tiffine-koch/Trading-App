'use strict';

var mongoose  = require('mongoose');
var jwt = require('jwt-simple');
var Firebase = require('firebase');


var JWT_SECRET = process.env.JWT_SECRET;

var ref = new Firebase('https://userauthen.firebaseio.com/');

var User;

var userSchema = mongoose.Schema({
  firebaseId: {type: String},
  profileName: {type: String, default: "Guest Chicken "+Math.floor(Math.random()*1000)},
  iUrl: String,
  blurb: {type: String, default: "I love long walks on the beach. I love to travel. Looking for a good time and a great deal! My Chicken for yo goats!"}
});

userSchema.statics.register  = function (userObj, cb) { // data in proper format
  if(!userObj.email || !userObj.password) {
    return cb("Missing required field (email, password)");
  }
  ref.createUser(userObj, function(err, userData) {
    if (err) return cb(err);
    var user = new User();
    user.firebaseId = userData.uid;
    user.save(cb);
  });
}

userSchema.methods.generateToken = function() {
  var payload = {
    firebaseId: this.firebaseId,
    _id: this._id
  };
  var token = jwt.encode(payload, JWT_SECRET);
  return token;
}

userSchema.statics.login = function(userObj, cb) {
  if(!userObj.email || !userObj.password) {
    return cb("Missing required field (email, password)");
  }
  ref.authWithPassword(userObj, function(err, authData) {
    if (err) return cb(err);
    User.findOne({firebaseId: authData.uid}, function (err, user) {
      if(err || !user) return cb(err || "User not found in database.");
      var token = user.generateToken();
      cb(null,token);
    });
  });
}



User = mongoose.model('User', userSchema);

module.exports = User;



