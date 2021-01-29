const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');


const ProductStyles = sequelize.define('ProductStyles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sale_price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  original_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  default_style: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductStyles;