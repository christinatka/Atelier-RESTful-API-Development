const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const RelatedProducts = sequelize.define('RelatedProducts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  current_product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  related_product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = RelatedProducts;