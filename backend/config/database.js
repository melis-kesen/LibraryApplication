const Sequelize = require('sequelize');

const sequelize = new Sequelize("Test", "postgres", "rabarba", {
    host: "localhost",
    dialect: "postgres",
  });

module.exports = sequelize;
