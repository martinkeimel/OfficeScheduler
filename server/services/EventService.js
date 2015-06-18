var eventRepository = require('../repositories/EventRepository');
var io = null;          
var Event = require('../model/Event');

exports.configure = function (_io){
 io = _io;
};
exports.getEvents =  function (req, res) {
	eventRepository.getEvents(function (err, myEvents) {
    if (err){
        res.send(400, err); 
        return console.error(err);
    }
    res.json(myEvents);
  });
};

exports.updateEvent = function (req, res) {
  var e = new Event(req.body);
  if (e._id){
    eventRepository.updateEvent(e._id, e.title, e.start, e.end, e.owner, e.room, function (err, event) {
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
    eventRepository.addEvent(e, function (err, event) {
      if (err) return res.send(400, err);
      eventRepository.getEvent(event._doc._id, function (err, newEvent) {
        if (err || newEvent.length == 0){
            res.send(400, err); 
            return console.error(err);
        }
        io.emit('newEvent', newEvent[0]);
      });

      return res.send(200, "OK");
    });
  }
};
