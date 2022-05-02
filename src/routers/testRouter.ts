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

export default testRouter;
