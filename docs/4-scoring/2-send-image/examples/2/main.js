const OPENAI_API_KEY = 'API_KEY'; // 当日APIキーに置き換える

const dogImage = document.getElementById('dogImage');
const birdImage = document.getElementById('birdImage');
const fishImage = document.getElementById('fishImage');
const resultElement = document.getElementById('comment');

function showResult(text) {
  resultElement.textContent = text;
}

async function convertImageToBase64(imageSrc) {
  const response = await fetch(imageSrc);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function sendImageToAPI(imageElement) {
  const base64Image = await convertImageToBase64(imageElement.src);

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
              text: 'この画像について説明してください'
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;
  showResult(aiMessage);
}

dogImage.addEventListener('click', () => {
  sendImageToAPI(dogImage);
});

birdImage.addEventListener('click', () => {
  sendImageToAPI(birdImage);
});

fishImage.addEventListener('click', () => {
  sendImageToAPI(fishImage);
});
