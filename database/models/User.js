'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'defaultprofile.png'
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roles_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'roles'
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10);
        //user.image = user.image || 'defaultprofile.png';
      }
    }
  });
  return User;
};