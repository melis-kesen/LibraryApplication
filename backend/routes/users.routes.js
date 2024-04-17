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
   * Get the user with given id
   * @params id: id of the user
   */
  app.get("/api/users", controller.getUsers);

  /**
   * Add new user
   */
  app.post("/api/users", controller.createUser);

  /**
   * Borrow bookwith given userId and bookId
   */
  app.post("/api/users/:userId/borrow/:bookId", controller.borrowBook);

  /** 
  /**
   * Return book with given userId and score
   */
  app.post("/api/users/:userId/return/:score", controller.returnBook);
};
