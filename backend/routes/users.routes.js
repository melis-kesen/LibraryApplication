const controller = require("../controllers/users.controller");

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
   * Get all users
   */
  app.get("/users", controller.getUsers);
  /**
   * Get the user with given id
   * @params id: id of the user
   */
  app.get("/users/:userId", controller.getUser);
  /**
   * Add new user
   */
  app.post("/users", controller.createUser);

  /**
   * Borrow book with given userId and bookId
   */
  app.post("/users/:userId/borrow/:bookId", controller.borrowBook);

  /** 
  /**
   * Return book with given userId and bookId
   */
  app.post("/users/:userId/return/:bookId", controller.returnBook);
};
