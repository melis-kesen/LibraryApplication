const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
module.exports = sequelize.define('User', {
  UserId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'users'
});
