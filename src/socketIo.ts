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

      socket.on("message", (data) => {
        console.log("received message:", data); // data: name, message, dateTime
        // console.log("sender:", socket.id);

        // Broadcast the message to all users in the room
        socket.broadcast.emit("group-message", { groupId, data });
        sendMessageService(groupId, userId, data);
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
