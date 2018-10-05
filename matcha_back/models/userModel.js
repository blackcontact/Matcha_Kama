var pool = require('../helpers/dbConnect');

var User = {
    getAllUsers: function() {
        return pool.query('SELECT * FROM users');
    },
    getOneByUsername: function({username}) {
        return pool.query('SELECT * from users WHERE username = ?', [username]);
    },
    getOneById: function({id}) {
        return pool.query('SELECT * from users WHERE id = ?', [id]);
    },
    getOneByEmail: function({email}) {
        return pool.query('SELECT * from users WHERE email = ?', [email]);
    }
}

module.exports = User;