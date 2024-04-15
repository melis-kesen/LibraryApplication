const express = require('express');
const router = express.Router();
const BookController = require('../controllers/books.controller');

router.get('/books/:bookId', BookController.getBooks);
router.post('/books', BookController.createBook);

module.exports = router;