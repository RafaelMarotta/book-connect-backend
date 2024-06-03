const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql-1511e230-rafaelmarottag-f210.e.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_bJK0fy-oJd2YwPIChED',
  database: 'sebo_db',
  port: 28795
});

module.exports = pool.promise();
