const db = require("../models");
const User = db.user;
const Book = db.book;
const UserBook = db.userBook;
const validateUser = require("../validators/users.validators");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ 
      attributes: [['userId', 'id'], 'name'] 
    }); // Tek bir kullanıcıyı almak için findByPk kullanılır
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users); // Kullanıcıyı JSON formatında yanıt olarak gönder
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
  
    // Kullanıcının ödünç aldığı kitapları getir
    const userBooks = await UserBook.findAll({
      where: { userId },
      include: [
        {
          model: Book,
          attributes: ['bookId', 'name', 'score'] // Kitapların detaylarını al
        }
      ]
    });
  
    if (userBooks.length > 0) {
      const presentBooks = [];
      const pastBooks = [];
  
      userBooks.forEach(userBook => {
        const book = userBook.Book;
        const bookDetail = {
          bookId: book.bookId,
          name: book.name,
          userScore: userBook.userScore
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
          present: presentBooks
        }
      };
  
      res.status(200).json(userJson);
    } else {
      // Kullanıcının ödünç aldığı kitap yok
      const user = await User.findOne({ where: { userId } });
      const userJson = {
        id: userId,
        name: user.name,
        books: {
          past: [],
          present: []
        }
      };
      
      res.status(200).json(userJson);
    }
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
    const userId = req.params.userId;
    const bookId = req.params.bookId;
  
    // Belirli bir kullanıcının belirli bir kitabı ödünç aldığını kontrol et
    const existingUserBook = await UserBook.findOne({
      where: {
        userId: userId,
        bookId: bookId,
        past: false, // Eğer kitap zaten iade edilmişse bu kontrolü yapmak istemeyebilirsiniz
        present: true // Eğer kitap zaten başka bir kullanıcıda ise bu kontrolü yapmak istemeyebilirsiniz
      }
    });
  
    if (existingUserBook) {
      // Kullanıcı zaten belirli bir kitabı ödünç almış
      return res.status(400).json({ message: "User already borrowed this book" });
    }
  
    // Kullanıcı daha önce bu kitabı ödünç almamış, yeni bir kayıt oluştur
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
      where: { bookId: bookId,  past: true, present: false } // Kitabı iade edilen tüm kayıtları getir
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
