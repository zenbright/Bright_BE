socket.on("video-clients-total", ({ groupId, videoSocketsConnectedSize }) => {
  if (groupId == serverGroupId) {
    videoClientsTotal.innerText = `Total Clients: ${videoSocketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});

socket.on("joined", ({ userId, userIds }) => {
  console.log(userId, " just joined");
  if (userId == localUserId) {
    sendOffer(userIds);
  }
});

socket.on("left", ({ userId }) => {
  console.log(userId, " User just left");
  if (userId != localUserId) {
    handleElementAfterLeaving(userId);
  }
});

socket.on("offer_sdp_received", ({ offer, userId, offerTo }) => {
  if (offerTo == localUserId) {
    // console.log("Received Offer From ", userId, " to ", offerTo);
    gotRemoteOffer(offer, userId);
  }
});

socket.on("answer_sdp_received", ({ answer, userId, answerTo }) => {
  if (answerTo == localUserId) {
    // console.log("Received Answer From ", userId, " to ", answerTo);
    gotRemoteAnswer(answer, userId);
    sendIceCandidate(userId);
  }
});

socket.on(
  "ice_candidate_sdp_received",
  ({ candidate, userId, candidateTo }) => {
    if (candidateTo == localUserId) {
      gotRemoteCandidate(candidate, userId);
    }
  },
);
