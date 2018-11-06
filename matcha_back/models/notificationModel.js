var pool = require('../helpers/dbConnect');

var Notification = {
  newOne: function(user_id, content) {
    return pool.query('INSERT INTO `notifications` (`user_id`, `content`) VALUES (?, ?)', [user_id, content]);
  },
  setAsRead: function(user_id) {
    return pool.query('UPDATE `notifications` SET is_read = 1 WHERE user_id = ?', [user_id]);
  }
};

module.exports = Notification;