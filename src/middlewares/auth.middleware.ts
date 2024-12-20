import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};
