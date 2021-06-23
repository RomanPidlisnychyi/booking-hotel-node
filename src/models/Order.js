const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/initDatabase');

class Order extends Model {}

Order.init(
  {
    date: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'order' }
);

module.exports = Order;
