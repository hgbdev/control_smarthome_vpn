const Sequelize = require('sequelize');

const sequelize = new Sequelize('', '', '', {
  host: '',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  storage: 'database.sqlite',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize);

module.exports = db;
