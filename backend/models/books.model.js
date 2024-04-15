const sequelize = require('../config/database'); 

module.exports = sequelize.define('Book', {
  BookId: {
    type: NUMBER,
    allowNull: false
  },
  Name: {
    type: STRING
  }
}, {
  tableName: 'books'
});