const db = require("../models");
const User = db.user;
const UserBook = db.userBook;
const validateUser = require("../validators/users.validators");

exports.getUsers = async (req, res) => {
  try {
    const user = await User.findAll(); // Tek bir kullanıcıyı almak için findByPk kullanılır
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Kullanıcıyı JSON formatında yanıt olarak gönder
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ where: { userId: userId } });
    if (!user) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(user); // Kullanıcıyı JSON formatında yanıt olarak gönder
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.createUser = async (req, res) => {
  try {
    const username = req.body.name;
    const [user, created] = await User.findOrCreate({
      where: { name: username },
    });
    if (created) {
      res.status(200).json({ name: user.name });
    } else {
      res.status(400).json({ message: "User already exist!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    const [userBook, created] = await UserBook.findOrCreate({
      where: { userId: userId, bookId: bookId },
    });
    if (created) {
      res.status(200).json("User borrowed a book succesfully");
    } else {
      res.status(400).json({ message: "User already exist!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.returnBook = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    const score = req.body.score;
    const updated = await UserBook.update(
      { past: true, present: false },
      {
        where: {
          userId: userId, bookId: bookId
        },
      }
    );
    const updatedBook = await Book.update(
      { score: score },
      {
        where: {
          bookId: bookId
        },
      }
    );
    if (updated) {
      res.status(200).json(score);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
