const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Area = require('./Area'); 


const User = sequelize.define('users', {
  // Define los campos de la tabla User
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('client', 'system'),
    allowNull: true
  },
  // Otros campos...
});

User.belongsTo(Area, { foreignKey: 'id_area', as: 'area' });

module.exports = User;