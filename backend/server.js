const express = require('express');
const app = express();
const userRoutes = require('./routes/users.route');
const bookRoutes = require('./routes/books.route');
//const sequelize = require('./config/database'); 
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv');
 
 
// Set environmental variables
dotenv.config({
  path: path.resolve(__dirname, `.env`)
});

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// For forward client IP
app.set('trust proxy', true);

global.__basedir = __dirname;
// Veritabanı bağlantısını test etmek için basit bir sorgu yapın
/*sequelize
  .authenticate()
  .then(() => {
    console.log("Veritabanına başarıyla bağlanıldı.");
  })
  .catch((err) => {
    console.error("Veritabanı bağlantı hatası:", err);
  });*/


var corsOptions = { 
  origin: [`http://${HOST}:${PORT}`, `http://${HOST}:3010`], // origin:"*",
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "build")));

// database
//const db = require("./models");
//veritabanı tabloları yoksa otomatik modellerden oluşturulur. bu sadece guncellenmesini sağlıyor.
//db.sequelize.sync({ alter: true, schema: 'SL'}); 

// routes
// Kullanıcı rotalarını kullanmak için
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}.`);
});
