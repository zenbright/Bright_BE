import { Server, Socket } from "socket.io";
import { sendMessageService } from "./service/realtimechat/message/sendMessage/sendMessage.service";

const messageSocketsConnected = new Map();
interface VideoSocketsConnected {
  [groupId: string]: {
    [socketId: string]: Server;
  };
}

const videoSocketsConnected: VideoSocketsConnected = {};
// socket.io setup
export const initSocketIo = (server: any) => {
  const io = new Server(server, {});

  io.on("connection", (socket) => {
    const referer = socket.handshake.headers.referer;

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
      socket.on("video-call-connection", (action, body) => {
        handleVideoCallAction(action, socket.id, groupId, userId, io, body);
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
  userId: string,
  io: Server,
  body: any,
) {
  if (action === "join") {
    joinVideoCall(groupId, userId, io);
  } else if (action === "leave") {
    leaveVideoCall(groupId, userId, io);
  } else if (action === "send_offer") {
    sendOffer(groupId, body.offer, userId, io);
  } else if (action === "send_answer") {
    sendAnswer(groupId, body.answer, userId, io);
  } else if (action === "send_ice_candidate") {
    sendIceCandidate(body.candidate, groupId, userId);
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

function joinVideoCall(groupId: string, userId: string, io: Server) {
  if (videoSocketsConnected[groupId]) {
    videoSocketsConnected[groupId][userId] = io;
  } else {
    videoSocketsConnected[groupId] = {};
    videoSocketsConnected[groupId][userId] = io;
  }

  const userIds = Object.keys(videoSocketsConnected[groupId]);
  console.log("Joined userIds: ", userIds);

  userIds.forEach((id: string) => {
    if (id != userId) {
      console.log(userId, " joined --> ", id);
      // const wsClient = videoSocketsConnected[groupId][id];
      // send(wsClient, "joined", userId);

      io.emit("joined", {
        userId,
      });
    }
  });

  

  const videoSocketsConnectedSize = userIds.length;

  io.emit("video-clients-total", {
    groupId,
    videoSocketsConnectedSize,
  });
}

function leaveVideoCall(groupId: string, userId: string, io: Server) {
  const wsClient = videoSocketsConnected[groupId][userId];
  send(wsClient, "left", userId);

  let videoSocketsConnectedSize = 0;
  if (videoSocketsConnected[groupId]) {
    delete videoSocketsConnected[groupId][userId];
    const userIds = Object.keys(videoSocketsConnected[groupId]);
    if (userIds.length === 0) {
      delete videoSocketsConnected[groupId];
    }
    videoSocketsConnectedSize = userIds.length;
  }

  io.emit("video-clients-total", {
    groupId,
    videoSocketsConnectedSize,
  });
}

function sendOffer(groupId: string, offer: any, userId: string, io: Server) {
  let userIds = Object.keys(videoSocketsConnected[groupId]);
  userIds.forEach((id: string) => {
    if (id != userId) {
      console.log("Sending offer from " + userId + " to " + id);
      io.emit("offer_sdp_received", {
        offer,
        userId,
      });
    }
  });
}

function sendAnswer(groupId: string, answer: any, userId: string, io: Server) {
  let userIds = Object.keys(videoSocketsConnected[groupId]);
  userIds.forEach((id: string) => {
    if (id != userId) {
      console.log("Sending answer from " + userId + " to " + id);
      io.emit("answer_sdp_received", {
        answer,
        userId,
      });
    }
  });
}

function sendIceCandidate(candidate: any, groupId: string, socketId: string) {
  let userSocketIds = Object.keys(videoSocketsConnected[groupId]);
  userSocketIds.forEach((id: string) => {
    if (id != socketId) {
      console.log("Sending Ice Candidate from " + socketId + " to " + id);
      const wsClient = videoSocketsConnected[groupId][id];
      send(wsClient, "ice_candidate_received", candidate);
    }
  });
}

function send(wsClient: any, type: string, body: any) {
  wsClient.emit(type, {
    body,
  });
}

export default initSocketIo;
