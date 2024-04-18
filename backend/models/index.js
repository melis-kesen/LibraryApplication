const config = require("../config/config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.TEST.DB, config.TEST.USER, config.TEST.PASSWORD, {
  host: config.TEST.HOST,
  dialect: config.TEST.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Veritabanı senkronizasyonu tamamlandı.");
  })
  .catch((err) => {
    console.error("Veritabanı senkronizasyonu sırasında hata oluştu:", err);
  });
/*
 *   Defination of database models
 */
db.user = require("./users.model.js")(sequelize, Sequelize);
db.book = require("./books.model.js")(sequelize, Sequelize);
db.userBook = require("./userBook.model.js")(sequelize, Sequelize);

// RELATIONS BETWEEN MODELS
// user - book
db.user.hasMany(db.userBook, { foreignKey: "userId" });
db.userBook.belongsTo(db.user, { foreignKey: "userId" });

db.userBook.belongsTo(db.book, { foreignKey: "bookId" });
db.book.hasMany(db.userBook, { foreignKey: "bookId" });
db.user.belongsToMany(db.book, {
  through: "UserBook",
  foreignKey: "userId",
  otherKey: "bookId",
  as: "Users",
});
db.book.belongsToMany(db.user, {
  through: "UserBook",
  foreignKey: "bookId",
  otherKey: "userId",
  as: "Books",
});

module.exports = db;
