// src/modules/users/user.service.js
import { User } from "./user.model.js";
import bcrypt from "bcrypt";

export const findAllUsers = async () => {
  return User.findAll({ attributes: { exclude: ["passwordHash"] } });
};

export const findUserById = async (id) => {
  return User.findByPk(id, { attributes: { exclude: ["passwordHash"] } });
};

export const createUser = async ({ email, password, name, roles }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return User.create({ email, passwordHash, name, roles });
};
