var express = require('express');
var router = express.Router();
const tokenController = require('../controllers/tokenController');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is Matcha API' });
});

router.post('/get_token', tokenController.getToken);
router.post('/register', tokenController.createAccount);

module.exports = router;