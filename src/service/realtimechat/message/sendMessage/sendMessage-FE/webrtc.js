const localPlayer = document.getElementById("localPlayer");
const peerPlayer = document.getElementById("peerPlayer");

let localStream;
let remoteStream;
let localPeerConnection;
let sendChannel;
let receiveChannel;
let SDPs = [];

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
function callOnClick() {
  localPeerConnection = new RTCPeerConnection(servers, pcConstraints);

  localStream.getVideoTracks().forEach((track) => {
    localPeerConnection.addTrack(track, localStream);
  });

  localStream.getAudioTracks().forEach((track) => {
    localPeerConnection.addTrack(track, localStream);
  });

  localPeerConnection.onicecandidate = gotLocalIceCandidateOffer;
  gotRemoteStream;
  localPeerConnection.addStream(localStream);
  localPeerConnection.createOffer().then(gotLocalDescription);
}

const gotRemoteDescription = (answer) => {
  console.log("gotRemoteDescription invoked:", answer);
  localPeerConnection.setRemoteDescription(answer);
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

const gotAnswerDescription = (answer) => {
  console.log("gotAnswerDescription invoked:", answer);
  localPeerConnection.setLocalDescription(answer);
};

// async function to handle ice candidates
const gotLocalIceCandidateOffer = (event) => {
  // when gathering candidate finished, send complete sdp
  console.log("event.candidate: " + event.candidate);
  if (!event.candidate) {
    const offer = localPeerConnection.localDescription;
    // send offer sdp to signaling server via websocket
    socket.emit("video-call-connection", "send_offer", {
      offer: offer,
    });
  }
};

// End Establishing the RTCPeerConnection.

const gotLocalIceCandidateAnswer = (event) => {
  // gathering candidate finished, send complete sdp
  if (!event.candidate) {
    const answer = localPeerConnection.localDescription;

    socket.emit("video-call-connection", "send_answer", {
      answer: answer,
    });
  }
};

const gotReceiveChannel = (event) => {
  console.log("gotReceiveChannel invoked");
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleMessage;
  receiveChannel.onopen = handleReceiveChannelStateChange;
  receiveChannel.onclose = handleReceiveChannelStateChange;
};

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

const handleSendChannelStateChange = () => {
  const readyState = sendChannel.readyState;
  console.log("handleSendChannelStateChange invoked", readyState);
};

const handleReceiveChannelStateChange = () => {
  const readyState = receiveChannel.readyState;
  console.log("handleReceiveChannelStateChange invoked", readyState);
};
