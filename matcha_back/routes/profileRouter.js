var express = require('express');
var router = express.Router();
const profilController = require('../controllers/profilController');
const fakeProfils = require('../helpers/fakeProfils');

router.get('/', function(req, res) {
  res.send('This is profile route');
});


router.post('/fileupload', profilController.uploadMiddleware, profilController.uploadEnd);
router.get('/generate', fakeProfils.generate100);


module.exports = router;