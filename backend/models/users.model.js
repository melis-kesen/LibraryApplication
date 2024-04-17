module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "User",
    }
  );

  return User;
};
