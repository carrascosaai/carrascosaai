  const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const voiceBtn = document.getElementById("voice-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function appendMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add(sender);
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const query = userInput.value.trim();
  if (!query) return;

  appendMessage("🧍‍♂️ " + query, "user");
  userInput.value = "";

  const res = await fetch("/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const data = await res.json();

  appendMessage("🤖 " + data.response, "bot");
}

// 🎤 Voz a texto
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es-ES";
voiceBtn.addEventListener("click", () => recognition.start());
recognition.onresult = (e) => {
  const text = e.results[0][0].transcript;
  userInput.value = text;
};

