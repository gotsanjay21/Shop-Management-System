// src/modules/orders/order.controller.js
import { Order } from "./order.model.js";
import { OrderItem } from "./orderItem.model.js";
import { Product } from "../products/product.model.js";
import { User } from "../users/user.model.js"; // make sure you have User model

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id }, // fetch only current user's orders
      attributes: ["id", "total", "status", "createdAt"], // select order columns
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"], // include user info
        },
        {
          model: OrderItem,
          attributes: ["id", "qty", "price"],
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price", "stock"], // include product info
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]], // newest orders first
    });

    res.json(orders);
  } catch (err) {
    next(err);
  }
};
