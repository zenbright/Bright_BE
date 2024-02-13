heartbeatSocket = io({ path: "/heartbeat" });

heartbeatSocket.emit("heartbeat", (result) => {

});
