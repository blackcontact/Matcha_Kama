const notificationModel = require('../models/notificationModel');
const profileModel = require('../models/profileModel');

module.exports = {
  async newMessage(user_id, other_user, io) {
    const profile = await profileModel.getOne(other_user);
    const content = 'You have a new message from ' + profile[0].firstname + ' ' + profile[0].lastname;
    notificationModel.newOne(other_user, content);
    io.in(other_user).emit('notification', {
      content
    });
  },
  async newVisit(user_id, other_user, io) {
    const profile = await profileModel.getOne(other_user);
    const content = 'You have a new visit from ' + profile[0].firstname + ' ' + profile[0].lastname;
    notificationModel.newOne(other_user, content);
    io.in(other_user).emit('notification', {
      content
    });
  },
  async newLike(user_id, other_user, io) {
    const profile = await profileModel.getOne(other_user);
    const content = 'You have a new like from ' + profile[0].firstname + ' ' + profile[0].lastname;
    notificationModel.newOne(other_user, content);
    io.in(other_user).emit('notification', {
      content
    });
  },
  async newMatch(user_id, other_user, io) {
    const profile = await profileModel.getOne(other_user);
    const content = 'Yeah! You and ' + profile[0].firstname + ' ' + profile[0].lastname + ' just matched!';
    notificationModel.newOne(other_user, content);
    io.in(other_user).emit('notification', {
      content
    });
  },
  async newUnmatch(user_id, other_user, io) {
    const profile = await profileModel.getOne(other_user);
    const content = 'Oh no! You and ' + profile[0].firstname + ' ' + profile[0].lastname + ' just unmatched...';
    notificationModel.newOne(other_user, content);
    io.in(other_user).emit('notification', {
      content
    });
  },
};