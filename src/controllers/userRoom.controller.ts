import { Request, Response } from "express";
import { Op } from "sequelize";
import Room from "../models/room.model";
import User from "../models/user.model";
import UserRoom from "../models/userRoom.model";
import { getIo } from "../services/websocket.service";

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const {
      user: { id },
      roomId,
    } = req.body;

    const _user = await User.findByPk(id);
    const room = await Room.findByPk(roomId);

    if (!_user || !room) {
      res.status(404).json({ error: "User or Room not found" });
      return;
    }

    // Check if the user is already in the room
    const existingEntry = await UserRoom.findOne({
      where: { userId: id, roomId },
    });
    if (existingEntry) {
      res.status(400).json({ error: "User already in the room" });
      return;
    }

    await UserRoom.create({ userId: id, roomId });

    const io = getIo();
    io.to(roomId).emit("user-joined", {
      id,
      username: _user.username,
      status: _user.status,
    });

    res.status(200).json({ message: "User joined the room successfully" });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ error: "Error joining room" });
  }
};

export const leaveRoom = async (req: Request, res: Response) => {
  try {
    const {
      user: { id },
      roomId,
    } = req.body;

    const user = await User.findByPk(id);
    const room = await Room.findByPk(roomId);

    if (!user || !room) {
      res.status(404).json({ error: "User or Room not found" });
      return;
    }

    // Remove the user from the room
    const deletionCount = await UserRoom.destroy({
      where: { userId: id, roomId },
    });
    if (deletionCount === 0) {
      res.status(404).json({ error: "User was not in the room" });
      return;
    }

    const io = getIo();
    io.to(roomId).emit("user-left", { id });

    res.status(200).json({ message: "User left the room successfully" });
  } catch (error) {
    console.error("Error leaving room:", error);
    res.status(500).json({ error: "Error leaving room" });
  }
};

export const getUsersInRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const userId = req.body.user.id;

    const room = await Room.findByPk(roomId);

    if (!room) {
      res.status(404).json({ error: "Room not found" });
      return;
    }

    const users = await UserRoom.findAll({
      where: { roomId, userId: { [Op.ne]: userId } },
      include: [{ model: User, attributes: ["id", "username", "status"] }],
    });

    res.status(200).json(users.map((entry) => entry.User));
  } catch (error) {
    console.error("Error fetching users in room:", error);
    res.status(500).json({ error: "Error fetching users in room" });
  }
};

export const setFocusMode = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { focusMode } = req.body;
    const userId = req.body.user.id;

    const userRoom = await UserRoom.findOne({ where: { userId, roomId } });
    if (!userRoom) {
      res.status(404).json({ error: "User not found in the room" });
      return;
    }
    userRoom.focusMode = focusMode;
    await userRoom.save();
    res.status(200).json({ message: "Focus mode updated successfully" });
  } catch (error) {
    console.error("Error setting focus mode:", error);
    res.status(500).json({ error: "Error setting focus mode" });
  }
};

export const getFocusMode = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const userId = req.body.user.id;
    const userRoom = await UserRoom.findOne({ where: { userId, roomId } });

    if (userRoom) {
      const focusMode = userRoom.focusMode;
      res.status(200).json({ focusMode });
      return;
    } else {
      res.status(404).json({ error: "User not found in the room" });
      return;
    }
  } catch (error) {
    console.error("Error getting focus mode:", error);
    res.status(500).json({ error: "Error getting focus mode" });
  }
};
