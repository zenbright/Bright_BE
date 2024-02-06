const videoGrid = document.getElementById("video-grid");
const videoConnectButton = document.getElementById("video-connect-btn");
const videoClientsTotal = document.getElementById("video-client-total");

// Function to handle video call actions
function handleVideoCall(action) {
  socket.emit("video-call-connection", action);
}

// Example: Call this function when starting a video call
function startVideoCall() {
  handleVideoCall("join");
  console.log("JOINED");
}

// Example: Call this function when leaving a video call
function leaveVideoCall() {
  handleVideoCall("leave");
  console.log("LEFT");
}

// Update total number of clients
socket.on("video-clients-total", ({ groupId, videoSocketsConnectedSize }) => {
  if (groupId == serverGroupId) {
    videoClientsTotal.innerText = `Total Clients: ${videoSocketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});
