import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function generateUser() {
  const email = faker.internet.email();
  const user = {
    email: email,
    password: "123",
  };

  try {
    await prisma.user.create({
      data: {
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
      },
    });
  } catch {
    console.log("erro ao criar usuario em factories/userFactory");
  }

  return user;
}

async function generateLoginToken(user: { email: string; password: string }) {
  try {
    const userDb = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!userDb) console.log("User not found");

    const passwordVerification = bcrypt.compareSync(
      user.password,
      userDb.password
    );
    if (!passwordVerification) console.log("Wrong password");

    const token = jwt.sign({ userId: userDb.id }, process.env.JWT_SECRET);
    return token;
  } catch {
    console.log(
      "Erro ao fazer login em generateLoginToken em factories/userFactory"
    );
  }
}

export default {
  generateUser,
  generateLoginToken,
};
