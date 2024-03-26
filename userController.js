// userController.js
const User = require('./User.js');

exports.login = (req, res) => {
    const { username, password } = req.body;
    User.findUserByUsername(username, function(err, user) {
        if (err) {
            // Tratar erro
            return res.send('Erro ao buscar usuário.');
        }
        if (user && user.password === password) {
            res.cookie('username', user.username);
            req.session.userId = user.id;
            res.redirect('/dashboard');
        } else {
            res.send('Credenciais inválidas. Por favor, tente novamente.');
        }
    });
};

exports.register = (req, res) => {
    const { username, password } = req.body;
    User.findUserByUsername(username, function(err, existingUser) {
        if (err) {
            // Tratar erro
            return res.send('Erro ao buscar usuário.');
        }
        if (existingUser) {
            res.send('Usuário já existe. Por favor, escolha outro nome de usuário.');
        } else {
            User.createUser(username, password, function(err, userId) {
                if (err) {
                    // Tratar erro
                    return res.send('Erro ao criar usuário.');
                }
                res.redirect('/');
            });
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie('username');
            res.redirect('/');
        }
    });
};
