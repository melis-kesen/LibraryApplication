const controller = require("../controllers/books.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * Get all books
   */
  app.get("/books", controller.getBooks);

  /**
   * Get the book with given id
   * @params id: id of the book
   */
  app.get("/books/:bookId", controller.getBook);
  /**
   * Add new book
   */
  app.post("/books", controller.createBook);
};
