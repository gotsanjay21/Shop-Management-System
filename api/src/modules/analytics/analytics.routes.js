import { Router } from "express";
import { getSalesAnalytics } from "./analytics.Controller.js";
import { requireAuth } from "../../middlewares/auth.js";

const router = Router();
router.get("/sales", requireAuth, getSalesAnalytics);

export default router;
