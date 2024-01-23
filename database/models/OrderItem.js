'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {

    }
  }
  OrderItem.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'orderitem',
  });

  return OrderItem;
};