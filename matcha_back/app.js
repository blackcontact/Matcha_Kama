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
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/Passport');

app.use(function(req, res, next){
  res.io = io;
  next();
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