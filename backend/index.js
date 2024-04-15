const Sequelize = require("sequelize");
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');

// Sequelize ve PostgreSQL bağlantısını oluşturun
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

// Model tanımlamak için User modelini require edin
const User = require("./models/User")(sequelize, Sequelize);

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
// Kullanıcı ekleme örneği
User.create({
  firstName: "John",
  lastName: "Doe",
  age: 30,
})
  .then((user) => {
    console.log("Yeni kullanıcı oluşturuldu:", user.toJSON());
  })
  .catch((err) => {
    console.error("Kullanıcı oluşturma hatası:", err);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});