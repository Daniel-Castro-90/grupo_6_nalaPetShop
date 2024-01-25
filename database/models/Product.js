module.exports = (sequelize, dataTypes) => {

  let alias = "Product";
  let columns = {
    name: {
      type: dataTypes.TEXT,
      allowNull: false      
    },
    category: {
      type: dataTypes.ENUM('Gato', 'Perro'),
      allowNull: false,
    },
    price: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    package: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    highlight: {
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false
    },
    image: {
      type: dataTypes.STRING,
      allowNull: true,
      defaultValue: 'defaulproduct.png'
    },
  }

  const config = {
    tableName: 'products'
  }

  const product = sequelize.define(alias, columns, config)

  return product;
};