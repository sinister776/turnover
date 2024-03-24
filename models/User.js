const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  verificationCode: {
    type: DataTypes.STRING,
  },
});



User.sync({ alter: true })
  .then(() => {
    console.log("The table for the User model was synchronized successfully!");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });



module.exports = User;
