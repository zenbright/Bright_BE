import { Server } from "socket.io";
import userInfoModel from "../models/userInfoModel";

const heartbeatIo = new Server();

export const initHeartbeatSocket = (server: any) => {
  heartbeatIo.attach(server, {
    path: "/heartbeat",
  });

  heartbeatIo.on("connection", async (socket: any) => {
    const referer = socket.handshake.headers.referer;

    // Extract userId and groupId from the referer URL
    if (referer) {
      const userId = referer.split("/")[3];
      console.log(userId, " socket connected");
      await updateUserState(userId, true);

      socket.on("heartbeat", () => {
        console.log(userId, " heartbeat checked at ", new Date().toISOString());
      });

      socket.on("disconnect", async () => {
        console.log(userId, " socket disconnected");
        await updateUserState(userId, false);
      });
    }
  });
};

async function updateUserState(userId: string, isOnline: boolean) {
  const userInfo = await userInfoModel.findOne({ _id: userId });
  if (!userInfo) {
    console.log("User not found");
  } else {
    userInfo.isOnline = isOnline;
    if (!isOnline) {
      userInfo.lastOnlineTime = new Date();
    }
    userInfo.save();
    console.log("User online info updated");
  }
}
