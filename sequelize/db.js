import { Sequelize } from "sequelize";
const {
  PGDB_USER_NAME,
  PGDB_PASSWORD,
  PGDB_DATABASE_NAME,
  PGDB_HOST,
  PGDB_PORT,
} = process.env;

export const sequelize = new Sequelize(
  PGDB_DATABASE_NAME,
  PGDB_USER_NAME,
  PGDB_PASSWORD,
  {
    host: PGDB_HOST,
    port: PGDB_PORT,
    dialect: "postgres",
    logging: false,
    pool: { max: 3, evict: 30000, idle: 30000, acquire: 60000 },
  }
);

console.log(`\nConnected to Database at host ${PGDB_HOST}`);
