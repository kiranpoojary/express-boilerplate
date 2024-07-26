import mongoose from "mongoose";

let cachedDb = null;

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_NAME;

export const connectToDatabase = async () => {
  if (cachedDb) {
    console.log("Using cached MongoDB connection");
    return cachedDb;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB(${MONGODB_NAME})`);
    cachedDb = mongoose.connection;
    return cachedDb;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

export const closeDatabaseConnection = () => {
  if (cachedDb) {
    mongoose.connection.close();
    console.log("Closed MongoDB connection");
    cachedDb = null;
  }
};
