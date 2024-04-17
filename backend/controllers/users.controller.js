const db = require("../models");
const User = db.user;
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

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.returnBook = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
