import { prisma } from "../database.js";

async function findMany() {
  const search = await prisma.discipline.findMany({
    include: {
      teacherDisciplines: {
        include: {
          teacher: true,
        },
      },
    },
  });
  return search;
}

export default {
  findMany,
};
