// Initialize Socket.IO
socket = io();

// DOM elements
const clientsTotal = document.getElementById("client-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
let serverGroupId = "";

// Function to fetch messages for a group
async function fetchMessages(userId, groupId) {
  try {
    const groupResponse = await fetch(`/getGroup/${groupId}`);
    const group = await groupResponse.json();
    const messageIds = group.messages;

    // Render messages
    for (const msgId of messageIds) {
      const messageResponse = await fetch(`/getMessages/${msgId}`);
      const message = await messageResponse.json();
      const isOwnMessage = message.fromId === userId;
      addMessageToUI(isOwnMessage, message);
    }

    // Scroll to the bottom
    scrollToBottom();
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

// When the DOM is loaded, fetch messages for the user and group
document.addEventListener("DOMContentLoaded", () => {
  const userId = window.location.pathname.split("/")[1];
  serverGroupId = window.location.pathname.split("/")[2];
  fetchMessages(userId, serverGroupId);
});

// When the user wants to send a message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

// Update total number of clients
socket.on("clients-total", ({ groupId, socketsConnectedSize }) => {
  // console.log("groupId: ", groupId, " serverGroupId: ", serverGroupId);
  if (groupId == serverGroupId) {
    clientsTotal.innerText = `Total Clients: ${socketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});

// Function to send a message
function sendMessage() {
  if (messageInput.value === "") return;
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  // Sending a message with a callback
  socket.emit("message", data, (result) => {
    addMessageToUI(true, result);
  });

  messageInput.value = "";
}

// Broadcast the message to other users in the same group
socket.on("group-message", ({ groupId, data }) => {
  // console.log("serverGroupId: ", serverGroupId);
  if (groupId === serverGroupId) {
    addMessageToUI(false, data);
  } else {
    console.log("Different group");
  }
});

// Function to add a message to the UI
function addMessageToUI(isOwnMessage, data) {
  clearFeedback();

  let element = ``;
  console.log(
    "data.messageId: ",
    data.messageId,
    "data.groupId: ",
    data.groupId,
  );

  const delMsgBtn = `<button class="delMsg_btn" message-id="${data.messageId}" group-id="${data.groupId}">Del</button>`;

  let timestampString = getFormattedTimestamp(data.timestamp);
  // TODO: change fromId to local userName
  element = `
      <div id="message-${data.fromId}" class="${
        isOwnMessage ? "message-right" : "message-left"
      }">
        <p class="message">
          ${data.text}
          <span>${data.fromId} ● ${timestampString}</span>
        </p>
        ${delMsgBtn}
      </div>`;

  messageContainer.innerHTML += element;

  scrollToBottom();
}

function getFormattedTimestamp(timestamp) {
  // Example: 2023-12-01T08:24:35.749Z -> 2023-12-01 08:24:35
  const [datePart, timePart] = timestamp.split("T");
  const timeWithoutMilliseconds = timePart.split(".")[0];
  const formattedString = `${datePart} ${timeWithoutMilliseconds}`;

  return formattedString;
}

// Function to scroll to the bottom of the message container
function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

// Event listener for the "Del" button
messageContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delMsg_btn")) {
    const groupId = e.target.getAttribute("group-id");
    const messageId = e.target.getAttribute("message-id");
    console.log("groupId: " + groupId + " messageId: " + messageId);
    deleteMessage(groupId, messageId);
  }
});

// Function to delete a message
async function deleteMessage(groupId, messageId) {
  await fetch(`/deleteMessage/${groupId}/${messageId}`);

  // Remove the message container element from the UI
  const messageContainerElement = document.getElementById(
    `message-${messageId}`,
  );
  if (messageContainerElement) {
    messageContainerElement.remove();
  }
}

// Event listeners for typing feedback
messageInput.addEventListener("focus", (e) => {
  socket.emit("feedback", {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  });
});

messageInput.addEventListener("keypress", (e) => {
  socket.emit("feedback", {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  });
});
messageInput.addEventListener("blur", (e) => {
  socket.emit("feedback", {
    feedback: "",
  });
});

// Receive typing feedback
socket.on("feedback", (data) => {
  clearFeedback();
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `;
  messageContainer.innerHTML += element;
});

// Clear typing feedback
function clearFeedback() {
  document.querySelectorAll("li.message-feedback").forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
