var pool = require('../helpers/dbConnect');

var Profil = {
  getOne: function(id) {
    return pool.query('SELECT users.id, users.firstname, users.lastname, profils.prout FROM users INNER JOIN profils ON profils.user_id=users.id WHERE profils.user_id = ?', [id]);
  },
  createOne: function(user_id, age, gender, sexual_orientation, bio, images) {
    return pool.query('INSERT INTO `profiles` (`user_id`, `age`, `gender`, `sexual_orientation`, `bio`, `images`) VALUES (?, ?, ?, ?, ?, ?);', [user_id, age, gender, sexual_orientation, bio, images]);
  },
  updateAge: function(user_id, age) {
    return pool.query('UPDATE profiles SET age = ? WHERE user_id = ?', [user_id, age]);
  },
  updateGender: function(user_id, gender) {
    return pool.query('UPDATE profiles SET gender = ? WHERE user_id = ?', [user_id, gender]);
  },
  updateSexualOrientation: function(user_id, sexual_orientation) {
    return pool.query('UPDATE profiles SET sexual_orientation = ? WHERE user_id = ?', [user_id, sexual_orientation]);
  },
  updateBio: function(user_id, bio) {
    return pool.query('UPDATE profiles SET bio = ? WHERE user_id = ?', [user_id, bio]);
  },
  updateImages: function(user_id, images) {
    return pool.query('UPDATE profiles SET images = ? WHERE user_id = ?', [user_id, images]);
  }
};

module.exports = Profil;

/*
SELECT profiles.user_id, profiles.age, profiles.gender, sexual_orientation.attractd_gender_id as attract FROM profiles RIGHT JOIN sexual_orientation ON profiles.user_id = sexual_orientation.user_id ORDER BY `profiles`.`user_id` ASC
*/