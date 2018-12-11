var pool = require('../helpers/dbConnect');

var Reported = {
  reportTest: function(user_id, user_reported) {
    return pool.query('SELECT * FROM `reported` WHERE user_id = ? AND user_reported = ?', [user_id, user_reported]);
  },
  newReport: function(user_id, user_reported) {
    return pool.query('INSERT INTO `reported` (`user_id`, `user_reported`) VALUES (?, ?)', [user_id, user_reported]);
  },
  removeReport: function(user_id, user_reported) {
    return pool.query('DELETE FROM `reported` WHERE user_id = ? AND user_reported = ?', [user_id, user_reported]);
  },
  getReported: function() {
    return pool.query('SELECT * FROM `reported`');
  }
};

module.exports = Reported;