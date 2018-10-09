var pool = require('../helpers/dbConnect');

var Profil = {
  getOne: function(id) {
    return pool.query('SELECT users.id, users.firstname, users.lastname, profils.prout FROM users INNER JOIN profils ON profils.user_id=users.id WHERE profils.user_id = ?', [id]);
  },
  createOne: function(id) {
    return pool.query('SELECT users.id, users.firstname, users.lastname, profils.prout FROM users INNER JOIN profils ON profils.user_id=users.id WHERE profils.user_id = ?', [id]);
  }
};

module.exports = Profil;