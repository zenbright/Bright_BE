import { Server, Socket } from "socket.io";
import { sendMessageService } from "./service/user/sendMessage/sendMessage.service";

const socketsConnected = new Map();

// socket.io setup
export const initSocketIo = (server: any) => {
  const io = new Server(server, {});

  io.on("connection", (socket) => {
    // console.log(socket.id);

    const referer = socket.handshake.headers.referer;
    // console.log("referer: " + referer);

    // Extract userId and groupId from the referer URL
    if (referer) {
      const userId = referer.split("/")[3];
      const groupId = referer.split("/")[4];

      increaseClientCount(groupId, socket.id, io);

      console.log("userId:", userId, "groupId:", groupId);

      socket.on("message", async (data, callback) => {
        console.log("received message:", data);

        try {
          // Process the message and obtain a result
          const sendMsgRes = await sendMessageService(groupId, userId, data);
          const formattedMsg = sendMsgRes?.newMessage;
          console.log("formattedMsg:", formattedMsg);

          // Broadcast the message to all users in the room
          socket.broadcast.emit("group-message", { groupId, formattedMsg });

          // Use the callback to send the result back to the client
          callback(formattedMsg);
        } catch (error) {
          // Handle errors here
          console.error("Error processing message:", error);
          callback({
            error: "An error occurred while processing the message.",
          });
        }
      });

      socket.on("disconnect", () => {
        decreaseClientCount(groupId, socket.id, io);
      });
    }
  });
};

function increaseClientCount(groupId: string, socketId: string, io: Server) {
  if (!socketsConnected.has(groupId)) {
    socketsConnected.set(groupId, new Set());
  }
  socketsConnected.get(groupId).add(socketId);
  const socketsConnectedSize = socketsConnected.get(groupId).size;
  io.emit("clients-total", { groupId, socketsConnectedSize });
}

function decreaseClientCount(groupId: string, socketId: string, io: Server) {
  if (socketsConnected.has(groupId)) {
    socketsConnected.get(groupId).delete(socketId);
    const socketsConnectedSize = socketsConnected.get(groupId).size;
    io.emit("clients-total", { groupId, socketsConnectedSize });
  }
}

export default initSocketIo;
