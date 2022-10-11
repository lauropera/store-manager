const express = require('express');

const app = express();
app.use(express.json());

const productsRoutes = require('./routes/productsRoutes');

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);

module.exports = app;
