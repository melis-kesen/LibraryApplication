const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');

router.get('/users', UserController.getAllUsers);
router.post('/user', UserController.createUser);

module.exports = router;
