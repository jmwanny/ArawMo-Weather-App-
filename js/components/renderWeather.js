
  export function renderWeatherHTML (weather, dayData = null) {
    
  const data = dayData || {
    day: weather.day,
    temp: weather.temp,
    condition: weather.condition,
    humidity: weather.humidity,
    wind: weather.wind
  }


    const weatherCard = document.querySelector('.js-weather-card');
   

    weatherCard.innerHTML = ` 
        <div class="weather-card">
        <div class="container">
        <h2 class="city js-city-name">${weather.city}</h2>
        <h2 class="city js-city-date">${data.day}</h2>
        <img src = "${data.condition.icon}" alt = "${data.condition.text}"/>

        <div class = "weather-condition">
        <p class="temperature js-city-temp">${data.temp ?? data.avgTemp} °C</p>
        <p class="condition js-city-condition">${data.condition.text}
        </div>
        <div class = "air-condition-container">
         <h1 class = "title">AIR CONDITIONS</h1>
         <div class = "air-condition">
          <div class = "humidity-container">
            <span>Humidity</span>
            <p class = "js-city-humidity">${data.humidity}%</p>
          </div>
          <div class ="wind-container">
            <span>Wind</span>
            <p class = "js-city-wind">${data.wind} km/h</p>
          </div>
          </div>
        </div>
      </div>
  `
   
  }
