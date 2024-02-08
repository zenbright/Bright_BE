// async function to handle offer sdp
const setLocalDescription = (offer) => {
  console.log("Setting local description with local offer:", offer);
  localPeerConnection.setLocalDescription(offer);
  console.log("Sending an offer");
  socket.emit("video-call-connection", "send_offer", {
    offer: offer,
  });
};

function gotRemoteOffer(offer) {
  console.log("Got remote offer: ", offer);

  // if (localStream.getVideoTracks().length > 0) {
  //   console.log(`Using video device: ${localStream.getVideoTracks()[0].label}`);
  // }
  // if (localStream.getAudioTracks().length > 0) {
  //   console.log(`Using audio device: ${localStream.getAudioTracks()[0].label}`);
  // }

  // console.log("new RTCPeerConnection for local");

  setPeerPlayer;

  console.log("Setting remote description with offer");
  localPeerConnection.setRemoteDescription(offer);

  console.log("Creating an answer");
  localPeerConnection.createAnswer().then((answer) => {
    console.log("Setting local description with answer:", answer);
    localPeerConnection.setLocalDescription(answer);

    console.log("Sending an answer");
    socket.emit("video-call-connection", "send_answer", {
      answer: answer,
    });
  });
}

// async function to handle ice candidates
// const gotLocalIceCandidateOffer = (event) => {
//     if (!event.candidate) {
//       console.log("Sending Actual offer to server");
//       const offer = localPeerConnection.localDescription;
//       socket.emit("video-call-connection", "send_offer", {
//         offer: offer,
//       });
//     }
//   };
