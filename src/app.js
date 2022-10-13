const express = require('express');

const app = express();
app.use(express.json());

const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);

app.use('/sales', salesRoutes);

module.exports = app;
