var mongoose = require('mongoose');
var uuid     = require('uuid');

var Schema = mongoose.Schema;

var EventsSchema = new Schema({
  _id: String,
  title: String,
  start: String,
  end: String,
  owner: String,
  room : { type: String, ref: 'rooms' }
  }).pre('save', function (next) {
  if (this._id === undefined || this._id === "") {
    this._id = uuid.v1();
  }
  next();
});

var Event = mongoose.model('Events', EventsSchema);

module.exports = Event;