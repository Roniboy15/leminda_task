const { config } = require("../config/secret.js");
const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database
});

// Perform a simple query to test the connection
pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log(`Successfully connected to the mySQL database '${config.mysql_database}'`);
});

module.exports = pool.promise();
