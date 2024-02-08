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

/* 
Reference: 
- Signaling State: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/signalingState
*/

// When user clicks call button, we will create the p2p connection with RTCPeerConnection
async function startCommunication() {
  localPeerConnection.createOffer().then(setLocalDescription);
  
  setPeerPlayer;
  // localPeerConnection.onicecandidate = gotLocalIceCandidateOffer;
}

// async function to handle received remote stream
const setPeerPlayer = (event) => {
  peerPlayer.srcObject = event.stream;
};
