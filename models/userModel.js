var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var eat = require('eat');
var Tab = require(__dirname + '/tabModel')

var userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  dateCreated: Date,
  banned: {type: Boolean, default: false},
  tabs: [{type: Schema.Types.ObjectId, ref: 'Tab'}],
  auth: {
    basic: {
      username: String,
      password: String
    }
  }
});

userSchema.methods.hashPassword = function(password) {
  var hash = this.auth.basic.password = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.auth.basic.password, function(err, match) {
    if(err) callback(err);
    callback(null, match);
  });
};

userSchema.methods.generateToken = function(callback) {
  var id = this._id;
  eat.encode({id: id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', userSchema);
