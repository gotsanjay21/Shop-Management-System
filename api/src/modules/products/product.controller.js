// src/modules/products/product.controller.js
import { Product } from "./product.model.js";
import { OrderItem} from "../orders/orderItem.model.js";
import { Order } from "../orders/order.model.js";
import { Sequelize } from "sequelize";

export const getProducts = async (req, res, next) => {
  try {
    const { q, category, minPrice, maxPrice, sort, page = 1, pageSize = 10 } = req.query;

    const where = {};
    if (q) where.name = { [Sequelize.Op.like]: `%${q}%` };
    if (category) where.category = category;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Sequelize.Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Sequelize.Op.lte] = parseFloat(maxPrice);
    }

    const offset = (page - 1) * pageSize;
    const products = await Product.findAndCountAll({
      where,
      limit: parseInt(pageSize),
      offset,
      order: sort === "price" ? [["price", "ASC"]] : [["createdAt", "DESC"]],
    });

    res.json({ data: products.rows, total: products.count });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const topProductsLastYears = async (req, res, next) => {
  try {
    const { from = 2019, to = new Date().getFullYear(), limit = 5 } = req.query;

    const results = await OrderItem.findAll({
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

    res.json(results);
  } catch (err) {
    next(err);
  }
};
