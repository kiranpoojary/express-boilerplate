// 👇👇the below commented code is commonjs, check below converted module JS code
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class users extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   users.init({
//     fullName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     age: DataTypes.INTEGER,
//     isEmailverified: DataTypes.BOOLEAN,
//     address: DataTypes.JSONB,
//     roleId: DataTypes.UUID,
//     bio: DataTypes.TEXT
//   }, {
//     sequelize,
//     modelName: 'users',
//   });
//   return users;
// };

//

// 👇👇 converted module JS code
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
      modelName: "Users",
    }
  );

  return Users;
};
