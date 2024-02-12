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
      localStream.getTracks().forEach((track) => {
        localPeerConnection.addTrack(track, localStream);
      });
      localPeerConnection.addStream(localStream);
      socket.emit("video-call-connection", "join");
      sendOffer();
    },
    (error) => {
      console.error("getUserMedia error:", error);
    },
  );
}

function joinVideoCall() {
  enableMedia();
  joined = true;
}

// Example: Call this function when leaving a video call
function leaveVideoCall() {
  handleVideoCall("leave");
  joined = false;
  // localPeerConnection.close();
  // localPeerConnection = null;
  // remotePeerConnection.close();
  // remotePeerConnection = null;
  localPlayer.srcObject = null;
  // Set srcObject of all peerPlayer-IDs to null
  Object.keys(remotePeerConnections).forEach((peerId) => {
    const videoElement = document.getElementById(`peerPlayer-${peerId}`);
    if (videoElement) {
      videoElement.srcObject = null;
    }
  });
}
