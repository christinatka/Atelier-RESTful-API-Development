const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: 'password',
  database: 'ProductOverview',
  define: {
    timestamps: false,
  },
  options: {
    logging: false,
    port: '3306',
    host: 'http://127.0.0.1',
    pool: {
      max: 10,
    },
  },
});

module.exports = sequelize;
