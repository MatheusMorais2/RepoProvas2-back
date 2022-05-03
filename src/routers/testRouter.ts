import { Router } from "express";
import testController from "../controllers/testController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);
testRouter.post(
  "/tests",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(testSchema),
  testController.createTest
);
testRouter.get(
  "/tests/views/:testId",
  ensureAuthenticatedMiddleware,
  testController.getViews
);
testRouter.post(
  "/tests/views/:testId",
  ensureAuthenticatedMiddleware,
  testController.increaseViews
);

export default testRouter;
