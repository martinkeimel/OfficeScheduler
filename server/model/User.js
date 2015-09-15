var mongoose = require('mongoose');
var uuid     = require('uuid');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: String,
  name: String,
  username: String,
  /*email: String,*/
  password: String
}).pre('save', function (next) {
  if (this._id === undefined || this._id === "") {
    this._id = uuid.v1();
  }
  next();
});

UserSchema.methods = {
  // generating a hash
  generateHash : function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  
  // checking if password is valid
  validPassword : function(password) {
    var currentUser = this;
    return bcrypt.compareSync(password, currentUser._doc.password);
  }

};

var User =  mongoose.model('users', UserSchema);


module.exports = User;