const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize(
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_DATABASE}`,
  process.env.DATABASE_URL
    ? {
        dialectOptions: {
          ssl: {
            require: process.env.DATABASE_URL ? true : false,
            rejectUnauthorized: false, // <<<<<< YOU NEED THIS
          },
        },
      }
    : {}
);
