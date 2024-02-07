// Update total number of clients
socket.on("video-clients-total", ({ groupId, videoSocketsConnectedSize }) => {
  if (groupId == serverGroupId) {
    videoClientsTotal.innerText = `Total Clients: ${videoSocketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});

socket.on("joined", ({ body }) => {
  console.log("sdp: " + body);
  if (!SDPs.includes(body)) {
    SDPs.push(body);
  }
  console.log("User just joined");
});

socket.on("left", ({ body }) => {
  console.log("socketId: " + body);
  // Find the index of the element you want to delete
  const index = SDPs.indexOf(body);

  // Check if the element exists in the array
  if (index !== -1) {
    // Remove the element at the found index
    SDPs.splice(index, 1);
    console.log("User just left");
  } else {
    console.log("Element not found in SDPs array");
  }
});

socket.on("offer_sdp_received", ({ body }) => {
  //   console.log("offer: " + JSON.stringify(body));
  //   const JSONobjectBody = JSON.parse(body);
  //   const { type, sdp } = body;

  // Creating a new instance of RTCSessionDescription using the constructor
  //   const sessionDescription = new RTCSessionDescription({ type, sdp });
  handleOffer(body);
});

socket.on("answer_sdp_received", ({ body }) => {
  //  console.log("answer received - answer: " + JSON.stringify(body));
  //   const JSONobjectBody = JSON.parse(body);
  //   const { type, sdp } = body;

  // Creating a new instance of RTCSessionDescription using the constructor
  //   const sessionDescription = new RTCSessionDescription({ type, sdp });
  gotRemoteDescription(body);
});
