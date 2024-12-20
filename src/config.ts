import { config } from "dotenv-safe";
config({
  example: ".env.example",
});

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const RECONNECTION_WINDOW = process.env.RECONNECTION_WINDOW
  ? parseInt(process.env.RECONNECTION_WINDOW)
  : 30000; // 30 seconds in milliseconds;
export const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI || "";
