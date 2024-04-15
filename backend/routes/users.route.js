const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');

router.get('/users/:userId', UserController.getUsers);
router.post('/users', UserController.createUser);

router.post('/users/:userId/borrow/:bookId', UserController.borrowBook);
router.post('/users/:userId/return/:score', UserController.returnBook);

module.exports = router;
