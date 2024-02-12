const localPlayer = document.getElementById("localPlayer");
const peerPlayer = document.getElementById("peerPlayer");

const servers = {
  iceServers: [
    { url: "stun:stun1.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
  ],
};

const pcConstraints = {
  optional: [{ DtlsSrtpKeyAgreement: true }],
};

let localStream;
let remoteStream;
let localPeerConnection = new RTCPeerConnection(servers /*, pcConstraints */);
let remotePeerConnection = new RTCPeerConnection(servers /*, pcConstraints */);
let videoMembers = [];
let joined = false;
const localUserId = window.location.pathname.split("/")[1];

// When user clicks call button, we will create the p2p connection with RTCPeerConnection
async function sendOffer() {
  // Create an offer
  localPeerConnection.createOffer().then((offer) => {
    // Set the offer as a local description
    localPeerConnection.setLocalDescription(offer);
    console.log("Sending an offer");
    // Send the offer to peers via socket
    socket.emit("video-call-connection", "send_offer", {
      offer: offer,
    });
  });
}

async function sendIceCandidate(answerFrom) {
  // Send the ice candidate
  socket.emit("video-call-connection", "send_ice_candidate", {
    candidate: localPeerConnection.localDescription,
    candidateTo: answerFrom,
  });
}

function gotRemoteOffer(offer, offerFrom) {
  localPeerConnection
    .setRemoteDescription(offer)
    .then(() => {
      return localPeerConnection.createAnswer();
    })
    .then((answer) => {
      return localPeerConnection.setLocalDescription(answer);
    })
    .then(() => {
      socket.emit("video-call-connection", "send_answer", {
        answer: localPeerConnection.localDescription,
        answerTo: offerFrom,
      });
    })
    .catch((error) => {
      console.error("Error setting remote description", error);
    });

  localPeerConnection.ontrack = setPeerPlayer;
}

function gotRemoteAnswer(answer) {
  // Set the answer as a remote description
  localPeerConnection.setRemoteDescription(answer);
  // Set the peer player
  localPeerConnection.ontrack = setPeerPlayer;
}

function gotRemoteCandidate(candidate) {
  // Set the candidate as the remote description
  localPeerConnection.setRemoteDescription(candidate);
  // Set the peer player
  localPeerConnection.ontrack = setPeerPlayer;
}

const setPeerPlayer = (event) => {
  peerPlayer.srcObject = event.streams[0];
};
