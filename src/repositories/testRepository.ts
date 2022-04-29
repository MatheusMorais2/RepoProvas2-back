import { prisma } from "../database.js";

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
          },
        },
      },
    });
  }
}

export default {
  getTestsByDiscipline,
  getTestsByTeachers,
};
