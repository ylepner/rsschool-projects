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
      result = 'morning';
      break;
    case 2:
      result = 'afternoon';
      break;
    case 3:
      result = 'evening';
      break;
  }
  return result
}

greeting.textContent = `Good ${getGreeting()},`

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

setInterval(() => {
  greeting.textContent = `Good ${getGreeting()},`
}, 1000)

