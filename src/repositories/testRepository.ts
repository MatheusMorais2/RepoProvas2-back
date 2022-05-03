import { prisma } from "../database.js";

import { Test } from "../controllers/testController.js";

async function getTestById(testId: number) {
  const test = await prisma.test.findUnique({
    where: {
      id: testId,
    },
  });
  return test;
}

async function getTestsByDiscipline(search: string) {
  if (search) {
    return prisma.term.findMany({
      include: {
        disciplines: {
          include: {
            teacherDisciplines: {
              include: {
                teacher: true,
                tests: {
                  include: {
                    category: true,
                    _count: {
                      select: {
                        View: true,
                      },
                    },
                  },
                },
              },
            },
          },
          where: {
            name: search,
          },
        },
      },
    });
  } else {
    return prisma.term.findMany({
      include: {
        disciplines: {
          include: {
            teacherDisciplines: {
              include: {
                teacher: true,
                tests: {
                  include: {
                    category: true,
                    _count: {
                      select: {
                        View: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}

async function getTestsByTeachers(search: string) {
  if (search) {
    return prisma.teacherDiscipline.findMany({
      where: {
        teacher: {
          name: search,
        },
      },
      include: {
        teacher: true,
        discipline: true,
        tests: {
          include: {
            category: true,
            _count: {
              select: {
                View: true,
              },
            },
          },
        },
      },
    });
  } else {
    return prisma.teacherDiscipline.findMany({
      include: {
        teacher: true,
        discipline: true,
        tests: {
          include: {
            category: true,
            _count: {
              select: {
                View: true,
              },
            },
          },
        },
      },
    });
  }
}

async function createTest(testData: Test) {
  await prisma.test.create({
    data: {
      name: testData.name,
      pdfUrl: testData.pdfUrl,
      categoryId: testData.categoryId,
      teacherDisciplineId: testData.teacherDisciplineId,
    },
  });
}

async function getteacherDiscipline(id: number) {
  const search = await prisma.teacherDiscipline.findFirst({
    where: {
      id: id,
    },
  });
  return search;
}

async function getteacherDisciplineByNames(
  teacher: string,
  discipline: string
) {
  const search = await prisma.teacherDiscipline.findFirst({
    where: {
      teacher: {
        name: teacher,
      },
      discipline: {
        name: discipline,
      },
    },
  });
  return search;
}

async function increaseViews(testId: number) {
  await prisma.view.create({
    data: {
      testId: testId,
    },
  });
}

async function getViewsById(testId: number) {
  const views = await prisma.view.count({
    where: {
      testId: testId,
    },
  });
  return views;
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
  createTest,
  getteacherDiscipline,
  getteacherDisciplineByNames,
  increaseViews,
  getViewsById,
  getTestById,
};
