const { Sequelize } = require('sequelize');
const { mysqlPassword } = require('../config/db.config.js');

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: mysqlPassword,
  database: 'ProductOverview',
  define: {
    timestamps: false,
  },
  options: {
    host: 'localhost',
    port: '3306',
    pool: {
      max: 10,
    },
  },
});

module.exports = sequelize;
