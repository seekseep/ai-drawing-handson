const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

// 四角形を描画
ctx.fillStyle = 'lightblue';
// ctx.fillStyle = '#ADD8E6';
ctx.fillRect(50, 50, 150, 100);

// 円を描画
ctx.beginPath();
ctx.arc(300, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = 'lightcoral';
// ctx.fillStyle = '#F08080';
ctx.fill();

// 線を描画
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.lineTo(350, 200);
ctx.lineTo(200, 250);
ctx.strokeStyle = 'green';
// ctx.strokeStyle = '#008000';
ctx.lineWidth = 5;
ctx.stroke();
