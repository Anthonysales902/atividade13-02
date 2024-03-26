const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'nome_do_banco_de_dados'
});

const findUserByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

const createUser = async (username, password) => {
    const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    return result.insertId;
};

module.exports = { findUserByUsername, createUser };
