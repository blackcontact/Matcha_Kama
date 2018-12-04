var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profileController');
const tokenController = require('../controllers/tokenController');


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
router.put('/password', tokenController.changePassword);
router.put('/position', tokenController.updatePosition);
router.delete('/images/:image_id', profileController.imageDelete);
router.get('/tags', profileController.getMostUsedTags);
router.put('/tags', profileController.updateTags);
router.get('/notifications', profileController.getNotifications);
router.put('/readnotif', profileController.readNotif);
router.get('/readallnotifs', profileController.setNotifAsRead);
router.get('/blocked', profileController.getBlockedUsers);
router.get('/history', profileController.getHistoryVisits);
router.get('/nbnewnotifs', profileController.nbNewNotifs);
router.get('/nbnewmessages', profileController.nbNewMessages);

router.get('/visituser', profileController.getVisits);
router.get('/likeuser', profileController.getLikes);
router.get('/matchuser', profileController.getMatchs);
router.get('/unmatchuser', profileController.getUnmatch);
router.get('/getmatchedusers', profileController.getMatchedUsers);
router.get('/readallmessagesfrom/:id', profileController.setMessagesAsReadFrom);


module.exports = router;