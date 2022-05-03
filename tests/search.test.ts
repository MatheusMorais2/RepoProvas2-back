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

describe("Search by discipline tests - GET /tests?groupBy=discipline", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("Should return 200 and all the exams in a given discipline", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .get("/tests?groupBy=disciplines&search=react")
      .set("Authorization", token);

    let counter = 0;
    console.log(response.body);
    response.body.tests.map((elem) => {
      if (elem.disciplines.length > 0) {
        elem.disciplines.map((element) => {
          if (element.name !== "react") counter++;
        });
      }
    });

    expect(counter).toBe(0);
    expect(response.status).toBe(200);
  });

  it("Should return 200 and nothing given an inexistent discipline", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .get("/tests?groupBy=disciplines&search=reactapsjdas")
      .set("Authorization", token);

    let counter = 0;
    response.body.tests.map((elem) => {
      if (elem.disciplines.length > 0) counter++;
    });

    expect(counter).toBe(1);
    expect(response.status).toBe(200);
  });

  it("Should return all exams separeted by disciplines given no search query", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .get("/tests?groupBy=disciplines")
      .set("Authorization", token);

    let counter = 0;
    response.body.tests.map((elem) => {
      if (elem.disciplines.length > 0) {
        elem.disciplines.map((element) => {
          if (element.name !== "react") counter++;
        });
      }
    });

    expect(counter).toBeGreaterThan(0);
    expect(response.status).toBe(200);
  });
});

describe("Search by teacher tests - GET /tests?groupBy=teacher", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("Should return 200 and all the exams from a given teacher", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .get("/tests?groupBy=teachers&search=Maria")
      .set("Authorization", token);

    expect(response.body.tests[0].teacher.name).toBe("Maria");
    expect(response.status).toBe(200);
  });

  it("Should return 200 and nothing given an inexistent teacher", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .get("/tests?groupBy=teachers&search=reactapsjdas")
      .set("Authorization", token);

    expect(response.body.tests.length).toBe(0);
    expect(response.status).toBe(200);
  });

  it("Should return all exams separeted by teacher given no search query", async () => {
    const user = await userFactory.generateUser();
    const token = await userFactory.generateLoginToken(user);

    const response = await supertest(app)
      .get("/tests?groupBy=teachers")
      .set("Authorization", token);

    expect(response.body.tests.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
  });
});
