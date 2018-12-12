const notificationModel = require('../models/notificationModel');
const profileModel = require('../models/profileModel');

module.exports = {
  async newVisit(user_id, other_user, io) {
    const notif = notificationModel.newOne(other_user, 'V', user_id);
    let user_info = await profileModel.getOne(user_id);
    user_info = user_info[0];
    const notif_id = (await notif).insertId;
    io.in(other_user).emit('notification', {
      type: 'V',
      user_from: user_id,
      user_info,
      notif_id
    });
  },
  async newLike(user_id, other_user, io) {
    const notif = notificationModel.newOne(other_user, 'L', user_id);
    let user_info = await profileModel.getOne(user_id);
    user_info = user_info[0];
    const notif_id = (await notif).insertId;
    io.in(other_user).emit('notification', {
      type: 'L',
      user_from: user_id,
      user_info,
      notif_id
    });
  },
  async newMatch(user_id, other_user, io) {
    let user_info = await profileModel.getOne(user_id);
    user_info = user_info[0];
    const notif = notificationModel.newOne(other_user, 'M', user_id);
    const notif_id = (await notif).insertId;
    io.in(other_user).emit('notification', {
      type: 'M',
      user_from: user_id,
      user_info,
      notif_id
    });
    console.log('Match');
  },
  async newUnmatch(user_id, other_user, io) {
    let user_info = await profileModel.getOne(user_id);
    user_info = user_info[0];
    const notif = notificationModel.newOne(other_user, 'U', user_id);
    const notif_id = (await notif).insertId;
    io.in(other_user).emit('notification', {
      type: 'U',
      user_from: user_id,
      user_info,
      notif_id
    });
    console.log('Unmatch');
  },
};

/*
SELECT
notifications.id,
notifications.from_id,
notifications.is_read,
users.username,
users.firstname,
users.lastname,
profiles.city,
profiles.avatar,
profiles.bio,
profiles.age

*/