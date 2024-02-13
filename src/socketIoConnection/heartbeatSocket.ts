import { Server } from "socket.io";

const heartbeatIo = new Server();

export const initHeartbeatSocket = (server: any) => {
  heartbeatIo.attach(server, {
    path: "/heartbeat",
  });

  heartbeatIo.on("connection", (socket) => {
    const referer = socket.handshake.headers.referer;

    // Extract userId and groupId from the referer URL
    if (referer) {
      const userId = referer.split("/")[3];

      socket.on("message", async (data, callback) => {});

      socket.on("disconnect", () => {});
    }
  });
};
