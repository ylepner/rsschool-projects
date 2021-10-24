const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const nameValue = document.getElementById('greeting')

function getHours() {
  const date = new Date();
  const hours = date.getHours();
  return hours
}

greeting.textContent = `Good ${getTimeOfDay()},`

function setLocalStorage() {
  localStorage.setItem('nameInput', nameInput.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function initWeather() {
  if (localStorage.getItem('nameInput')) {
    nameInput.value = localStorage.getItem('nameInput');
  }
}
window.addEventListener('load', initWeather)

setInterval(() => {
  greeting.textContent = `Good ${getTimeOfDay()},`
}, 1000)

