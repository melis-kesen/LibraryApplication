module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define(
    "Book",
    {
      BookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Score: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "Book",
    }
  );

  return Book;
};
