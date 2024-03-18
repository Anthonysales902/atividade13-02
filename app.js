// app.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do express-session para usar cookies
app.use(session({
    secret: 'mysecret', // Chave secreta para assinar o cookie de sessão
    resave: false,
    saveUninitialized: true,
}));

// Simulando um banco de dados em memória
let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Middleware para verificar a autenticação do usuário
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/');
    }
};

// Rota para a página de login
app.get('/', (req, res) => {
    res.render('login');
});

// Rota para processar o login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Autenticado com sucesso, armazenar o ID do usuário na sessão
        res.cookie('username', user.username);
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } else {
        res.send('Credenciais inválidas. Por favor, tente novamente.');
    }
});

// Rota para a página do painel
app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard');
});

// Rota para logout
app.get('/logout', (req, res) => {
    // Limpar a sessão e redirecionar para a página de login
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie('username');
            res.redirect('/');
        }
    });
});

// Rota para a página de registro
app.get('/register', (req, res) => {
    res.render('register');
});

// Rota para processar o registro
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Verificar se o usuário já existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        res.send('Usuário já existe. Por favor, escolha outro nome de usuário.');
    } else {
        // Criar um novo usuário e redirecionar para a página de login
        const newUser = {
            id: users.length + 1,
            username,
            password
        };
        users.push(newUser);
        res.redirect('/');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
