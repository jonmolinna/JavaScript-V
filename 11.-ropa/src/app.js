const express = require('express');
const cors = require('cors');
const app = express();

// Importando Rutas
const ropa = require('./rutas');

// Settings
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/ropa', ropa);

module.exports = app;