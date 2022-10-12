const express = require('express');
const { findById } = require('./models/sales_products.model');

const app = express();
app.use(express.json());

const productsRoutes = require('./routes/productsRoutes');

app.get('/', (_request, response) => {
  response.send();
});

app.get('/sales/:id', async (req, res) => {
  const sale = await findById(req.params.id);
  return res.status(200).json(sale);
});

app.use('/products', productsRoutes);

module.exports = app;
