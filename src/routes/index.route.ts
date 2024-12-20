import express from "express";
import authRoutes from "./auth.route";
import pingRoutes from "./ping.route";
import userRoomRoutes from "./userRoom.route";
import roomRoutes from "./room.route";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/ping", pingRoutes);
router.use("/user-rooms", userRoomRoutes);
router.use("/rooms", roomRoutes);

export default router;
