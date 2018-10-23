var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profileController');
const fakeProfils = require('../helpers/fakeProfiles');


// TODO: Corriger cette fonction
router.get('/generate', fakeProfils.generate100);

router.get('/', profileController.getProfile);
router.put('/age', profileController.editAge);
router.put('/gender', profileController.editGender);
router.put('/sexual_orientation', profileController.editSexualOrientation);
router.put('/bio', profileController.editBio);
router.put('/avatar', profileController.avatarUpload, profileController.avatarEnd);
router.put('/firstname', profileController.editFirstName);
router.put('/lastname', profileController.editLastName);
router.put('/images', profileController.imageUpload, profileController.imageEnd);
router.delete('/images/:image_id', profileController.imageDelete);



module.exports = router;