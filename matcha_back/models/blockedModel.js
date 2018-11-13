var pool = require('../helpers/dbConnect');

var Blocked = {
  getAllBlocked: function(user_id) {
    return pool.query('SELECT user_blocked FROM `blocked` WHERE user_id = ?', [user_id]);
  },
  blockTest: function(user_id, user_blocked) {
    return pool.query('SELECT * FROM `blocked` WHERE user_id = ? AND user_blocked = ?', [user_id, user_blocked]);
  },
  newBlock: function(user_id, user_blocked) {
    return pool.query('INSERT INTO `blocked` (`user_id`, `user_blocked`) VALUES (?, ?)', [user_id, user_blocked]);
  },
  removeBlock: function(user_id, user_blocked) {
    return pool.query('DELETE FROM `blocked` WHERE user_id = ? AND user_blocked = ?', [user_id, user_blocked]);
  }
};

module.exports = Blocked;