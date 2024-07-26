import {
  testMongoUtil,
  testPgQueryUtil,
  testSeqluelizeUtil,
} from "../../utils/v1/test.js";

export async function testMongo(req, res) {
  try {
    const { statusCode, ...response } = await testMongoUtil();
    res.status(statusCode).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    });
  }
}

export async function testSequelize(req, res) {
  try {
    const { statusCode, ...response } = await testSeqluelizeUtil();
    res.status(statusCode).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    });
  }
}

export async function testPgQuery(req, res) {
  try {
    const { statusCode, ...response } = await testPgQueryUtil();
    res.status(statusCode).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    });
  }
}
