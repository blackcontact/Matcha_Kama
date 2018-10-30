var express = require('express');
var router = express.Router();
const tokenController = require('../controllers/tokenController');

// router.get('/users', function(req, res, next) {
//   // res.io.emit('socketToMe', 'users');
//   // res.send('Yoooo');
// });

router.post('/get_token', tokenController.getToken);
router.post('/register', tokenController.createAccount);
router.get('/confirm/:confirmcode', tokenController.confirmAccount);
router.post('/reset', tokenController.generateResetCode);
router.post('/reset/:resetcode', tokenController.resetPassword);
router.post('/get_token', tokenController.getToken);


module.exports = router;