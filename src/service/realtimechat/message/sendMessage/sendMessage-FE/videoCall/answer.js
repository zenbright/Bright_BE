function gotRemoteAnswer(answer) {
  console.log("Got remote answer:", answer);
  console.log(
    "localPeerConnection.signalingState: ",
    localPeerConnection.signalingState,
  );
  localPeerConnection.setRemoteDescription(answer);
}

// const gotLocalIceCandidateAnswer = (event) => {

// };
