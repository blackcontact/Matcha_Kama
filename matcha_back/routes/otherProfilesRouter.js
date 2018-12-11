var express = require('express');
var router = express.Router();
const otherProfilesController = require('../controllers/otherProfilesController');

router.get('/:id', otherProfilesController.getProfile);
router.put('/like/:id', otherProfilesController.toggleLike);
router.put('/block/:id', otherProfilesController.toggleBlock);
router.get('/message/:id', otherProfilesController.getMessages);
router.get('/report/:id', otherProfilesController.toggleReport);


module.exports = router;