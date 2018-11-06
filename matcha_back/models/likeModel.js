var pool = require('../helpers/dbConnect');

var Like = {
  getAllMatchs: function(user_id) {
    return pool.query('SELECT user_id FROM `likes` WHERE liked_user = ? AND liked_user IN (SELECT user_id FROM `likes` WHERE user_id = ?)', [user_id, user_id]);
  },
  matchChecker: function(user_id, other_user) {
    return pool.query('SELECT user_id FROM `likes` WHERE liked_user = ? AND liked_user IN (SELECT user_id FROM `likes` WHERE user_id = ?) AND user_id = ?', [user_id, user_id, other_user]);
  },
  likeTest: function(user_id, other_user) {
    return pool.query('SELECT * FROM `likes` WHERE user_id = ? AND liked_user = ?', [user_id, other_user]);
  },
  newLike: function(user_id, other_user) {
    return pool.query('INSERT INTO `likes` (`user_id`, `liked_user`) VALUES (?, ?)', [user_id, other_user]);
  },
  removeLike: function(user_id, other_user) {
    return pool.query('DELETE FROM `likes` WHERE user_id = ? AND liked_user = ?', [user_id, other_user]);
  }
};

module.exports = Like;