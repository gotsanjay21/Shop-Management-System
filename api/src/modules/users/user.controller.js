// src/modules/users/user.controller.js
import { User } from "./user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["passwordHash"] } });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ["passwordHash"] } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, password, name, roles} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name, roles});
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
};

