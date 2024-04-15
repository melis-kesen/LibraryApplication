const Sequelize = require('sequelize');

const sequelize = new Sequelize("Test", "postgres", "rabarba", {
    host: "localhost",
    dialect: "postgres",
  });

// sequelize nesnesini dışa aktar
module.exports = sequelize;
