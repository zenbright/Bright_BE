import { Server } from "socket.io";
import { sendMessageService } from "../service/realtimechat/message/sendMessage/sendMessage.service";

const messageSocketsConnected = new Map();

const messageIo = new Server();

export const initMessageSocket = (server: any) => {
  messageIo.attach(server, {
    path: "/message",
  });

  messageIo.on("connection", (socket) => {
    const referer = socket.handshake.headers.referer;

    // Extract userId and groupId from the referer URL
    if (referer) {
      const userId = referer.split("/")[3];
      const groupId = referer.split("/")[4];

      increaseMessageClientCount(groupId, socket.id, messageIo);

      socket.on("message", async (data, callback) => {
        try {
          // Process the message and obtain a result
          const sendMsgRes = await sendMessageService(groupId, userId, data);
          const formattedMsg = sendMsgRes?.newMessage;

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
        decreaseMessageClientCount(groupId, socket.id, messageIo);
      });
    }
  });
};

function increaseMessageClientCount(
  groupId: string,
  socketId: string,
  io: Server,
) {
  if (!messageSocketsConnected.has(groupId)) {
    messageSocketsConnected.set(groupId, new Set());
  }
  messageSocketsConnected.get(groupId).add(socketId);
  const socketsConnectedSize = messageSocketsConnected.get(groupId).size;
  io.emit("clients-total", { groupId, socketsConnectedSize });
}

function decreaseMessageClientCount(
  groupId: string,
  socketId: string,
  io: Server,
) {
  if (messageSocketsConnected.has(groupId)) {
    messageSocketsConnected.get(groupId).delete(socketId);
    const socketsConnectedSize = messageSocketsConnected.get(groupId).size;
    io.emit("clients-total", { groupId, socketsConnectedSize });
  }
}
