import testRepository from "../repositories/testRepository.js";

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

export default {
  find,
};
