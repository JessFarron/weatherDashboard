const apiKey = 'b9e5d754e2eb97d65075459b2875fbf5';
const forecastDiv = document.getElementById('forecast');
var searchHistoryEl = document.getElementById('search-history')
var forecastTitle = document.getElementById('forecast-title');


function clearForecast() {
  forecastDiv.innerHTML = '';
}

function handleFormSubmit(event) {
  event.preventDefault();
  let city = document.getElementById('city').value;
  city = city.toLowerCase();
  city = city.charAt(0).toUpperCase() + city.slice(1);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  clearForecast();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const forecastList = data.list;
      for (let i = 2; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt_txt);
        const temp = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const uvIndex = forecast.uvi;
        const forecastElement = document.createElement('div');
        forecastElement.classList.add("ms-2" , "bg-warning" , "bg-gradient");
        const iconCode = forecast.weather[0].icon;
        const iconUrl = getWeatherIconCode(iconCode); 
        
        forecastElement.innerHTML = `
        <h3 class="ms-1">${date.toDateString()}</h3>
        <img class="ms-5"src="${iconUrl}" alt="${forecast.weather[0].description}">
        <p class="ms-3">Temperature: ${temp} &#8451;</p>
        <p class="ms-3">Humidity: ${humidity}%</p>
        <p class="ms-3">Wind Speed: ${windSpeed} m/s</p>
        <p class="ms-3">UV Index: ${uvIndex}</p>
      `;
        forecastDiv.appendChild(forecastElement);
      }

      const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
      }

      
    })
    .catch(error => {
      console.log(error);
      forecastDiv.innerHTML = '<p>Sorry, city not found</p>';

    });
    getCurrentWeather(city); 
}

  /* Current Data */
  function getCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;



  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const date = new Date(data.dt * 1000);
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const uvIndex = data.uvi;
          /* Adding icons to current data */
        const iconCode = data.weather[0].icon; 
        const iconUrl = getWeatherIconCode(iconCode);
        const currentWeatherElement = document.createElement('div');
        currentWeatherElement.classList.add("ms-5", "mt-5");
        currentWeatherElement.innerHTML = `
          <h2>Current Weather in ${city}</h2>
          <p>${date.toDateString()}</p>
          <img src="${iconUrl}" alt="${data.weather[0].description}">
          <p>Temperature: ${temp} &#8451;</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <p>UV Index: ${uvIndex}</p>
          <h2>5 day Forecast in ${city}</h2>  
        `; //This line up can be improve or correct since this elemente should be in the next row
        const currentContainer = document.getElementById('current-container');
        currentContainer.innerHTML = '';
        currentContainer.appendChild(currentWeatherElement);
      })
      .catch(error => {
        console.log(error);
        currentContainer.innerHTML = '<h3>Sorry, city not found</h3>';
      });
  }



function displaySearchHistory() {
  const searchHistoryDiv = document.getElementById('search-history');
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

  searchHistoryDiv.innerHTML = '';

  searchHistory.forEach(city => {
    const button = document.createElement('button');
    button.classList.add("btn", "btn-primary", "btn-lg", "mb-3", "btn-secondary");
    button.textContent = city;
    button.addEventListener('click', () => {
      document.getElementById('city').value = city;
      handleFormSubmit(event);
    });
    searchHistoryDiv.appendChild(button);
  });
}



function getWeatherIconCode(icon) {
  return `https://openweathermap.org/img/wn/${icon}.png`;
}






const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);


displaySearchHistory();