const { DataTypes } = require('sequelize');

const Book = sequelize.define('Book', {
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