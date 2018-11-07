var pool = require('../helpers/dbConnect');

var Tag = {
  getUserTags: function(user_id) {
    return pool.query('SELECT tags.title FROM tags INNER JOIN profiles_tags ON tags.id = profiles_tags.tag_id WHERE profiles_tags.user_id = ? ORDER BY tags.title ASC', [user_id]);
  },
  most100Popular: function() {
    return pool.query('SELECT tags.title, COUNT(tags.title) FROM tags INNER JOIN profiles_tags ON tags.id = profiles_tags.tag_id GROUP BY tags.title ORDER BY `COUNT(tags.title)` DESC, profiles_tags.tag_id ASC LIMIT 100');
  },
  removeTags: function(user_id, tags) {
    if (!Array.isArray(tags) || tags.length == 0)
      return false;
    let query = 'DELETE `profiles_tags` FROM `profiles_tags` INNER JOIN tags ON profiles_tags.tag_id = tags.id WHERE user_id = ? AND tags.title IN (';
    for (let i = 1; i < tags.length; i++) {
      query += '?, ';
    }
    query += '?)';
    const arg = tags.slice();
    arg.unshift(user_id);
    // console.log('RemoveTag - Query: [' + query + '] - Args: [' + arg + ']');
    return pool.query(query, arg);
  },
  addTags: function (user_id, tags) {
    if (!Array.isArray(tags) || tags.length == 0)
      return false;
    let query = 'INSERT INTO `profiles_tags` (`user_id`, `tag_id`) VALUES ';
    let arg = Array();
    let i;
    for (i = 0; i < tags.length - 1; i++) {
      query += '(?, (SELECT tags.id FROM tags WHERE tags.title = ?)), ';
      arg.push(user_id);
      arg.push(tags[i]);
    }
    query += '(?, (SELECT tags.id FROM tags WHERE tags.title = ?))';
    arg.push(user_id);
    arg.push(tags[i]);
    // console.log('AddTag - Query: [' + query + '] - Args: [' + arg + ']');
    return pool.query(query, arg);
  },
  createTags: async function (tags) {
    if (!Array.isArray(tags) || tags.length == 0)
      return false;
    let query = 'SELECT i FROM ( SELECT ';
    let i = 0;
    query += '? AS i';
    for (i = 1; i < tags.length; i++) {
      query += ' UNION SELECT ?';
    }
    query += ') AS mylistofids LEFT JOIN tags ON tags.title = i WHERE tags.title IS NULL';
    //console.log('CreateTag - Query: [' + query + '] - Args: [' + tags + ']');
    const rawToCreate = await pool.query(query, tags);
    if (rawToCreate.length == 0)
      return true;
    let toCreate = Array();
    query = 'INSERT INTO tags (`title`) VALUES ';
    for (i = 0; i < rawToCreate.length; i++) {
      query += '(?)';
      toCreate.push(rawToCreate[i].i);
      if (i != rawToCreate.length - 1)
        query += ', ';
    }
    // console.log('CreateTags - Query: [' + query + '] - Args: [' + toCreate + ']');
    return pool.query(query, toCreate);
  },
  count: async function() {
    return pool.query('SELECT COUNT(*) AS total FROM `tags` WHERE 1');
  },
  manualAddTags: async function (user_id, tags) {
    let query = 'INSERT INTO `profiles_tags` (`user_id`, `tag_id`) VALUES ';
    let arg = [];
    let i;
    for (i = 0; i < tags.length - 1; i++) {
      query += '(?, ?), ';
      arg.push(user_id);
      arg.push(tags[i]);
    }
    query += '(?, ?)';
    arg.push(user_id);
    arg.push(tags[i]);
    // console.log('manualAddTags - Query: [' + query + '] - Args: [' + arg + ']');
    return pool.query(query, arg);
  }
};

module.exports = Tag;