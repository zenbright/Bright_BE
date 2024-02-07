// Initialize WebRTC
const peer = new SimplePeer({
  initiator: false, // Change to true if this user is the initiator
  trickle: false, // Disable trickle ICE, improve connection time
});
let sendChannel;

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
  const remotePlayer = document.getElementById("peerPlayer");
  remotePlayer.srcObject = event.stream;
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


