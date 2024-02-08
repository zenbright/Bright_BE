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

  // Setting remote description with the offer
  console.log("Setting remote description with offer");
  localPeerConnection.setRemoteDescription(offer)
    .then(() => {
      // Remote description successfully set
      // Creating an answer
      console.log("Creating an answer");
      return localPeerConnection.createAnswer();
    })
    .then((answer) => {
      // Local description successfully created
      console.log("Setting local description with answer:", answer);
      // Setting local description with the answer
      return localPeerConnection.setLocalDescription(answer);
    })
    .then(() => {
      // Local description successfully set
      // Sending the answer
      console.log("Sending an answer");
      socket.emit("video-call-connection", "send_answer", {
        answer: localPeerConnection.localDescription, // Send the local description (the answer)
      });
    })
    .catch((error) => {
      // Handle errors
      console.error("Error handling remote offer:", error);
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
