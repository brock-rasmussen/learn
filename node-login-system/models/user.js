var mongoose = require('mongoose');
var bcrypt =  require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeloginsystem');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  profile: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.getUserByEmail = (email, callback) => {
  var query = { email: email };
  User.findOne(query, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    callback(null, isMatch);
  });
}

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
