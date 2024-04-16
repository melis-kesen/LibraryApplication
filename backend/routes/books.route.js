const BookController = require("../controllers/books.controller");

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
   * Get the book with given id
   * @params id: id of the book
   */
  app.get("/books/:bookId", BookController.getBooks);

  /**
   * Add new book
   */
  app.post("/books", BookController.createBook);
};
