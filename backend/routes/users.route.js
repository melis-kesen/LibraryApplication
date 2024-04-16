const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');

router.get('/users/:userId', UserController.getUsers);
router.post('/users', UserController.createUser);

router.post('/users/:userId/borrow/:bookId', UserController.borrowBook);
router.post('/users/:userId/return/:score', UserController.returnBook);

module.exports = router;

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
    app.get('/users/:userId',  UserController.getUsers);
  
  /**
   * Get the user with given id
   * @params id: id of the user
   */
  app.post('/users',  UserController.createUser);  
  
  /**
   * Add new user
   */
  app.post('/users/:userId/borrow/:bookId',UserController.borrowBook);
  
  /** 
 * Update the user with given id
 * @params id: id of the user
 */
  app.post('/users/:userId/return/:score', UserController.returnBook);
  
  /**
 * Delete the user with given id
 * @params id: id of the user
 */
  app.delete("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
};
