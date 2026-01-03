import { Router } from "express";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} from "../controllers/wishlist.controller.js";
import { guestMiddleware } from "../middlewares/guest.middleware.js";
import { optionalAuth } from "../middlewares/auth.js";

const router = Router();

router.use(optionalAuth);
router.use(guestMiddleware);

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);
router.delete("/clear", clearWishlist);

export default router;
