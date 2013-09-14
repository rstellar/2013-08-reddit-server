var mongoose        = require('mongoose'),
    User            = mongoose.model('User'),
    LocalStrategy   = require('passport-local').Strategy;

module.exports = function(app, config) {
  var passport = app.get('passport');
  // Implement the passport local strategy
  passport.use(new LocalStrategy(
    function(username,password,done){
      User.findOne({ username: username }, function(err,user){
        if(err) {return done(err); }
        if (!user) {
          return done(null, false, {message: 'Incorrect Username.'});
        }
        if(!user.validPassword(password)){
          return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
      });
      return done(null, users[username]);
    })
  );

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
};