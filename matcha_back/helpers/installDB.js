const CONFIG = require('../config/Config');

module.exports = function() {
  var callback = function(err,results){
    if (err){
      console.log("error is: ",err);
      return;
    }
    console.log("results is: ",results);
  }
  console.log('Start');
  var execsql = require('execsql');
  let dbConfig = {
    host: CONFIG.MYSQL_HOST,
    user: CONFIG.MYSQL_USER,
    password: CONFIG.MYSQL_PASSWORD 
  };
  let sqlFile = __dirname + '/db.sql';
  var sql = 'use Matcha;';
  console.log(sqlFile);
  execsql.config(dbConfig)
    .exec(sql)
    .execFile(sqlFile, function(err, results){
      console.log(results);
      callback(err, results);
    }).end();
  console.log('The End');
};
