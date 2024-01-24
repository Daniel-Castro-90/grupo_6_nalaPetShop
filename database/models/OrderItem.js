'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {

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
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'orders'
        },
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'products'
        },
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'OrderItem',
  });

      
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      as: "orders"
    });

    OrderItem.belongsTo(models.Product, {
      as: "products"
    });
  };

  return OrderItem;
};