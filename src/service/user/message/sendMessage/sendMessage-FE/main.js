// Initialize Socket.IO
socket = io();

// DOM elements
const clientsTotal = document.getElementById("client-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const textMessageInput = document.getElementById("text-message-input");
const mediaMessageInput = document.getElementById("media-message-input");

let serverGroupId = "";

// Function to fetch messages for a group
async function fetchMessages(userId, groupId) {
  try {
    const groupResponse = await fetch(
      `/bright-backend/api/chat/getGroup/${groupId}`,
      { method: "GET" },
    );
    const groupObject = await groupResponse.json();
    const group = groupObject.group;

    const messageResponse = await fetch(
      `/bright-backend/api/chat/getGroupMessages/${group._id}`,
      { method: "GET" },
    );
    const messageObject = await messageResponse.json();
    const messages = messageObject.messages;

    // Iterate over the messages array
    for (const message of messages) {
      // Perform actions for each message
      const isOwnMessage = message.fromId === userId;
      addMessageToUI(isOwnMessage, message);
    }

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
  if (groupId == serverGroupId) {
    clientsTotal.innerText = `Total Clients: ${socketsConnectedSize}`;
  } else {
    console.log("Different group");
  }
});

// Function to convert multimedia content to base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64Data = event.target.result;
      const contentType = file.type;

      resolve({
        data: base64Data,
        contentType: contentType,
      });
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

// Function to send a message
async function sendMessage() {
  if (textMessageInput.value === "" && mediaMessageInput.files.length === 0)
    return;

  const textMessage = textMessageInput.value;

  // Read and convert multimedia files to base64
  const multimediaFiles = Array.from(mediaMessageInput.files);
  const multimediaPromises = multimediaFiles.map(convertToBase64);

  try {
    const multimediaDataArray = await Promise.all(multimediaPromises);

    // Now you can include both text and multimedia data in your data object
    const dataToSend = {
      name: nameInput.value,
      message: textMessage,
      multimedia: multimediaDataArray,
      dateTime: new Date(),
    };

    // Sending a message with a callback
    socket.emit("message", dataToSend, (result) => {
      addMessageToUI(true, result);
    });

    // Clear input fields
    textMessageInput.value = "";
    mediaMessageInput.value = ""; // Clear the file input to allow selecting the same files again
  } catch (error) {
    console.error("Error converting to base64:", error);
    // Handle the error as needed
  }
}

// Broadcast the message to other users in the same group
socket.on("group-message", ({ groupId, formattedMsg }) => {
  // console.log("serverGroupId: ", serverGroupId);
  if (groupId === serverGroupId) {
    addMessageToUI(false, formattedMsg);
  } else {
    console.log("Different group");
  }
});

// Function to add a message to the UI
function addMessageToUI(isOwnMessage, data) {
  clearFeedback();

  let element = ``;

  const delMsgBtn = `<button class="delMsg_btn" message-id="${data.messageId}" group-id="${data.groupId}">Del</button>`;
  let timestampString = getFormattedTimestamp(data.timestamp);

  if (Array.isArray(data.multimedia) && data.multimedia.length > 0) {
    const multimediaElements = data.multimedia.map((item, index) => {
      if (item && item.contentType && item.data) {
        // Convert the 'data' property to a data URI
        const imageData =
          item.data && typeof item.data === "string" ? item.data : "";
        const dataURI = `data:${item.contentType};base64,${imageData}`;

        // Get the file extension from the content type
        const fileExtension = item.contentType.split("/")[1];

        // Return the HTML for each multimedia item
        return `<div class="multimedia-item" id="multimedia-${
          data.messageId
        }-${index}">
                  <img src="${dataURI}" alt="Multimedia" class="multimedia-image">
                  <a href="${dataURI}" download="filename_${index}.${fileExtension}">
                    Download ${fileExtension.toUpperCase()}
                  </a>
                </div>`;
      } else {
        return ""; // Skip invalid multimedia items
      }
    });

    // Join the multimedia elements into a single string
    const multimediaHTML = multimediaElements.join("");
    element = `
    <div id="message-${data.messageId}" class="${
      isOwnMessage ? "message-right" : "message-left"
    }">
      <p class="message">
      ${multimediaHTML}
      ${data.text}
      <span>${data.fromId} ● ${timestampString}</span>
      </p>
      ${delMsgBtn}
    </div>`;
  } else {
    // If multimedia is null or empty, display only text
    element = `
    <div id="message-${data.messageId}" class="${
      isOwnMessage ? "message-right" : "message-left"
    }">
      <p class="message">
      ${data.text}
      <span>${data.fromId} ● ${timestampString}</span>
      </p>
      ${delMsgBtn}
    </div>`;
  }

  messageContainer.innerHTML += element;

  scrollToBottom();
}

// Function to generate a download link for a file
function generateDownloadLink(file) {
  const url = URL.createObjectURL(file);
  return url;
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
    deleteMessage(groupId, messageId);
  }
});

// Function to delete a message
async function deleteMessage(groupId, msgId) {
  try {
    const response = await fetch(
      `/bright-backend/api/chat/deleteMessage/${groupId}/${msgId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const messageContainerElement = document.getElementById(`message-${msgId}`);

    if (messageContainerElement) {
      messageContainerElement.remove();
    }
  } catch (error) {
    console.error("Error deleting message:", error);
  }
}

// Event listeners for typing feedback
textMessageInput.addEventListener("focus", (e) => {
  // console.log("feedback focus");
  socket.emit("typing-feedback", {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  });
});

textMessageInput.addEventListener("keypress", (e) => {
  // console.log("feedback keypress");
  socket.emit("typing-feedback", {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  });
});

textMessageInput.addEventListener("blur", (e) => {
  // console.log("feedback blur");
  socket.emit("typing-feedback", {
    feedback: "",
  });
});

// Receive typing feedback
socket.on("typing-feedback", (data) => {
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
