import { Server } from "socket.io";

interface VideoSocketsConnected {
  [groupId: string]: {
    [socketId: string]: Server;
  };
}

const videoSocketsConnected: VideoSocketsConnected = {};
const videoCallIo = new Server();

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
        //   decreaseMessageClientCount(groupId, socket.id, videoCallIo);
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
