// Initialize WebRTC
const peer = new SimplePeer({
  initiator: false, // Change to true if this user is the initiator
  trickle: false, // Disable trickle ICE, improve connection time
});

const localPlayer = document.getElementById("localPlayer");
const peerPlayer = document.getElementById("peerPlayer");

let localStream;
let localPeerConnection;
let sendChannel;
let receiveChannel;

// Establishing the RTCPeerConnection.
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
const callOnClick = (localStream) => {
  console.log("callOnClick invoked");
  if (localStream.getVideoTracks().length > 0) {
    console.log(`Using video device: ${localStream.getVideoTracks()[0].label}`);
  }
  if (localStream.getAudioTracks().length > 0) {
    console.log(`Using audio device: ${localStream.getAudioTracks()[0].label}`);
  }
  localPeerConnection = new RTCPeerConnection(servers, pcConstraints);
  localPeerConnection.onicecandidate = gotLocalIceCandidateOffer;
  localPeerConnection.onaddstream = gotRemoteStream;
  localPeerConnection.addStream(localStream);
  localPeerConnection.createOffer().then(gotLocalDescription);
};
// async function to handle offer sdp
const gotLocalDescription = (offer) => {
  console.log("gotLocalDescription invoked:", offer);
  localPeerConnection.setLocalDescription(offer);
};
// async function to handle received remote stream
const gotRemoteStream = (event) => {
  console.log("gotRemoteStream invoked");
  peerPlayer.srcObject = event.stream;
};
// async function to handle ice candidates
const gotLocalIceCandidateOffer = (event) => {
  console.log(
    "gotLocalIceCandidateOffer invoked",
    event.candidate,
    localPeerConnection.localDescription,
  );
  // when gathering candidate finished, send complete sdp
  if (!event.candidate) {
    const offer = localPeerConnection.localDescription;
    // send offer sdp to signaling server via websocket
    socket.emit("video-call-connection", "send_offer", {
      sdp: offer,
    });
  }
};

// End Establishing the RTCPeerConnection.

const onAnswer = (offer) => {
  console.log("onAnswer invoked");

  if (localStream.getVideoTracks().length > 0) {
    console.log(`Using video device: ${localStream.getVideoTracks()[0].label}`);
  }
  if (localStream.getAudioTracks().length > 0) {
    console.log(`Using audio device: ${localStream.getAudioTracks()[0].label}`);
  }

  console.log("new RTCPeerConnection for local");
  localPeerConnection = new RTCPeerConnection(servers, pcConstraints);
  console.log("setup gotLocalIceCandidateAnswer");
  localPeerConnection.onicecandidate = gotLocalIceCandidateAnswer;

  console.log("setup gotRemoteStream");
  localPeerConnection.onaddstream = gotRemoteStream;

  createDataChannel();

  console.log("localPeerConnection.addStream invoked");
  localPeerConnection.addStream(localStream);

  localPeerConnection.setRemoteDescription(offer);
  localPeerConnection.createAnswer().then(gotAnswerDescription);
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
