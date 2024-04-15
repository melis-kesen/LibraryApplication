const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
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
