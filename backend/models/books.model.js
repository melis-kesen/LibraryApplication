const { DataTypes } = require('sequelize');

module.exports = sequelize.define('Book', {
  BookId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'books'
});