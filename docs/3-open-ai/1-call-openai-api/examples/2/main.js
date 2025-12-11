const OPENAI_API_KEY = 'API_KEY'; // 当日APIキーに置き換える

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

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;
  appendResult('AI:' + aiMessage);
});
