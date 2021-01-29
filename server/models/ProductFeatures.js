const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Features = sequelize.define('ProductFeatures', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  feature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Features;