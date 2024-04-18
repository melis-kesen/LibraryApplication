const db = require("../models");
const Book = db.book;
const validateBook = require("../validators/books.validators");
/**
 * Get all books
 */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: [["bookId", "id"], "name"],
    });
    if (!books) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/**
 * Get the book with given id
 * @params id: id of the book
 */
exports.getBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findOne({
      where: { bookId: bookId },
      attributes: [["bookId", "id"], "name", "score"],
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/**
 * Add new book
 */
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
