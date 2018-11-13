var pool = require('../helpers/dbConnect');

var Notification = {
  newOne: function(user_id, type, user_from) {
    return pool.query('INSERT INTO `notifications` (`user_id`, `content`, `from_id`) VALUES (?, ?, ?)', [user_id, type, user_from]);
  },
  setAsRead: function(user_id) {
    return pool.query('UPDATE `notifications` SET seen = 1 WHERE user_id = ?', [user_id]);
  },
  setOneAsRead: function(user_id, notif_id) {
    return pool.query('UPDATE `notifications` SET seen = 1 WHERE user_id = ? AND id = ?', [user_id, notif_id]);
  },
  get100: function(user_id) {
    return pool.query('SELECT * FROM `notifications` WHERE user_id = ? ORDER BY id DESC LIMIT 100', [user_id]);
  },
  get100Visits: function(user_id) {
    return pool.query('SELECT * FROM `notifications` WHERE from_id = ? AND content = "V" ORDER BY id DESC LIMIT 100', [user_id]);
  }
};

module.exports = Notification;