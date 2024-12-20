import express from "express";
import {
  joinRoom,
  leaveRoom,
  getUsersInRoom,
  setFocusMode,
  getFocusMode,
} from "../controllers/userRoom.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/join", authenticateUser, joinRoom);

router.post("/leave", authenticateUser, leaveRoom);

router.get("/:roomId/users", authenticateUser, getUsersInRoom);

router.put("/:roomId/focus-mode", authenticateUser, setFocusMode);

router.get("/:roomId/focus-mode", authenticateUser, getFocusMode);

export default router;
