const localPlayer = document.getElementById("localPlayer");
const peerPlayer = document.getElementById("peerPlayer");
videoCallSocket = io({path: '/videoCall'});
let serverGroupId = window.location.pathname.split("/")[2];

const servers = {
  iceServers: [
    { url: "stun:stun1.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
  ],
};

// const pcConstraints = {
//   optional: [{ DtlsSrtpKeyAgreement: true }],
// };

let localStream;
let remoteStream;
let localPeerConnection = new RTCPeerConnection(servers /*, pcConstraints */);
let remotePeerConnections = {};

let joined = false;
const localUserId = window.location.pathname.split("/")[1];

async function sendOffer(joinedUsers) {
  // Iterate through each joined user
  for (const peerId of joinedUsers) {
    if (peerId != localUserId) {
      createRemotePeerConnection(peerId);

      remotePeerConnections[peerId].createOffer().then((offer) => {
        remotePeerConnections[peerId].setLocalDescription(offer);
        videoCallSocket.emit("video-call-connection", "send_offer", {
          offer: offer,
          offerTo: peerId,
        });
      });
    }
  }
}

async function sendIceCandidate(answerFrom) {
  videoCallSocket.emit("video-call-connection", "send_ice_candidate", {
    candidate: remotePeerConnections[answerFrom].localDescription,
    candidateTo: answerFrom,
  });
}

function gotRemoteOffer(offer, offerFrom) {
  createRemotePeerConnection(offerFrom);

  remotePeerConnections[offerFrom]
    .setRemoteDescription(offer)
    .then(() => {
      // Set the peer player
      remotePeerConnections[offerFrom].ontrack = (event) => {
        setPeerPlayer(event, offerFrom);
      };
        // Create an answer
        return remotePeerConnections[offerFrom].createAnswer();
      })
      .then((answer) => {
        // Set the answer as a local description
        return remotePeerConnections[offerFrom].setLocalDescription(answer);
      })
      .then(() => {
        // Send the answer via videoCallSocket
        videoCallSocket.emit("video-call-connection", "send_answer", {
          answer: remotePeerConnections[offerFrom].localDescription,
          answerTo: offerFrom,
        });
      })
    .catch((error) => {
      console.error("Error setting remote description", error);
    });
}

function gotRemoteAnswer(answer, peerId) {
  // Set the answer as a remote description
  remotePeerConnections[peerId].setRemoteDescription(answer);
  // Set the peer player
  remotePeerConnections[peerId].ontrack = (event) =>
    setPeerPlayer(event, peerId);
}

function gotRemoteCandidate(candidate, peerId) {
  console.log("Got remote candidate", candidate);
  // Set the candidate as the remote description
  remotePeerConnections[peerId].setRemoteDescription(candidate);
  // Set the peer player
  remotePeerConnections[peerId].ontrack = (event) =>
    setPeerPlayer(event, peerId);
}

// Function to create a new remote RTCPeerConnection
function createRemotePeerConnection(peerId) {
  remotePeerConnections[peerId] = new RTCPeerConnection(servers);
  localStream.getTracks().forEach((track) => {
    remotePeerConnections[peerId].addTrack(track, localStream);
  });
  remotePeerConnections[peerId].addStream(localStream);
  remotePeerConnections[peerId].ontrack = (event) =>
    setPeerPlayer(event, peerId);
}

const setPeerPlayer = (event, peerId) => {
  console.log("setting PeerPlayer");
  const containerId = "playerContainer-" + peerId;
  const videoId = "peerPlayer-" + peerId;

  if (!document.getElementById(videoId)) {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("playerContainer");
    playerContainer.id = containerId;
     // Add a paragraph element for displaying peerId
     const peerIdPara = document.createElement("p");
     peerIdPara.textContent = "Peer ID: " + peerId;
     playerContainer.appendChild(peerIdPara);

    // Add a video element to the container
    const newVideo = document.createElement("video");
    newVideo.autoplay = true;
    newVideo.id = videoId;
    newVideo.srcObject = event.streams[0];
    playerContainer.appendChild(newVideo);
    videoGrid.appendChild(playerContainer);
  } else {
    const existingVideo = document.getElementById(videoId);
    existingVideo.srcObject = event.streams[0];
  }
};
