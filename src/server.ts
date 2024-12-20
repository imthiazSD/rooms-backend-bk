import http from "http";
import { Server } from "socket.io";
import { initWebSocket } from "./services/websocket.service";
import sequelize from "./database";
import app from "./app";
import { PORT } from "./config";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
    credentials: true,
  },
});

initWebSocket(io);

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
