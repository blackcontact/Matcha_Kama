var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');

var tokenRouter = require('./routes/tokenRouter');
var profileRouter = require('./routes/profileRouter');

var checkProfile = require('./helpers/checkProfile');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var jwtAuth = require('socketio-jwt-auth');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/Passport');
const CONFIG = require('./config/Config');
var userModel = require('./models/userModel');

app.use(function(req, res, next){
  res.io = io;
  next();
});

io.use(jwtAuth.authenticate({
  secret: CONFIG.API_SECRET_JWT_KEY,
  algorithm: 'HS256'
}, async function(payload, done) {
  try {
    const id = payload.id;
    const rawUser = await userModel.getOneById({id});
    if (!rawUser[0])
      return done(null, false, 'user does not exist');
    const username = rawUser[0].username;
    return done(null, {username});
  } catch (err) {
    return done(err);
  }
}));

io.on('connection', function(socket) {
  console.log('Authentication passed!');
  // now you can access user info through socket.request.user
  // socket.request.user.logged_in will be set to true if the user was authenticated
  socket.emit('success', {
    message: 'success logged in!',
    user: socket.request.user
  });
});


app.use('/', tokenRouter);
app.use('/profile', passport.authenticate('jwt', { session: false }), profileRouter);


//TODO: Gestion des tags
//TODO: Geolocalisation
// Pas posibilité de recuperer l'addresse IP depuis le container.. Vue envoie son addresse IP?
// https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only
// https://ipstack.com/
//app.enable('trust_proxy');

//TODO: Remove that ffs
// app.use('/test2', passport.authenticate('jwt', { session: false }), checkProfile, function(req, res) {
//   res.send(req.connection.remoteAddress);
// });

module.exports = {app, server};