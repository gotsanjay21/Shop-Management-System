// src/modules/orders/orderItem.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import { Order } from "./order.model.js";
import { Product } from "../products/product.model.js";

export const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  qty: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: "order_items", timestamps: false });

OrderItem.belongsTo(Order, { foreignKey: "orderId" });
Order.hasMany(OrderItem, { foreignKey: "orderId" });

OrderItem.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });
