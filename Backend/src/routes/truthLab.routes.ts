import express from "express";
import { submitReportRequest } from "../controllers/truthLabController.js";

const router = express.Router();

router.post("/submit", submitReportRequest);

export default router;
