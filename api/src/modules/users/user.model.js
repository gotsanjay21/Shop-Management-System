// src/modules/users/user.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

export const User = sequelize.define("User", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  roles: { type: DataTypes.JSON }, // e.g. ["admin", "customer"]
}, { tableName: "users", timestamps: true });
