import { MongoCRUD } from "../../mongo/dbcrud.js";
import sequelizeModule from "../../sequelize/index.js";

const { db, models } = sequelizeModule;

console.log(db);
console.log(models);
export async function testMongoUtil() {
  try {
    const userCollection = new MongoCRUD("users");
    await userCollection.initialize();
    const result = await userCollection.findOne();
    return { statusCode: 200, message: "Server is up.", user: result };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
}

export async function testSeqluelizeUtil() {
  try {
    const userCollection = new MongoCRUD("users");
    await userCollection.initialize();
    const result = await userCollection.findOne();
    return { statusCode: 200, message: "Server is up.", user: result };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
}

export async function testPgQueryUtil() {
  try {
    const userCollection = new MongoCRUD("users");
    await userCollection.initialize();
    const result = await userCollection.findOne();
    return { statusCode: 200, message: "Server is up.", user: result };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
}
