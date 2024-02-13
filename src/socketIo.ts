// Import necessary modules
import { Server } from "socket.io";
import { sendMessageService } from "./service/realtimechat/message/sendMessage/sendMessage.service";

const messageSocketsConnected = new Map();
interface VideoSocketsConnected {
  [groupId: string]: {
    [socketId: string]: Server;
  };
}

const videoSocketsConnected: VideoSocketsConnected = {};

// Initialize Socket.IO instances
const messageIo = new Server();
const videoCallIo = new Server();

// Function to initialize Socket.IO for message functionality
export const initMessageSocket = (server: any) => {
  messageIo.attach(server, {
    path: "/message",
  });

  messageIo.on("connection", (socket) => {
    const referer = socket.handshake.headers.referer;

    // Extract userId and groupId from the referer URL
    if (referer) {
      const userId = referer.split("/")[3];
      const groupId = referer.split("/")[4];

      increaseMessageClientCount(groupId, socket.id, messageIo);

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

      socket.on("disconnect", () => {
        decreaseMessageClientCount(groupId, socket.id, messageIo);
      });
    }
  });
};

// Function to initialize Socket.IO for video call functionality
export const initVideoCallSocket = (server: any) => {
  videoCallIo.attach(server, {
    path: "/videoCall",
  });

  videoCallIo.on("connection", (socket) => {
    const referer = socket.handshake.headers.referer;

    // Extract userId and groupId from the referer URL
    if (referer) {
      const userId = referer.split("/")[3];
      const groupId = referer.split("/")[4];
      // Handle video call actions
      socket.on("video-call-connection", (action, body) => {
        handleVideoCallAction(action, groupId, userId, videoCallIo, body);
      });

      socket.on("disconnect", () => {
        decreaseMessageClientCount(groupId, socket.id, videoCallIo);
      });
    }
  });
};

// Function to handle video call actions
function handleVideoCallAction(
  action: string,
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
    sendOffer(body.offer, body.offerTo, userId, io);
  } else if (action === "send_answer") {
    sendAnswer(body.answer, body.answerTo, userId, io);
  } else if (action === "send_ice_candidate") {
    sendIceCandidate(body.candidate, body.candidateTo, userId, io);
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

  io.emit("joined", {
    userId,
    userIds,
  });

  const videoSocketsConnectedSize = userIds.length;

  io.emit("video-clients-total", {
    groupId,
    videoSocketsConnectedSize,
  });
}

function leaveVideoCall(groupId: string, userId: string, io: Server) {
  console.log(userId, " left");
  io.emit("left", {
    userId,
  });

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

function sendOffer(offer: any, offerTo: string, userId: string, io: Server) {
  console.log("Sending offer from " + userId + " to " + offerTo);
  io.emit("offer_sdp_received", {
    offer,
    userId,
    offerTo,
  });
}

function sendAnswer(answer: any, answerTo: string, userId: string, io: Server) {
  console.log("Sending answer from " + userId + " to " + answerTo);

  io.emit("answer_sdp_received", {
    answer,
    userId,
    answerTo,
  });
}

function sendIceCandidate(
  candidate: any,
  candidateTo: string,
  userId: string,
  io: Server,
) {
  console.log("Sending candidate from " + userId + " to " + candidateTo);

  io.emit("ice_candidate_sdp_received", {
    candidate,
    userId,
    candidateTo,
  });
}

export default { initMessageSocket, initVideoCallSocket };
