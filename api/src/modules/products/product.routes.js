// src/modules/products/product.routes.js
import { Router } from "express";
import { getProducts, getProductById, createProduct, topProductsLastYears } from "./product.controller.js";
import { requireAuth, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", requireAuth, requireRole("admin"), createProduct);
router.get("/analytics/top", requireAuth, requireRole("admin"), topProductsLastYears);

export default router;
