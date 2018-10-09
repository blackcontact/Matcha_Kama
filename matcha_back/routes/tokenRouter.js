var express = require('express');
var router = express.Router();
const tokenController = require('../controllers/tokenController');

router.get('/', function(req, res) {
  res.render('index', { title: 'This is Matcha API' });
});

router.post('/get_token', tokenController.getToken);
router.post('/register', tokenController.createAccount);
router.get('/confirm/:confirmcode', tokenController.confirmAccount);
router.post('/reset', tokenController.generateResetCode);
router.post('/reset/:resetcode', tokenController.resetPassword);


module.exports = router;