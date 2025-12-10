import { Router } from "express";

import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryBySlug,
} from "../controllers/category.controller.js";

import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema.js";

const router = Router();

// Public Routes
router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);

// Admin Routes
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  validate(createCategorySchema),
  createCategory
);

router.put(
  "/:id",
  requireAuth,
  requireRole("admin"),
  validate(updateCategorySchema),
  updateCategory
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  deleteCategory
);

export default router;
