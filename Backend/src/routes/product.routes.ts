import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductBySlug,
} from "../controllers/product.controller.js";

import { requireAuth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.js";

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

/** ==========================
 *  ADMIN ROUTES
 *  ========================== */
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  validate(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  requireAuth,
  requireRole("admin"),
  validate(updateProductSchema),
  updateProduct
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  deleteProduct
);

export default router;
