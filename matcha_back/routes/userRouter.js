var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');


router.get('/', function(req, res, next) {
  res.send('respond with a resources');
});

router.get('/getallusers', userController.getAllUsers);

router.get('/test', function (req, res, next) {
  res.send('PUTAIN OUI ' + req.user.username);
});


module.exports = router;