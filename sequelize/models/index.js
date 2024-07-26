"use strict";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = import(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log(
    `\n******************** Successfuly established connection to ${
      sequelize?.options?.dialect
    } DB(${
      sequelize?.options?.database
    }) running at host(${process.env.NODE_ENV?.toUpperCase()}): ${
      sequelize?.options?.host
    } ********************\n`
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = import(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
