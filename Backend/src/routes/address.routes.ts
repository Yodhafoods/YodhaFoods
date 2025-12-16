import { Router } from "express";
import {
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../controllers/address.controller.js";

import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
    createAddressSchema,
    updateAddressSchema,
} from "../schemas/address.schema.js";

const router = Router();

/**
 * All routes are USER AUTHENTICATED
 */
router.use(requireAuth);

/**
 * GET    /api/addresses        -> list my addresses
 * POST   /api/addresses        -> add new address
 */
router
    .route("/")
    .get(getMyAddresses)
    .post(validate(createAddressSchema), createAddress);

/**
 * PUT    /api/addresses/:id    -> update address
 * DELETE /api/addresses/:id    -> delete address
 */
router
    .route("/:id")
    .put(validate(updateAddressSchema), updateAddress)
    .delete(deleteAddress);

/**
 * PATCH  /api/addresses/:id/default -> mark address as default
 */
router.patch("/:id/default", setDefaultAddress);

export default router;
