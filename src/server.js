const express = require('express');

const auth = require('./routes/authRoutes');
const categoria = require('./routes/categoriaRoutes');
const authMid = require('./middlewares/auth');

const app = express();

app.use(express.json());

// Rotas públicas
app.use('/', auth);

app.use(authMid);

// Rotas privadas
app.use('/categorias', categoria);

module.exports = app;

