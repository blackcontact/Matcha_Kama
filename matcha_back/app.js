var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');

var tokenRouter = require('./routes/tokenRouter');
var profileRouter = require('./routes/profileRouter');
var otherProfilesRouter = require('./routes/otherProfilesRouter');

var checkProfile = require('./helpers/checkProfile');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
  pingTimeout: 5000
});
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/Passport');

let connectedUsers = {};
require('./socket').io_init(io, connectedUsers);
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use('/', tokenRouter);
app.use('/profile', passport.authenticate('jwt', { session: false }), profileRouter);
app.use('/otherprofiles', passport.authenticate('jwt', { session: false }), checkProfile, otherProfilesRouter);
app.use('/whoisonline', (req, res) => {
  res.status(200).send({connectedUsers});
});

const fakeProfils = require('./helpers/fakeProfiles');
app.use('/generate', fakeProfils.generate100);

module.exports = {app, server};