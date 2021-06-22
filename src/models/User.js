const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/initDatabase');

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, require: true },
    email: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: { type: DataTypes.STRING, require: true },
    status: { type: DataTypes.STRING, defaultValue: 'free' },
    recoveryToken: { type: DataTypes.STRING, defaultValue: null },
  },
  { sequelize, modelName: 'user' }
);

module.exports = User;
