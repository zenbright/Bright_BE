
socket = io()

const clientsTotal = document.getElementById('client-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')


// const messageTone = new Audio('/message-tone.mp3')

// Function to fetch messages for a group
async function fetchMessages(userId, groupId) {
  console.log("Fetching messages");
  try {
    const group = await Group.findOne({groupId: groupId});
    const messageIds = group.messages;
    console.log("messages:", messageIds);
    // Render messages
    messageIds.forEach(async (msgId) => {
      const message = await Message.findOne({messageId: msgId});
      const isOwnMessage = message.fromId === userId;
      addMessageToUI(isOwnMessage, message);
    });

    // Scroll to the bottom
    scrollToBottom();
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

// When the DOM is loaded, fetch messages for the user and group
document.addEventListener('DOMContentLoaded', () => {
console.log("DOM content loaded");

  // fetchMessages(userId, groupId);
});


socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`
})

function sendMessage() {
  if (messageInput.value === '') return
  // console.log(messageInput.value)
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  }
  socket.emit('message', data)
  addMessageToUI(true, data)
  messageInput.value = ''
}

socket.on('chat-message', (data) => {
  // console.log(data)
//   messageTone.play()
  addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
  clearFeedback()
  const element = `
      <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
          <p class="message">
            ${data.message}
            <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>
        `

  messageContainer.innerHTML += element
  scrollToBottom()
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

messageInput.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  })
})

messageInput.addEventListener('keypress', (e) => {
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  })
})
messageInput.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: '',
  })
})

socket.on('feedback', (data) => {
  clearFeedback()
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `
  messageContainer.innerHTML += element
})

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}