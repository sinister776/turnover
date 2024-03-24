const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const UserCategory = sequelize.define(
  'UserCategory', {
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
);

UserCategory.sync({ alter: true })
  .then(() => {
    console.log("The table for the User model was synchronized successfully!");
  })
  .catch((error) => {
    console.error("Error synchronizing User model:", error);
  });



module.exports = UserCategory;
