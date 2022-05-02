import Joi from "joi";
import { CreateTest } from "../controllers/testController.js";

export const testSchema = Joi.object<CreateTest>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  discipline: Joi.string().required(),
  teacher: Joi.string().required(),
  category: Joi.string().required(),
});
