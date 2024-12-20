import { Server } from "socket.io";
import User from "../models/user.model";
import { RECONNECTION_WINDOW } from "../config";
import UserRoom from "../models/userRoom.model";

let io: Server;

const userSocketMap = new Map<string, string>(); // Map of userId -> socketId

export const initWebSocket = (server: Server) => {
  io = server;

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join-room", async ({ userId, roomId }) => {
      socket.join(roomId);
      userSocketMap.set(userId, socket.id);
      io.to(roomId).emit("user-joined", { id: socket.id });
      // Update user status to online
      await User.update({ status: "online" }, { where: { id: userId } });
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
      io.to(roomId).emit("user-left", { id: socket.id });
    });

    socket.on("logout", async (userId) => {
      userSocketMap.delete(userId);
      await User.update({ status: "offline" }, { where: { id: userId } });
    });

    socket.on("ping", async ({ senderId, recipientId, roomId }) => {
      const recipientSocketId = userSocketMap.get(recipientId);
      const senderDetails = await User.findOne({
        where: { id: senderId },
        attributes: ["username", "status"],
      });
      const recipientRoom = await UserRoom.findOne({
        where: { userId: recipientId, roomId },
      });
      console.log("Sender Detilas", senderId, senderDetails);
      if (recipientSocketId && (!recipientRoom || !recipientRoom.focusMode)) {
        io.to(recipientSocketId).emit("receivePing", {
          from: {
            id: senderId,
            username: senderDetails?.username,
            status: senderDetails?.status,
          },
          message: "You have been pinged!",
        });
        console.log(`Ping sent from user ${senderId} to user ${recipientId}`);
      } else {
        console.log(`User ${recipientId} is not online or in focus mode`);
      }
    });

    socket.on("disconnect", async () => {
      const entries = Array.from(userSocketMap.entries());
      const userId = entries.find(([, id]) => id === socket.id)?.[0];
      if (userId) {
        userSocketMap.delete(userId);
        console.log(`User ${userId} disconnected and removed from the map`);
        setTimeout(async () => {
          if (!userSocketMap.has(userId)) {
            await User.update({ status: "offline" }, { where: { id: userId } });
            console.log(
              `User ${userId} status set to offline after ${
                RECONNECTION_WINDOW / 1000
              } seconds`
            );
          } else {
            console.log(
              `User ${userId} reconnected in the same window, status not switched`
            );
          }
        }, RECONNECTION_WINDOW);
      }
    });
  });
};

export const getIo = () => io;
