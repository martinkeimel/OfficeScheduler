var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
var http         = require('http').Server(app);

var server = app.listen(process.env.PORT || 3001, function () {
  console.log('listening on *:3001');
});
var io          = require('socket.io')(http).listen(server);

var eventService = require('./server/services/EventService');
eventService.configure(io);
var roomService = require('./server/services/RoomService');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/**********************************EVENTS***********************************************/

app.get('/api/events', eventService.getEvents);

app.post('/api/events/update', eventService.updateEvent);

/**********************************ROOMS***********************************************/
app.get('/api/rooms', roomService.getRooms);

io.on('connection', function(socket){
  console.log('new connection');
});