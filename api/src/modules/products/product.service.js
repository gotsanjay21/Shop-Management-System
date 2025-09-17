// src/modules/products/product.service.js
import { Product } from "./product.model.js";
import { OrderItem, Order } from "../orders/orderItem.model.js";
import { Sequelize } from "sequelize";

export const findProducts = async (filters, pagination, sort) => {
  const { q, category, minPrice, maxPrice } = filters;
  const { page, pageSize } = pagination;

  const where = {};
  if (q) where.name = { [Sequelize.Op.like]: `%${q}%` };
  if (category) where.category = category;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Sequelize.Op.gte] = parseFloat(minPrice);
    if (maxPrice) where.price[Sequelize.Op.lte] = parseFloat(maxPrice);
  }

  return Product.findAndCountAll({
    where,
    limit: parseInt(pageSize),
    offset: (page - 1) * pageSize,
    order: sort === "price" ? [["price", "ASC"]] : [["createdAt", "DESC"]],
  });
};

export const findProductById = async (id) => Product.findByPk(id);

export const createProduct = async (data) => Product.create(data);

export const getTopProducts = async (from, to, limit) => {
  return OrderItem.findAll({
    attributes: [
      "productId",
      [Sequelize.fn("SUM", Sequelize.col("qty")), "totalQty"],
      [Sequelize.fn("SUM", Sequelize.literal("qty * price")), "totalSales"],
    ],
    include: [{ model: Product, attributes: ["name"] }, { model: Order, attributes: ["createdAt"] }],
    where: Sequelize.where(
      Sequelize.fn("YEAR", Sequelize.col("Order.createdAt")),
      { [Sequelize.Op.between]: [from, to] }
    ),
    group: ["productId"],
    order: [[Sequelize.literal("totalSales"), "DESC"]],
    limit: parseInt(limit),
  });
};

