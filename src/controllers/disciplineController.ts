import { Request, Response } from "express";
import disciplineService from "../services/disciplineService.js";

async function findMany(req: Request, res: Response) {
  const categories = await disciplineService.findMany();
  res.status(200).send(categories);
}

export default { findMany };
