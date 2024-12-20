import express from "express";
import { sendPing } from "../controllers/ping.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/send", authenticateUser, sendPing);

export default router;
