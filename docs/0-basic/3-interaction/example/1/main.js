const incrementButton = document.getElementById('incrementButton');
const decrementButton = document.getElementById('decrementButton');
const countDisplay = document.getElementById('count');

const MAX = 100;
let count = 0;

incrementButton.addEventListener('click', () => {
  if (count >= MAX) return;

  count++;
  countDisplay.textContent = count;
});

decrementButton.addEventListener('click', () => {
  if (count < 1) return;

  count--;
  countDisplay.textContent = count;
});
