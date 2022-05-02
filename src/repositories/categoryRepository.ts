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

async function getCategoryByName(category: string) {
  const search = await prisma.category.findUnique({
    where: {
      name: category,
    },
  });
  return search;
}

async function getCategory(categoryId: number) {
  const cateogory = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  return cateogory;
}

export default {
  findMany,
  searchCategories,
  getCategory,
  getCategoryByName,
};
