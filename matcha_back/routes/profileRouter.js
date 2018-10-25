var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profileController');
const tokenController = require('../controllers/tokenController');
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
router.put('/image', profileController.imageUpload, profileController.imageEnd);
router.put('/email', tokenController.changeEmail);
router.put('/email/:confirm_code', tokenController.changeEmailConfirm);
router.delete('/images/:image_id', profileController.imageDelete);



module.exports = router;