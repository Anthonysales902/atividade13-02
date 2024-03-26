// userController.js
const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findUserByUsername(username);
    if (user && user.password === password) {
        res.cookie('username', user.username);
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } else {
        res.send('Credenciais inválidas. Por favor, tente novamente.');
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findUserByUsername(username);
    if (existingUser) {
        res.send('Usuário já existe. Por favor, escolha outro nome de usuário.');
    } else {
        const userId = await User.createUser(username, password);
        res.redirect('/');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie('username');
            res.redirect('/');
        }
    });
};
