const localPlayer = document.getElementById("localPlayer");
const peerPlayer = document.getElementById("peerPlayer");

let localStream;
let remoteStream;
let localPeerConnection;
let sendChannel;
let receiveChannel;
let SDPs = [];

/* 
Reference: 
- https://medium.com/@fengliu_367/getting-started-with-webrtc-a-practical-guide-with-example-code-b0f60efdd0a7
- https://github.com/giftedunicorn/webpig/blob/main/src/pages/webrtc.js 
*/

const servers = {
  iceServers: [
    { url: "stun:stun1.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
  ],
};

const pcConstraints = {
  optional: [{ DtlsSrtpKeyAgreement: true }],
};

// When user clicks call button, we will create the p2p connection with RTCPeerConnection
async function callOnClick() {
  localPeerConnection = new RTCPeerConnection(servers/*, pcConstraints */);

  localStream.getTracks().forEach((track) => {
    localPeerConnection.addTrack(track, localStream);
  });

  localPeerConnection.onicecandidate = gotLocalIceCandidateOffer;
  setPeerPlayer;
  localPeerConnection.addStream(localStream);
  localPeerConnection.createOffer().then(gotLocalDescription);
}

// async function to handle received remote stream
const setPeerPlayer = (event) => {
  console.log("setPeerPlayer invoked");
  peerPlayer.srcObject = event.stream;
};

const gotReceiveChannel = (event) => {
  console.log("gotReceiveChannel invoked");
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleMessage;
  receiveChannel.onopen = handleReceiveChannelStateChange;
  receiveChannel.onclose = handleReceiveChannelStateChange;
};

const createDataChannel = () => {
  try {
    console.log("localPeerConnection.createDataChannel invoked");
    sendChannel = localPeerConnection.createDataChannel("sendDataChannel", {
      reliable: true,
    });
  } catch (error) {
    console.log("localPeerConnection.createDataChannel failed", error);
  }

  console.log("setup handleSendChannelStateChange");
  sendChannel.onopen = handleSendChannelStateChange;
  sendChannel.onClose = handleSendChannelStateChange;

  console.log("setup localPeerConnection.ondatachannel");
  localPeerConnection.ondatachannel = gotReceiveChannel;
};

const closeDataChannel = () => {
  console.log("closeDataChannel invoked");
  sendChannel && sendChannel.close();
  receiveChannel && receiveChannel.close();
};

const handleSendChannelStateChange = () => {
  const readyState = sendChannel.readyState;
  console.log("handleSendChannelStateChange invoked", readyState);
};

const handleReceiveChannelStateChange = () => {
  const readyState = receiveChannel.readyState;
  console.log("handleReceiveChannelStateChange invoked", readyState);
};
