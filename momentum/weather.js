const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind')
const city = document.querySelector('.city')
const humidity = document.querySelector('.humidity')
city.value = 'Minsk'
let changeCity = false
getWeather()

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=269ae7b2577bd17dfe150b43eacf40fd&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`;
  humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`
}

city.addEventListener('change', () => {
  getWeather()
  changeCity = true
})

if (changeCity) {
  function setLocalStorage() {
    localStorage.setItem('city', city.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    }
  }
  window.addEventListener('load', getLocalStorage)
}
