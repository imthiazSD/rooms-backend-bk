import { Request, Response } from "express";
import { Server } from "socket.io";
import Room from "../models/room.model";
import User from "../models/user.model";
import Ping from "../models/ping.model";

let io: Server;

export const setSocketInstance = (socketInstance: Server) => {
  io = socketInstance;
};

export const sendPing = async (req: Request, res: Response) => {
  try {
    const { recipientId, roomId } = req.body;
    const fromUserId = req.body.user.id;

    const fromUser = await User.findByPk(fromUserId);
    const toUser = await User.findByPk(recipientId);
    const room = await Room.findByPk(roomId);

    console.log(fromUser?.id, toUser?.id, room?.id);

    if (!fromUser || !toUser || !room) {
      res.status(404).json({ error: "Invalid user or room" });
      return;
    }

    await Ping.create({
      fromUserId,
      toUserId: recipientId,
      roomId,
    });

    res.status(200).json({ message: "Ping sent successfully" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending ping" });
  }
};
