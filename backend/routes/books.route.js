const express = require('express');
const router = express.Router();
const BookController = require('../controllers/books.controller');

router.get('/books', BookController.getAllBooks);
router.post('/book', BookController.createBook);

module.exports = router;