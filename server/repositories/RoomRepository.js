var connectionManager = require('../common/ConnectionManager.js');
connectionManager.Connect();
var Room = require('../model/Room');

exports.getRooms = function (callback) {
	Room.find({}).exec(callback);
};
