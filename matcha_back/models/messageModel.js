var pool = require('../helpers/dbConnect');

var Message = {
  //TODO: Cette fonction
  createNewMessage: function(user_id, other_id, message) {
    return pool.query('INSERT INTO `messages` (`author`, `dest`, `message`) VALUES (?, ?, ?)', [user_id, other_id, message]);
  },
  getAllMessages: function(user_id, other_id) {
    return pool.query('SELECT * FROM `messages` WHERE (author = ? AND dest = ?) OR (author = ? AND dest = ?)', [user_id, other_id, other_id, user_id]);
  },
  setAllAsRead: function(user_id, other_id) {
    return pool.query('UPDATE `messages` SET is_read = 1 WHERE (author = ? AND dest = ?)', [other_id, user_id]);
  },
  setMessagesAsReadFrom: function(user_id, other_id) {
    return pool.query('UPDATE `messages` SET is_read = 1 WHERE (author = ? AND dest = ?)', [other_id, user_id]);
  }
};

module.exports = Message;
