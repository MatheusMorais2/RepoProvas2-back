import { prisma } from "../src/database.js";
import { faker } from "@faker-js/faker";

async function main() {
  await generateTeacher("Joao");
  await generateTeacher("Maria");
  await generateTeacher("Jaine");
  await generateTeacher("Matheus");

  for (let i = 1; i < 6; i++) {
    await generateTerm(i);
  }

  await generateDiscipline("react");
  await generateDiscipline("javascript");
  await generateDiscipline("css");
  await generateDiscipline("typescript");
  await generateDiscipline("jest");
  await generateDiscipline("sql");

  await generateTeacherDiscipline(1, 1, 1);
  await generateTeacherDiscipline(1, 2, 2);
  await generateTeacherDiscipline(2, 3, 3);
  await generateTeacherDiscipline(2, 4, 4);
  await generateTeacherDiscipline(3, 5, 5);
  await generateTeacherDiscipline(3, 6, 6);
  await generateTeacherDiscipline(4, 1, 7);
  await generateTeacherDiscipline(4, 6, 8);

  await generateCategory("p1");
  await generateCategory("p2");
  await generateCategory("p3");
  await generateCategory("p4");
  await generateCategory("2ch");
  await generateCategory("rec");

  await generateTest(1, 1, 1);
  await generateTest(2, 1, 1);
  await generateTest(3, 1, 2);
  await generateTest(4, 2, 2);
  await generateTest(5, 2, 3);
  await generateTest(6, 2, 3);
  await generateTest(7, 3, 4);
  await generateTest(8, 3, 4);
  await generateTest(9, 3, 5);
  await generateTest(10, 4, 5);
  await generateTest(11, 4, 6);
  await generateTest(12, 4, 6);
  await generateTest(13, 5, 7);
  await generateTest(14, 5, 7);
  await generateTest(15, 5, 8);
  await generateTest(16, 6, 8);
  await generateTest(17, 6, 1);
  await generateTest(18, 6, 2);
  await generateTest(19, 6, 3);

  await generateViews(1);

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

async function generateTeacher(name: string) {
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

async function generateViews(id: number) {
  await prisma.view.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      testId: id,
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

async function generateTeacherDiscipline(
  teacherId: number,
  disciplineId: number,
  id: number
) {
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

async function generateTest(
  id: number,
  categoryId: number,
  teacherDisciplineId: number
) {
  const topic = faker.name.firstName();
  await prisma.test.upsert({
    where: {
      id: id,
    },
    update: {},
    create: {
      name: `prova de ` + topic,
      pdfUrl: faker.image.avatar(),
      categoryId: categoryId,
      teacherDisciplineId: teacherDisciplineId,
    },
  });
}

async function generateCategory(name: string) {
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
