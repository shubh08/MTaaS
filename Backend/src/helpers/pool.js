var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: '',
    user: '',
    password: '',
    database: 'grubhub',
    debug: false,
    multipleStatements: true
});
var sql = "SELECT * FROM USERS";


// var pool = mysql.createConnection({
//     host: "grubhubdb.ciea7s8xmtar.us-west-1.rds.amazonaws.com",
//     user: "root",
//     password: "password",
//     database: 'grubhub'
//   });



module.exports = pool;