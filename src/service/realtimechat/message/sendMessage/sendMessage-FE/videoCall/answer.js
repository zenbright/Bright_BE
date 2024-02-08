function gotRemoteAnswer(answer) {
  console.log("Got remote answer:", answer);
  console.log(
    "localPeerConnection.signalingState: ",
    localPeerConnection.signalingState,
  );
  localPeerConnection.setRemoteDescription(answer);
}

// const gotLocalIceCandidateAnswer = (event) => {
//   if (!event.candidate) {
//     console.log("Sending actual answer to server");
//     const answer = localPeerConnection.localDescription;

//     socket.emit("video-call-connection", "send_answer", {
//       answer: answer,
//     });
//   }
// };
