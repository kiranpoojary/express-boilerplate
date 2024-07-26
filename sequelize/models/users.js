"use strict";
// const { Model } = require("sequelize");
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      id: DataTypes.UUID,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER,
      isEmailverified: DataTypes.BOOLEAN,
      address: DataTypes.JSONB,
      roleId: DataTypes.UUID,
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
