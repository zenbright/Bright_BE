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
    },
    (error) => {
      console.error("getUserMedia error:", error);
    },
  );
}

function handleElementAfterLeaving(peerId) {
  const containerElement = document.getElementById(`playerContainer-${peerId}`);
  if (containerElement) {
    containerElement.parentNode.removeChild(containerElement);
  }

  const videoElement = document.getElementById(`peerPlayer-${peerId}`);
  if (videoElement) {
    videoElement.srcObject = null;
  }
  remotePeerConnections[peerId].close();
  remotePeerConnections[peerId] = null;
}

/*
1. Join button click
2. Enable Media
3. Let peers know the user joined (send "join")
4. Get every peer who has joined the call
5. Create an offer to each peer Send offer
 */
function joinVideoCall() {
  enableMedia();
  joined = true;
}

function leaveVideoCall() {
  handleVideoCall("leave");
  joined = false;
  localPeerConnection.close();
  localPeerConnection = null;
  localPlayer.srcObject = null;

  // Iterate through each peer and delete its container element
  Object.keys(remotePeerConnections).forEach((peerId) => {
    handleElementAfterLeaving(peerId);
  });
}
