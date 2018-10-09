var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');

var tokenRouter = require('./routes/tokenRouter');
var profileRouter = require('./routes/profileRouter');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/Passport');

app.use('/', tokenRouter);
app.use('/profile', passport.authenticate('jwt', { session: false }), profileRouter);

module.exports = app;