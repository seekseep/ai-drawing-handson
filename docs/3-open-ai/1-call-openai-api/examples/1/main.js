const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const resultText = document.getElementById('result');

function appendResult(text) {
  const p = document.createElement('p');
  p.textContent = text;
  resultText.appendChild(p);
}

sendButton.addEventListener('click', async () => {
  const userMessage = messageInput.value;
  appendResult('あなた:' + userMessage);

  const aiMessage = "仮のメッセージ"
  appendResult('AI:' + aiMessage);
});
