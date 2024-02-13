import { Server } from "socket.io";
import userInfoModel from "../models/userInfoModel";

const heartbeatIo = new Server();

export const initHeartbeatSocket = (server: any) => {
  heartbeatIo.attach(server, {
    path: "/heartbeat",
  });

  heartbeatIo.on("connection", async (socket: any) => {
    const referer = socket.handshake.headers.referer;

    if (referer) {
      const userId = referer.split("/")[3];
      // console.log(userId, " socket connected");

      // Update user state and start heartbeat check interval
      await updateUserState(userId, true);
      startHeartbeatCheck(userId, socket);

      // When the user's back after offline period
      socket.on("heartbeat_revive", async () => {
        await updateUserState(userId, true);
        startHeartbeatCheck(userId, socket);
      });
    }
  });
};

// Change the state as offline if the user is offline for 90 seconds
function startHeartbeatCheck(userId: string, socket: any) {
  let consecutiveFailures = 0;

  const heartbeatInterval = setInterval(() => {
    // console.log(userId, " heartbeat checked at ", new Date().toISOString());
    socket.emit("heartbeat");

    // Check for consecutive failures
    if (consecutiveFailures >= 2) {
      clearInterval(heartbeatInterval);
      updateUserState(userId, false);
      // console.log(
      //   `User ${userId} marked as offline due to consecutive failures.`,
      // );
    } else {
      consecutiveFailures++;
    }
  }, 30000); 

  socket.on("heartbeat_answer", () => {
    console.log(userId, " received heartbeat answer from client");
    // Reset consecutive failures upon receiving heartbeat answer
    consecutiveFailures = 0;
  });

  socket.on("disconnect", async () => {
    clearInterval(heartbeatInterval);
    // console.log(userId, " socket disconnected");
    await updateUserState(userId, false);
  });
}

async function updateUserState(userId: string, isOnline: boolean) {
  const userInfo = await userInfoModel.findOne({ _id: userId });
  if (!userInfo) {
    // console.log("User not found");
  } else {
    userInfo.isOnline = isOnline;
    if (!isOnline) {
      userInfo.lastOnlineTime = new Date();
    }
    await userInfo.save();
    // console.log("Updated user info: " + userInfo);
  }
}
