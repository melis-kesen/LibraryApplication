const Sequelize = require("sequelize");
const express = require('express');
const app = express();
const userRoutes = require('./routes/users.route');
const sequelize = require('./config/database'); 


// Veritabanı bağlantısını test etmek için basit bir sorgu yapın
sequelize
  .authenticate()
  .then(() => {
    console.log("Veritabanına başarıyla bağlanıldı.");
  })
  .catch((err) => {
    console.error("Veritabanı bağlantı hatası:", err);
  });


app.use(express.json()); // JSON body parser middleware

// Kullanıcı rotalarını kullanmak için
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});