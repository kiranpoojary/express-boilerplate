import { Router } from "express";
import {
  testMongo,
  testPgQuery,
  testSequelize,
} from "../../controllers/v1/test.js";

const router = Router();

router.get("/mongo", testMongo);
router.get("/sequelize", testSequelize);
router.get("/pg", testPgQuery);

export default router;
