var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')

var indexRouter = require('./routes/indexRouter');
var userRouter = require('./routes/userRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/Passport');

app.use('/', indexRouter);

app.use('/users', passport.authenticate('jwt', { session: false }), userRouter);

module.exports = app;