const express = require('express');

const app = express();

const productsRoutes = require('./routes/productsRoutes');

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);

module.exports = app;
