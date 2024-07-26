import { fileURLToPath } from "url";
import { dirname } from "path";
import { sequelize } from "./db.js";
import dbmodels from "./models/index.js";

// Resolve __filename and __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default { db: sequelize, models: dbmodels };
