var pool = require('../helpers/dbConnect');

var Search = {
  search: function(user_id, sexor, gender, age_min, age_max, pop_min, pop_max) {
    let query = `SELECT users.id, users.username, users.firstname, users.lastname,
    profiles.age, profiles.gender, profiles.sexual_orientation, profiles.bio, profiles.avatar, profiles.position, profiles.city, profiles.popularity,
    (SELECT GROUP_CONCAT(tags.title) FROM tags INNER JOIN profiles_tags ON tags.id = profiles_tags.tag_id WHERE profiles_tags.user_id = users.id ORDER BY tags.title ASC) as tags
    FROM users
    INNER JOIN profiles ON profiles.user_id=users.id
    WHERE
    profiles.age IS NOT NULL AND
    profiles.gender IS NOT NULL AND
    profiles.bio IS NOT NULL AND
    profiles.avatar IS NOT NULL AND
    profiles.position IS NOT NULL AND
    profiles.popularity IS NOT NULL AND
    profiles.age >= ? AND
    profiles.age <= ? AND
    profiles.popularity >= ? AND
    profiles.popularity <= ? AND
    users.id != ?`;

    const otherGender = gender === 'M' ? 'F' : 'M';
    if (sexor === 'E') {
      query += ' AND (profiles.sexual_orientation != \'O\') AND profiles.gender = \'' + otherGender + '\'';
    } else if (sexor === 'B') {
      query += ` AND ((profiles.gender = "${gender}" AND profiles.sexual_orientation = "O" OR profiles.sexual_orientation = "B") OR (profiles.gender = "${otherGender}" AND profiles.sexual_orientation = "E" OR profiles.sexual_orientation = "B"))`;
      // query += ' AND ((profiles.gender = \'' + gender + '\' AND profiles.sexual_orientation = \'B\') OR profiles.sexual_orientation = \'O\')';
    } else {
      query += ` AND (profiles.gender = "${gender}" AND profiles.sexual_orientation = "O" OR profiles.sexual_orientation = "B")`;
    }
    return pool.query(query, [age_min, age_max, pop_min, pop_max, user_id]);
  },
  getMine: function(user_id) {
    return pool.query('SELECT users.id, users.username, users.firstname, users.lastname, users.last_login, profiles.age, profiles.gender, profiles.sexual_orientation, profiles.bio, profiles.avatar, profiles.images, profiles.position, profiles.city, profiles.popularity, (SELECT GROUP_CONCAT(tags.title) FROM tags INNER JOIN profiles_tags ON tags.id = profiles_tags.tag_id WHERE profiles_tags.user_id = users.id ORDER BY tags.title ASC) as tags FROM users INNER JOIN profiles ON profiles.user_id=users.id WHERE profiles.user_id = ?', [user_id]);
  }
};

module.exports = Search;