const notificationModel = require('../models/notificationModel');

module.exports = {
  async newVisit(user_id, other_user, io) {
    notificationModel.newOne(other_user, 'V', user_id);
    io.in(other_user).emit('notification', {
      type: 'V',
      user_from: user_id
    });
  },
  async newLike(user_id, other_user, io) {
    notificationModel.newOne(other_user, 'L', user_id);
    io.in(other_user).emit('notification', {
      type: 'L',
      user_from: user_id
    });
  },
  async newMatch(user_id, other_user, io) {
    notificationModel.newOne(other_user, 'M', user_id);
    io.in(other_user).emit('notification', {
      type: 'M',
      user_from: user_id
    });
  },
  async newUnmatch(user_id, other_user, io) {
    notificationModel.newOne(other_user, 'U', user_id);
    io.in(other_user).emit('notification', {
      type: 'U',
      user_from: user_id
    });
  },
};