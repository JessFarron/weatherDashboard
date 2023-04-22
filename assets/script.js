const apiKey = 'b9e5d754e2eb97d65075459b2875fbf5';
const forecastDiv = document.getElementById('forecast');
var searchHistoryEl = document.getElementById("search-history")


function clearForecast() {
  forecastDiv.innerHTML = '';
}

function handleFormSubmit(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  clearForecast();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const forecastList = data.list;
      for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt_txt);
        const temp = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const uvIndex = forecast.uvi;
        const forecastElement = document.createElement('div');
        forecastElement.innerHTML = `
          <h3>${date.toDateString()}</h3>
          <p>Temperature: ${temp} &#8451;</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <p>UV Index: ${uvIndex}</p>
        `;
        forecastDiv.appendChild(forecastElement);
      }
    })
    .catch(error => console.log(error));

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
        const currentWeatherElement = document.createElement('div');
        currentWeatherElement.innerHTML = `
          <h3>Current Weather in ${city}</h3>
          <p>${date.toDateString()}</p>
          <p>Temperature: ${temp} &#8451;</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <p>UV Index: ${uvIndex}</p>
        `;
        forecastDiv.appendChild(currentWeatherElement); // append currentWeatherElement to the forecastDiv element
      })
      .catch(error => console.log(error));
  }

const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);



/* Searched history section NOT WORKING */
var loadCities = function() {
  var citiesLoaded = localStorage.getItem("cities")
  if(!citiesLoaded) {
      return false;
  }
  
  citiesLoaded = JSON.parse(citiesLoaded);
  
  for (var i=0; i < citiesLoaded.length; i++) {
      displaySearchedCities(citiesLoaded[i])
      cities.push(citiesLoaded[i])
  }
}

var saveCities = function() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

var displaySearchedCities = function(city) {
  var cityCardEl = document.createElement("div");
  cityCardEl.setAttribute("class", "card");
  var cityCardNameEl = document.createElement("div");
  cityCardNameEl.setAttribute("class", "card-body searched-city");
  cityCardNameEl.textContent = city;
  
  cityCardEl.appendChild(cityCardNameEl)

  cityCardEl.addEventListener("click", function () {
      getCityData(city)
  });

  searchHistoryEl.appendChild(cityCardEl)

}

//load previously searched cities on page load
loadCities()