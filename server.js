var express     = require('express');
var uuid        = require('uuid');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var app         = express();
var http        = require('http').Server(app);

var server = app.listen(process.env.PORT || 3001, function () {
  console.log('listening on *:3001');
});

var io          = require('socket.io')(http).listen(server);
// Mongoose Schema definition
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

//open db connection
//mongoose.connect('mongodb://localhost:27017/RoomBooker');
mongoose.connect('mongodb://roombooker:roombooker123@dbh13.mongolab.com:27137/roombooker');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// Mongoose Model definition
var Room =  mongoose.model('rooms', RoomsSchema);
var Event = mongoose.model('Events', EventsSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/**********************************EVENTS***********************************************/

app.get('/api/events', function (req, res) {
  Event.find({}).populate('room').exec(function (err, myEvents) {
    if (err){
        res.send(400, err); 
        return console.error(err);
    }
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
        owner: e.owner,
        room: e.room
      }, {}, 
      function (err, event) {
        if (err) return res.send(400, err);
        Event.find({_id : req.body._id}).populate('room').exec(function (err, updatedEvent){
          if (err || updatedEvent.length == 0) return res.send(400, err);
          io.emit('updatedEvent', updatedEvent[0]);
          return res.send(200, "OK");
        });
    });
  }
  else
  {
    e.save(function (err, event) {
      if (err) return res.send(400, err);
      Event.find({_id : event._doc._id}).populate('room').exec(function (err, newEvent) {
        if (err || newEvent.length == 0){
            res.send(400, err); 
            return console.error(err);
        }
        io.emit('newEvent', newEvent[0]);
      });

      return res.send(200, "OK");
    });
  }
});

/**********************************ROOMS***********************************************/
app.get('/api/rooms', function (req, res) {
  Room.find({}, function (err, myRooms) {
    if (err){
        res.send(400, err); 
        return console.error(err);
    }
    res.json(myRooms);
  });
});

io.on('connection', function(socket){
  console.log('new connection');
});