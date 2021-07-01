const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const SmartHome = sequelize.define(
    'smarthome',
    {
      key: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );

  return SmartHome;
};
