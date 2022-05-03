import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database.js";
import userFactory from "./factories/userFactory.js";
import generateExam from "./factories/examFactory";

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
}

describe("Create exam - POST /tests", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("Should create an exam given the proper data", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .post("/tests")
      .set("Authorization", token)
      .send(generateExam(1, 1));

    expect(response.status).toBe(201);
  });
});
