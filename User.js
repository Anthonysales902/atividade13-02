const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
});

const findUserByUsername = (username, callback) => {
    pool.query('SELECT * FROM users WHERE username = ?', [username], function(err, results) {
        callback(err, results[0]);
    });
};

const createUser = (username, password, callback) => {
    pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err, results) {
        callback(err, results.insertId);
    });
};

module.exports = { findUserByUsername, createUser }
