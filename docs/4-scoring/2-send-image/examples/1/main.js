const dogImage = document.getElementById('dogImage');
const birdImage = document.getElementById('birdImage');
const fishImage = document.getElementById('fishImage');
const resultElement = document.getElementById('comment');

function showResult(text) {
  resultElement.textContent = text;
}

dogImage.addEventListener('click', () => {
  showResult('仮のコメント: これは犬の画像です');
});

birdImage.addEventListener('click', () => {
  showResult('仮のコメント: これは鳥の画像です');
});

fishImage.addEventListener('click', () => {
  showResult('仮のコメント: これは魚の画像です');
});
