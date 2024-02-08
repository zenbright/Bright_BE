// Update total number of clients
socket.on("video-clients-total", ({ groupId, videoSocketsConnectedSize }) => {
  if (groupId == serverGroupId) {
    videoClientsTotal.innerText = `Total Clients: ${videoSocketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});

socket.on("joined", ({ userId }) => {
  // if (!SDPs.includes(userId)) {
  //   SDPs.push(userId);
  // }

  // const urlId = window.location.pathname.split("/")[1];
  // console.log("userId: " + userId + " VS urlId: " + urlId);
  // if (userId != urlId) {
  //   startCommunication();
  // }

  console.log(userId, " just joined");
});

socket.on("left", ({ body }) => {
  // const index = SDPs.indexOf(body);

  // if (index !== -1) {
  //   SDPs.splice(index, 1);
    console.log(body, " User just left");
  // } else {
  //   console.log("Element not found in SDPs array");
  // }
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
  }
});
