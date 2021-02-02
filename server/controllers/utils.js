const sequelize = require('sequelize');
const Products = require('../models/Products.js')(sequelize);

const getProducts = () => Products.findAll();

module.exports = {
  getProducts,
};
