var mongoose = require('mongoose');
var db = null;

exports.Connect = function(){
	if (db == null){
		//mongoose.connect('mongodb://localhost:27017/RoomBooker');
		mongoose.connect('mongodb://roombooker:roombooker123@dbh13.mongolab.com:27137/roombooker');
		db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
	}	
	
	return db;
};
