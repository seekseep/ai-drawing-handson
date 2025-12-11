const OPENAI_API_KEY = 'API_KEY';

const descriptionInput = document.getElementById('descriptionInput');
const generateButton = document.getElementById('generateButton');
const nameElement = document.getElementById('name');
const ageElement = document.getElementById('age');
const hometownElement = document.getElementById('hometown');
const favoritesElement = document.getElementById('favorites');

function showResult(profile) {
  nameElement.textContent = profile.name;
  ageElement.textContent = profile.age;
  hometownElement.textContent = profile.hometown;
  favoritesElement.textContent = profile.favorites.join(', ');
}

generateButton.addEventListener('click', async () => {
  const description = descriptionInput.value || 'ランダムな人';

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
          content: `${description}のプロフィール（名前、年齢、出身地、好きなもの）をJSON形式で生成してください`
        }
      ]
    })
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;

  // JSONっぽい文字列をパースする（エラーが起きる可能性あり）
  const result = JSON.parse(aiMessage);

  showResult(result);
});
