const sequelize = require('../config/database'); 

module.exports = sequelize.define('User', {
  UserId: {
    type: NUMBER,
    allowNull: false
  },
  Name: {
    type: STRING
  }
}, {
  tableName: 'users'
});
