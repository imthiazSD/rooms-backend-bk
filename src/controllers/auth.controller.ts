import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { JWT_SECRET } from "../config";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error signing up." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "6h" });
    res.status(200).json({ token, id: user.id });
  } catch (error) {
    res.status(500).json({ error: "Error logging in." });
  }
};
