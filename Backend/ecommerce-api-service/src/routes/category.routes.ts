import { Router } from "express";

import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryBySlug,
  addSubCategory,
  updateSubCategory,
  removeSubCategory,
} from "../controllers/category.controller.js";

import { validate } from "../middlewares/validate.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

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
  requireAdmin,
  upload.single("image"),
  validate(createCategorySchema), // Validate body after multer parses it
  createCategory
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  validate(updateCategorySchema),
  updateCategory
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  deleteCategory
);

// Subcategory Management
router.post(
  "/:id/subcategories",
  requireAuth,
  requireAdmin,
  addSubCategory
);

router.put(
  "/:id/subcategories/:slug",
  requireAuth,
  requireAdmin,
  updateSubCategory
);

router.delete(
  "/:id/subcategories/:slug",
  requireAuth,
  requireAdmin,
  removeSubCategory
);

export default router;
