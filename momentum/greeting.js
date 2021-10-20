const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const nameValue = document.getElementById('greeting')

function getHours() {
  const date = new Date();
  const hours = date.getHours();
  return hours
}

function getGreeting() {
  let hour = getHours()
  let timeOfDay = Math.floor(hour / 6)
  switch (timeOfDay) {
    case 0:
      result = 'night';
      break;
    case 1:
      result = 'Good morning';
      break;
    case 2:
      result = 'Good afternoon';
      break;
    case 3:
      result = 'Good evening';
      break;
  }
  return result
}

greeting.textContent = `${getGreeting()},`

function setLocalStorage() {
  localStorage.setItem('nameInput', nameInput.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('nameInput')) {
    nameInput.value = localStorage.getItem('nameInput');
  }
}
window.addEventListener('load', getLocalStorage)
let count = 0

setInterval(() => {
  greeting.textContent = `${getGreeting()},`
}, 1000)

