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

generateButton.addEventListener('click', () => {
  // 仮のプロフィールデータ
  const fakeProfile = {
    name: '仮太郎',
    age: 25,
    hometown: '東京都',
    favorites: ['読書', '映画', '旅行']
  };

  showResult(fakeProfile);
});
