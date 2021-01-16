const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    refreshToken: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
