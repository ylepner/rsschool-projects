const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind')
const cityInput = document.querySelector('.city')
const humidity = document.querySelector('.humidity')
let city = 'Gdańsk'

async function getAndSetWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=269ae7b2577bd17dfe150b43eacf40fd&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`
  }
  catch {
    weatherDescription.textContent = 'Sorry, city not found'
    wind.textContent = ''
    humidity.textContent = ''
    temperature.textContent = ''
  }


}

cityInput.addEventListener('change', () => {
  city = cityInput.value
  getAndSetWeather()
})


function setLocalStorage() {
  localStorage.setItem('city', city);
}
window.addEventListener('beforeunload', setLocalStorage)

function initWeather() {

  if (localStorage.getItem('city')) {
    city = localStorage.getItem('city');
  }
  cityInput.value = city
  getAndSetWeather()
}


window.addEventListener('load', initWeather)

