const canvas = document.getElementById('canvas');

canvas.addEventListener('mousemove', (e) => {
  const ctx = canvas.getContext('2d');
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
});
