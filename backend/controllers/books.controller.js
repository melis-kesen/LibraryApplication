const db = require("../models"); 
const Book = db.book;
const validateBook= require('../validators/books.validators');

exports.getBooks = async (req, res) => {
  try {
    const book = await Book.findAll(); // Tek bir kullanıcıyı almak için findByPk kullanılır
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book); // Kullanıcıyı JSON formatında yanıt olarak gönder
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findOne({ where: { bookId: bookId } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book); // Kullanıcıyı JSON formatında yanıt olarak gönder
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.createBook = async (req, res) => {
  try {
    const bookname = req.body.name;
    const [book, created] = await Book.findOrCreate({
      where: { name: bookname },
    });
    if (created) {
      res.status(200).json({ name: book.name });
    } else {
      res.status(400).json({ message: "Book already exist!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};