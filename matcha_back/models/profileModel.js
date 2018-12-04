var pool = require('../helpers/dbConnect');

var Profil = {
  getOne: function(id) {
    return pool.query('SELECT users.id, users.username, users.firstname, users.lastname, users.last_login, profiles.age, profiles.gender, profiles.sexual_orientation, profiles.bio, profiles.avatar, profiles.images, profiles.position, profiles.city, profiles.popularity FROM users INNER JOIN profiles ON profiles.user_id=users.id WHERE profiles.user_id = ?', [id]);
  },
  createOne: function(user_id, age, gender, sexual_orientation, bio, avatar, images, position, city) {
    return pool.query('INSERT INTO `profiles` (`user_id`, `age`, `gender`, `sexual_orientation`, `bio`, `avatar`, `images`, `position`, `city`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [user_id, age, gender, sexual_orientation, bio, avatar, images, position, city]);
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
  updatePosition: function(user_id, position, city) {
    return pool.query('UPDATE profiles SET position = ?, city = ? WHERE user_id = ?', [position, city,user_id]);
  },
  addPopularity: function(user_id, x) {
    return pool.query('UPDATE profiles SET popularity = popularity + ? WHERE user_id = ?', [x, user_id]);
  },
  removePopularity: function(user_id, x) {
    return pool.query('UPDATE profiles SET popularity = popularity - ? WHERE user_id = ?', [x, user_id]);
  },
  getPosition: function(user_id) {
    return pool.query('SELECT position FROM profiles WHERE user_id = ?', [user_id]);
  }
};

module.exports = Profil;