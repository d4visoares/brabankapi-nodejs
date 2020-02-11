const express = require('express');

const auth = require('./routes/authRoutes');
const categoria = require('./routes/categoriaRoutes');

const app = express();

app.use(express.json());

app.use('/', auth);
app.use('categorias', categoria);

module.exports = app;

