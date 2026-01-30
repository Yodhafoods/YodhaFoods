import express from "express";
import { submitPartnerRequest } from "../controllers/partner.controller.js";

const router = express.Router();

router.post("/join", submitPartnerRequest);

export default router;
