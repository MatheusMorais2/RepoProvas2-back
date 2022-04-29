import { prisma } from "../database.js";

async function findMany() {
  return prisma.category.findMany();
}

async function searchCategories(searchQuery: string) {
  return await prisma.category.findMany({
    where: {
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
  });
}

export default {
  findMany,
  searchCategories,
};
