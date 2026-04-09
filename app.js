const express = require('express');
const app = express();

app.use(express.json());

//Rotas
const userRoutes = require('./routes/corredor');
const corredorRoutes = require('./routes/corredor');
app.use('/users', userRoutes);
app.use('/corredores', corredorRoutes);

module.exports = app;  