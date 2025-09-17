// src/modules/users/user.routes.js
import { Router } from "express";
import { getUsers, getUserById, createUser } from "./user.controller.js";
import { requireAuth, requireRole } from "../../middlewares/auth.js";
// import {} from '../../middlewares/auth.js'

const router = Router();

router.get("/", requireAuth, requireRole("admin"), getUsers);
router.get("/:id", requireAuth, getUserById);
router.post("/", requireAuth, requireRole("admin"), createUser);

export default router;

