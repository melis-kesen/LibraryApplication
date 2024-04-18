module.exports = (sequelize, Sequelize) => {
  const UserBook = sequelize.define(
    "UserBook",
    {
      borrowId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      bookId: {
        type: Sequelize.INTEGER,
      },
      past: {
        type: Sequelize.BOOLEAN,
      },
      present: {
        type: Sequelize.BOOLEAN,
      },
      userScore: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "UserBook",
    }
  );

  return UserBook;
};
