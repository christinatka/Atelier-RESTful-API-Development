const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slogan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  default_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Products;