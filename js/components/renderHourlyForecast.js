

export function renderHourlyForecastHTML (weather)  {
  
const hourlyForecastContainer = document.querySelector('.hourly-forecast-container');



 hourlyForecastContainer.innerHTML = weather.every3HourForecast.map((hour, index) => 
   
  `  <div class = "card" data-index = "${index}">
     <h1>${hour.time}</h1>
     <img src = "${hour.condition.icon}" alt = "${hour.condition.text}">
     <p>${hour.temp} °C</p>
    </div>
    `).join('');


}