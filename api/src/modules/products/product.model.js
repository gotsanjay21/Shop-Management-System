// src/modules/products/product.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

export const Product = sequelize.define("Product", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, unique: true },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  category: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: "products", timestamps: true });
