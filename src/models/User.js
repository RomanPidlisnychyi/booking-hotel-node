const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/initDatabase');

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'free' },
    recoveryToken: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: 'user' }
);

module.exports = User;
