module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define(
    "Book",
    {
      bookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "Book",
    }
  );

  return Book;
};
