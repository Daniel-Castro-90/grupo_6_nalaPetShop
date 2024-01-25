module.exports = (sequelize, dataTypes) => {

  let alias = "OrderItem";
  let columns = {
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: dataTypes.DECIMAL(10, 2),
      defaultValue: false,
    },
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  }
  const config = {
    tableName: 'orderitems'
  }

  const OrderItem = sequelize.define(alias, columns, config)

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      as: "order",
      foreignKey: "order_id",
    });

    OrderItem.belongsTo(models.Product, {
      as: "product",
      foreignKey: "product_id"
    });
  };

  return OrderItem;
};