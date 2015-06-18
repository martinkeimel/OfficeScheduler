var connectionManager = require('../common/ConnectionManager.js');
connectionManager.Connect();

var Event = require('../model/Event');

exports.getEvents = function (callback) {
	Event.find({}).populate('room').exec(callback);
};

exports.addEvent = function (event, callback) {
	event.save(callback);
};

exports.updateEvent = function (id, newTitle, newStart, newEnd, newOwner, newRoom, callback) {
	Event.update(
      {_id : id}, 
      {
        title: newTitle,
        start: newStart,
        end: newEnd,
        owner: newOwner,
        room: newRoom
      }, {}, callback);
};

exports.getEvent = function (id, callback){
	Event.find({_id : id}).populate('room').exec(callback);
};