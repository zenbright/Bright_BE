socket.on("video-clients-total", ({ groupId, videoSocketsConnectedSize }) => {
  if (groupId == serverGroupId) {
    videoClientsTotal.innerText = `Total Clients: ${videoSocketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});

socket.on("joined", ({ userId }) => {
  const urlId = window.location.pathname.split("/")[1];
  console.log("userId: " + userId + " VS urlId: " + urlId);
  if (userId != urlId) {
    console.log(userId, " just joined");
  }
});

socket.on("left", ({ body }) => {
  console.log(body, " User just left");
  if (videoMembers.includes(userId)) {
    const index = videoMembers.indexOf(userId);
    if (index !== -1) {
        videoMembers.splice(index, 1);
    }
}
});

socket.on("offer_sdp_received", ({ offer, userId }) => {
  const urlId = window.location.pathname.split("/")[1];
  console.log("userId: " + userId + " VS urlId: " + urlId);
  if (userId != urlId) {
    gotRemoteOffer(offer);
  }
});

socket.on("answer_sdp_received", ({ answer, userId }) => {
  const urlId = window.location.pathname.split("/")[1];
  console.log("userId: " + userId + " VS urlId: " + urlId);
  if (userId != urlId) {
    gotRemoteAnswer(answer);

    if (!videoMembers.includes(userId)) {
      startCommunication();
      videoMembers.push(userId);
    }
  }
});
