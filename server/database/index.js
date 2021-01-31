const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

//Products Table
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

// Features Table
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

// Related Table
const Related = sequelize.define('RelatedProducts', {
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

// Styles Table
const Styles = sequelize.define('ProductStyles', {
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

//Skus Table
const Skus = sequelize.define('ProductSkus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  style_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Photos Table
const Photos = sequelize.define('Photos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  style_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  thumbnail_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

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

module.exports = {
  Products,
  Features,
  Related,
  Styles,
  Skus,
  Photos,
};
