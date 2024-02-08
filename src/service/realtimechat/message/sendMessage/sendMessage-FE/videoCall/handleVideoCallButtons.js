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
      remoteStream = new MediaStream();
      socket.emit("video-call-connection", "join");
      startCommunication();
    },
    (error) => {
      console.error("getUserMedia error:", error);
    },
  );
}

function joinVideoCall() {
  enableMedia();
}

// Example: Call this function when leaving a video call
function leaveVideoCall() {
  handleVideoCall("leave");

  // Close the peer connection
  closeDataChannel();
  localPeerConnection.close();
  localPeerConnection = null;
  localPlayer.srcObject = null;
}
