'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false      
    },
    pricear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priceusd: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    package: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'products',
  });
  return Products;
};