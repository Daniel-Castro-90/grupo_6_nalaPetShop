module.exports = (sequelize, dataTypes) => {

  let alias = "Order";
  let columns = {
    total: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: dataTypes.STRING,
      defaultValue: '',
    },
    shippingMethod: {
      type: dataTypes.STRING,
      allowNull: false,
    }
  }

  const config = {
    tableName: 'orders'
  }

  const Order = sequelize.define(alias, columns, config)

  Order.associate = (models) => {
    Order.User = Order.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
    Order.OrderItems = Order.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: "order_id"
    });
  };

  return Order;
};