const videoGrid = document.getElementById("video-grid");
const videoConnectButton = document.getElementById("video-connect-btn");
const videoClientsTotal = document.getElementById("video-client-total");
const localPlayer = document.getElementById("localPlayer");
const constraints = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
  },
  audio: true,
};

let localStream;

// Function to handle video call actions
function handleVideoCall(action) {
  socket.emit("video-call-connection", action);
}

function startVideoCall() {
  handleVideoCall("join");
  console.log("JOINED");

  // Setting up the local media stream (camera and microphone).
  navigator.getUserMedia(
    { audio: true, video: true, constraints },
    (stream) => {
      // render local stream on DOM
      localPlayer.srcObject = stream;
      localStream = stream;
      callOnClick(localStream);
    },
    (error) => {
      console.error("getUserMedia error:", error);
    },
  );
}

function joinVideoCall() {
  handleVideoCall("join");
  console.log("JOINED");

  // Setting up the local media stream (camera and microphone).
  navigator.getUserMedia(
    { audio: true, video: true, constraints },
    (stream) => {
      // render local stream on DOM
      localPlayer.srcObject = stream;
      localStream = stream;
      join(localStream);
    },
    (error) => {
      console.error("getUserMedia error:", error);
    },
  );
}

const join = () => {
  console.log("join invoked");
  const userId = window.location.pathname.split("/")[1];

  // sendWsMessage('join', {
  //     serverGroupId,
  //     userId,
  // });
};

// Example: Call this function when leaving a video call
function leaveVideoCall() {
  handleVideoCall("leave");

  // Close the peer connection
  closeDataChannel();
//   localPeerConnection.close();
//   localPeerConnection = null;
  console.log("LEFT");
}

const closeDataChannel = () => {
  console.log("closeDataChannel invoked");
  // sendChannel && sendChannel.close();
  // receiveChannel && receiveChannel.close();
};

// Update total number of clients
socket.on("video-clients-total", ({ groupId, videoSocketsConnectedSize }) => {
  if (groupId == serverGroupId) {
    videoClientsTotal.innerText = `Total Clients: ${videoSocketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});
