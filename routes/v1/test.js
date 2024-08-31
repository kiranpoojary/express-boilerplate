import { Router } from "express";
import {
  testMongo,
  testPgQuery,
  testSequelize,
} from "../../controllers/v1/test.js";
import { validatePayload } from "../../utils/middlewares/v1.js";
import { EXAMPLE_VALIDATION_RULE } from "../../utils/v1/validations.js";

const router = Router();

router.get("/mongo", testMongo);
router.get("/sequelize", testSequelize);
router.get("/pg", testPgQuery);
router.post(
  "/payload-validation",
  validatePayload({ rule: EXAMPLE_VALIDATION_RULE }),
  (req, res) => res.send("OK")
);

export default router;
