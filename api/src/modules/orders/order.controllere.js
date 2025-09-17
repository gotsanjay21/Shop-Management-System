// src/modules/orders/order.controller.js
import { sequelize } from "../../config/db.js";
import { Order } from "./order.model.js";
import { OrderItem } from "./orderItem.model.js";
import { Product } from "../products/product.model.js";

export const createOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { items } = req.body; // [{productId, qty}]
    const userId = req.user.id;

    // Calculate total
    let total = 0;
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product || product.stock < item.qty) throw new Error("Invalid stock");
      total += product.price * item.qty;
    }

    // Create order
    const order = await Order.create({ userId, total, status: "pending" }, { transaction: t });

    // Add items
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create(
        { orderId: order.id, productId: product.id, qty: item.qty, price: product.price },
        { transaction: t }
      );
      await product.update({ stock: product.stock - item.qty }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: "Order created", orderId: order.id });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await req.db.query(`
      SELECT order
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
