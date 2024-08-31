import { MongoCRUD } from "../../mongo/dbcrud.js";
import sequelizeModule from "../../sequelize/index.js";
import { dataValidatorV1 } from "../validator.js";
import { EXAMPLE_VALIDATION_RULE, SIGNUP_VALIDATION } from "./validations.js";

const { db, models } = sequelizeModule;
const { Users } = models;

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
    const result = await Users.findOne();
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

export async function testValidator(data) {
  try {
    return dataValidatorV1(data, EXAMPLE_VALIDATION_RULE);
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
}
