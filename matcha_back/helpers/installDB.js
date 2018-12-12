const CONFIG = require('../config/Config');

module.exports = function(req, res) {
  console.log('Start');
  var execSQL = require('exec-sql');

  execSQL.connect({
    database: CONFIG.MYSQL_DATABASE,
    host: CONFIG.MYSQL_HOST,
    user: CONFIG.MYSQL_USER,
    password: CONFIG.MYSQL_PASSWORD 
  });
  execSQL.executeFile(__dirname + '/Matcha.sql', function(err) {
    execSQL.disconnect();
    console.log('Done!');
    res.send('Done!');
  });
};
