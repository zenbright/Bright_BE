socket.on("video-clients-total", ({ groupId, videoSocketsConnectedSize }) => {
  if (groupId == serverGroupId) {
    videoClientsTotal.innerText = `Total Clients: ${videoSocketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});

socket.on("joined", ({ userId }) => {
  const urlId = window.location.pathname.split("/")[1];
  // console.log("userId: " + userId + " VS urlId: " + urlId);
  if (userId != urlId) {
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
  const urlId = window.location.pathname.split("/")[1];
  // console.log("userId: " + userId + " VS urlId: " + urlId);
  if (userId != urlId && joined) {
    gotRemoteOffer(offer, userId);
  }
});

socket.on("answer_sdp_received", ({ answer, userId, answerTo }) => {
  const urlId = window.location.pathname.split("/")[1];
  // console.log("userId: " + userId + " VS urlId: " + urlId);
  if (answerTo == urlId) {
    gotRemoteAnswer(answer);

    if (!videoMembers.includes(userId)) {
      sendIceCandidate(userId);
      videoMembers.push(userId);
    }
  }
});

socket.on(
  "ice_candidate_sdp_received",
  ({ candidate, userId, candidateTo }) => {
    const urlId = window.location.pathname.split("/")[1];
    // console.log("userId: " + userId + " VS urlId: " + urlId);
    if (candidateTo == urlId) {
      gotRemoteCandidate(candidate);
    }
  },
);
