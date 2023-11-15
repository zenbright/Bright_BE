import { Server, Socket } from "socket.io";
import { realtimeChatService } from "./service/user/realtimeChat/realtimeChat.service";

const socketsConnected = new Set();

// socket.io setup
export const initSocketIo = (server: any) => {
  const io = new Server(server, {});

  io.on("connection", (socket) => {
    increaseClientCount(socket.id, io);

    let groupId= "";
    socket.on("join", (groupId) => {
      console.log("groupId: " + groupId);
      groupId = groupId;
      socket.join(groupId); // Join the room corresponding to the group
    });

    socket.on("message", (data) => {
      console.log("received message:", data); // data: name, message, dateTime
      console.log("sender:", socket.id);

      const userId = socket.id; // Replace with userId from userCredentials
      realtimeChatService(groupId, userId, data);

      io.to(data.groupId).emit("message", data); // Send to all users in the group
    });

    socket.on("disconnect", () => {
      decreaseClientCount(socket.id, io);
    });
  });
};

function increaseClientCount(socketId: string, io: Server) {
  socketsConnected.add(socketId);
  io.emit("clients-total", socketsConnected.size);
}

function decreaseClientCount(socketId: string, io: Server) {
  socketsConnected.delete(socketId);
  io.emit("clients-total", socketsConnected.size);
}

export default initSocketIo;
