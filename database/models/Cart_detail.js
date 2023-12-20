'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_detail.init({
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'cart'
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
    modelName: 'cart_detail',
  });
  return Cart_detail;
};