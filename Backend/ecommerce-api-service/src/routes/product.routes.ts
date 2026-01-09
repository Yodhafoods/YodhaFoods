import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  getProductsBySubCategory,
} from "../controllers/product.controller.js";

import { requireAuth, requireAdmin } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { validate } from "../middlewares/validate.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

const router = Router();

/** ==========================
 *  PUBLIC ROUTES
 *  ========================== */
router.get("/", getProducts); // list products
router.get("/:slug", getProductBySlug); // product detail page
router.get("/category/:slug", getProductsByCategory); // list products by category
router.get("/category/:categorySlug/:subCategorySlug", getProductsBySubCategory); // list products by subcategory

/** ==========================
 *  ADMIN ROUTES
 *  ========================== */
router.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.array("images", 10), // Allow up to 10 images
  validate(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  upload.array("images", 10),
  validate(updateProductSchema),
  updateProduct
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  deleteProduct
);

export default router;
