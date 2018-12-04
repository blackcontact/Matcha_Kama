var pool = require('../helpers/dbConnect');

var Notification = {
  newOne: function(user_id, type, user_from) {
    return pool.query('INSERT INTO `notifications` (`user_id`, `content`, `from_id`) VALUES (?, ?, ?)', [user_id, type, user_from]);
  },
  setAsRead: function(user_id) {
    return pool.query('UPDATE `notifications` SET is_read = 1 WHERE user_id = ?', [user_id]);
  },
  setOneAsRead: function(user_id, notif_id) {
    return pool.query('UPDATE `notifications` SET is_read = 1 WHERE user_id = ? AND id = ?', [user_id, notif_id]);
  },
  get100: function(user_id) {
    return pool.query('SELECT * FROM `notifications` WHERE user_id = ? ORDER BY id DESC LIMIT 100', [user_id]);
  },
  get100Visits: function(user_id) {
    return pool.query('SELECT notifications.id, notifications.user_id, users.username, users.firstname, users.lastname, profiles.city, profiles.avatar, profiles.bio, profiles.age FROM `notifications` INNER JOIN users ON notifications.user_id = users.id INNER JOIN profiles ON notifications.user_id = profiles.user_id WHERE from_id = ? AND content = "V" ORDER BY id DESC LIMIT 100', [user_id]);
  },
  get100Notifs: function(user_id, type) {
    return pool.query('SELECT notifications.id, notifications.from_id, notifications.is_read, users.username, users.firstname, users.lastname, profiles.city, profiles.avatar, profiles.bio, profiles.age FROM `notifications` INNER JOIN users ON notifications.from_id = users.id INNER JOIN profiles ON notifications.from_id = profiles.user_id WHERE notifications.user_id = ? AND content = ? ORDER BY id DESC LIMIT 100', [user_id, type]);
  },
  getNbUnreadNotifs: function(user_id) {
    return pool.query('SELECT COUNT(*) FROM notifications WHERE user_id = ? AND is_read = 0', [user_id]);
  },
  getNbNewMessages: function(user_id) {
    return pool.query('SELECT COUNT(*) FROM messages WHERE dest = ? AND is_read = 0', [user_id]);
  }
};

module.exports = Notification;