const { DataTypes } = require('sequelize');

//Products Table
const createProducts = (sequelize) => sequelize.define('Products', {
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
const createFeatures = (sequelize) => sequelize.define('ProductFeatures', {
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
const createRelated = (sequelize) => sequelize.define('RelatedProducts', {
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
const createStyles = (sequelize) => sequelize.define('ProductStyles', {
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
const createSkus = (sequelize) => sequelize.define('ProductSkus', {
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
const createPhotos = (sequelize) => sequelize.define('Photos', {
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



module.exports = {
  createProducts,
  createFeatures,
  createRelated,
  createStyles,
  createSkus,
  createPhotos,
};
