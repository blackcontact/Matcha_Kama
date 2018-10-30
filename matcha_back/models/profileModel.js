var pool = require('../helpers/dbConnect');

var Profil = {
  getOne: function(id) {
    return pool.query('SELECT users.id, users.firstname, users.lastname, profiles.age, profiles.gender, profiles.sexual_orientation, profiles.bio, profiles.avatar, profiles.images FROM users INNER JOIN profiles ON profiles.user_id=users.id WHERE profiles.user_id = ?', [id]);
  },
  createOne: function(user_id, age, gender, sexual_orientation, bio, images) {
    return pool.query('INSERT INTO `profiles` (`user_id`, `age`, `gender`, `sexual_orientation`, `bio`, `avatar`, `images`) VALUES (?, ?, ?, ?, ?, ?);', [user_id, age, gender, sexual_orientation, bio, images]);
  },
  createOneEmpty: function(user_id) {
    return pool.query('INSERT INTO `profiles` (`user_id`, `images`) VALUES (?, ?);', [user_id, '[]']);
  },
  updateAge: function(user_id, age) {
    return pool.query('UPDATE profiles SET age = ? WHERE user_id = ?', [age, user_id]);
  },
  updateGender: function(user_id, gender) {
    return pool.query('UPDATE profiles SET gender = ? WHERE user_id = ?', [gender, user_id]);
  },
  updateSexualOrientation: function(user_id, sexual_orientation) {
    return pool.query('UPDATE profiles SET sexual_orientation = ? WHERE user_id = ?', [sexual_orientation, user_id]);
  },
  updateBio: function(user_id, bio) {
    return pool.query('UPDATE profiles SET bio = ? WHERE user_id = ?', [bio, user_id]);
  },
  updateAvatar: function(user_id, avatar) {
    return pool.query('UPDATE profiles SET avatar = ? WHERE user_id = ?', [avatar, user_id]);
  },
  updateImages: function(user_id, images) {
    return pool.query('UPDATE profiles SET images = ? WHERE user_id = ?', [images, user_id]);
  },
  getAvatar: function(user_id) {
    return pool.query('SELECT avatar FROM profiles WHERE user_id = ?', [user_id]);
  },
  getImages: function(user_id) {
    return pool.query('SELECT images FROM profiles WHERE user_id = ?', [user_id]);
  },
  updatePosition: function(user_id, position) {
    return pool.query('UPDATE profiles SET position = ? WHERE user_id = ?', [position, user_id]);
  }
};

module.exports = Profil;