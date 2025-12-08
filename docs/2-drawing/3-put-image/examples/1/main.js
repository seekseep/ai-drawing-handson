const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clearButton');
const colorInput = document.getElementById('colorInput');
const dogImage = document.getElementById('dogImage');
const birdImage = document.getElementById('birdImage');
const fishImage = document.getElementById('fishImage');

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
