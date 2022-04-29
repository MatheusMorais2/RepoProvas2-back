import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  let { groupBy, search } = req.query as { groupBy: string; search: string };

  if (!search) search = "";

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy, search });
  res.send({ tests });
}

export default {
  find,
};
