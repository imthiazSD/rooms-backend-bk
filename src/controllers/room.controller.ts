import { Request, Response } from "express";
import Room from "../models/room.model";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const room = await Room.create({ name });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: "Error creating room." });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Error fetching rooms." });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      res.status(404).json({ error: "Room not found." });
      return;
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Error fetching room." });
  }
};
