var mysql = require('promise-mysql');
const CONFIG = require('../config/Config');

var pool = mysql.createPool({
    host: CONFIG.MYSQL_HOST,
    user: CONFIG.MYSQL_USER,
    password: CONFIG.MYSQL_PASSWORD,
    database: CONFIG.MYSQL_DATABASE
});

module.exports = pool;