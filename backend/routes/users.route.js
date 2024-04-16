const UserController = require("../controllers/users.controller");

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
   * Get the user with given id
   * @params id: id of the user
   */
  app.get("/users/:userId", UserController.getUsers);

  /**
   * Add new user
   */
  app.post("/users", UserController.createUser);

  /**
   * Borrow bookwith given userId and bookId
   */
  app.post("/users/:userId/borrow/:bookId", UserController.borrowBook);

  /** 
  /**
   * Return book with given userId and score
   */
  app.post("/users/:userId/return/:score", UserController.returnBook);

  /**
   * Delete the user with given id
   * @params id: id of the user
   */
  app.delete("/api/users/:id", controller.deleteUser);
};
