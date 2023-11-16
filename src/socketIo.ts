import { Server, Socket } from "socket.io";
import { sendMessageService } from "./service/user/sendMessage/sendMessage.service";

const socketsConnected = new Set();

// socket.io setup
export const initSocketIo = (server: any) => {
  const io = new Server(server, {});

  io.on("connection", (socket) => {
    console.log(socket.id);
    increaseClientCount(socket.id, io);

    const referer = socket.handshake.headers.referer;
    console.log("referer: " + referer);
    // Extract userId and groupId from the referer URL
    if (referer) {
      const userId = referer.split("/")[3]; 
      const groupId = referer.split("/")[4];

      console.log("userId:", userId, "groupId:", groupId);

      socket.on("join", (groupId) => {
        console.log("groupId: " + groupId);
        socket.join(groupId); // Join the room corresponding to the group
      });

      socket.on("message", (data) => {
        console.log("received message:", data); // data: name, message, dateTime
        console.log("sender:", socket.id);

        // const userId = socket.id;
        sendMessageService(groupId, userId, data);

        io.to(groupId).emit("message", data); // Send to all users in the group
      });

      socket.on("disconnect", () => {
        decreaseClientCount(socket.id, io);
      });
    }
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
