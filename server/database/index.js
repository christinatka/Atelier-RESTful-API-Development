const { Sequelize, DataTypes } = require('sequelize');
const {
  createFeatures,
  createPhotos,
  createRelated,
  createSkus,
  createStyles,
} = require('../models/models.js');
const createProducts = require('../models/Products.js');
const { mysqlPassword } = require('../config/db.config.js');

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: mysqlPassword,
  database: 'ProductOverview',
  options: {
    host: 'localhost',
    port: '3306',
    pool: {
      max: 10,
    },
  },
});

//Products Table
const Products = createProducts(sequelize);

// Features Table
const Features = createFeatures(sequelize);

// Related Table
const Related = createRelated(sequelize);

// Styles Table
const Styles = createStyles(sequelize);

//Skus Table
const Skus = createSkus(sequelize);

// Photos Table
const Photos = createPhotos(sequelize);

// Associations
Products.hasMany(Features, {
  foreignKey: 'product_id',
});
Features.belongsTo(Products);

Products.hasMany(Related, {
  foreignKey: 'current_product_id',
});
Related.belongsTo(Products);

Products.hasMany(Styles, {
  foreignKey: 'product_id',
});
Styles.belongsTo(Products);

Styles.hasMany(Skus, {
  foreignKey: 'style_id',
});
Skus.belongsTo(Styles);

Styles.hasMany(Photos, {
  foreignKey: 'style_id',
});
Photos.belongsTo(Styles);

Products.sync();
Features.sync();
Related.sync();
Styles.sync();
Skus.sync();
Photos.sync();

module.exports = {
  Products,
  Features,
  Related,
  Styles,
  Skus,
  Photos,
};
