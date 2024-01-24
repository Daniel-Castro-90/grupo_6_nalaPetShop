'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.associate = (models) => {
    Order.User = Order.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
    Order.OrderItems = Order.hasMany(models.OrderItem, {
      as: "orderitem",
    });
  };

  return Order;
};