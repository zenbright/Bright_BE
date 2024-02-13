heartbeatSocket = io({ path: "/heartbeat" });

let tabVisibilityState = true;

heartbeatSocket.on("heartbeat", () => {
  console.log("Received heartbeat from server");
  if (tabVisibilityState) {
    heartbeatSocket.emit("heartbeat_answer", (result) => {});
  }
});

document.addEventListener(
  "visibilitychange",
  function () {
    if (document.visibilityState === "hidden") {
      tabVisibilityState = false;
    } else {
      tabVisibilityState = true;
      heartbeatSocket.emit("heartbeat_revive", (result) => {});
    }
  },
  false,
);
