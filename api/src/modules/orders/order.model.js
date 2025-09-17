// src/modules/orders/order.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import { User } from "../users/user.model.js";

export const Order = sequelize.define("Order", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  status: { type: DataTypes.ENUM("pending","paid","shipped","cancelled"), defaultValue: "pending" },
  total: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
}, { tableName: "orders", timestamps: true });

Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });
