var connectionManager = require('../common/ConnectionManager.js');
connectionManager.Connect();
var User = require('../model/User');

exports.getUserByUserName = function (_username, callback) {
	User.findOne({username : _username}).exec(callback);
};

exports.addUser = function (user, callback) {
	user.save(callback);
};