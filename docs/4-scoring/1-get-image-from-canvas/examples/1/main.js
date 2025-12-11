const OPENAI_API_KEY = 'API_KEY';

const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clearButton');
const colorInput = document.getElementById('colorInput');
const dogImage = document.getElementById('dogImage');
const birdImage = document.getElementById('birdImage');
const fishImage = document.getElementById('fishImage');
const evaluateButton = document.getElementById('evaluateButton');
const scoreElement = document.getElementById('score');
const commentElement = document.getElementById('comment');

let drawing = false;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const color = colorInput.value;

  const ctx = canvas.getContext('2d');
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});

clearButton.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

birdImage.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(birdImage, 0, 0, 400, 300);
});

dogImage.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(dogImage, 0, 0, 400, 300);
});

fishImage.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(fishImage, 0, 0, 400, 300);
});

evaluateButton.addEventListener('click', async () => {
  console.log('評価ボタンがクリックされました');

  const imageDataUrl = canvas.toDataURL('image/png');

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
          content: [
            {
              type: 'text',
              text: 'この絵を評価してください'
            },
            {
              type: 'image_url',
              image_url: {
                url: imageDataUrl
              }
            }
          ]
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'image_evaluation',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              score: {
                type: 'number',
                description: '絵の評価スコア (0-100)'
              },
              comment: {
                type: 'string',
                description: '評価コメント'
              }
            },
            required: ['score', 'comment'],
            additionalProperties: false
          }
        }
      }
    })
  });

  const data = await response.json();
  console.log('レスポンス:', data);

  const result = JSON.parse(data.choices[0].message.content);
  console.log('評価スコア:', result.score);
  console.log('コメント:', result.comment);

  scoreElement.textContent = result.score;
  commentElement.textContent = result.comment;
});
