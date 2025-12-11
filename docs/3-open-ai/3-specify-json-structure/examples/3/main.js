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
          content: `${description}のプロフィールを生成してください`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'person_profile',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: '名前'
              },
              age: {
                type: 'number',
                description: '年齢'
              },
              hometown: {
                type: 'string',
                description: '出身地'
              },
              favorites: {
                type: 'array',
                description: '好きなもののリスト',
                items: {
                  type: 'string'
                }
              }
            },
            required: ['name', 'age', 'hometown', 'favorites'],
            additionalProperties: false
          }
        }
      }
    })
  });

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);

  showResult(result);
});
