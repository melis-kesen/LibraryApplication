const db = require("../models"); 
const Book = db.book;
const validateBook= require('../validators/books.validators');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createBook = async (req, res) => {
  try {
    // Doğrulama işlemi
    validateBook(req, res, async () => {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};