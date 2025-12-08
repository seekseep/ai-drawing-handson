const canvas = document.getElementById('canvas');

let drawing = false;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const ctx = canvas.getContext('2d');
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});
