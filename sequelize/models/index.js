"use strict";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import Sequelize from "sequelize";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve __filename and __dirname using import.meta.url

const env = process.env.NODE_ENV || "development";
const configPath = path.join(__dirname, "../../config/config.json");

// Ensure config path is correct
const config = (await import(configPath)).default[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log(
    `\n******************** Successfully established connection to ${
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

const modelsPath = __dirname;
fs.readdirSync(modelsPath)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach(async (file) => {
    const modelPath = join(modelsPath, file);
    const modelModule = await import(`file://${modelPath}`);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
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
