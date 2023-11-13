import { Server, Socket } from "socket.io";

const socketsConnected = new Set();

export const initSocketIo = (server: any) => {
  const io = new Server(server, {});

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");
    increaseClientCount(socket.id, io);

    socket.on("message", (data) => {
      console.log("received message: " + data.message);
      console.log("sender: " + socket.id);
      io.emit("message", data);
      socket.broadcast.emit("chat-message", data);
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
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
