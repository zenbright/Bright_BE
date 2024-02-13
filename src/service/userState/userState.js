heartbeatSocket = io({ path: "/heartbeat" });

setInterval(() => {
  console.log("heartbeat every 30 seconds");
  heartbeatSocket.emit("heartbeat", (result) => {});
}, 30000);
