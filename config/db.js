var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

module.exports = function(app, config) {
  var db = mongoose.connect(config.db);
  // db.on('error', console.error.bind(console, 'connection error: '));
  // db.once('open', function callback(){
  //   console.log("YAY");
  // });

  // Setup database and UserSchema
  var UserSchema = new Schema({
    username: {type: String, index: {unique: true}},
    password: String
  });

  UserSchema.methods.validPassword = function(pwd){
    return ( this.password === pwd);
  };

  mongoose.model('User', UserSchema);

  return db;
};


// ({
//       name: String
//     });