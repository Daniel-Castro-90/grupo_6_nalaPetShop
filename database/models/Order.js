'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {

    }
  }
  
  Order.init({
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    shippingMethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });

  return Order;
};