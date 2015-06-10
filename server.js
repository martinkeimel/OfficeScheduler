/*var express = require('express');
var app = express();
var http = require('http').Server(express);
var mongoose = require('mongoose');*/
var express = require('express');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

// Mongoose Schema definition
var Schema = mongoose.Schema;
var EventsSchema = new Schema({
  _id: String,
  title: String,
  start: String,
  end: String,
  owner: String
}).pre('save', function (next) {
  if (this._id === undefined || this._id === "") {
    this._id = uuid.v1();
  }
  next();
});

//open db connection
mongoose.connect('mongodb://localhost:27017/RoomBooker');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// Mongoose Model definition
var Event = mongoose.model('Events', EventsSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/events', function (req, res) {
  Event.find({}, function (err, myEvents) {
    if (err) return console.error(err);
    res.json(myEvents);
  });
});

app.post('/api/events/update', function (req, res) {
  var e = new Event(req.body);
  if (e._id){
    Event.update(
      {_id : e._id}, 
      {
        title: e.title,
        start: e.start,
        end: e.end,
        owner: e.owner
      }, {}, 
      function (err, event) {
        if (err) return res.send(400, err);
        return res.send(200, "OK");
    });
  }
  else
  {
    e.save(function (err, event) {
      if (err) return res.send(400, err);
      return res.send(200, "OK");
    });
  }
});

app.listen(process.env.PORT || 3001, function () {
  console.log('listening on *:3001');
});