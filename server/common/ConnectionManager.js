var mongoose = require('mongoose');
var db = null;

exports.Connect = function(){
	if (db == null){
		//mongoose.connect('mongodb://localhost:27017/RoomBooker');
		mongoose.connect('mongodb://roombooker:roombooker123@ds033153.mongolab.com:33153/roombookeraz');
		db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
	}	
	
	return db;
};
