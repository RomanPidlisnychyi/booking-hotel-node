const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/initDatabase');

class Room extends Model {}

Room.init(
  {
    service: { type: DataTypes.STRING, defaultValue: 'economy' },
  },
  { sequelize, modelName: 'room' }
);

module.exports = Room;
