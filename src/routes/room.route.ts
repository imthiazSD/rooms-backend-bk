import express from "express";
import {
  createRoom,
  getRoomById,
  getRooms,
} from "../controllers/room.controller";

const router = express.Router();

router.post("/create", createRoom);
router.get("/", getRooms);
router.get("/:id", getRoomById);

export default router;
