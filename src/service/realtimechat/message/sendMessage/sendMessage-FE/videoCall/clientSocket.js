socket.on("video-clients-total", ({ groupId, videoSocketsConnectedSize }) => {
  if (groupId == serverGroupId) {
    videoClientsTotal.innerText = `Total Clients: ${videoSocketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});

socket.on("joined", ({ userId }) => {
  // console.log("userId: " + userId + " VS localUserId: " + localUserId);
  if (userId != localUserId) {
    console.log(userId, " just joined");
  }
});

socket.on("left", ({ userId }) => {
  console.log(userId, " User just left");
  if (videoMembers.includes(userId)) {
    const index = videoMembers.indexOf(userId);
    if (index !== -1) {
      videoMembers.splice(index, 1);
    }
  }
});

socket.on("offer_sdp_received", ({ offer, userId }) => {
  // console.log("userId: " + userId + " VS localUserId: " + localUserId);
  if (userId != localUserId && joined) {
    gotRemoteOffer(offer, userId);
  }
});

socket.on("answer_sdp_received", ({ answer, userId, answerTo }) => {
  // console.log("userId: " + userId + " VS localUserId: " + localUserId);
  if (answerTo == localUserId) {
    gotRemoteAnswer(answer, userId);

    if (!videoMembers.includes(userId)) {
      sendIceCandidate(userId);
      videoMembers.push(userId);
    }
  }
});

socket.on(
  "ice_candidate_sdp_received",
  ({ candidate, userId, candidateTo }) => {
    // console.log("userId: " + userId + " VS localUserId: " + localUserId);
    if (candidateTo == localUserId) {
      gotRemoteCandidate(candidate, userId);
    }
  },
);
