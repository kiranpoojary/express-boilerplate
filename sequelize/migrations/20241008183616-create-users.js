// 👇👇the below commented code is commonjs, check below converted module JS code

// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       fullName: {
//         type: Sequelize.STRING
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       age: {
//         type: Sequelize.INTEGER
//       },
//       isEmailverified: {
//         type: Sequelize.BOOLEAN
//       },
//       address: {
//         type: Sequelize.JSONB
//       },
//       roleId: {
//         type: Sequelize.UUID
//       },
//       bio: {
//         type: Sequelize.TEXT
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('users');
//   }
// };

// 👇👇 converted module JS code
/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable("users");
};
