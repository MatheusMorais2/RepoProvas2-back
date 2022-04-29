import { prisma } from "../src/database.js";
import faker from "@faker-js/faker";

async function main() {
  await generateTeacher();
  await generateTeacher();
  await generateTeacher();
  await generateTeacher();

  for (let i = 1; i < 6; i++) {
    await generateTerm(i);
  }

  await generateDiscipline("react");
  await generateDiscipline("javascript");
  await generateDiscipline("css");
  await generateDiscipline("typescript");
  await generateDiscipline("jest");
  await generateDiscipline("sql");

  for (let i = 1; i < 10; i++) {
    await generateTeacherDiscipline(i);
  }

  for (let i = 1; i < 20; i++) {
    await generateTest(i);
  }

  for (let i = 1; i < 5; i++) {
    await generateCategory();
  }

  await generateUser();
  await generateUser();
  await generateUser();
  await generateUser();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function generateTeacher() {
  let name = `${faker.name}`;
  await prisma.teacher.upsert({
    where: {
      name: name,
    },
    update: {},
    create: {
      name: name,
    },
  });
}

async function generateTerm(number: number) {
  await prisma.term.upsert({
    where: {
      number: number,
    },
    update: {},
    create: {
      number: number,
    },
  });
}

async function generateDiscipline(name: string) {
  await prisma.discipline.upsert({
    where: {
      name: name,
    },
    update: {},
    create: {
      name: name,
      termId: Math.floor(Math.random() * 5) + 1,
    },
  });
}

async function generateTeacherDiscipline(id: number) {
  const teacherId = Math.floor(Math.random() * 4) + 1;
  const disciplineId = Math.floor(Math.random() * 6) + 1;
  await prisma.teacherDiscipline.upsert({
    where: {
      id: id,
    },
    update: {},
    create: {
      teacherId,
      disciplineId,
    },
  });
}

async function generateTest(id: number) {
  await prisma.test.upsert({
    where: {
      id: id,
    },
    update: {},
    create: {
      name: `prova de ${faker.name}`,
      pdfUrl: faker.image.avatar(),
      categoryId: Math.floor(Math.random() * 4) + 1,
      teacherDisciplineId: Math.floor(Math.random() * 9) + 1,
    },
  });
}

async function generateCategory() {
  const name = `${faker.name}`;
  await prisma.category.upsert({
    where: {
      name: name,
    },
    update: {},
    create: {
      name: name,
    },
  });
}

async function generateUser() {
  const email = faker.internet.email();
  const password = "123";
  await prisma.user.upsert({
    where: {
      email: email,
    },
    update: {},
    create: {
      email: email,
      password: password,
    },
  });
}
