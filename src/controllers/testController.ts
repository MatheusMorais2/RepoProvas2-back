import { Request, Response } from "express";
import testService from "../services/testService.js";

export interface Test {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
}

export interface CreateTest {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}

async function find(req: Request, res: Response) {
  let { groupBy, search } = req.query as { groupBy: string; search: string };

  if (!search) search = "";

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy, search });
  res.send({ tests });
}

export async function createTest(req: Request, res: Response) {
  const testData: CreateTest = req.body;
  await testService.createTest(testData);

  return res.sendStatus(201);
}

export default {
  find,
  createTest,
};
