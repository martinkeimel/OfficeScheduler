var roomRepository = require('../repositories/RoomRepository');

exports.getRooms =  function (req, res) {
	roomRepository.getRooms(function (err, rooms) {
    if (err){
        res.send(400, err); 
        return console.error(err);
    }
    res.json(rooms);
  });
};