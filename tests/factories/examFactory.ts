import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";

async function generateExam(categoryId: number, teacherDisciplineId: number) {
  const exam = {
    name: faker.name.jobDescriptor(),
    pdfUrl: faker.internet.url(),
    categoryId: categoryId,
    teacherDisciplineId: teacherDisciplineId,
  };

  return exam;
}

export default generateExam;
