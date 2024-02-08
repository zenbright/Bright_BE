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
let sendChannel;
let receiveChannel;
let SDPs = [];

/* 
Reference: 
- Signaling State: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/signalingState
*/

// When user clicks call button, we will create the p2p connection with RTCPeerConnection
async function startCommunication() {
  localStream.getTracks().forEach((track) => {
    localPeerConnection.addTrack(track, localStream);
  });

  localPeerConnection.addStream(localStream);
  localPeerConnection.createOffer().then(setLocalDescription);
  
  setPeerPlayer;
  // localPeerConnection.onicecandidate = gotLocalIceCandidateOffer;
}

// async function to handle received remote stream
const setPeerPlayer = (event) => {
  peerPlayer.srcObject = event.stream;
};

// const gotReceiveChannel = (event) => {
//   receiveChannel = event.channel;
//   receiveChannel.onmessage = handleMessage;
//   receiveChannel.onopen = handleReceiveChannelStateChange;
//   receiveChannel.onclose = handleReceiveChannelStateChange;
// };

// const createDataChannel = () => {
//   try {
//     sendChannel = localPeerConnection.createDataChannel("sendDataChannel", {
//       reliable: true,
//     });
//   } catch (error) {
//     console.log("localPeerConnection.createDataChannel failed", error);
//   }

//   sendChannel.onopen = handleSendChannelStateChange;
//   sendChannel.onClose = handleSendChannelStateChange;

//   localPeerConnection.ondatachannel = gotReceiveChannel;
// };

// const closeDataChannel = () => {
//   sendChannel && sendChannel.close();
//   receiveChannel && receiveChannel.close();
// };

// const handleSendChannelStateChange = () => {
//   const readyState = sendChannel.readyState;
// };

// const handleReceiveChannelStateChange = () => {
//   const readyState = receiveChannel.readyState;
// };
