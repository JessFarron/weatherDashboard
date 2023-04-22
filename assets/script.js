// var apiKey = 'c8a50d3cad8319246b6b9747e912dec7';



/*function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const uvIndex = data.visibility;
      const clouds = data.clouds.all;
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `
        <h3>${city}</h3>
        <p>Temperature: ${temperature} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>UV Index: ${uvIndex}</p>
        <p>Clouds: ${clouds}%</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '<p>Error fetching weather data</p>';
    });
}

const form = document.querySelector('form');
form.addEventListener('click', event => {
  event.preventDefault();
  const cityInput = document.getElementById('city');
  const city = cityInput.value;
  getWeather(city);
});
*/
const API_KEY = 'c8a50d3cad8319246b6b9747e912dec7';
const form = document.querySelector('form');
const currentWeather = document.getElementById('current-weather');
const forecastTable = document.getElementById('forecast-body');

function clearForecast() {
  forecast-body.innerHTML = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const city = document.getElementById('city').value;

  // fetch current weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const uvIndex = data.uvi;
      const visibility = data.visibility;
      const weatherInfo = `Temperature: ${temp}°C | Humidity: ${humidity}% | Wind Speed: ${windSpeed} m/s | UV Index: ${uvIndex} | Visibility: ${visibility}m`;
      currentWeather.textContent = weatherInfo;
    })
    .catch(error => {
      currentWeather.textContent = 'Error retrieving current weather data';
      console.error(error);
    });
  
  // fetch 5-day forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      // filter out forecasts for every 24 hours
      const forecasts = data.list.filter((forecast, index) => index % 8 === 0);
      forecasts.forEach(forecast => {
        const date = forecast.dt_txt.split(' ')[0];
        const temp = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const uvIndex = forecast.uvi;
        const visibility = forecast.visibility;
        const row = document.createElement('tr');
        row.innerHTML = `<td>${date}</td><td>${temp}°C</td><td>${humidity}%</td><td>${windSpeed} m/s</td><td>${uvIndex}</td><td>${visibility}m</td>`;
        forecastTable.appendChild(row);
      });
    })
    .catch(error => {
      forecastTable.textContent = 'Error retrieving 5-day forecast data';
      console.error(error);
    });
});