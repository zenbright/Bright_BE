// async function to handle offer sdp
const gotLocalDescription = (offer) => {
  console.log("gotLocalDescription invoked:", offer);
  localPeerConnection.setLocalDescription(offer);
};

function handleOffer(offer) {
  console.log("handleOffer invoked");

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

  console.log("setup setPeerPlayer");
  setPeerPlayer;

  createDataChannel();

  console.log("localPeerConnection.addStream invoked");
  localPeerConnection.addStream(localStream);

  console.log("Setting remote description with offer");
  localPeerConnection.setRemoteDescription(offer);
  localPeerConnection.createAnswer().then(gotAnswerDescription);
}

// async function to handle ice candidates
const gotLocalIceCandidateOffer = (event) => {
    // when gathering candidate finished, send complete sdp
    //   console.log("event.candidate: " + event.candidate);
    console.log("Sending offer to server");
    if (!event.candidate) {
      console.log("Sending Actual offer to server");
      const offer = localPeerConnection.localDescription;
      // send offer sdp to signaling server via websocket
      socket.emit("video-call-connection", "send_offer", {
        offer: offer,
      });
    }
  };