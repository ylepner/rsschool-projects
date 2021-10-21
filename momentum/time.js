function showTime() {
  const time = document.querySelector('.time');
  const date = new Date();
  const currentTime = date.toLocaleTimeString('en-GB');
  time.textContent = currentTime
  /*  setTimeout(showTime, 1000); */
}
showTime();

function showDate() {
  const day = document.querySelector('.date')
  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const currentDate = date.toLocaleDateString('en-US', options);
  day.textContent = currentDate
}

showDate()