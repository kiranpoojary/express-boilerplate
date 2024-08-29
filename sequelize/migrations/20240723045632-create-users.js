"use strict";
/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal(
          "uuid_in((md5((random())::text))::cstring)"
        ),
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      isEmailverified: {
        type: Sequelize.BOOLEAN,
      },
      address: {
        type: Sequelize.JSONB,
      },
      roleId: {
        type: Sequelize.UUID,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  export const down = async (queryInterface, Sequelize) =>  {
    // await queryInterface.dropTable("users");
  },
