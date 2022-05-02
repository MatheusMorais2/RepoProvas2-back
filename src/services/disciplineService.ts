import disciplineRepository from "../repositories/disciplineRepository.js";

async function findMany() {
  return await disciplineRepository.findMany();
}

export default { findMany };
