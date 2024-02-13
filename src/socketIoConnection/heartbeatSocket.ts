import { Server } from "socket.io";

const heartbeatIo = new Server();

export const initHeartbeatSocket = (server: any) => {
  heartbeatIo.attach(server, {
    path: "/heartbeat",
  });

  heartbeatIo.on("connection", (socket: any) => {
    const referer = socket.handshake.headers.referer;

    // Extract userId and groupId from the referer URL
    if (referer) {
      const userId = referer.split("/")[3];
      console.log(userId, " socket connected");
      updateUserState(userId, true);

      socket.on("heartbeat", () => {
        console.log(userId, " heartbeat checked at ", new Date().toISOString());
      });

      socket.on("disconnect", () => {
        console.log(userId, " socket disconnected");
        updateUserState(userId, false);
      });
    }
  });
};

function updateUserState(userId: string, isOnline: boolean) {}
