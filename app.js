// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./userController');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
}));

// Rotas
app.get('/', (req, res) => res.render('login'));
app.post('/login', userController.login);
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/logout', userController.logout);
app.get('/register', (req, res) => res.render('register'));
app.post('/register', userController.register);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
