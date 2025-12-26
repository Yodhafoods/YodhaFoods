import { Router } from "express";
import multer from "multer";
import { validate } from "../middlewares/validate.js";
import { createVideoSchema } from "../schemas/video.schema.js";
import {
  createVideo,
  getKitchenVideos,
} from "../controllers/video.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const router = Router();

// Multer setup for video uploads
const upload = multer({
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files allowed"));
    }
    cb(null, true);
  },
});


// Admin upload

router.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.single("video"),
  validate(createVideoSchema),
  createVideo
);


// Public kitchen page
router.get("/kitchen", getKitchenVideos);

export default router;
