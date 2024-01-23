'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false      
    },
    category: {
      type: DataTypes.ENUM('Gato', 'Perro'),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    package: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    highlight: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'defaulproduct.png'
    },
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};