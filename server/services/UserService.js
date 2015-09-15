var userRepository = require('../repositories/UserRepository');
var User = require('../model/User');

exports.addUser = function (req, res) {
  var newUser = new User(req.body);
  newUser.password = newUser.generateHash(newUser.password);
  userRepository.getUserByUserName(newUser.username, function (err, existingUser) {
    if (existingUser){
      res.send(400, "Username is already in use");
    }
    else {
      userRepository.addUser(newUser, function (err, user) {
          if (err) return res.send(400, err);
          userRepository.addUser(user, function (err) {
            if (err){
                res.send(400, err); 
                return console.error(err);
            }
          });
    
          return res.send(200, "OK");
        });
    }
  });
};

exports.getUserByUserName = function(username, callback){
  userRepository.getUserByUserName(username, callback);
};
