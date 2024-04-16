const config = require("../config/config.js");
const Sequelize = require("sequelize");

/*const sequelize = new Sequelize(config.TEST.DB, config.TEST.USER, config.TEST.PASSWORD, {
  host: localhos,
  dialect: config.TEST.dialect,
  /*operatorsAliases: false,
  define: {
    timestamps: false,
    // Tablo isimlerinin singular olması için eklenmişti. 
    // Fakat tüm tablo isimleri model içinde tableName şeklinde belirtildiği için buna gerek yok.
    // freezeTableName: true,
  },

  pool: {
    max: config.TEST.pool.max,
    min: config.TEST.pool.min,
    acquire: config.TEST.pool.acquire,
    idle: config.TEST.pool.idle,
  },
  retry: config.TEST.retry,
  timezone: "+03:00",
});*/
const sequelize = new Sequelize("Test", "postgres", "rabarba", {
  host: "localhost",
  dialect: "postgres",
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.sync({ force: true }).then(() => {
  console.log('Veritabanı senkronizasyonu tamamlandı.');
}).catch(err => {
  console.error('Veritabanı senkronizasyonu sırasında hata oluştu:', err);
}); 
/*
 *   Defination of database models
 */
db.user = require("./users.model.js")(sequelize, Sequelize);
db.role = require("./books.model.js")(sequelize, Sequelize);

// RELATIONS BETWEEN MODELS ----------------------------------------------------
// user - role (many to many)
/*db.user.belongsToMany(db.role, {
  through: "UserRole",
  foreignKey: "UserId",
  otherKey: "RoleId",
  as: "Roles",
});

db.role.belongsToMany(db.user, {
  through: "UserRole",
  foreignKey: "RoleId",
  otherKey: "UserId",
  as: "Users",
});*/

module.exports = db;
