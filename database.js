const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.SEQUELIZE_URL)


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });


module.exports = sequelize;
