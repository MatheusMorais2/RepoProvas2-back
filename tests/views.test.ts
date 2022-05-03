import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database.js";
import userFactory from "./factories/userFactory.js";

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
}

async function truncateViews() {
  await prisma.$executeRaw`TRUNCATE TABLE views;`;
}

describe("View an exam - POST /tests/views/:id", () => {
  beforeEach(truncateViews);
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("Should increase the views of an exam given a valid id", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .post("/tests/views/1")
      .set("Authorization", token);

    expect(response.status).toBe(201);
  });

  it("Should return 404 when an id is invalid", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .post("/tests/views/99")
      .set("Authorization", token);

    expect(response.status).toBe(404);
  });
});

describe("View an exam - GET /tests/views/:id", () => {
  beforeEach(truncateViews);
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("Should return the views of a specific exam", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .get("/tests/views/1")
      .set("Authorization", token);

    expect(response.body.views).toBe(0);
    expect(response.status).toBe(200);
  });

  it("Should return 404 when an id is invalid", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .get("/tests/views/99")
      .set("Authorization", token);

    expect(response.status).toBe(404);
  });
});
