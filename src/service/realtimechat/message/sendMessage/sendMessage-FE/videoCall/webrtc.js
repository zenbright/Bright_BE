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

/* 
Reference: 
- Signaling State: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/signalingState
*/

// When user clicks call button, we will create the p2p connection with RTCPeerConnection
async function sendOffer() {
  localPeerConnection.createOffer().then((offer) => {
    console.log("Setting local description with local offer:", offer);
    localPeerConnection.setLocalDescription(offer);
    console.log("Sending an offer");
    socket.emit("video-call-connection", "send_offer", {
      offer: offer,
    });
  });
}

function gotRemoteOffer(offer, offerFrom) {
  console.log("Got remote offer: ", offer);

  console.log("Setting remote description with offer");
  localPeerConnection
    .setRemoteDescription(offer)
    .then(() => {
      return localPeerConnection.createAnswer();
    })
    .then((answer) => {
      console.log("Setting local description with answer:", answer);
      return localPeerConnection.setLocalDescription(answer);
    })
    .then(() => {
      console.log("Sending an answer");
      socket.emit("video-call-connection", "send_answer", {
        answer: localPeerConnection.localDescription,
        answerTo: offerFrom,
      });
    })
    .catch((error) => {
      console.error("Error setting remote description", error);
    });

  localPeerConnection.ontrack = (event) => {
    console.log("Received remote stream in gotRemoteOffer");
    peerPlayer.srcObject = event.streams[0];
  };
}

function gotRemoteAnswer(answer) {
  console.log("Got remote answer:", answer);
  console.log(
    "localPeerConnection.signalingState: ",
    localPeerConnection.signalingState,
  );
  localPeerConnection.setRemoteDescription(answer);
  localPeerConnection.ontrack = (event) => {
    console.log("Received remote stream in gotRemoteAnswer");
    peerPlayer.srcObject = event.streams[0];
  };
}
