"use strict";
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, salt);
          return user;
        },
      },
    }
  );
  return user;
};
