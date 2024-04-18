const db = require("../models");
const User = db.user;
const Book = db.book;
const UserBook = db.userBook;
const validateUser = require("../validators/users.validators");
/**
 * Get all users
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [["userId", "id"], "name"],
    });
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/**
 * Get the user with given id
 * @params id: id of the user
 */
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userBooks = await UserBook.findAll({
      where: { userId },
      include: [
        {
          model: Book,
          attributes: ["bookId", "name", "score"],
        },
      ],
    });

    if (userBooks.length > 0) {
      const presentBooks = [];
      const pastBooks = [];

      userBooks.forEach((userBook) => {
        const book = userBook.Book;
        const bookDetail = {
          bookId: book.bookId,
          name: book.name,
          userScore: userBook.userScore,
        };

        if (userBook.present) {
          presentBooks.push(bookDetail);
        } else if (userBook.past) {
          pastBooks.push(bookDetail);
        }
      });

      const user = await User.findOne({ where: { userId } });
      const userJson = {
        id: userId,
        name: user.name,
        books: {
          past: pastBooks,
          present: presentBooks,
        },
      };

      res.status(200).json(userJson);
    } else {
      const user = await User.findOne({ where: { userId } });
      const userJson = {
        id: userId,
        name: user.name,
        books: {
          past: [],
          present: [],
        },
      };

      res.status(200).json(userJson);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/**
 * Add new user
 */
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
/**
 * Borrow book with given userId and bookId
 */
exports.borrowBook = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const existingUserBook = await UserBook.findOne({
      where: {
        userId: userId,
        bookId: bookId,
        past: false,
        present: true,
      },
    });

    if (existingUserBook) {
      return res
        .status(400)
        .json({ message: "User already borrowed this book" });
    }

    const [userBook, created] = await UserBook.findOrCreate({
      where: { userId: userId, bookId: bookId, past: false, present: true },
    });

    if (created) {
      res.status(200).json({ message: "User borrowed a book successfully" });
    } else {
      res.status(400).json({ message: "User already exist!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/** 
  /**
   * Return book with given userId and bookId
   */
exports.returnBook = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const score = req.body.score;

    const updated = await UserBook.update(
      { past: true, present: false, userScore: score },
      {
        where: {
          userId: userId,
          bookId: bookId,
        },
      }
    );
    if (updated[0]) {
      const bookScore = await UserBook.findAll({
        where: { bookId: bookId, past: true, present: false },
      });

      let sum = 0;
      bookScore.forEach((item) => {
        sum += item.userScore;
      });
      const avgScore = sum / bookScore.length;

      const updatedBook = await Book.update(
        { score: avgScore },
        {
          where: {
            bookId: bookId,
          },
        }
      );

      res.status(200).json({ score: score });
    } else {
      res.status(400).json({ message: "There is no book to return!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
