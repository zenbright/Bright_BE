function gotRemoteDescription(answer) {
  console.log("Setting remote description with answer:", answer);
  localPeerConnection.setRemoteDescription(answer);
}

const gotAnswerDescription = (answer) => {
  console.log("Setting local description with answer:", answer);
  localPeerConnection.setLocalDescription(answer);
};

const gotLocalIceCandidateAnswer = (event) => {
  // gathering candidate finished, send complete sdp
  console.log("Sending answer to server");
  if (!event.candidate) {
    const answer = localPeerConnection.localDescription;

    socket.emit("video-call-connection", "send_answer", {
      answer: answer,
    });
  }
};
