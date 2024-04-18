const db = require("../models");
const User = db.user;
const Book = db.book;
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
    const userId = req.params.userId;
    await UserBook.findAll({
      where: { userId },
      include: [
        {
          model: Book,
          attributes: ['bookId', 'name'] // Sadece bookId ve name alanlarını al
        },
        {
          model: User,
          attributes: ['name'] // Sadece name alanını al
        }
      ]
    }).then(userBooks => {
      if (userBooks.length > 0) {
        const presentBooks = [];
        const pastBooks = [];
      
        userBooks.forEach(userBook => {
          const book = userBook.Book;
          const bookDetail = {
            bookId: book.bookId,
            name: book.name
          };
      
          if (userBook.present) {
            presentBooks.push(bookDetail);
          } else if (userBook.past) {
            pastBooks.push(bookDetail);
          }
        });
      
        const userJson = {
          id: userId,
          name: userBooks[0].User.name, // Kullanıcı adını buraya alabilirsiniz, örneğin: user.name
          books: {
            past: pastBooks,
            present: presentBooks
          }
        };
        res.status(200).json(userJson); 
      }
      else {
        res.status(400).json({ message: "There is book data!"}); 
      }
    }).catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
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
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const [userBook, created] = await UserBook.findOrCreate({
      where: { userId: userId, bookId: bookId, past: false, present: true },
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
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const score = req.body.score;
  
    // UserBook tablosunda ilgili kaydı güncelle
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
    // Kitaba ait ortalama puanı hesapla ve güncelle
    const bookScore = await UserBook.findAll({
      where: { bookId: bookId, past: true, present: false } // Kitabı iade edilen tüm kayıtları getir
    });
  
    let sum = 0;
    bookScore.forEach(item => {
      sum += item.userScore; // Tüm puanları topla
    });
    const avgScore = sum / bookScore.length; // Ortalama puanı hesapla
  
    const updatedBook = await Book.update(
      { score: avgScore },
      {
        where: {
          bookId: bookId,
        },
      }
    );

      res.status(200).json({ score: score });
    }
    else {
      res.status(400).json({ message: "There is no book to return!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
