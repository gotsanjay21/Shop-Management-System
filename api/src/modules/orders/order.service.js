// src/modules/orders/order.service.js
import { sequelize } from "../../config/db.js";
import { Order } from "./order.model.js";
import { OrderItem } from "./orderItem.model.js";
import { Product } from "../products/product.model.js";

export const createOrder = async (userId, items) => {
  const t = await sequelize.transaction();
  try {
    let total = 0;

    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product || product.stock < item.qty) throw new Error("Invalid stock");
      total += product.price * item.qty;
    }

    const order = await Order.create({ userId, total, status: "pending" }, { transaction: t });

    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create(
        { orderId: order.id, productId: product.id, qty: item.qty, price: product.price },
        { transaction: t }
      );
      await product.update({ stock: product.stock - item.qty }, { transaction: t });
    }

    await t.commit();
    return order;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const findOrdersByUser = async (userId) => {
  return Order.findAll({
    where: { userId },
    include: [{ model: OrderItem, include: [Product] }],
  });
};
