var mongoose = require('mongoose');
var uuid     = require('uuid');

var Schema = mongoose.Schema;

var RoomsSchema = new Schema({
  _id: String,
  title: String,
  color: String
}).pre('save', function (next) {
  if (this._id === undefined || this._id === "") {
    this._id = uuid.v1();
  }
  next();
});

var Room =  mongoose.model('rooms', RoomsSchema);

module.exports = Room;