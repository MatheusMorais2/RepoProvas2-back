import testRepository from "../repositories/testRepository.js";
import categoryRepository from "../repositories/categoryRepository.js";
import { Test, CreateTest } from "../controllers/testController.js";
import { notFoundError } from "../utils/errorUtils.js";

interface Filter {
  groupBy: "disciplines" | "teachers";
  search: string;
}

async function find(filter: Filter) {
  if (filter.groupBy === "disciplines") {
    return testRepository.getTestsByDiscipline(filter.search);
  } else if (filter.groupBy === "teachers") {
    return testRepository.getTestsByTeachers(filter.search);
  }
}

async function createTest(testData: CreateTest) {
  const categorySearch = await categoryRepository.getCategoryByName(
    testData.category
  );
  if (!categorySearch) throw notFoundError("Category not found");

  const teacherDisciplineSearch =
    await testRepository.getteacherDisciplineByNames(
      testData.teacher,
      testData.discipline
    );
  if (!teacherDisciplineSearch)
    throw notFoundError("Teacher discipline not found");

  let test = {
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: categorySearch.id,
    teacherDisciplineId: teacherDisciplineSearch.id,
  };
  await testRepository.createTest(test);
}

export default {
  find,
  createTest,
};
