const incrementButton = document.getElementById('incrementButton');
const countDisplay = document.getElementById('count');

let count = 0;

incrementButton.addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
});
