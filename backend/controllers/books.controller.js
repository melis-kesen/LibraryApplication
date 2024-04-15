const User = require('../models/books.model');

const getBooks = async (req, res) => {
  try {
    const books = await User.findAll();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await User.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getBooks,
  createBook
};
