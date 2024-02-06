import { Server, Socket } from "socket.io";
import { sendMessageService } from "./service/realtimechat/message/sendMessage/sendMessage.service";

const messageSocketsConnected = new Map();
const videoSocketsConnected = new Map();

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

      increaseMessageClientCount(groupId, socket.id, io);

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

      // Handle video call actions
      socket.on("video-call-connection", (action) => {
        handleVideoCallAction(action, socket.id, groupId, io);
      });

      socket.on("disconnect", () => {
        decreaseMessageClientCount(groupId, socket.id, io);
      });
    }
  });
};

// Function to handle video call actions
function handleVideoCallAction(
  action: string,
  socketId: string,
  groupId: string,
  io: Server,
) {
  if (action === "join") {
    increaseVideoClientCount(groupId, socketId, io);
  } else if (action === "leave") {
    decreaseVideoClientCount(groupId, socketId, io);
  }
}

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

function increaseVideoClientCount(
  groupId: string,
  socketId: string,
  io: Server,
) {
  if (!videoSocketsConnected.has(groupId)) {
    videoSocketsConnected.set(groupId, new Set());
  }
  videoSocketsConnected.get(groupId).add(socketId);
  const videoSocketsConnectedSize = videoSocketsConnected.get(groupId).size;

  io.emit("video-clients-total", {
    groupId,
    videoSocketsConnectedSize,
  });
}

function decreaseVideoClientCount(
  groupId: string,
  socketId: string,
  io: Server,
) {
  if (videoSocketsConnected.has(groupId)) {
    videoSocketsConnected.get(groupId).delete(socketId);
    const videoSocketsConnectedSize = videoSocketsConnected.get(groupId).size;

    io.emit("video-clients-total", {
      groupId,
      videoSocketsConnectedSize,
    });
  }
}

export default initSocketIo;
