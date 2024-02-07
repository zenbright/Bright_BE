const videoGrid = document.getElementById("video-grid");
const videoConnectButton = document.getElementById("video-connect-btn");
const videoClientsTotal = document.getElementById("video-client-total");

const constraints = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
  },
  audio: true,
};

// Function to handle video call actions
function handleVideoCall(action) {
  socket.emit("video-call-connection", action);
}

function enableMedia() {
  // Setting up the local media stream (camera and microphone).
  navigator.getUserMedia(
    { audio: true, video: true, constraints },
    (stream) => {
      // render local stream on DOM
      localPlayer.srcObject = stream;
      localStream = stream;
      callOnClick(stream);
    },
    (error) => {
      console.error("getUserMedia error:", error);
    },
  );
}

function joinVideoCall() {
  enableMedia();
  handleVideoCall("join");
  console.log("JOINED");
}

// Example: Call this function when leaving a video call
function leaveVideoCall() {
  handleVideoCall("leave");

  // Close the peer connection
  closeDataChannel();
  localPeerConnection.close();
  localPeerConnection = null;
  localPlayer.srcObject = null;
  SDPs.delete(sdp);
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

socket.on("joined", ({ sdp }) => {
  console.log("sdp: " + sdp);
  if (!SDPs.includes(sdp)) {
    SDPs.push(sdp);
  }
  console.log("User just joined");
});

socket.on("offer_sdp_received", ({ offer }) => {
  console.log("offer: " + offer);
  onAnswer(offer);
});

socket.on("answer_sdp_received", ({ answer }) => {
  gotRemoteDescription(answer);
});
