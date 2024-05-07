const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize('helpsict', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;