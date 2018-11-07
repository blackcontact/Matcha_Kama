var pool = require('../helpers/dbConnect');

var Message = {
  //TODO: Cette fonction
  createNewMessage: function(user_id, other_id, message, timestamp) {
    return pool.query('INSERT INTO `messages` (`author`, `dest`, `message`, `timestamp`) VALUES (?, ?, ?, ?)', [user_id, other_id, message, timestamp]);
  }
};

exports = Message;
