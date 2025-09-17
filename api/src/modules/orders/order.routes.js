// src/modules/orders/order.routes.js
import { Router } from "express";
import {getOrders } from "./order.controller.js";
import { requireAuth } from "../../middlewares/auth.js";

const router = Router();

// router.post("/", createOrder);
router.get("/", requireAuth, getOrders);

export default router;
