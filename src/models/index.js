const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.worksheets = require("./worksheet.model.js")(sequelize, Sequelize);
db.questions = require("./question.model.js")(sequelize, Sequelize);

db.worksheets.hasMany(db.questions, { as: "questions" });
db.questions.belongsTo(db.worksheets, {
  foreignKey: "worksheetId",
  as: "worksheet",
});

module.exports = db;