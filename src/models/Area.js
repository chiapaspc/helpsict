const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Area = sequelize.define('areas', {
  // Define los campos de la tabla User
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  paranoid: true,
  deletedAt: 'deleted' // Cambia el nombre de la columna deletedAt
});



module.exports = Area;