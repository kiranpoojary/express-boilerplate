"use strict";
import { Model, DataTypes } from "sequelize";

// Define the User model
export default (sequelize) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      age: DataTypes.INTEGER,
      isEmailverified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      address: DataTypes.JSONB,
      roleId: DataTypes.UUID,
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return Users;
};
