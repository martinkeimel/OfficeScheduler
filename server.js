var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
var http         = require('http').Server(app);
var passport     = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session      = require('express-session');

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

//===========================PASSPORT===============================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
    function(username, password, done) {
        if (username === "admin" && password === "admin") // stupid example
            return done(null, {name: "admin"});

        return done(null, false, { message: 'Incorrect username.' });
    }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// required for passport
app.use(session({ secret: 'roombookersessionsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/**********************************EVENTS***********************************************/

app.get('/api/events', auth, eventService.getEvents);

app.post('/api/events/update', auth, eventService.updateEvent);

app.post('/api/events/add', auth, eventService.addEvent);

/**********************************ROOMS***********************************************/
app.get('/api/rooms', auth, roomService.getRooms);

io.on('connection', function(socket){
  console.log('new connection');
});


/**********************************AUTH***********************************************/
app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});

app.get('/loggedin', function(req, res) { 
    res.send(req.isAuthenticated() ? req.user : '0'); 
}); 

app.post('/logout', function(req, res){ 
    req.logOut(); 
    res.send(200); 
}); 